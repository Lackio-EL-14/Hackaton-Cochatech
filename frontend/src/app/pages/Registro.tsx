import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Check, Upload, Eye, EyeOff, Rocket } from 'lucide-react';

const STEPS = ['Info básica', 'Ubicación', 'Perfil sostenible', 'Acceso'];

const ACTIVIDADES = [
  { key: 'reciclados', label: 'Uso de materiales reciclados', icon: '♻️' },
  { key: 'local', label: 'Producción local', icon: '📍' },
  { key: 'packaging', label: 'Packaging biodegradable', icon: '🌿' },
  { key: 'energia', label: 'Energía renovable', icon: '☀️' },
  { key: 'justo', label: 'Comercio justo', icon: '🤝' },
  { key: 'residuos', label: 'Cero residuos', icon: '🚫' },
];

const BENEFICIOS = [
  { key: 'agua', label: 'Ahorra agua', icon: '💧' },
  { key: 'plastico', label: 'Reduce plástico', icon: '♻️' },
  { key: 'quimicos', label: 'Sin químicos', icon: '🌿' },
  { key: 'carbono', label: 'Reduce huella de carbono', icon: '🌍' },
  { key: 'comunidad', label: 'Apoyo comunitario', icon: '🤝' },
  { key: 'animales', label: 'Amigable con animales', icon: '🐾' },
  { key: 'circular', label: 'Economía circular', icon: '💚' },
];

const CATEGORIAS_SELECT = [
  'Alimentos y bebidas', 'Artesanías', 'Cosmética natural',
  'Para el hogar', 'Para las mascotas', 'Bisutería y accesorios',
  'Cuidado personal', 'Papelería', 'Servicios Vive y Aprende',
];

const DIAS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

