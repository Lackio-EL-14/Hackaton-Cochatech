import { useState } from 'react';
import { Link } from 'react-router';
import { Edit, Package, Bell, BarChart2, Plus, X, ShoppingBag, TrendingUp, Users, Star, Lock } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { EMPRENDIMIENTOS, SELLOS_DISPONIBLES } from '../data/emprendimientos';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

const EMP = EMPRENDIMIENTOS[0];
const PLAN: 'Gratis' | 'Premium' = 'Premium';

const TABS = [
  { key: 'perfil', label: 'Editar perfil', icon: <Edit size={16} /> },
  { key: 'catalogo', label: 'Catálogo', icon: <Package size={16} /> },
  { key: 'notificaciones', label: 'Notificaciones', icon: <Bell size={16} /> },
  { key: 'ventas', label: 'Módulo de Ventas', icon: <BarChart2 size={16} /> },
];

const VENTAS_DATA = [
  { dia: '1 May', ventas: 5 }, { dia: '5 May', ventas: 8 }, { dia: '10 May', ventas: 12 },
  { dia: '15 May', ventas: 9 }, { dia: '20 May', ventas: 16 }, { dia: '25 May', ventas: 22 },
  { dia: '30 May', ventas: 18 },
];

const PRODUCTOS_DATA = [
  { nombre: 'Yogur natural', ventas: 128 },
  { nombre: 'Yogur frutado', ventas: 95 },
  { nombre: 'Combo x3', ventas: 60 },
];

const CATEGORIA_DATA = [
  { name: 'Natural 500g', value: 50 },
  { name: 'Frutado 500g', value: 37 },
  { name: 'Combo x3', value: 13 },
];

const PIE_COLORS = ['#687D31', '#6FA9BB', '#FF6B35'];

type Notificacion = {
  id: string;
  tipo: 'compra' | 'sello_otorgado' | 'sello_rechazado' | 'admin' | 'alianza' | 'verificado';
  titulo: string;
  descripcion: string;
  tiempo: string;
  leida: boolean;
};

const NOTIFICACIONES_INICIAL: Notificacion[] = [
  { id: 'n1', tipo: 'compra', titulo: 'Nueva solicitud de compra', descripcion: 'Un cliente está interesado en Yogur natural 500g', tiempo: 'hace 10 min', leida: false },
  { id: 'n2', tipo: 'sello_otorgado', titulo: 'Sello otorgado', descripcion: 'Tu solicitud de sello Producción Limpia fue aprobada', tiempo: 'hace 2h', leida: false },
  { id: 'n3', tipo: 'verificado', titulo: 'Perfil verificado', descripcion: 'Tu emprendimiento fue aprobado en la plataforma', tiempo: 'hace 1 día', leida: true },
  { id: 'n4', tipo: 'admin', titulo: 'Mensaje del administrador', descripcion: 'El equipo de Yo Impulso te envió un mensaje', tiempo: 'hace 2 días', leida: true },
  { id: 'n5', tipo: 'alianza', titulo: 'Nueva propuesta de alianza', descripcion: 'EcoTejidos Bolivia quiere conectar contigo', tiempo: 'hace 3 días', leida: false },
  { id: 'n6', tipo: 'sello_rechazado', titulo: 'Sello rechazado', descripcion: 'Tu solicitud de sello Economía Circular requiere más evidencia', tiempo: 'hace 4 días', leida: true },
];

const NOTIF_TIPOS = {
  compra:         { icono: '🛒', color: '#FF6B35', bg: '#FFF0E8' },
  sello_otorgado: { icono: '✅', color: '#687D31', bg: '#F0F5E8' },
  sello_rechazado:{ icono: '❌', color: '#EF4444', bg: '#FEF2F2' },
  admin:          { icono: '📢', color: '#406768', bg: '#EEF5F8' },
  alianza:        { icono: '🤝', color: '#FF6B35', bg: '#FFF0E8' },
  verificado:     { icono: '🌟', color: '#19350C', bg: '#E8EDD8' },
};

const NOTIF_FILTROS = [
  { key: 'todas', label: 'Todas' },
  { key: 'no_leidas', label: 'No leídas' },
  { key: 'solicitudes', label: 'Solicitudes' },
  { key: 'sellos', label: 'Sellos' },
  { key: 'alianzas', label: 'Alianzas' },
];

