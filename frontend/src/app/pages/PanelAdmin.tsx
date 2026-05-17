import { useState } from 'react';
import { useNavigate } from 'react-router';
import { LayoutDashboard, ClipboardList, CheckSquare, AlertCircle, Settings, LogOut, Shield, X, Eye } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { EMPRENDIMIENTOS } from '../data/emprendimientos';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Rocket } from 'lucide-react';

const NAV_ITEMS = [
  { key: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
  { key: 'solicitudes', label: 'Solicitudes', icon: <ClipboardList size={18} /> },
  { key: 'activos', label: 'Emprendimientos activos', icon: <CheckSquare size={18} /> },
  { key: 'bloqueados', label: 'Bloqueados', icon: <AlertCircle size={18} /> },
  { key: 'config', label: 'Configuración', icon: <Settings size={18} /> },
];

const ACTIVITY_DATA = [
  { mes: 'Ene', registros: 4 }, { mes: 'Feb', registros: 7 }, { mes: 'Mar', registros: 5 },
  { mes: 'Abr', registros: 10 }, { mes: 'May', registros: 8 },
];

const PLAN_DATA = [
  { plan: 'Gratis', total: 6 }, { plan: 'Premium', total: 4 },
];

export default function PanelAdmin() {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState('dashboard');
  const [emps, setEmps] = useState(EMPRENDIMIENTOS);
  const [selectedEmp, setSelectedEmp] = useState<typeof EMPRENDIMIENTOS[0] | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [filterPlan, setFilterPlan] = useState('Todos');
  const [filterCat, setFilterCat] = useState('Todos');
  const [filterEstado, setFilterEstado] = useState('Todos');
  const [motivoBloqueo, setMotivoBloqueo] = useState('');
  const [showBloqModal, setShowBloqModal] = useState(false);
  const [bloqTarget, setBloqTarget] = useState<typeof EMPRENDIMIENTOS[0] | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const pendientes = emps.filter(e => e.estado === 'Pendiente');
  const activos = emps.filter(e => e.estado === 'Activo');
  const bloqueados = emps.filter(e => e.estado === 'Bloqueado');
  const premium = emps.filter(e => e.plan === 'Premium');

  const aprobar = (id: string) => setEmps(prev => prev.map(e => e.id === id ? { ...e, estado: 'Activo' as const } : e));
  const rechazar = (id: string) => setEmps(prev => prev.filter(e => e.id !== id));
  const bloquear = (id: string) => {
    setEmps(prev => prev.map(e => e.id === id ? { ...e, estado: 'Bloqueado' as const } : e));
    setShowBloqModal(false);
    setMotivoBloqueo('');
  };
  const desbloquear = (id: string) => setEmps(prev => prev.map(e => e.id === id ? { ...e, estado: 'Activo' as const } : e));

  const StatusBadge = ({ estado }: { estado: string }) => {
    const cfg: Record<string, { bg: string; color: string; label: string }> = {
      Pendiente: { bg: '#FEF3C7', color: '#D97706', label: '🟡 Pendiente' },
      Activo: { bg: '#F0F5E8', color: '#687D31', label: '🟢 Aprobado' },
      Bloqueado: { bg: '#FEE2E2', color: '#DC2626', label: '🔴 Bloqueado' },
    };
    const c = cfg[estado] || cfg.Pendiente;
    return (
      <span className="px-2 py-1 rounded-full text-xs font-bold" style={{ background: c.bg, color: c.color }}>
        {c.label}
      </span>
    );
  };

  const activeEmpsFiltered = activos.filter(e => {
    if (filterPlan !== 'Todos' && e.plan !== filterPlan) return false;
    if (filterCat !== 'Todos' && e.categoria !== filterCat) return false;
    return true;
  });

  const categorias = [...new Set(emps.map(e => e.categoria))];

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: '#F5F3EE' }}>
      {/* Sidebar */}
      <aside
        className={`flex-shrink-0 flex flex-col transition-all duration-300 ${sidebarOpen ? 'w-60' : 'w-16'}`}
        style={{ background: '#19350C', color: 'white' }}
      >
        {/* Logo */}
        <div className="flex items-center gap-2 px-4 py-5 border-b" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
          <div className="flex items-center justify-center w-8 h-8 rounded-lg flex-shrink-0" style={{ background: 'rgba(255,255,255,0.1)' }}>
            <Rocket size={16} style={{ color: '#FF6B35' }} />
          </div>
          {sidebarOpen && (
            <span className="font-bold text-sm whitespace-nowrap">
              <span className="text-white">Yo</span>
              <span style={{ color: '#6FA9BB' }}> Impulso</span>
              <span className="ml-1 text-xs opacity-60">Admin</span>
            </span>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 flex flex-col gap-1 px-2">
          {NAV_ITEMS.map(item => (
            <button
              key={item.key}
              onClick={() => setActiveNav(item.key)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 text-left w-full"
              style={{
                background: activeNav === item.key ? 'rgba(255,255,255,0.15)' : 'transparent',
                color: activeNav === item.key ? 'white' : 'rgba(213,211,204,0.7)',
              }}
            >
              <span className="flex-shrink-0">{item.icon}</span>
              {sidebarOpen && <span className="truncate">{item.label}</span>}
              {sidebarOpen && item.key === 'solicitudes' && pendientes.length > 0 && (
                <span className="ml-auto flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold" style={{ background: '#FF6B35' }}>
                  {pendientes.length}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-3 border-t" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
          <button
            onClick={() => navigate('/admin')}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm w-full transition-all duration-200 hover:opacity-80"
            style={{ color: 'rgba(213,211,204,0.7)' }}
          >
            <LogOut size={18} className="flex-shrink-0" />
            {sidebarOpen && <span>Cerrar sesión</span>}
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header
          className="flex items-center justify-between px-6 py-4 border-b flex-shrink-0"
          style={{ background: 'white', borderColor: '#E8E6E0' }}
        >
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-500 hover:text-gray-700 transition-colors">
              <LayoutDashboard size={20} />
            </button>
            <div>
              <h1 className="font-bold text-sm" style={{ color: '#19350C' }}>
                Panel de administración — Yo Impulso
              </h1>
              <p className="text-xs" style={{ color: '#406768' }}>Administrador principal</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold" style={{ background: '#19350C' }}>
              A
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* Dashboard */}
          {activeNav === 'dashboard' && (
            <div className="flex flex-col gap-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: 'Total emprendimientos', value: emps.length, icon: '🏪', color: '#687D31', bg: '#F0F5E8' },
                  { label: 'Solicitudes pendientes', value: pendientes.length, icon: '⏳', color: '#D97706', bg: '#FEF3C7' },
                  { label: 'Emprendimientos activos', value: activos.length, icon: '✅', color: '#19350C', bg: '#E8F0D8' },
                  { label: 'Suscripciones Premium', value: premium.length, icon: '⭐', color: '#FF6B35', bg: '#FFF0E8' },
                ].map(kpi => (
                  <div key={kpi.label} className="rounded-2xl p-5" style={{ background: 'white', boxShadow: '0 2px 12px rgba(25,53,12,0.06)' }}>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xl" style={{ background: kpi.bg }}>
                        {kpi.icon}
                      </div>
                      <p className="text-xs leading-tight" style={{ color: '#406768' }}>{kpi.label}</p>
                    </div>
                    <p className="font-black" style={{ color: kpi.color, fontSize: '1.8rem', lineHeight: 1 }}>{kpi.value}</p>
                  </div>
                ))}
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                <div className="rounded-2xl p-5" style={{ background: 'white', boxShadow: '0 2px 12px rgba(25,53,12,0.06)' }}>
                  <h3 className="font-bold mb-4 text-sm" style={{ color: '#19350C' }}>Registros por mes</h3>
                  <ResponsiveContainer width="100%" height={180}>
                    <LineChart data={ACTIVITY_DATA}>
                      <XAxis dataKey="mes" tick={{ fontSize: 10, fill: '#406768' }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 10, fill: '#406768' }} axisLine={false} tickLine={false} />
                      <Tooltip contentStyle={{ borderRadius: '12px', border: 'none' }} />
                      <Line type="monotone" dataKey="registros" stroke="#687D31" strokeWidth={2.5} dot={{ fill: '#687D31', r: 4 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="rounded-2xl p-5" style={{ background: 'white', boxShadow: '0 2px 12px rgba(25,53,12,0.06)' }}>
                  <h3 className="font-bold mb-4 text-sm" style={{ color: '#19350C' }}>Distribución de planes</h3>
                  <ResponsiveContainer width="100%" height={180}>
                    <BarChart data={PLAN_DATA}>
                      <XAxis dataKey="plan" tick={{ fontSize: 11, fill: '#406768' }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 10, fill: '#406768' }} axisLine={false} tickLine={false} />
                      <Tooltip contentStyle={{ borderRadius: '12px', border: 'none' }} />
                      <Bar dataKey="total" fill="#687D31" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {/* Solicitudes */}
          {activeNav === 'solicitudes' && (
            <div className="rounded-2xl overflow-hidden" style={{ background: 'white', boxShadow: '0 2px 12px rgba(25,53,12,0.06)' }}>
              <div className="px-5 py-4 border-b flex items-center justify-between" style={{ borderColor: '#E8E6E0' }}>
                <h2 className="font-bold" style={{ color: '#19350C', fontSize: '1rem' }}>Solicitudes de registro</h2>
                <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ background: '#FEF3C7', color: '#D97706' }}>
                  {pendientes.length} pendientes
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ background: '#F5F3EE' }}>
                      {['Logo', 'Emprendimiento', 'Emprendedor', 'Categoría', 'Fecha', 'Estado', 'Acciones'].map(h => (
                        <th key={h} className="text-left px-4 py-3 text-xs font-bold" style={{ color: '#406768' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {emps.filter(e => e.estado === 'Pendiente' || e.estado === 'Activo').map(e => (
                      <tr key={e.id} className="border-t hover:bg-gray-50 transition-colors" style={{ borderColor: '#F0F0EE' }}>
                        <td className="px-4 py-3">
                          <ImageWithFallback src={e.imagen} alt="" className="w-10 h-10 rounded-xl object-cover" />
                        </td>
                        <td className="px-4 py-3 font-semibold" style={{ color: '#19350C' }}>{e.nombre}</td>
                        <td className="px-4 py-3 text-xs" style={{ color: '#406768' }}>{e.emprendedor}</td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 rounded-full text-xs font-semibold" style={{ background: '#F0F5E8', color: '#687D31' }}>
                            {e.categoria}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-xs" style={{ color: '#406768' }}>{e.fechaSolicitud}</td>
                        <td className="px-4 py-3"><StatusBadge estado={e.estado} /></td>
                        <td className="px-4 py-3">
                          <div className="flex gap-1.5 flex-wrap">
                            {e.estado === 'Pendiente' && (
                              <>
                                <button onClick={() => aprobar(e.id)} className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white transition-opacity hover:opacity-80" style={{ background: '#687D31' }}>
                                  Aprobar
                                </button>
                                <button onClick={() => rechazar(e.id)} className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white transition-opacity hover:opacity-80" style={{ background: '#DC2626' }}>
                                  Rechazar
                                </button>
                              </>
                            )}
                            <button
                              onClick={() => { setSelectedEmp(e); setShowDetailModal(true); }}
                              className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-opacity hover:opacity-80 flex items-center gap-1"
                              style={{ background: '#F5F3EE', color: '#406768' }}
                            >
                              <Eye size={12} /> Ver
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {emps.filter(e => e.estado === 'Pendiente' || e.estado === 'Activo').length === 0 && (
                  <p className="text-center py-10 text-sm" style={{ color: '#406768' }}>No hay solicitudes pendientes ✅</p>
                )}
              </div>
            </div>
          )}

          {/* Activos */}
          {activeNav === 'activos' && (
            <div className="flex flex-col gap-4">
              {/* Filters */}
              <div className="flex flex-wrap gap-3 p-4 rounded-2xl" style={{ background: 'white', boxShadow: '0 2px 12px rgba(25,53,12,0.06)' }}>
                <select className="px-3 py-2 rounded-xl text-xs outline-none" style={{ border: '1.5px solid #E8E6E0', color: '#19350C' }}
                  value={filterPlan} onChange={e => setFilterPlan(e.target.value)}>
                  <option value="Todos">Todos los planes</option>
                  <option value="Gratis">Gratis</option>
                  <option value="Premium">Premium</option>
                </select>
                <select className="px-3 py-2 rounded-xl text-xs outline-none" style={{ border: '1.5px solid #E8E6E0', color: '#19350C' }}
                  value={filterCat} onChange={e => setFilterCat(e.target.value)}>
                  <option value="Todos">Todas las categorías</option>
                  {categorias.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <div className="ml-auto text-xs flex items-center gap-1" style={{ color: '#406768' }}>
                  <span className="font-bold" style={{ color: '#19350C' }}>{activeEmpsFiltered.length}</span> resultados
                </div>
              </div>

              <div className="rounded-2xl overflow-hidden" style={{ background: 'white', boxShadow: '0 2px 12px rgba(25,53,12,0.06)' }}>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr style={{ background: '#F5F3EE' }}>
                        {['Logo', 'Nombre', 'Categoría', 'Plan', 'Tiempo suscripción', 'Estado', 'Acciones'].map(h => (
                          <th key={h} className="text-left px-4 py-3 text-xs font-bold" style={{ color: '#406768' }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {activeEmpsFiltered.map(e => {
                        const diasRestantes = e.plan === 'Premium' ? 24 : 0;
                        const pct = (diasRestantes / 30) * 100;
                        return (
                          <tr key={e.id} className="border-t hover:bg-gray-50 transition-colors" style={{ borderColor: '#F0F0EE' }}>
                            <td className="px-4 py-3">
                              <ImageWithFallback src={e.imagen} alt="" className="w-10 h-10 rounded-xl object-cover" />
                            </td>
                            <td className="px-4 py-3 font-semibold" style={{ color: '#19350C' }}>{e.nombre}</td>
                            <td className="px-4 py-3">
                              <span className="px-2 py-1 rounded-full text-xs font-semibold" style={{ background: '#F0F5E8', color: '#687D31' }}>{e.categoria}</span>
                            </td>
                            <td className="px-4 py-3">
                              <span className="px-2 py-1 rounded-full text-xs font-bold" style={{ background: e.plan === 'Premium' ? '#FFF0E8' : '#F5F3EE', color: e.plan === 'Premium' ? '#FF6B35' : '#406768' }}>
                                {e.plan === 'Premium' ? '⭐ Premium' : 'Gratis'}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              {e.plan === 'Premium' ? (
                                <div className="flex items-center gap-2">
                                  <div className="w-20 h-1.5 rounded-full overflow-hidden" style={{ background: '#E8E6E0' }}>
                                    <div className="h-full rounded-full" style={{ width: `${pct}%`, background: '#687D31' }} />
                                  </div>
                                  <span className="text-xs" style={{ color: '#406768' }}>{diasRestantes}d</span>
                                </div>
                              ) : <span className="text-xs" style={{ color: '#D5D3CC' }}>—</span>}
                            </td>
                            <td className="px-4 py-3"><StatusBadge estado={e.estado} /></td>
                            <td className="px-4 py-3">
                              <div className="flex gap-1.5">
                                <button
                                  onClick={() => { setSelectedEmp(e); setShowDetailModal(true); }}
                                  className="px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-opacity hover:opacity-80"
                                  style={{ background: '#F5F3EE', color: '#406768' }}
                                >
                                  <Eye size={12} /> Ver
                                </button>
                                <button
                                  onClick={() => { setBloqTarget(e); setShowBloqModal(true); }}
                                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white transition-opacity hover:opacity-80"
                                  style={{ background: '#DC2626' }}
                                >
                                  Bloquear
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Bloqueados */}
          {activeNav === 'bloqueados' && (
            <div className="rounded-2xl overflow-hidden" style={{ background: 'white', boxShadow: '0 2px 12px rgba(25,53,12,0.06)' }}>
              <div className="px-5 py-4 border-b" style={{ borderColor: '#E8E6E0' }}>
                <h2 className="font-bold" style={{ color: '#19350C', fontSize: '1rem' }}>Emprendimientos bloqueados</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ background: '#F5F3EE' }}>
                      {['Logo', 'Nombre', 'Categoría', 'Estado', 'Acciones'].map(h => (
                        <th key={h} className="text-left px-4 py-3 text-xs font-bold" style={{ color: '#406768' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {bloqueados.map(e => (
                      <tr key={e.id} className="border-t" style={{ borderColor: '#F0F0EE' }}>
                        <td className="px-4 py-3">
                          <ImageWithFallback src={e.imagen} alt="" className="w-10 h-10 rounded-xl object-cover opacity-50" />
                        </td>
                        <td className="px-4 py-3 font-semibold" style={{ color: '#406768' }}>{e.nombre}</td>
                        <td className="px-4 py-3 text-xs" style={{ color: '#406768' }}>{e.categoria}</td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 rounded-full text-xs font-bold" style={{ background: '#FEE2E2', color: '#DC2626' }}>🔴 Bloqueado</span>
                        </td>
                        <td className="px-4 py-3">
                          <button onClick={() => desbloquear(e.id)} className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white transition-opacity hover:opacity-80" style={{ background: '#687D31' }}>
                            Desbloquear
                          </button>
                        </td>
                      </tr>
                    ))}
                    {bloqueados.length === 0 && (
                      <tr><td colSpan={5} className="text-center py-10 text-sm" style={{ color: '#406768' }}>No hay emprendimientos bloqueados ✅</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Config */}
          {activeNav === 'config' && (
            <div className="rounded-2xl p-6" style={{ background: 'white', boxShadow: '0 2px 12px rgba(25,53,12,0.06)' }}>
              <h2 className="font-bold mb-5" style={{ color: '#19350C', fontSize: '1.1rem' }}>Configuración de la plataforma</h2>
              <div className="flex flex-col gap-4 max-w-lg">
                {['Nombre de la plataforma', 'Email de soporte', 'Precio Plan Premium (Bs.)'].map(f => (
                  <div key={f}>
                    <label className="block text-xs font-bold mb-1" style={{ color: '#406768' }}>{f}</label>
                    <input
                      type="text"
                      defaultValue={f === 'Nombre de la plataforma' ? 'Yo Impulso' : f === 'Email de soporte' ? 'soporte@yoimpulso.bo' : '150'}
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                      style={{ border: '2px solid #E8E6E0', background: '#FAFAFA', color: '#19350C' }}
                      onFocus={el => (el.target.style.borderColor = '#687D31')}
                      onBlur={el => (el.target.style.borderColor = '#E8E6E0')}
                    />
                  </div>
                ))}
                <button className="px-6 py-3 rounded-xl text-sm font-bold text-white self-start transition-opacity hover:opacity-90" style={{ background: '#687D31' }}>
                  Guardar configuración
                </button>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Detail modal */}
      {showDetailModal && selectedEmp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="rounded-3xl overflow-hidden w-full max-w-lg max-h-[90vh] overflow-y-auto" style={{ background: 'white' }}>
            <div className="relative h-48">
              <ImageWithFallback src={selectedEmp.imagen} alt={selectedEmp.nombre} className="w-full h-full object-cover" />
              <button onClick={() => setShowDetailModal(false)} className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center text-white" style={{ background: 'rgba(0,0,0,0.5)' }}>
                <X size={16} />
              </button>
            </div>
            <div className="p-5">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <h3 className="font-bold" style={{ color: '#19350C', fontSize: '1.2rem' }}>{selectedEmp.nombre}</h3>
                  <p className="text-sm" style={{ color: '#406768' }}>{selectedEmp.emprendedor}</p>
                </div>
                <StatusBadge estado={selectedEmp.estado} />
              </div>
              <div className="grid grid-cols-2 gap-3 mb-4">
                {[
                  ['Categoría', selectedEmp.categoria],
                  ['Ciudad', selectedEmp.ciudad],
                  ['Modalidad', selectedEmp.modalidad],
                  ['Plan', selectedEmp.plan],
                  ['Solicitud', selectedEmp.fechaSolicitud],
                  ['Perfil verde', `${selectedEmp.perfilVerde}%`],
                ].map(([k, v]) => (
                  <div key={k} className="rounded-xl p-3" style={{ background: '#F5F3EE' }}>
                    <p className="text-xs" style={{ color: '#406768' }}>{k}</p>
                    <p className="text-sm font-bold" style={{ color: '#19350C' }}>{v}</p>
                  </div>
                ))}
              </div>
              <p className="text-sm leading-relaxed mb-4" style={{ color: '#406768' }}>{selectedEmp.descripcion}</p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {selectedEmp.badges.map(b => (
                  <span key={b} className="px-2 py-1 rounded-full text-xs font-semibold" style={{ background: '#F0F5E8', color: '#687D31' }}>✓ {b}</span>
                ))}
              </div>
              <div className="flex gap-2">
                {selectedEmp.estado === 'Pendiente' && (
                  <>
                    <button onClick={() => { aprobar(selectedEmp.id); setShowDetailModal(false); }} className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white" style={{ background: '#687D31' }}>Aprobar</button>
                    <button onClick={() => { rechazar(selectedEmp.id); setShowDetailModal(false); }} className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white" style={{ background: '#DC2626' }}>Rechazar</button>
                  </>
                )}
                <button onClick={() => setShowDetailModal(false)} className="flex-1 py-2.5 rounded-xl text-sm font-semibold" style={{ background: '#F5F3EE', color: '#406768' }}>Cerrar</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Block modal */}
      {showBloqModal && bloqTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="rounded-3xl p-6 w-full max-w-md" style={{ background: 'white' }}>
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle size={20} style={{ color: '#DC2626' }} />
              <h3 className="font-bold" style={{ color: '#19350C' }}>Bloquear emprendimiento</h3>
            </div>
            <p className="text-sm mb-4" style={{ color: '#406768' }}>
              ¿Estás seguro de bloquear a <strong style={{ color: '#19350C' }}>{bloqTarget.nombre}</strong>? El emprendimiento dejará de ser visible en la plataforma.
            </p>
            <label className="block text-xs font-bold mb-1.5" style={{ color: '#406768' }}>Motivo del bloqueo</label>
            <textarea
              value={motivoBloqueo}
              onChange={e => setMotivoBloqueo(e.target.value)}
              rows={3}
              placeholder="Describe el motivo del bloqueo…"
              className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none mb-4"
              style={{ border: '2px solid #E8E6E0', background: '#FAFAFA', color: '#19350C' }}
              onFocus={el => (el.target.style.borderColor = '#DC2626')}
              onBlur={el => (el.target.style.borderColor = '#E8E6E0')}
            />
            <div className="flex gap-2">
              <button onClick={() => { setShowBloqModal(false); setBloqTarget(null); }} className="flex-1 py-2.5 rounded-xl text-sm font-semibold" style={{ background: '#F5F3EE', color: '#406768' }}>Cancelar</button>
              <button onClick={() => bloquear(bloqTarget.id)} className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white" style={{ background: '#DC2626' }}>Confirmar bloqueo</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
