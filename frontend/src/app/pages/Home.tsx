import { useState } from 'react';
import { Link } from 'react-router';
import { Search, ArrowRight, MapPin, ChevronRight, Headphones, BookOpen } from 'lucide-react';
import { EMPRENDIMIENTOS, CATEGORIAS, BLOG_POSTS } from '../data/emprendimientos';
import { EmprendimientoCard } from '../components/EmprendimientoCard';
import { TurtleMascot } from '../components/TurtleMascot';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

const FILTER_CHIPS = ['Alimentos', 'Cosmética natural', 'Artesanías', 'Hogar sostenible', 'Moda circular'];

export default function Home() {
  const [search, setSearch] = useState('');
  const [activeChip, setActiveChip] = useState<string | null>(null);
  const featured = EMPRENDIMIENTOS.filter(e => e.estado === 'Activo').slice(0, 4);

  return (
    <div style={{ background: '#F5F3EE' }}>
      {/* ─── HERO ─── */}
      <section
        className="relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #19350C 0%, #2D5A1A 50%, #406768 100%)', minHeight: '600px' }}
      >
        {/* Organic blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-10" style={{ background: '#6FA9BB' }} />
          <div className="absolute bottom-10 -left-10 w-60 h-60 rounded-full opacity-10" style={{ background: '#687D31' }} />
          <div className="absolute top-1/2 left-1/3 w-40 h-40 rounded-full opacity-5" style={{ background: '#FF6B35' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-16 lg:py-24 grid lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div>
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6"
              style={{ background: 'rgba(255,107,53,0.2)', color: '#FF6B35', border: '1px solid rgba(255,107,53,0.3)' }}
            >
              <span>🌿</span> Plataforma boliviana de impacto verde
            </div>
            <h1
              className="text-white mb-4 leading-tight"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.25rem)', fontWeight: 800, lineHeight: 1.15 }}
            >
              Descubre emprendimientos verdes que transforman{' '}
              <span style={{ color: '#6FA9BB' }}>Bolivia</span>
            </h1>
            <p className="mb-8 text-base leading-relaxed" style={{ color: 'rgba(245,243,238,0.85)' }}>
              Conecta con marcas sostenibles, productos responsables y proyectos locales que cuidan el planeta.
            </p>

            {/* Search bar */}
            <div
              className="flex items-center gap-3 px-4 py-3 rounded-2xl mb-5"
              style={{ background: 'white', boxShadow: '0 4px 24px rgba(0,0,0,0.15)' }}
            >
              <Search size={20} style={{ color: '#687D31', flexShrink: 0 }} />
              <input
                type="text"
                placeholder="Buscar productos, rubros o emprendimientos…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="flex-1 bg-transparent outline-none text-sm"
                style={{ color: '#19350C' }}
              />
              <Link
                to={`/emprendimientos${search ? `?q=${search}` : ''}`}
                className="px-4 py-2 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90 flex-shrink-0"
                style={{ background: '#FF6B35' }}
              >
                Buscar
              </Link>
            </div>

            {/* Chips */}
            <div className="flex flex-wrap gap-2 mb-8">
              {FILTER_CHIPS.map(chip => (
                <button
                  key={chip}
                  onClick={() => setActiveChip(activeChip === chip ? null : chip)}
                  className="px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200"
                  style={{
                    background: activeChip === chip ? '#FF6B35' : 'rgba(255,255,255,0.15)',
                    color: 'white',
                    border: `1px solid ${activeChip === chip ? '#FF6B35' : 'rgba(255,255,255,0.25)'}`,
                  }}
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <Link
                to="/emprendimientos"
                className="px-6 py-3 rounded-xl font-semibold text-white transition-all duration-200 hover:opacity-90 inline-flex items-center gap-2"
                style={{ background: '#FF6B35' }}
              >
                Explorar ahora <ArrowRight size={16} />
              </Link>
              <Link
                to="/mapa"
                className="px-6 py-3 rounded-xl font-semibold transition-all duration-200 hover:opacity-90 inline-flex items-center gap-2"
                style={{ background: 'rgba(255,255,255,0.12)', color: 'white', border: '2px solid rgba(255,255,255,0.4)' }}
              >
                <MapPin size={16} /> Ver mapa verde
              </Link>
            </div>
          </div>

          {/* Right — floating cards */}
          <div className="relative hidden lg:flex flex-col items-end gap-4">
            {EMPRENDIMIENTOS.slice(0, 3).map((e, i) => (
              <div
                key={e.id}
                className="rounded-2xl overflow-hidden flex items-center gap-3 p-3 w-72 transition-all duration-300"
                style={{
                  background: 'rgba(255,255,255,0.95)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
                  transform: `translateX(${i === 1 ? '-24px' : '0'}) translateY(${i === 0 ? '8px' : i === 2 ? '-8px' : '0'})`,
                }}
              >
                <ImageWithFallback
                  src={e.imagen}
                  alt={e.nombre}
                  className="w-14 h-14 rounded-xl object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm truncate" style={{ color: '#19350C' }}>{e.nombre}</p>
                  <p className="text-xs truncate" style={{ color: '#406768' }}>{e.categoria}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <div className="h-1 rounded-full flex-1" style={{ background: '#E8EDD8' }}>
                      <div className="h-full rounded-full" style={{ width: `${e.perfilVerde}%`, background: '#687D31' }} />
                    </div>
                    <span className="text-xs font-bold" style={{ color: '#687D31' }}>{e.perfilVerde}%</span>
                  </div>
                </div>
                <button
                  className="flex items-center justify-center w-8 h-8 rounded-full flex-shrink-0"
                  style={{ background: '#25D366' }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.011.49 3.911 1.35 5.587L0 24l6.583-1.322A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.034-1.384l-.36-.214-3.733.749.802-3.627-.236-.374A9.773 9.773 0 012.182 12C2.182 6.578 6.578 2.182 12 2.182S21.818 6.578 21.818 12 17.422 21.818 12 21.818z" fillRule="evenodd"/></svg>
                </button>
              </div>
            ))}
            {/* Turtle mascot */}
            <div className="absolute -bottom-12 -right-6">
              <TurtleMascot size={140} variant="phone" />
            </div>
          </div>
        </div>
      </section>

      {/* ─── CATEGORÍAS ─── */}
      <section className="py-16 px-6" style={{ background: 'white' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 style={{ color: '#19350C', fontWeight: 800, fontSize: '1.75rem' }}>Explora por categoría</h2>
            <p className="mt-2 text-sm" style={{ color: '#406768' }}>Encuentra emprendimientos según lo que buscas</p>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-9 gap-3">
            {CATEGORIAS.map(cat => (
              <Link
                key={cat.nombre}
                to={`/emprendimientos?cat=${encodeURIComponent(cat.nombre)}`}
                className="flex flex-col items-center gap-2 p-3 rounded-2xl transition-all duration-200 hover:-translate-y-1 hover:shadow-md text-center"
                style={{ background: cat.bg, border: `1px solid ${cat.bg}` }}
              >
                <span style={{ fontSize: '1.6rem' }}>{cat.emoji}</span>
                <span className="text-xs font-semibold leading-tight" style={{ color: cat.color }}>{cat.nombre}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── EMPRENDIMIENTOS DESTACADOS ─── */}
      <section className="py-16 px-6" style={{ background: '#F5F3EE' }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 style={{ color: '#19350C', fontWeight: 800, fontSize: '1.75rem' }}>
                Emprendimientos que están cambiando Bolivia
              </h2>
              <p className="mt-2 text-sm" style={{ color: '#406768' }}>Marcas locales con propósito y compromiso ambiental</p>
            </div>
            <Link
              to="/emprendimientos"
              className="hidden sm:flex items-center gap-1 text-sm font-semibold transition-opacity hover:opacity-80"
              style={{ color: '#687D31' }}
            >
              Ver todos <ChevronRight size={16} />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map(e => <EmprendimientoCard key={e.id} emprendimiento={e} />)}
          </div>
          <div className="text-center mt-8 sm:hidden">
            <Link
              to="/emprendimientos"
              className="inline-flex items-center gap-1 px-6 py-3 rounded-xl text-sm font-semibold transition-opacity hover:opacity-90"
              style={{ background: '#687D31', color: 'white' }}
            >
              Ver todos los emprendimientos <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── GUÍAS ─── */}
      <section className="py-16 px-6" style={{ background: '#D5D3CC' }}>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10">
          {/* Consumidor */}
          <div className="rounded-2xl p-8 relative overflow-hidden" style={{ background: 'white' }}>
            <h3 className="mb-2" style={{ color: '#19350C', fontWeight: 800, fontSize: '1.25rem' }}>Guía para consumidores</h3>
            <p className="text-sm mb-6" style={{ color: '#406768' }}>Compra consciente en 4 pasos simples</p>
            <div className="flex flex-col gap-4">
              {[
                { n: '01', title: 'Busca', desc: 'Usa el buscador o explora por categoría', icon: '🔍' },
                { n: '02', title: 'Descubre', desc: 'Lee el perfil verde y el impacto de cada marca', icon: '🌿' },
                { n: '03', title: 'Conecta', desc: 'Comunícate directamente con el emprendedor', icon: '🤝' },
                { n: '04', title: 'Compra consciente', desc: 'Realiza tu pedido y apoya la economía local', icon: '🛒' },
              ].map(step => (
                <div key={step.n} className="flex items-start gap-4">
                  <div
                    className="flex items-center justify-center w-10 h-10 rounded-xl flex-shrink-0 text-lg"
                    style={{ background: '#F0F5E8' }}
                  >
                    {step.icon}
                  </div>
                  <div>
                    <p className="text-xs font-bold mb-0.5" style={{ color: '#6FA9BB' }}>PASO {step.n}</p>
                    <p className="text-sm font-bold" style={{ color: '#19350C' }}>{step.title}</p>
                    <p className="text-xs" style={{ color: '#406768' }}>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="absolute -bottom-4 -right-4 opacity-80">
              <TurtleMascot size={120} variant="wave" />
            </div>
          </div>

          {/* Emprendedor */}
          <div className="rounded-2xl p-8 relative overflow-hidden" style={{ background: 'white' }}>
            <h3 className="mb-2" style={{ color: '#19350C', fontWeight: 800, fontSize: '1.25rem' }}>Guía para emprendedores</h3>
            <p className="text-sm mb-6" style={{ color: '#406768' }}>Haz crecer tu marca sostenible</p>
            <div className="flex flex-col gap-4">
              {[
                { n: '01', title: 'Regístrate', desc: 'Crea tu cuenta de emprendedor gratis', icon: '✍️' },
                { n: '02', title: 'Completa tu perfil', desc: 'Sube fotos, descripción y certificaciones', icon: '📝' },
                { n: '03', title: 'Publica tu catálogo', desc: 'Agrega productos con precios y descripción', icon: '🛍️' },
                { n: '04', title: 'Recibe pedidos', desc: 'Conecta con clientes conscientes', icon: '📦' },
              ].map(step => (
                <div key={step.n} className="flex items-start gap-4">
                  <div
                    className="flex items-center justify-center w-10 h-10 rounded-xl flex-shrink-0 text-lg"
                    style={{ background: '#FFF0E8' }}
                  >
                    {step.icon}
                  </div>
                  <div>
                    <p className="text-xs font-bold mb-0.5" style={{ color: '#FF6B35' }}>PASO {step.n}</p>
                    <p className="text-sm font-bold" style={{ color: '#19350C' }}>{step.title}</p>
                    <p className="text-xs" style={{ color: '#406768' }}>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="absolute -bottom-4 -right-4 opacity-80">
              <TurtleMascot size={120} variant="laptop" />
            </div>
          </div>
        </div>
      </section>

      {/* ─── ¿CÓMO QUIERES ENTRAR? ─── */}
      <section className="py-16 px-6" style={{ background: '#F5F3EE' }}>
        <div className="max-w-7xl mx-auto text-center">
          <h2 style={{ color: '#19350C', fontWeight: 800, fontSize: '1.75rem' }}>¿Cómo quieres entrar?</h2>
          <p className="mt-2 mb-10 text-sm" style={{ color: '#406768' }}>Elige tu rol y empieza ahora</p>
          <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {/* Emprendedor */}
            <div
              className="rounded-2xl p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              style={{ background: 'white', boxShadow: '0 4px 16px rgba(25,53,12,0.08)', border: '2px solid transparent' }}
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl"
                style={{ background: '#687D31' }}
              >
                🚀
              </div>
              <h3 style={{ color: '#19350C', fontWeight: 800, fontSize: '1.25rem' }}>Emprendedor</h3>
              <p className="text-sm mt-2 mb-6" style={{ color: '#406768', lineHeight: 1.6 }}>
                Registra tu emprendimiento, publica tu catálogo y conecta con consumidores conscientes.
              </p>
              <Link
                to="/login"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
                style={{ background: '#687D31' }}
              >
                Iniciar sesión <ArrowRight size={16} />
              </Link>
            </div>

            {/* Administrador */}
            <div
              className="rounded-2xl p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              style={{ background: 'white', boxShadow: '0 4px 16px rgba(25,53,12,0.08)' }}
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl"
                style={{ background: '#19350C' }}
              >
                🛡️
              </div>
              <h3 style={{ color: '#19350C', fontWeight: 800, fontSize: '1.25rem' }}>Administrador</h3>
              <p className="text-sm mt-2 mb-6" style={{ color: '#406768', lineHeight: 1.6 }}>
                Gestiona la plataforma, valida emprendimientos y supervisa el ecosistema sostenible.
              </p>
              <Link
                to="/admin"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
                style={{ background: '#19350C' }}
              >
                Acceder <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── BLOG ─── */}
      <section className="py-16 px-6" style={{ background: 'white' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 style={{ color: '#19350C', fontWeight: 800, fontSize: '1.75rem' }}>Aprende a consumir de forma más responsable</h2>
            <p className="mt-2 text-sm" style={{ color: '#406768' }}>Artículos y guías para un estilo de vida más consciente</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {BLOG_POSTS.map(post => (
              <div
                key={post.id}
                className="rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer"
                style={{ background: '#F5F3EE', border: '1px solid #E8E6E0' }}
              >
                <div className="h-40 overflow-hidden">
                  <ImageWithFallback src={post.imagen} alt={post.titulo} className="w-full h-full object-cover" />
                </div>
                <div className="p-4">
                  <span
                    className="text-xs font-bold px-2 py-1 rounded-full"
                    style={{ background: post.categoriaColor + '20', color: post.categoriaColor }}
                  >
                    {post.categoria}
                  </span>
                  <p className="mt-2 text-sm font-bold leading-snug" style={{ color: '#19350C' }}>{post.titulo}</p>
                  <div className="flex items-center gap-1 mt-3" style={{ color: '#687D31' }}>
                    <BookOpen size={14} />
                    <span className="text-xs font-semibold">Leer artículo</span>
                    <ChevronRight size={14} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SOPORTE ─── */}
      <section className="py-16 px-6" style={{ background: '#F5F3EE' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 style={{ color: '#19350C', fontWeight: 800, fontSize: '1.75rem' }}>¿Necesitas ayuda?</h2>
            <p className="mt-2 text-sm" style={{ color: '#406768' }}>Estamos aquí para acompañarte</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { icon: '🛒', title: 'Para consumidores', desc: 'Aprende a usar la plataforma y descubre productos sostenibles.', btn: 'Ver guía', color: '#6FA9BB' },
              { icon: '🚀', title: 'Para emprendedores', desc: 'Registra y gestiona tu emprendimiento paso a paso.', btn: 'Comenzar', color: '#687D31', to: '/registro' },
              { icon: '🛠️', title: 'Soporte técnico', desc: '¿Tienes dudas o consultas? Nuestro equipo te ayuda.', btn: 'Contactar', color: '#FF6B35' },
            ].map(item => (
              <div
                key={item.title}
                className="rounded-2xl p-6 text-center transition-all duration-300 hover:-translate-y-1"
                style={{ background: 'white', boxShadow: '0 2px 12px rgba(25,53,12,0.06)' }}
              >
                <div className="text-4xl mb-3">{item.icon}</div>
                <h4 className="font-bold mb-2" style={{ color: '#19350C', fontSize: '1rem' }}>{item.title}</h4>
                <p className="text-sm mb-4" style={{ color: '#406768', lineHeight: 1.6 }}>{item.desc}</p>
                <Link
                  to={item.to || '#'}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
                  style={{ background: item.color }}
                >
                  <Headphones size={14} /> {item.btn}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