function UpgradeBanner({ mensaje, descripcion }: { mensaje: string; descripcion: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-8 text-center">
      <div className="text-6xl mb-4">🌱</div>
      <div className="flex items-center gap-2 mb-3">
        <Lock size={18} style={{ color: '#FF6B35' }} />
        <h3 style={{ color: '#19350C', fontWeight: 800, fontSize: '1.2rem' }}>Solo Plan Premium</h3>
      </div>
      <p className="mb-2 font-bold" style={{ color: '#19350C' }}>{mensaje}</p>
      <p className="text-sm mb-6 max-w-sm" style={{ color: '#406768' }}>{descripcion}</p>
      <div className="flex flex-col gap-2 text-sm text-left mb-6 w-full max-w-xs">
        {['Catálogo de productos ilimitado', 'Centro de notificaciones', 'Estadísticas de ventas', 'Asesorías personalizadas'].map(b => (
          <div key={b} className="flex items-center gap-2" style={{ color: '#406768' }}>
            <span style={{ color: '#687D31', fontWeight: 700 }}>✓</span> {b}
          </div>
        ))}
      </div>
      <button
        className="px-8 py-3.5 rounded-xl font-bold text-white transition-all duration-200 hover:opacity-90 inline-flex items-center gap-2"
        style={{ background: '#FF6B35', fontSize: '0.95rem' }}
      >
        🚀 Activar Plan Premium
      </button>
    </div>
  );
}

