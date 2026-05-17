import { useState } from 'react';
import { useParams, Link } from 'react-router';
import { ChevronLeft, Clock, MapPin, MessageCircle, ShoppingCart, Plus, Minus, Facebook, Instagram, Star } from 'lucide-react';
import { EMPRENDIMIENTOS } from '../data/emprendimientos';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export default function PerfilEmprendimiento() {
  const { id } = useParams();
  const e = EMPRENDIMIENTOS.find(emp => emp.id === id);
  const [cart, setCart] = useState<{ [key: string]: number }>({});
  const [activeImg, setActiveImg] = useState(0);

  if (!e) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4" style={{ background: '#F5F3EE' }}>
        <div className="text-5xl">🌿</div>
        <h2 style={{ color: '#19350C', fontWeight: 800 }}>Emprendimiento no encontrado</h2>
        <Link to="/emprendimientos" className="px-5 py-2 rounded-xl text-sm font-semibold text-white" style={{ background: '#687D31' }}>
          Ver todos
        </Link>
      </div>
    );
  }

  const images = [e.imagen, ...e.productos.map(p => p.imagen)].slice(0, 5);
  const cartTotal = Object.entries(cart).reduce((sum, [pid, qty]) => {
    const prod = e.productos.find(p => p.id === pid);
    return sum + (prod ? prod.precio * qty : 0);
  }, 0);
  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);

  const addToCart = (pid: string) => setCart(prev => ({ ...prev, [pid]: (prev[pid] || 0) + 1 }));
  const removeFromCart = (pid: string) => setCart(prev => {
    const next = { ...prev };
    if (next[pid] > 1) next[pid]--;
    else delete next[pid];
    return next;
  });

  return (
    <div style={{ background: '#F5F3EE', minHeight: '100vh' }}>
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6 text-sm" style={{ color: '#406768' }}>
          <Link to="/emprendimientos" className="flex items-center gap-1 hover:opacity-80 transition-opacity">
            <ChevronLeft size={16} /> Emprendimientos
          </Link>
          <span>/</span>
          <span style={{ color: '#19350C', fontWeight: 600 }}>{e.nombre}</span>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* LEFT: Gallery + socials */}
          <div className="lg:col-span-2">
            {/* Main image */}
            <div className="rounded-2xl overflow-hidden mb-3 aspect-square" style={{ boxShadow: '0 4px 24px rgba(25,53,12,0.12)' }}>
              <ImageWithFallback
                src={images[activeImg]}
                alt={e.nombre}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className="flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden transition-all duration-200"
                    style={{
                      border: `2px solid ${activeImg === i ? '#687D31' : 'transparent'}`,
                      opacity: activeImg === i ? 1 : 0.6,
                    }}
                  >
                    <ImageWithFallback src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Social buttons */}
            <div className="flex gap-2 mt-4 flex-wrap">
              {e.instagram && (
                <a
                  href={`https://instagram.com/${e.instagram}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-white transition-opacity hover:opacity-90"
                  style={{ background: 'linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)' }}
                >
                  <Instagram size={15} /> @{e.instagram}
                </a>
              )}
              {e.facebook && (
                <a
                  href={`https://facebook.com/${e.facebook}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-white transition-opacity hover:opacity-90"
                  style={{ background: '#1877F2' }}
                >
                  <Facebook size={15} /> Facebook
                </a>
              )}
              {e.tiktok && (
                <a
                  href={`https://tiktok.com/@${e.tiktok}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-white transition-opacity hover:opacity-90"
                  style={{ background: '#010101' }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="white"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.24 8.24 0 0 0 4.83 1.54V6.79a4.85 4.85 0 0 1-1.06-.1Z"/></svg>
                  @{e.tiktok}
                </a>
              )}
            </div>
          </div>

          {/* RIGHT: Info */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            {/* Name + meta */}
            <div>
              <div className="flex flex-wrap items-start gap-3 mb-2">
                <span
                  className="px-3 py-1 rounded-full text-xs font-semibold"
                  style={{ background: e.categoriaColor, color: 'white' }}
                >
                  {e.categoria}
                </span>
                <span
                  className="px-3 py-1 rounded-full text-xs font-semibold"
                  style={{ background: '#F0F5E8', color: '#687D31', border: '1px solid #C8D9A0' }}
                >
                  {e.modalidad}
                </span>
              </div>
              <h1 style={{ color: '#19350C', fontWeight: 800, fontSize: 'clamp(1.5rem,3vw,2rem)', lineHeight: 1.2 }}>{e.nombre}</h1>
              <div className="flex items-center gap-2 mt-2">
                <MapPin size={14} style={{ color: '#406768' }} />
                <span className="text-sm" style={{ color: '#406768' }}>{e.ciudad}</span>
                <span className="mx-1" style={{ color: '#D5D3CC' }}>·</span>
                <Clock size={14} style={{ color: '#406768' }} />
                <span className="text-sm" style={{ color: '#406768' }}>{e.horario}</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm leading-relaxed" style={{ color: '#406768' }}>{e.descripcion}</p>

            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              {e.badges.map(b => (
                <span
                  key={b}
                  className="px-3 py-1.5 rounded-full text-xs font-semibold"
                  style={{ background: '#F0F5E8', color: '#687D31', border: '1px solid #C8D9A0' }}
                >
                  ✓ {b}
                </span>
              ))}
            </div>

            {/* Perfil verde */}
            <div className="rounded-xl p-4" style={{ background: '#F0F5E8', border: '1px solid #C8D9A0' }}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold flex items-center gap-1" style={{ color: '#687D31' }}>
                  <Star size={14} fill="#687D31" /> Perfil verde
                </span>
                <span style={{ color: '#687D31', fontWeight: 800, fontSize: '1.25rem' }}>{e.perfilVerde}%</span>
              </div>
              <div className="h-3 rounded-full overflow-hidden" style={{ background: '#D9E8C0' }}>
                <div
                  className="h-full rounded-full"
                  style={{ width: `${e.perfilVerde}%`, background: 'linear-gradient(90deg, #687D31, #19350C)' }}
                />
              </div>
            </div>

            {/* Impacto */}
            <div>
              <h3 className="font-bold mb-3" style={{ color: '#19350C', fontSize: '1rem' }}>El impacto de este emprendimiento</h3>
              <div className="grid grid-cols-2 gap-3">
                {e.impacto.map((m, i) => (
                  <div
                    key={i}
                    className="rounded-xl p-4 text-center"
                    style={{ background: 'white', border: '1px solid #E8E6E0', boxShadow: '0 2px 8px rgba(25,53,12,0.05)' }}
                  >
                    <div className="text-2xl mb-1">{m.icono}</div>
                    <div className="font-black text-lg" style={{ color: '#19350C' }}>{m.valor}</div>
                    <div className="text-xs leading-snug mt-1" style={{ color: '#406768' }}>{m.descripcion}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Products */}
            {e.productos.length > 0 && (
              <div>
                <h3 className="font-bold mb-3" style={{ color: '#19350C', fontSize: '1rem' }}>Catálogo de productos</h3>
                <div className="flex flex-col gap-3">
                  {e.productos.map(prod => (
                    <div
                      key={prod.id}
                      className="flex items-center gap-3 p-3 rounded-xl"
                      style={{ background: 'white', border: '1px solid #E8E6E0' }}
                    >
                      <ImageWithFallback
                        src={prod.imagen}
                        alt={prod.nombre}
                        className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm truncate" style={{ color: '#19350C' }}>{prod.nombre}</p>
                        <p className="text-xs truncate" style={{ color: '#406768' }}>{prod.descripcion}</p>
                        <p className="font-bold text-sm mt-1" style={{ color: '#FF6B35' }}>Bs. {prod.precio}</p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {cart[prod.id] ? (
                          <>
                            <button onClick={() => removeFromCart(prod.id)} className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: '#E8EDD8' }}>
                              <Minus size={12} style={{ color: '#19350C' }} />
                            </button>
                            <span className="w-5 text-center text-sm font-bold" style={{ color: '#19350C' }}>{cart[prod.id]}</span>
                            <button onClick={() => addToCart(prod.id)} className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: '#687D31' }}>
                              <Plus size={12} className="text-white" />
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => addToCart(prod.id)}
                            className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white transition-opacity hover:opacity-90"
                            style={{ background: '#687D31' }}
                          >
                            + Agregar
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Floating cart button */}
      {cartCount > 0 && (
        <div className="fixed bottom-6 left-0 right-0 flex justify-center z-40 px-6">
          <button
            className="flex items-center gap-3 px-6 py-4 rounded-2xl text-white font-semibold text-sm transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5"
            style={{ background: '#19350C', boxShadow: '0 8px 32px rgba(25,53,12,0.4)', maxWidth: '440px', width: '100%' }}
          >
            <ShoppingCart size={18} />
            <span className="flex-1 text-left">Proceder con pago por WhatsApp</span>
            <span className="flex items-center gap-1.5">
              <span
                className="px-2 py-0.5 rounded-full text-xs font-bold"
                style={{ background: '#FF6B35' }}
              >
                {cartCount}
              </span>
              <span className="font-black">Bs. {cartTotal}</span>
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