export default function Registro() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [actividades, setActividades] = useState<string[]>([]);
  const [beneficios, setBeneficios] = useState<string[]>([]);
  const [reduceMateriales, setReduceMateriales] = useState<string>('');
  const [resuelveProblematica, setResuelveProblematica] = useState<string>('');
  const [tipoNegocio, setTipoNegocio] = useState<string>('Producto');
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [password, setPassword] = useState('');
  const [diasActivos, setDiasActivos] = useState<string[]>(['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes']);
  const [dragOver, setDragOver] = useState(false);
  const [previewImg, setPreviewImg] = useState<string | null>(null);

  const pwStrength = password.length === 0 ? 0 : password.length < 6 ? 1 : password.length < 10 ? 2 : 3;
  const pwColors = ['#E8E6E0', '#FF6B35', '#FF6B35', '#687D31'];
  const pwLabels = ['', 'Débil', 'Regular', 'Fuerte'];

  const InputField = ({ label, placeholder, type = 'text', required = false }: { label: string; placeholder: string; type?: string; required?: boolean }) => (
    <div>
      <label className="block text-sm font-semibold mb-1.5" style={{ color: '#19350C' }}>{label}{required && <span style={{ color: '#FF6B35' }}> *</span>}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
        style={{ border: '2px solid #E8E6E0', background: '#FAFAFA', color: '#19350C' }}
        onFocus={el => (el.target.style.borderColor = '#687D31')}
        onBlur={el => (el.target.style.borderColor = '#E8E6E0')}
      />
    </div>
  );

  const handleNext = () => { if (step < 3) setStep(step + 1); else navigate('/gestion'); };
  const handleBack = () => { if (step > 0) setStep(step - 1); };

  return (
    <div className="min-h-screen py-12 px-4" style={{ background: '#F5F3EE' }}>
      <div className="max-w-2xl mx-auto">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="flex items-center justify-center w-9 h-9 rounded-xl" style={{ background: 'linear-gradient(135deg,#19350C,#687D31)' }}>
            <Rocket size={18} style={{ color: '#FF6B35' }} />
          </div>
          <span style={{ fontWeight: 800, fontSize: '1.3rem' }}>
            <span style={{ color: '#19350C' }}>Yo</span>
            <span style={{ color: '#687D31' }}> Impulso</span>
          </span>
        </div>

        {/* Stepper */}
        <div className="flex items-center gap-0 mb-8">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center flex-1">
              <div className="flex flex-col items-center gap-1.5">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300"
                  style={{
                    background: i < step ? '#687D31' : i === step ? '#19350C' : '#E8E6E0',
                    color: i <= step ? 'white' : '#406768',
                  }}
                >
                  {i < step ? <Check size={14} /> : i + 1}
                </div>
                <span className="text-xs font-semibold hidden sm:block" style={{ color: i === step ? '#19350C' : '#406768' }}>{s}</span>
              </div>
              {i < STEPS.length - 1 && (
                <div className="flex-1 h-0.5 mx-1" style={{ background: i < step ? '#687D31' : '#E8E6E0' }} />
              )}
            </div>
          ))}
        </div>

        {/* Card */}
        <div className="rounded-3xl p-8" style={{ background: 'white', boxShadow: '0 8px 48px rgba(25,53,12,0.10)' }}>
          {/* Step 0: Info básica */}
          {step === 0 && (
            <div className="flex flex-col gap-5">
              <h2 style={{ color: '#19350C', fontWeight: 800, fontSize: '1.4rem' }}>📝 Información básica</h2>
              <InputField label="Nombre del emprendimiento" placeholder="Ej: Alma de Rosa" required />
              <div className="grid grid-cols-2 gap-4">
                <InputField label="Nombres del emprendedor" placeholder="María" required />
                <InputField label="Apellidos" placeholder="Quispe" required />
              </div>
              <InputField label="Correo del emprendimiento" placeholder="contacto@marca.com" type="email" required />
              <InputField label="Teléfono / Celular" placeholder="+591 7XXXXXXX" type="tel" required />

              <div>
                <label className="block text-sm font-semibold mb-1.5" style={{ color: '#19350C' }}>Descripción detallada <span style={{ color: '#FF6B35' }}>*</span></label>
                <textarea
                  rows={4}
                  placeholder="Cuéntanos sobre tu emprendimiento, qué lo hace especial y sostenible…"
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200 resize-none"
                  style={{ border: '2px solid #E8E6E0', background: '#FAFAFA', color: '#19350C' }}
                  onFocus={el => (el.target.style.borderColor = '#687D31')}
                  onBlur={el => (el.target.style.borderColor = '#E8E6E0')}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1.5" style={{ color: '#19350C' }}>Categoría <span style={{ color: '#FF6B35' }}>*</span></label>
                <select
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none appearance-none cursor-pointer"
                  style={{ border: '2px solid #E8E6E0', background: '#FAFAFA', color: '#19350C' }}
                  onFocus={el => (el.target.style.borderColor = '#687D31')}
                  onBlur={el => (el.target.style.borderColor = '#E8E6E0')}
                >
                  <option value="">Selecciona una categoría</option>
                  {CATEGORIAS_SELECT.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: '#19350C' }}>Tipo de oferta <span style={{ color: '#FF6B35' }}>*</span></label>
                <div className="flex gap-3">
                  {['Producto', 'Servicio'].map(t => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTipoNegocio(t)}
                      className="flex-1 py-3 rounded-xl text-sm font-semibold transition-all duration-200"
                      style={{
                        background: tipoNegocio === t ? '#19350C' : '#F5F3EE',
                        color: tipoNegocio === t ? 'white' : '#406768',
                        border: `2px solid ${tipoNegocio === t ? '#19350C' : '#E8E6E0'}`,
                      }}
                    >
                      {t === 'Producto' ? '🛍️' : '⚙️'} {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Upload */}
              <div>
                <label className="block text-sm font-semibold mb-1.5" style={{ color: '#19350C' }}>Logo / Imagen de presentación</label>
                <div
                  className="rounded-xl border-2 border-dashed p-8 text-center cursor-pointer transition-all duration-200"
                  style={{
                    borderColor: dragOver ? '#687D31' : '#D5D3CC',
                    background: dragOver ? '#F0F5E8' : '#FAFAFA',
                  }}
                  onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={e => {
                    e.preventDefault(); setDragOver(false);
                    const file = e.dataTransfer.files[0];
                    if (file) setPreviewImg(URL.createObjectURL(file));
                  }}
                >
                  {previewImg ? (
                    <div className="flex flex-col items-center gap-2">
                      <img src={previewImg} alt="Preview" className="w-20 h-20 rounded-xl object-cover" />
                      <button onClick={() => setPreviewImg(null)} className="text-xs" style={{ color: '#FF6B35' }}>✕ Quitar</button>
                    </div>
                  ) : (
                    <>
                      <Upload size={28} className="mx-auto mb-2" style={{ color: '#687D31' }} />
                      <p className="text-sm font-semibold" style={{ color: '#19350C' }}>Arrastra tu imagen aquí</p>
                      <p className="text-xs mt-1" style={{ color: '#406768' }}>o haz clic para seleccionar (JPG, PNG, max 5MB)</p>
                    </>
                  )}
                </div>
              </div>

              {/* Redes sociales */}
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: '#19350C' }}>Redes sociales</label>
                <div className="flex flex-col gap-2">
                  {[
                    { label: '📸 Instagram', placeholder: '@tu_marca' },
                    { label: '🎵 TikTok', placeholder: '@tu_marca' },
                    { label: '👥 Facebook', placeholder: 'tu.marca.bo' },
                  ].map(r => (
                    <div key={r.label} className="flex items-center gap-2">
                      <span className="w-28 text-xs font-semibold" style={{ color: '#406768' }}>{r.label}</span>
                      <input
                        type="text"
                        placeholder={r.placeholder}
                        className="flex-1 px-3 py-2 rounded-lg text-sm outline-none transition-all duration-200"
                        style={{ border: '1.5px solid #E8E6E0', background: '#FAFAFA', color: '#19350C' }}
                        onFocus={el => (el.target.style.borderColor = '#687D31')}
                        onBlur={el => (el.target.style.borderColor = '#E8E6E0')}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Horarios */}
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: '#19350C' }}>Horarios de atención</label>
                <div className="flex flex-col gap-2">
                  {DIAS.map(dia => (
                    <div key={dia} className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setDiasActivos(prev => prev.includes(dia) ? prev.filter(d => d !== dia) : [...prev, dia])}
                        className="w-20 text-xs py-1.5 rounded-lg font-semibold transition-all duration-200"
                        style={{
                          background: diasActivos.includes(dia) ? '#687D31' : '#F5F3EE',
                          color: diasActivos.includes(dia) ? 'white' : '#406768',
                          border: `1px solid ${diasActivos.includes(dia) ? '#687D31' : '#E8E6E0'}`,
                        }}
                      >
                        {dia.slice(0, 3)}
                      </button>
                      {diasActivos.includes(dia) && (
                        <div className="flex items-center gap-2">
                          <input type="time" defaultValue="09:00" className="text-xs px-2 py-1.5 rounded-lg outline-none" style={{ border: '1px solid #E8E6E0', color: '#19350C' }} />
                          <span className="text-xs" style={{ color: '#406768' }}>–</span>
                          <input type="time" defaultValue="18:00" className="text-xs px-2 py-1.5 rounded-lg outline-none" style={{ border: '1px solid #E8E6E0', color: '#19350C' }} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 1: Ubicación */}
          {step === 1 && (
            <div className="flex flex-col gap-5">
              <h2 style={{ color: '#19350C', fontWeight: 800, fontSize: '1.4rem' }}>📍 Ubicación</h2>
              <p className="text-sm" style={{ color: '#406768' }}>Arrastra el pin para marcar la ubicación exacta de tu emprendimiento.</p>
              {/* Mock map */}
              <div
                className="rounded-2xl overflow-hidden relative"
                style={{ height: '320px', background: 'linear-gradient(160deg,#B8D4C0,#9DBFB0)' }}
              >
                <svg width="100%" height="100%" viewBox="0 0 600 320" preserveAspectRatio="xMidYMid slice">
                  <path d="M50 160 Q200 140 300 160 Q420 180 550 160" stroke="white" strokeWidth="3" fill="none" opacity="0.5" />
                  <path d="M300 30 Q295 130 300 220 Q305 270 300 310" stroke="white" strokeWidth="2.5" fill="none" opacity="0.5" />
                  {[...Array(15)].map((_, i) => (
                    <rect key={i} x={80 + (i % 5) * 100} y={60 + Math.floor(i / 5) * 80} width={55} height={38} rx="4" fill="white" opacity="0.12" />
                  ))}
                  <text x="270" y="168" fill="#19350C" fontSize="16" fontWeight="bold" opacity="0.7">Cochabamba</text>
                </svg>
                {/* Draggable pin (static mock) */}
                <div className="absolute" style={{ left: '50%', top: '45%', transform: 'translate(-50%,-100%)' }}>
                  <div className="flex flex-col items-center cursor-grab active:cursor-grabbing">
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
                  <label className="block text-sm font-semibold mb-1.5" style={{ color: '#19350C' }}>Latitud</label>
                  <input type="text" defaultValue="-17.3895" readOnly className="w-full px-4 py-3 rounded-xl text-sm" style={{ border: '2px solid #E8E6E0', background: '#F5F3EE', color: '#406768' }} />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1.5" style={{ color: '#19350C' }}>Longitud</label>
                  <input type="text" defaultValue="-66.1568" readOnly className="w-full px-4 py-3 rounded-xl text-sm" style={{ border: '2px solid #E8E6E0', background: '#F5F3EE', color: '#406768' }} />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Sostenibilidad */}
          {step === 2 && (
            <div className="flex flex-col gap-6">
              <h2 style={{ color: '#19350C', fontWeight: 800, fontSize: '1.4rem' }}>🌿 Perfil sostenible</h2>

              <div>
                <label className="block text-sm font-semibold mb-3" style={{ color: '#19350C' }}>Actividades de producción sostenibles</label>
                <div className="grid grid-cols-2 gap-2">
                  {ACTIVIDADES.map(a => (
                    <button
                      key={a.key}
                      type="button"
                      onClick={() => setActividades(prev => prev.includes(a.key) ? prev.filter(k => k !== a.key) : [...prev, a.key])}
                      className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-left text-xs font-semibold transition-all duration-200"
                      style={{
                        background: actividades.includes(a.key) ? '#F0F5E8' : '#F5F3EE',
                        border: `2px solid ${actividades.includes(a.key) ? '#687D31' : '#E8E6E0'}`,
                        color: actividades.includes(a.key) ? '#19350C' : '#406768',
                      }}
                    >
                      {actividades.includes(a.key) && <Check size={12} style={{ color: '#687D31', flexShrink: 0 }} />}
                      <span>{a.icon}</span> {a.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-3" style={{ color: '#19350C' }}>¿Reduce materiales o empaques no biodegradables?</label>
                <div className="flex gap-2">
                  {['Sí', 'No', 'En proceso'].map(opt => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setReduceMateriales(opt)}
                      className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
                      style={{
                        background: reduceMateriales === opt ? (opt === 'Sí' ? '#687D31' : opt === 'No' ? '#FF6B35' : '#6FA9BB') : '#F5F3EE',
                        color: reduceMateriales === opt ? 'white' : '#406768',
                        border: `2px solid ${reduceMateriales === opt ? 'transparent' : '#E8E6E0'}`,
                      }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-3" style={{ color: '#19350C' }}>¿Resuelve problemática ambiental o social específica?</label>
                <div className="flex gap-2">
                  {['Sí', 'No'].map(opt => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setResuelveProblematica(opt)}
                      className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
                      style={{
                        background: resuelveProblematica === opt ? (opt === 'Sí' ? '#687D31' : '#FF6B35') : '#F5F3EE',
                        color: resuelveProblematica === opt ? 'white' : '#406768',
                        border: `2px solid ${resuelveProblematica === opt ? 'transparent' : '#E8E6E0'}`,
                      }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1" style={{ color: '#19350C' }}>
                  Beneficios del producto/servicio <span style={{ color: '#FF6B35' }}>*</span>
                </label>
                <p className="text-xs mb-3" style={{ color: '#406768' }}>Selecciona al menos 1 beneficio — esto define tu Perfil Verde</p>
                {beneficios.length === 0 && (
                  <p className="text-xs mb-2 px-3 py-2 rounded-lg" style={{ background: '#FFF0E8', color: '#FF6B35', border: '1px solid rgba(255,107,53,0.3)' }}>
                    ⚠️ Debes seleccionar al menos 1 beneficio
                  </p>
                )}
                <div className="flex flex-wrap gap-2">
                  {BENEFICIOS.map(b => (
                    <button
                      key={b.key}
                      type="button"
                      onClick={() => setBeneficios(prev => prev.includes(b.key) ? prev.filter(k => k !== b.key) : [...prev, b.key])}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold transition-all duration-200"
                      style={{
                        background: beneficios.includes(b.key) ? '#687D31' : '#F5F3EE',
                        color: beneficios.includes(b.key) ? 'white' : '#406768',
                        border: `1.5px solid ${beneficios.includes(b.key) ? '#687D31' : '#E8E6E0'}`,
                      }}
                    >
                      {b.icon} {b.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Acceso */}
          {step === 3 && (
            <div className="flex flex-col gap-5">
              <h2 style={{ color: '#19350C', fontWeight: 800, fontSize: '1.4rem' }}>🔐 Acceso a tu cuenta</h2>

              <div>
                <label className="block text-sm font-semibold mb-1.5" style={{ color: '#19350C' }}>Contraseña <span style={{ color: '#FF6B35' }}>*</span></label>
                <div className="relative">
                  <input
                    type={showPass ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Mínimo 8 caracteres"
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200 pr-12"
                    style={{ border: '2px solid #E8E6E0', background: '#FAFAFA', color: '#19350C' }}
                    onFocus={el => (el.target.style.borderColor = '#687D31')}
                    onBlur={el => (el.target.style.borderColor = '#E8E6E0')}
                  />
                  <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: '#406768' }}>
                    {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {/* Strength indicator */}
                {password.length > 0 && (
                  <div className="mt-2 flex items-center gap-2">
                    <div className="flex gap-1 flex-1">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="flex-1 h-1.5 rounded-full transition-all duration-300" style={{ background: i <= pwStrength ? pwColors[pwStrength] : '#E8E6E0' }} />
                      ))}
                    </div>
                    <span className="text-xs font-semibold" style={{ color: pwColors[pwStrength] }}>{pwLabels[pwStrength]}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1.5" style={{ color: '#19350C' }}>Confirmar contraseña <span style={{ color: '#FF6B35' }}>*</span></label>
                <div className="relative">
                  <input
                    type={showConfirm ? 'text' : 'password'}
                    placeholder="Repite tu contraseña"
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200 pr-12"
                    style={{ border: '2px solid #E8E6E0', background: '#FAFAFA', color: '#19350C' }}
                    onFocus={el => (el.target.style.borderColor = '#687D31')}
                    onBlur={el => (el.target.style.borderColor = '#E8E6E0')}
                  />
                  <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: '#406768' }}>
                    {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <label className="flex items-start gap-3 cursor-pointer">
                <div className="mt-0.5 w-5 h-5 rounded flex items-center justify-center flex-shrink-0" style={{ background: '#687D31', border: '2px solid #687D31' }}>
                  <Check size={12} className="text-white" />
                </div>
                <span className="text-sm" style={{ color: '#406768' }}>
                  Acepto los{' '}
                  <a href="#" style={{ color: '#687D31', fontWeight: 600 }}>términos y condiciones</a>
                  {' '}y la{' '}
                  <a href="#" style={{ color: '#687D31', fontWeight: 600 }}>política de privacidad</a>
                  {' '}de Yo Impulso.
                </span>
              </label>
            </div>
          )}

          {/* Navigation */}
          <div className="flex gap-3 mt-8">
            {step > 0 && (
              <button
                onClick={handleBack}
                className="flex-1 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:opacity-80"
                style={{ background: '#F5F3EE', color: '#406768', border: '2px solid #E8E6E0' }}
              >
                ← Anterior
              </button>
            )}
            <button
              onClick={handleNext}
              className="flex-1 py-3.5 rounded-xl text-sm font-bold text-white transition-all duration-200 hover:opacity-90"
              style={{ background: step === 3 ? '#19350C' : '#687D31' }}
            >
              {step === 3 ? '🚀 Registrar mi emprendimiento' : 'Siguiente →'}
            </button>
          </div>
        </div>

        <p className="text-center mt-5 text-xs" style={{ color: '#406768' }}>
          ¿Ya tienes cuenta?{' '}
          <Link to="/login" className="font-semibold hover:opacity-80" style={{ color: '#687D31' }}>
            Iniciar sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