export default function Gestion() {
  const [activeTab, setActiveTab] = useState('perfil');
  const [stock, setStock] = useState<Record<string, number>>({ p1: 45, p2: 30, p3: 15 });
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showSelloModal, setShowSelloModal] = useState<string | null>(null);
  const [notifs, setNotifs] = useState<Notificacion[]>(NOTIFICACIONES_INICIAL);
  const [notifFiltro, setNotifFiltro] = useState('todas');

  const notifsFiltradas = notifs.filter(n => {
    if (notifFiltro === 'no_leidas') return !n.leida;
    if (notifFiltro === 'solicitudes') return n.tipo === 'compra';
    if (notifFiltro === 'sellos') return n.tipo === 'sello_otorgado' || n.tipo === 'sello_rechazado';
    if (notifFiltro === 'alianzas') return n.tipo === 'alianza';
    return true;
  });

  const noLeidasCount = notifs.filter(n => !n.leida).length;

  const marcarTodasLeidas = () => setNotifs(prev => prev.map(n => ({ ...n, leida: true })));
  const marcarLeida = (id: string) => setNotifs(prev => prev.map(n => n.id === id ? { ...n, leida: true } : n));

  return (
    <div style={{ background: '#F5F3EE', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg,#19350C,#2D5A1A)', padding: '2rem 1.5rem' }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 flex-wrap">
          <div>
            <p className="text-sm mb-1" style={{ color: 'rgba(245,243,238,0.7)' }}>Panel de gestión</p>
            <h1 className="text-white" style={{ fontWeight: 800, fontSize: '1.5rem' }}>
              Hola, {EMP.nombre} 👋
            </h1>
          </div>
          {activeTab === 'ventas' && (
            <span
              className="px-4 py-2 rounded-full text-sm font-bold"
              style={{
                background: PLAN === 'Premium' ? '#FF6B35' : 'rgba(255,255,255,0.15)',
                color: 'white',
              }}
            >
              {PLAN === 'Premium' ? '⭐ Plan Premium' : 'Plan Gratuito'}
            </span>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Tabs */}
        <div
          className="flex gap-1 p-1 rounded-2xl mb-6 overflow-x-auto"
          style={{ background: 'white', boxShadow: '0 2px 12px rgba(25,53,12,0.06)' }}
        >
          {TABS.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-200 flex-1 justify-center relative"
              style={{
                background: activeTab === tab.key ? '#19350C' : 'transparent',
                color: activeTab === tab.key ? 'white' : '#406768',
              }}
            >
              {tab.icon} {tab.label}
              {tab.key === 'notificaciones' && noLeidasCount > 0 && (
                <span
                  className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-xs font-bold text-white"
                  style={{ background: '#FF6B35', fontSize: '0.65rem' }}
                >
                  {noLeidasCount}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Tab: Editar perfil */}
        {activeTab === 'perfil' && (
          <div className="rounded-2xl p-6" style={{ background: 'white', boxShadow: '0 2px 12px rgba(25,53,12,0.06)' }}>
            <h2 className="font-bold mb-6" style={{ color: '#19350C', fontSize: '1.1rem' }}>Editar perfil del emprendimiento</h2>
            <div className="grid md:grid-cols-2 gap-5">
              {[
                { label: 'Nombre del emprendimiento', value: EMP.nombre },
                { label: 'Emprendedor/a', value: EMP.emprendedor },
                { label: 'Correo de contacto', value: 'yoghibolivia@gmail.com' },
                { label: 'Teléfono', value: '+591 70000000' },
                { label: 'Ciudad', value: EMP.ciudad },
                { label: 'Horario', value: EMP.horario },
              ].map(f => (
                <div key={f.label}>
                  <label className="block text-xs font-bold mb-1" style={{ color: '#406768' }}>{f.label}</label>
                  <input
                    defaultValue={f.value}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
                    style={{ border: '2px solid #E8E6E0', background: '#FAFAFA', color: '#19350C' }}
                    onFocus={el => (el.target.style.borderColor = '#687D31')}
                    onBlur={el => (el.target.style.borderColor = '#E8E6E0')}
                  />
                </div>
              ))}
              <div className="md:col-span-2">
                <label className="block text-xs font-bold mb-1" style={{ color: '#406768' }}>Descripción</label>
                <textarea
                  defaultValue={EMP.descripcion}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none transition-all duration-200"
                  style={{ border: '2px solid #E8E6E0', background: '#FAFAFA', color: '#19350C' }}
                  onFocus={el => (el.target.style.borderColor = '#687D31')}
                  onBlur={el => (el.target.style.borderColor = '#E8E6E0')}
                />
              </div>
            </div>

            {/* Ubicación sub-section */}
            <div className="mt-8 pt-6 border-t" style={{ borderColor: '#E8E6E0' }}>
              <h3 className="font-bold mb-4" style={{ color: '#19350C', fontSize: '0.95rem' }}>Ubicación de tu emprendimiento</h3>
              <div
                className="rounded-2xl overflow-hidden relative mb-4"
                style={{ height: '260px', background: 'linear-gradient(160deg,#B8D4C0,#9DBFB0)' }}
              >
                <svg width="100%" height="100%" viewBox="0 0 600 260" preserveAspectRatio="xMidYMid slice">
                  <path d="M50 130 Q200 110 300 130 Q420 150 550 130" stroke="white" strokeWidth="3" fill="none" opacity="0.5" />
                  <path d="M300 20 Q295 100 300 180 Q305 220 300 255" stroke="white" strokeWidth="2.5" fill="none" opacity="0.5" />
                  {[...Array(15)].map((_, i) => (
                    <rect key={i} x={80 + (i % 5) * 100} y={40 + Math.floor(i / 5) * 70} width={55} height={38} rx="4" fill="white" opacity="0.12" />
                  ))}
                  <text x="270" y="138" fill="#19350C" fontSize="16" fontWeight="bold" opacity="0.7">Cochabamba</text>
                </svg>
                <div className="absolute" style={{ left: '48%', top: '42%', transform: 'translate(-50%,-100%)' }}>
                  <div className="flex flex-col items-center cursor-grab">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xl" style={{ background: '#FF6B35', boxShadow: '0 4px 16px rgba(255,107,53,0.5)' }}>
                      📍
                    </div>
                    <div className="w-2 h-2 rounded-full mt-0.5" style={{ background: '#FF6B35' }} />
                  </div>
                </div>
                <div className="absolute bottom-3 right-3 text-xs px-2 py-1 rounded-lg" style={{ background: 'rgba(255,255,255,0.85)', color: '#406768' }}>
                  Arrastra el pin para ajustar
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold mb-1" style={{ color: '#406768' }}>Latitud</label>
                  <input type="text" defaultValue="-17.3895" className="w-full px-4 py-3 rounded-xl text-sm outline-none" style={{ border: '2px solid #E8E6E0', background: '#FAFAFA', color: '#19350C' }}
                    onFocus={el => (el.target.style.borderColor = '#687D31')} onBlur={el => (el.target.style.borderColor = '#E8E6E0')} />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1" style={{ color: '#406768' }}>Longitud</label>
                  <input type="text" defaultValue="-66.1568" className="w-full px-4 py-3 rounded-xl text-sm outline-none" style={{ border: '2px solid #E8E6E0', background: '#FAFAFA', color: '#19350C' }}
                    onFocus={el => (el.target.style.borderColor = '#687D31')} onBlur={el => (el.target.style.borderColor = '#E8E6E0')} />
                </div>
              </div>
            </div>

            {/* Redes sociales */}
            <div className="mt-6 pt-6 border-t" style={{ borderColor: '#E8E6E0' }}>
              <h3 className="font-bold mb-3" style={{ color: '#19350C', fontSize: '0.95rem' }}>Redes sociales</h3>
              <div className="flex flex-col gap-2">
                {[
                  { label: '📸 Instagram', value: '@yoghibolivia' },
                  { label: '🎵 TikTok', value: '@yoghibolivia' },
                  { label: '👥 Facebook', value: 'yoghibolivia' },
                ].map(r => (
                  <div key={r.label} className="flex items-center gap-2">
                    <span className="w-28 text-xs font-semibold flex-shrink-0" style={{ color: '#406768' }}>{r.label}</span>
                    <input
                      type="text"
                      defaultValue={r.value}
                      className="flex-1 px-3 py-2 rounded-lg text-sm outline-none transition-all duration-200"
                      style={{ border: '1.5px solid #E8E6E0', background: '#FAFAFA', color: '#19350C' }}
                      onFocus={el => (el.target.style.borderColor = '#687D31')}
                      onBlur={el => (el.target.style.borderColor = '#E8E6E0')}
                    />
                  </div>
                ))}
              </div>
            </div>

            <button
              className="mt-6 px-8 py-3 rounded-xl font-bold text-white transition-all duration-200 hover:opacity-90"
              style={{ background: '#687D31' }}
            >
              Guardar cambios
            </button>

            {/* Sellos sub-section */}
            <div className="mt-8 pt-8 border-t" style={{ borderColor: '#E8E6E0' }}>
              <h3 className="font-bold mb-5" style={{ color: '#19350C', fontSize: '1rem' }}>Mis sellos y verificaciones</h3>

              {EMP.sellos.obtenidos.length > 0 && (
                <div className="mb-5">
                  <p className="text-xs font-bold mb-3 uppercase tracking-wide" style={{ color: '#687D31' }}>Sellos obtenidos</p>
                  <div className="flex flex-wrap gap-2">
                    {EMP.sellos.obtenidos.map(s => {
                      const sello = SELLOS_DISPONIBLES.find(sd => sd.key === s.key);
                      if (!sello) return null;
                      return (
                        <div key={s.key} className="flex items-center gap-2 px-3 py-2 rounded-xl" style={{ background: sello.bg, border: `1.5px solid ${sello.color}50` }}>
                          <span className="text-base">{sello.icono}</span>
                          <div>
                            <p className="text-xs font-bold" style={{ color: sello.color }}>{sello.nombre}</p>
                            <p className="text-xs" style={{ color: '#406768' }}>Otorgado: {s.fechaOtorgamiento}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {EMP.sellos.enRevision.length > 0 && (
                <div className="mb-5">
                  <p className="text-xs font-bold mb-3 uppercase tracking-wide" style={{ color: '#D97706' }}>En revisión</p>
                  <div className="flex flex-wrap gap-2">
                    {EMP.sellos.enRevision.map(s => {
                      const sello = SELLOS_DISPONIBLES.find(sd => sd.key === s.key);
                      if (!sello) return null;
                      return (
                        <div key={s.key} className="flex items-center gap-2 px-3 py-2 rounded-xl" style={{ background: '#FEF3C7', border: '1.5px solid #FCD34D' }}>
                          <span className="text-base">{sello.icono}</span>
                          <div>
                            <p className="text-xs font-bold" style={{ color: '#D97706' }}>{sello.nombre}</p>
                            <p className="text-xs" style={{ color: '#92400E' }}>En revisión desde: {s.fechaEnvio}</p>
                          </div>
                          <span className="ml-1 px-2 py-0.5 rounded-full text-xs font-bold" style={{ background: '#FCD34D', color: '#92400E' }}>En revisión</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              <div>
                <p className="text-xs font-bold mb-3 uppercase tracking-wide" style={{ color: '#406768' }}>Solicitar verificación</p>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {SELLOS_DISPONIBLES
                    .filter(sd => !EMP.sellos.obtenidos.find(s => s.key === sd.key) && !EMP.sellos.enRevision.find(s => s.key === sd.key))
                    .map(sello => (
                      <div key={sello.key} className="rounded-xl p-3 flex flex-col gap-2" style={{ background: '#F5F3EE', border: '1px solid #E8E6E0' }}>
                        <div className="flex items-center gap-2">
                          <span className="text-2xl" style={{ filter: 'grayscale(1)', opacity: 0.5 }}>{sello.icono}</span>
                          <p className="text-xs font-bold" style={{ color: '#406768' }}>{sello.nombre}</p>
                        </div>
                        <p className="text-xs" style={{ color: '#D5D3CC' }}>{sello.descripcion}</p>
                        <button
                          onClick={() => setShowSelloModal(sello.key)}
                          className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-opacity hover:opacity-80"
                          style={{ background: '#E8E6E0', color: '#406768' }}
                        >
                          Solicitar verificación
                        </button>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Sello request modal */}
        {showSelloModal && (() => {
          const sello = SELLOS_DISPONIBLES.find(s => s.key === showSelloModal);
          if (!sello) return null;
          return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.5)' }}>
              <div className="rounded-3xl p-6 w-full max-w-md" style={{ background: 'white' }}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{sello.icono}</span>
                    <h3 className="font-bold" style={{ color: '#19350C' }}>Solicitar: {sello.nombre}</h3>
                  </div>
                  <button onClick={() => setShowSelloModal(null)} style={{ color: '#406768' }}><X size={20} /></button>
                </div>
                <div className="rounded-xl p-3 mb-4" style={{ background: sello.bg }}>
                  <p className="text-xs leading-relaxed" style={{ color: sello.color }}><strong>Requisito:</strong> {sello.descripcion}</p>
                </div>
                <div className="flex flex-col gap-4">
                  <div>
                    <label className="block text-xs font-bold mb-1.5" style={{ color: '#406768' }}>Describe brevemente tu proceso</label>
                    <textarea rows={3} placeholder="¿Cómo cumples con este criterio de sostenibilidad?" className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none" style={{ border: '2px solid #E8E6E0', background: '#FAFAFA', color: '#19350C' }} onFocus={el => (el.target.style.borderColor = '#687D31')} onBlur={el => (el.target.style.borderColor = '#E8E6E0')} />
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1.5" style={{ color: '#406768' }}>Evidencia (fotos / documentos PDF — máx. 5)</label>
                    <div className="rounded-xl border-2 border-dashed p-6 text-center" style={{ borderColor: '#D5D3CC', background: '#FAFAFA' }}>
                      <div className="text-2xl mb-2">📎</div>
                      <p className="text-xs font-semibold" style={{ color: '#19350C' }}>Arrastra archivos aquí</p>
                      <p className="text-xs mt-1" style={{ color: '#406768' }}>JPG, PNG, PDF — max 10MB c/u</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 mt-5">
                  <button onClick={() => setShowSelloModal(null)} className="flex-1 py-3 rounded-xl text-sm font-semibold" style={{ background: '#F5F3EE', color: '#406768' }}>Cancelar</button>
                  <button onClick={() => setShowSelloModal(null)} className="flex-1 py-3 rounded-xl text-sm font-bold text-white" style={{ background: '#687D31' }}>Enviar solicitud</button>
                </div>
              </div>
            </div>
          );
        })()}

        {/* Tab: Catálogo */}
        {activeTab === 'catalogo' && (
          PLAN !== 'Premium' ? (
            <div className="rounded-2xl" style={{ background: 'white', boxShadow: '0 2px 12px rgba(25,53,12,0.06)' }}>
              <UpgradeBanner
                mensaje="Publica tu catálogo de productos"
                descripcion="Llega a más consumidores conscientes con tu catálogo completo de productos o servicios."
              />
            </div>
          ) : (
            <div className="rounded-2xl p-6" style={{ background: 'white', boxShadow: '0 2px 12px rgba(25,53,12,0.06)' }}>
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-bold" style={{ color: '#19350C', fontSize: '1.1rem' }}>Catálogo de productos</h2>
                <button
                  onClick={() => setShowAddProduct(true)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
                  style={{ background: '#687D31' }}
                >
                  <Plus size={16} /> Agregar producto
                </button>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {EMP.productos.map(prod => (
                  <div key={prod.id} className="rounded-xl overflow-hidden" style={{ border: '1px solid #E8E6E0' }}>
                    <ImageWithFallback src={prod.imagen} alt={prod.nombre} className="w-full h-32 object-cover" />
                    <div className="p-3">
                      <p className="font-bold text-sm" style={{ color: '#19350C' }}>{prod.nombre}</p>
                      <p className="text-xs mb-1" style={{ color: '#406768' }}>{prod.descripcion}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="font-black" style={{ color: '#FF6B35' }}>Bs. {prod.precio}</span>
                        <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: prod.stock > 10 ? '#F0F5E8' : '#FFF0E8', color: prod.stock > 10 ? '#687D31' : '#FF6B35' }}>
                          {prod.stock} en stock
                        </span>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <button className="flex-1 py-1.5 rounded-lg text-xs font-semibold transition-opacity hover:opacity-80" style={{ background: '#F5F3EE', color: '#406768' }}>Editar</button>
                        <button className="flex-1 py-1.5 rounded-lg text-xs font-semibold transition-opacity hover:opacity-80" style={{ background: '#FFF0E8', color: '#FF6B35' }}>Eliminar</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {showAddProduct && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.5)' }}>
                  <div className="rounded-3xl p-6 w-full max-w-md" style={{ background: 'white' }}>
                    <div className="flex items-center justify-between mb-5">
                      <h3 className="font-bold" style={{ color: '#19350C', fontSize: '1.1rem' }}>Agregar producto</h3>
                      <button onClick={() => setShowAddProduct(false)} style={{ color: '#406768' }}><X size={20} /></button>
                    </div>
                    <div className="flex flex-col gap-4">
                      {['Nombre del producto', 'Descripción', 'Precio (Bs.)', 'Stock inicial'].map(f => (
                        <div key={f}>
                          <label className="block text-xs font-bold mb-1" style={{ color: '#406768' }}>{f}</label>
                          <input
                            type={f.includes('Precio') || f.includes('Stock') ? 'number' : 'text'}
                            className="w-full px-3 py-2.5 rounded-xl text-sm outline-none"
                            style={{ border: '2px solid #E8E6E0', background: '#FAFAFA', color: '#19350C' }}
                            onFocus={el => (el.target.style.borderColor = '#687D31')}
                            onBlur={el => (el.target.style.borderColor = '#E8E6E0')}
                          />
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-3 mt-5">
                      <button onClick={() => setShowAddProduct(false)} className="flex-1 py-3 rounded-xl text-sm font-semibold" style={{ background: '#F5F3EE', color: '#406768' }}>Cancelar</button>
                      <button onClick={() => setShowAddProduct(false)} className="flex-1 py-3 rounded-xl text-sm font-bold text-white" style={{ background: '#687D31' }}>Guardar</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        )}

        {/* Tab: Notificaciones */}
        {activeTab === 'notificaciones' && (
          <div className="rounded-2xl p-6" style={{ background: 'white', boxShadow: '0 2px 12px rgba(25,53,12,0.06)' }}>
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bold" style={{ color: '#19350C', fontSize: '1.1rem' }}>Notificaciones</h2>
              {noLeidasCount > 0 && (
                <button
                  onClick={marcarTodasLeidas}
                  className="text-sm font-semibold transition-opacity hover:opacity-80"
                  style={{ color: '#687D31' }}
                >
                  Marcar todas como leídas
                </button>
              )}
            </div>

            {/* Filtro tabs */}
            <div className="flex gap-1 mb-5 overflow-x-auto pb-1">
              {NOTIF_FILTROS.map(f => (
                <button
                  key={f.key}
                  onClick={() => setNotifFiltro(f.key)}
                  className="px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200"
                  style={{
                    background: notifFiltro === f.key ? '#19350C' : '#F5F3EE',
                    color: notifFiltro === f.key ? 'white' : '#406768',
                  }}
                >
                  {f.label}
                  {f.key === 'no_leidas' && noLeidasCount > 0 && (
                    <span className="ml-1 px-1.5 py-0.5 rounded-full text-xs" style={{ background: '#FF6B35', color: 'white', fontSize: '0.6rem' }}>
                      {noLeidasCount}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Lista */}
            <div className="flex flex-col gap-1">
              {notifsFiltradas.length === 0 ? (
                <div className="text-center py-12 text-sm" style={{ color: '#D5D3CC' }}>No hay notificaciones en esta categoría</div>
              ) : (
                notifsFiltradas.map(notif => {
                  const tipo = NOTIF_TIPOS[notif.tipo];
                  return (
                    <button
                      key={notif.id}
                      onClick={() => marcarLeida(notif.id)}
                      className="flex items-center gap-3 p-4 rounded-xl text-left transition-all duration-200 hover:opacity-90 w-full"
                      style={{ background: notif.leida ? 'transparent' : '#F5F3EE', border: '1px solid #E8E6E0' }}
                    >
                      {/* Indicador no leída */}
                      <div className="flex-shrink-0 w-2">
                        {!notif.leida && (
                          <div className="w-2 h-2 rounded-full" style={{ background: '#687D31' }} />
                        )}
                      </div>
                      {/* Ícono */}
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-lg"
                        style={{ background: tipo.bg }}
                      >
                        {tipo.icono}
                      </div>
                      {/* Texto */}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold" style={{ color: '#19350C' }}>{notif.titulo}</p>
                        <p className="text-xs mt-0.5 truncate" style={{ color: '#406768' }}>{notif.descripcion}</p>
                      </div>
                      {/* Timestamp */}
                      <span className="text-xs flex-shrink-0" style={{ color: '#D5D3CC' }}>{notif.tiempo}</span>
                    </button>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* Tab: Ventas */}
        {activeTab === 'ventas' && (
          PLAN !== 'Premium' ? (
            <div className="rounded-2xl" style={{ background: 'white', boxShadow: '0 2px 12px rgba(25,53,12,0.06)' }}>
              <UpgradeBanner
                mensaje="Gestiona tus ventas e inventario"
                descripcion="Accede a estadísticas completas, control de inventario y métricas de impacto ambiental."
              />
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {/* KPIs */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { icon: <ShoppingBag size={20} />, label: 'Total ventas del mes', value: '283', color: '#687D31', bg: '#F0F5E8' },
                  { icon: <TrendingUp size={20} />, label: 'Ingresos estimados', value: 'Bs. 5,246', color: '#FF6B35', bg: '#FFF0E8' },
                  { icon: <Star size={20} />, label: 'Producto más vendido', value: 'Yogur natural', color: '#406768', bg: '#EEF5F8' },
                  { icon: <Users size={20} />, label: 'Clientes nuevos', value: '47', color: '#6FA9BB', bg: '#E8F3F8' },
                ].map(kpi => (
                  <div key={kpi.label} className="rounded-2xl p-5" style={{ background: 'white', boxShadow: '0 2px 12px rgba(25,53,12,0.06)' }}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: kpi.bg, color: kpi.color }}>{kpi.icon}</div>
                      <p className="text-xs" style={{ color: '#406768' }}>{kpi.label}</p>
                    </div>
                    <p className="font-black" style={{ color: '#19350C', fontSize: '1.4rem' }}>{kpi.value}</p>
                  </div>
                ))}
              </div>

              {/* Charts */}
              <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 rounded-2xl p-5" style={{ background: 'white', boxShadow: '0 2px 12px rgba(25,53,12,0.06)' }}>
                  <h3 className="font-bold mb-4 text-sm" style={{ color: '#19350C' }}>Evolución de ventas — últimos 30 días</h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={VENTAS_DATA}>
                      <XAxis dataKey="dia" tick={{ fontSize: 10, fill: '#406768' }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 10, fill: '#406768' }} axisLine={false} tickLine={false} />
                      <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }} />
                      <Line type="monotone" dataKey="ventas" stroke="#687D31" strokeWidth={2.5} dot={{ fill: '#687D31', r: 4 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="rounded-2xl p-5" style={{ background: 'white', boxShadow: '0 2px 12px rgba(25,53,12,0.06)' }}>
                  <h3 className="font-bold mb-4 text-sm" style={{ color: '#19350C' }}>Distribución por producto</h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie data={CATEGORIA_DATA} cx="50%" cy="50%" outerRadius={70} dataKey="value" label={({ value }) => `${value}%`} labelLine={false}>
                        {CATEGORIA_DATA.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="flex flex-col gap-1 mt-2">
                    {CATEGORIA_DATA.map((d, i) => (
                      <div key={d.name} className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: PIE_COLORS[i] }} />
                        <span className="text-xs" style={{ color: '#406768' }}>{d.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Ventas por producto */}
              <div className="rounded-2xl p-5" style={{ background: 'white', boxShadow: '0 2px 12px rgba(25,53,12,0.06)' }}>
                <h3 className="font-bold mb-4 text-sm" style={{ color: '#19350C' }}>Ventas por producto</h3>
                <ResponsiveContainer width="100%" height={160}>
                  <BarChart data={PRODUCTOS_DATA} layout="vertical">
                    <XAxis type="number" tick={{ fontSize: 10, fill: '#406768' }} axisLine={false} tickLine={false} />
                    <YAxis dataKey="nombre" type="category" tick={{ fontSize: 10, fill: '#406768' }} axisLine={false} tickLine={false} width={90} />
                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none' }} />
                    <Bar dataKey="ventas" fill="#687D31" radius={[0, 6, 6, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Inventario */}
              <div className="rounded-2xl p-5" style={{ background: 'white', boxShadow: '0 2px 12px rgba(25,53,12,0.06)' }}>
                <h3 className="font-bold mb-4 text-sm" style={{ color: '#19350C' }}>Inventario</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr style={{ color: '#406768', fontSize: '0.75rem' }}>
                        <th className="text-left py-2 px-3">Producto</th>
                        <th className="text-center py-2 px-3">Stock actual</th>
                        <th className="text-center py-2 px-3">Vendidos</th>
                        <th className="text-center py-2 px-3">Estado</th>
                        <th className="text-center py-2 px-3">Ajustar</th>
                      </tr>
                    </thead>
                    <tbody>
                      {EMP.productos.map(prod => {
                        const s = stock[prod.id] ?? prod.stock;
                        const estado = s === 0 ? 'Agotado' : s < 10 ? 'Bajo stock' : 'En stock';
                        const estadoColor = estado === 'Agotado' ? '#FF6B35' : estado === 'Bajo stock' ? '#D97706' : '#687D31';
                        return (
                          <tr key={prod.id} className="border-t" style={{ borderColor: '#F0F0EE' }}>
                            <td className="py-3 px-3">
                              <div className="flex items-center gap-2">
                                <ImageWithFallback src={prod.imagen} alt="" className="w-8 h-8 rounded-lg object-cover" />
                                <span className="font-medium" style={{ color: '#19350C' }}>{prod.nombre}</span>
                              </div>
                            </td>
                            <td className="text-center py-3 px-3 font-bold" style={{ color: '#19350C' }}>{s}</td>
                            <td className="text-center py-3 px-3" style={{ color: '#406768' }}>{prod.vendidos}</td>
                            <td className="text-center py-3 px-3">
                              <span className="px-2 py-1 rounded-full text-xs font-semibold" style={{ background: estadoColor + '20', color: estadoColor }}>
                                {estado}
                              </span>
                            </td>
                            <td className="text-center py-3 px-3">
                              <div className="flex items-center justify-center gap-2">
                                <button
                                  onClick={() => setStock(prev => ({ ...prev, [prod.id]: Math.max(0, (prev[prod.id] ?? prod.stock) - 1) }))}
                                  className="w-7 h-7 rounded-full flex items-center justify-center transition-opacity hover:opacity-80"
                                  style={{ background: '#F5F3EE', color: '#406768' }}
                                >–</button>
                                <button
                                  onClick={() => setStock(prev => ({ ...prev, [prod.id]: (prev[prod.id] ?? prod.stock) + 1 }))}
                                  className="w-7 h-7 rounded-full flex items-center justify-center transition-opacity hover:opacity-80"
                                  style={{ background: '#687D31', color: 'white' }}
                                >+</button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Impacto ambiental */}
              <div className="rounded-2xl p-5" style={{ background: 'white', boxShadow: '0 2px 12px rgba(25,53,12,0.06)' }}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-sm" style={{ color: '#19350C' }}>Tu impacto hasta hoy</h3>
                  <button className="text-xs px-3 py-1.5 rounded-full font-semibold text-white" style={{ background: '#687D31' }}>
                    Comparte tu impacto 🌍
                  </button>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { icon: '💧', valor: '2,840', desc: 'litros de agua ahorrados' },
                    { icon: '♻️', valor: '14.4 kg', desc: 'de plástico evitados' },
                    { icon: '🌱', valor: '108 kg', desc: 'de CO₂ no emitidos' },
                    { icon: '🛍️', valor: '283', desc: 'pedidos conscientes procesados' },
                  ].map(m => (
                    <div key={m.desc} className="rounded-xl p-4 text-center" style={{ background: '#F0F5E8' }}>
                      <div className="text-3xl mb-2">{m.icon}</div>
                      <p className="font-black text-lg" style={{ color: '#19350C' }}>{m.valor}</p>
                      <p className="text-xs mt-1" style={{ color: '#406768' }}>{m.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Asesorías */}
              <div className="rounded-2xl p-5" style={{ background: 'white', boxShadow: '0 2px 12px rgba(25,53,12,0.06)' }}>
                <h3 className="font-bold mb-4 text-sm" style={{ color: '#19350C' }}>Asesorías disponibles</h3>
                <div className="grid sm:grid-cols-3 gap-4">
                  {[
                    { icon: '📣', label: 'Marketing sostenible', color: '#FF6B35' },
                    { icon: '💰', label: 'Finanzas', color: '#687D31' },
                    { icon: '⚙️', label: 'Gestión operativa', color: '#406768' },
                  ].map(a => (
                    <div key={a.label} className="rounded-xl p-4 text-center" style={{ background: '#F5F3EE', border: '1px solid #E8E6E0' }}>
                      <div className="text-3xl mb-2">{a.icon}</div>
                      <p className="font-semibold text-sm mb-3" style={{ color: '#19350C' }}>{a.label}</p>
                      <button
                        className="px-4 py-2 rounded-xl text-xs font-semibold text-white transition-opacity hover:opacity-90"
                        style={{ background: a.color }}
                      >
                        Agendar asesoría
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
