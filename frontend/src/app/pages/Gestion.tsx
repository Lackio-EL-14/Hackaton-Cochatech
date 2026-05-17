import { useState } from 'react';
import { Link } from 'react-router';
import { Edit, Package, Inbox, BarChart2, Plus, X, ShoppingBag, TrendingUp, Users, Star, Lock } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { EMPRENDIMIENTOS } from '../data/emprendimientos';
import { TurtleMascot } from '../components/TurtleMascot';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

const EMP = EMPRENDIMIENTOS[0]; // Yoghi Probit (Premium)
const PLAN: 'Gratis' | 'Premium' = 'Premium';

const TABS = [
  { key: 'perfil', label: 'Editar perfil', icon: <Edit size={16} /> },
  { key: 'catalogo', label: 'Catálogo', icon: <Package size={16} /> },
  { key: 'bandeja', label: 'Bandeja de entrada', icon: <Inbox size={16} /> },
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

const MENSAJES = [
  {
    id: 'm1', tipo: 'compra', nombre: 'Valentina S.',
    avatar: '👩', mensaje: 'Quiero 3 yogures naturales', tiempo: 'hace 10 min',
    leido: false, producto: 'Yogur natural 500g', cantidad: 3, total: 54, estado: 'Pendiente',
  },
  {
    id: 'm2', tipo: 'admin', nombre: 'Admin Yo Impulso',
    avatar: '🛡️', mensaje: 'Tu perfil ha sido verificado correctamente.', tiempo: 'hace 2h',
    leido: true,
  },
  {
    id: 'm3', tipo: 'compra', nombre: 'Carlos M.',
    avatar: '👨', mensaje: 'Solicito el combo familiar', tiempo: 'hace 1 día',
    leido: true, producto: 'Combo familiar x3', cantidad: 2, total: 110, estado: 'Confirmado',
  },
];

function UpgradeBanner({ mensaje, descripcion }: { mensaje: string; descripcion: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-8 text-center">
      <TurtleMascot size={130} variant="chart" className="mb-4" />
      <div className="flex items-center gap-2 mb-3">
        <Lock size={18} style={{ color: '#FF6B35' }} />
        <h3 style={{ color: '#19350C', fontWeight: 800, fontSize: '1.2rem' }}>Solo Plan Premium</h3>
      </div>
      <p className="mb-2 font-bold" style={{ color: '#19350C' }}>{mensaje}</p>
      <p className="text-sm mb-6 max-w-sm" style={{ color: '#406768' }}>{descripcion}</p>
      <div className="flex flex-col gap-2 text-sm text-left mb-6 w-full max-w-xs">
        {['Catálogo de productos ilimitado', 'Bandeja de pedidos', 'Estadísticas de ventas', 'Asesorías personalizadas'].map(b => (
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
  const [selectedMsg, setSelectedMsg] = useState<typeof MENSAJES[0] | null>(MENSAJES[0]);
  const [stock, setStock] = useState<Record<string, number>>({ p1: 45, p2: 30, p3: 15 });
  const [showAddProduct, setShowAddProduct] = useState(false);

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
          <span
            className="px-4 py-2 rounded-full text-sm font-bold"
            style={{
              background: PLAN === 'Premium' ? '#FF6B35' : 'rgba(255,255,255,0.15)',
              color: 'white',
            }}
          >
            {PLAN === 'Premium' ? '⭐ Plan Premium' : 'Plan Gratuito'}
          </span>
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
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-200 flex-1 justify-center"
              style={{
                background: activeTab === tab.key ? '#19350C' : 'transparent',
                color: activeTab === tab.key ? 'white' : '#406768',
              }}
            >
              {tab.icon} {tab.label}
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
            <button
              className="mt-6 px-8 py-3 rounded-xl font-bold text-white transition-all duration-200 hover:opacity-90"
              style={{ background: '#687D31' }}
            >
              Guardar cambios
            </button>
          </div>
        )}

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

              {/* Add product modal */}
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

        {/* Tab: Bandeja */}
        {activeTab === 'bandeja' && (
          PLAN !== 'Premium' ? (
            <div className="rounded-2xl" style={{ background: 'white', boxShadow: '0 2px 12px rgba(25,53,12,0.06)' }}>
              <UpgradeBanner
                mensaje="Recibe solicitudes de compra directas"
                descripcion="Gestiona pedidos y comunicaciones desde un solo lugar con el Plan Premium."
              />
            </div>
          ) : (
            <div className="rounded-2xl overflow-hidden" style={{ background: 'white', boxShadow: '0 2px 12px rgba(25,53,12,0.06)' }}>
              <div className="flex h-[600px]">
                {/* Lista */}
                <div className="w-72 flex-shrink-0 border-r overflow-y-auto" style={{ borderColor: '#E8E6E0' }}>
                  <div className="p-4 border-b" style={{ borderColor: '#E8E6E0' }}>
                    <h3 className="font-bold text-sm" style={{ color: '#19350C' }}>Mensajes</h3>
                  </div>
                  {MENSAJES.map(msg => (
                    <button
                      key={msg.id}
                      onClick={() => setSelectedMsg(msg)}
                      className="w-full flex items-start gap-3 p-4 border-b text-left transition-all duration-200 hover:opacity-90"
                      style={{
                        borderColor: '#E8E6E0',
                        background: selectedMsg?.id === msg.id ? '#F0F5E8' : 'transparent',
                      }}
                    >
                      <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-xl" style={{ background: msg.tipo === 'admin' ? '#19350C' : '#F5F3EE' }}>
                        {msg.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <p className="text-sm font-semibold truncate" style={{ color: '#19350C' }}>{msg.nombre}</p>
                          {!msg.leido && <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: '#687D31' }} />}
                        </div>
                        {msg.tipo === 'admin' && (
                          <span className="text-xs px-1.5 py-0.5 rounded" style={{ background: '#19350C', color: 'white' }}>Admin</span>
                        )}
                        {msg.tipo === 'compra' && (
                          <span className="text-xs px-1.5 py-0.5 rounded" style={{ background: '#F0F5E8', color: '#687D31' }}>🛒 Pedido</span>
                        )}
                        <p className="text-xs mt-0.5 truncate" style={{ color: '#406768' }}>{msg.mensaje}</p>
                        <p className="text-xs mt-0.5" style={{ color: '#D5D3CC' }}>{msg.tiempo}</p>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Detalle */}
                {selectedMsg ? (
                  <div className="flex-1 flex flex-col">
                    <div className="p-4 border-b flex items-center gap-3" style={{ borderColor: '#E8E6E0' }}>
                      <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl" style={{ background: '#F5F3EE' }}>
                        {selectedMsg.avatar}
                      </div>
                      <div>
                        <p className="font-bold text-sm" style={{ color: '#19350C' }}>{selectedMsg.nombre}</p>
                        <p className="text-xs" style={{ color: '#406768' }}>{selectedMsg.tiempo}</p>
                      </div>
                    </div>
                    <div className="flex-1 p-5 overflow-y-auto">
                      {selectedMsg.tipo === 'compra' && (
                        <div className="rounded-2xl p-4 mb-4" style={{ background: '#F5F3EE', border: '1px solid #E8E6E0' }}>
                          <p className="text-xs font-bold mb-2" style={{ color: '#687D31' }}>🛒 SOLICITUD DE COMPRA</p>
                          <p className="text-sm font-bold mb-1" style={{ color: '#19350C' }}>{selectedMsg.producto}</p>
                          <div className="flex gap-4 text-xs" style={{ color: '#406768' }}>
                            <span>Cantidad: <strong>{selectedMsg.cantidad}</strong></span>
                            <span>Total: <strong style={{ color: '#FF6B35' }}>Bs. {selectedMsg.total}</strong></span>
                          </div>
                          <div className="flex gap-2 mt-3">
                            <span
                              className="px-2 py-1 rounded-full text-xs font-bold"
                              style={{
                                background: selectedMsg.estado === 'Pendiente' ? '#FFF3CD' : '#F0F5E8',
                                color: selectedMsg.estado === 'Pendiente' ? '#D97706' : '#687D31',
                              }}
                            >
                              {selectedMsg.estado}
                            </span>
                          </div>
                          <div className="flex gap-2 mt-3">
                            <button className="px-4 py-2 rounded-xl text-xs font-semibold text-white transition-opacity hover:opacity-90" style={{ background: '#687D31' }}>Confirmar</button>
                            <button className="px-4 py-2 rounded-xl text-xs font-semibold text-white flex items-center gap-1 transition-opacity hover:opacity-90" style={{ background: '#25D366' }}>
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/></svg>
                              Responder por WA
                            </button>
                          </div>
                        </div>
                      )}
                      <div className={`flex ${selectedMsg.tipo === 'admin' ? 'justify-start' : 'justify-end'}`}>
                        <div
                          className="max-w-xs px-4 py-3 rounded-2xl text-sm"
                          style={{
                            background: selectedMsg.tipo === 'admin' ? '#F5F3EE' : '#E8F0D8',
                            color: '#19350C',
                          }}
                        >
                          {selectedMsg.mensaje}
                        </div>
                      </div>
                    </div>
                    <div className="p-4 border-t flex gap-2" style={{ borderColor: '#E8E6E0' }}>
                      <input
                        type="text"
                        placeholder="Escribe tu respuesta…"
                        className="flex-1 px-4 py-2.5 rounded-xl text-sm outline-none"
                        style={{ border: '2px solid #E8E6E0', background: '#FAFAFA', color: '#19350C' }}
                        onFocus={el => (el.target.style.borderColor = '#687D31')}
                        onBlur={el => (el.target.style.borderColor = '#E8E6E0')}
                      />
                      <button className="px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90" style={{ background: '#687D31' }}>
                        Enviar
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 flex items-center justify-center" style={{ color: '#D5D3CC' }}>
                    <p className="text-sm">Selecciona un mensaje</p>
                  </div>
                )}
              </div>
            </div>
          )
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
                      <Pie data={CATEGORIA_DATA} cx="50%" cy="50%" outerRadius={70} dataKey="value" label={({ name, value }) => `${value}%`} labelLine={false}>
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
