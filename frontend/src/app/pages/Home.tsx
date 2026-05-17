import { useState } from 'react';
import { Link } from 'react-router';
import { Search, ArrowRight, MapPin, ChevronRight, Headphones, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import { EMPRENDIMIENTOS, BLOG_POSTS, SELLOS_DISPONIBLES } from '../data/emprendimientos';
import { EmprendimientoCard } from '../components/EmprendimientoCard';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

const SELLOS_DESCRIPCIONES: Record<string, string> = {
  produccion_limpia: 'Procesos sin químicos tóxicos',
  economia_circular: 'Materiales reciclados o reutilizados',
  comercio_justo: 'Condiciones laborales éticas verificadas',
  eficiencia_hidrica: 'Prácticas de ahorro hídrico',
  huella_reducida: 'Reducción verificada de emisiones',
  packaging_sostenible: 'Empaques biodegradables o reutilizables',
  hecho_en_bolivia: 'Producción 100% local',
};

export default function Home() {
  const [search, setSearch] = useState('');
  const featured = EMPRENDIMIENTOS.filter(e => e.estado === 'Activo').slice(0, 4);

  return (
    <div style={{ background: '#F5F3EE' }}>
      {/* ─── HERO — centered, no chips, no floating cards ─── */}
      <section
        className="relative overflow-hidden"
        style={{
          backgroundImage: `
            linear-gradient(90deg, rgba(25,53,12,0.94) 0%, rgba(25,53,12,0.82) 36%, rgba(25,53,12,0.38) 62%, rgba(25,53,12,0.18) 100%),
            linear-gradient(180deg, rgba(25,53,12,0.15) 0%, rgba(25,53,12,0.62) 100%),
            url('/hero-bg.png')
          `,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          minHeight: '650px'
        }}
      >
        <motion.div
          className="relative max-w-7xl mx-auto px-6 py-20 lg:py-28 min-h-[650px] flex flex-col justify-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6 self-start"
            style={{ background: 'rgba(255,255,255,0.12)', color: '#DDEEC7', border: '1px solid rgba(255,255,255,0.24)', backdropFilter: 'blur(8px)' }}
          >
            <span>Impulsado por Fundacion Gaia Pacha</span>
          </div>

          <h1
            className="text-white mb-5 leading-tight max-w-3xl"
            style={{ fontSize: 'clamp(2.45rem, 5.6vw, 4.75rem)', fontWeight: 900, lineHeight: 1.04, textShadow: '0 4px 28px rgba(0,0,0,0.28)' }}
          >
            Descubre emprendimientos verdes que transforman{' '}
            <span style={{ color: '#6FA9BB' }}>Bolivia</span>
          </h1>
          <p className="mb-8 text-base leading-relaxed max-w-xl" style={{ color: 'rgba(245,243,238,0.9)' }}>
            Conecta con marcas sostenibles, productos responsables y proyectos locales que cuidan el planeta.
          </p>

          {/* Search bar */}
          <div
            className="flex items-center gap-3 px-4 py-3 rounded-2xl mb-8 w-full max-w-2xl"
            style={{ background: 'rgba(255,255,255,0.96)', boxShadow: '0 16px 48px rgba(0,0,0,0.22)', backdropFilter: 'blur(10px)' }}
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

          <div className="mt-10 grid grid-cols-3 gap-3 max-w-xl w-full">
            {[
              ['10+', 'emprendimientos'],
              ['7', 'sellos verdes'],
              ['100%', 'validacion local'],
            ].map(([value, label]) => (
              <div
                key={label}
                className="rounded-2xl px-4 py-3"
                style={{ background: 'rgba(255,255,255,0.11)', border: '1px solid rgba(255,255,255,0.18)', backdropFilter: 'blur(8px)' }}
              >
                <p className="font-black text-lg" style={{ color: 'white' }}>{value}</p>
                <p className="text-xs" style={{ color: 'rgba(245,243,238,0.78)' }}>{label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ─── EMPRENDIMIENTOS DESTACADOS ─── */}
      <section className="py-16 px-6" style={{ background: '#F5F3EE' }}>
        <motion.div
          className="max-w-7xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
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
        </motion.div>
      </section>

      {/* ─── SELLOS VERDES ─── */}
      <section className="py-16 px-6" style={{ background: 'white' }}>
        <motion.div
          className="max-w-7xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-10">
            <h2 style={{ color: '#19350C', fontWeight: 800, fontSize: '1.75rem' }}>¿Qué significan los sellos verdes?</h2>
            <p className="mt-2 text-sm max-w-xl mx-auto" style={{ color: '#406768' }}>
              Cada sello es una verificación real del compromiso sostenible de un emprendimiento.
            </p>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 lg:justify-center" style={{ scrollbarWidth: 'none' }}>
            {SELLOS_DISPONIBLES.map(sello => (
              <div
                key={sello.key}
                className="flex-shrink-0 flex flex-col items-center text-center rounded-2xl p-4"
                style={{
                  background: '#F5F3EE',
                  border: sello.key === 'packaging_sostenible' ? `2px solid ${sello.color}` : '1px solid #E8E6E0',
                  width: '140px',
                }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-2xl mb-3 flex-shrink-0"
                  style={{ background: sello.bg, border: `2px solid ${sello.color}30` }}
                >
                  {sello.icono}
                </div>
                <p className="text-xs mb-1" style={{ color: sello.color, fontWeight: 700, lineHeight: 1.3 }}>{sello.nombre}</p>
                <p className="text-xs leading-snug" style={{ color: '#406768' }}>{SELLOS_DESCRIPCIONES[sello.key]}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              to="/emprendimientos"
              className="text-sm font-semibold transition-opacity hover:opacity-80 inline-flex items-center gap-1"
              style={{ color: '#687D31' }}
            >
              Conoce cómo los emprendimientos obtienen estos sellos →
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ─── GUÍAS — formato horizontal compacto ─── */}
      <section className="py-14 px-6" style={{ background: '#F5F3EE' }}>
        <motion.div
          className="max-w-5xl mx-auto flex flex-col gap-4"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          {/* Guía consumidor */}
          <div
            className="flex flex-col sm:flex-row sm:items-center gap-4 px-6 py-4 rounded-2xl"
            style={{ background: 'white', boxShadow: '0 2px 12px rgba(25,53,12,0.06)', minHeight: '80px' }}
          >
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-full flex-shrink-0 self-start sm:self-auto"
              style={{ background: '#F0F5E8', border: '1.5px solid #C8D9A0' }}
            >
              <span className="text-sm">🛒</span>
              <span className="text-xs font-bold whitespace-nowrap" style={{ color: '#687D31' }}>Para consumidores</span>
            </div>
            <div className="flex items-center gap-1 flex-wrap sm:flex-nowrap overflow-x-auto">
              {[
                { icon: '🔍', label: 'Busca' },
                { icon: '🌿', label: 'Descubre' },
                { icon: '💬', label: 'Conecta' },
                { icon: '🛒', label: 'Compra consciente' },
              ].map((step, i, arr) => (
                <div key={step.label} className="flex items-center gap-1 flex-shrink-0">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl" style={{ background: '#F0F5E8' }}>
                    <span className="text-sm">{step.icon}</span>
                    <span className="text-xs font-semibold whitespace-nowrap" style={{ color: '#19350C' }}>{step.label}</span>
                  </div>
                  {i < arr.length - 1 && (
                    <span className="text-xs mx-0.5" style={{ color: '#D5D3CC' }}>→</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Guía emprendedor */}
          <div
            className="flex flex-col sm:flex-row sm:items-center gap-4 px-6 py-4 rounded-2xl"
            style={{ background: 'white', boxShadow: '0 2px 12px rgba(25,53,12,0.06)', minHeight: '80px' }}
          >
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-full flex-shrink-0 self-start sm:self-auto"
              style={{ background: '#FFF0E8', border: '1.5px solid #FFCDB2' }}
            >
              <span className="text-sm">🚀</span>
              <span className="text-xs font-bold whitespace-nowrap" style={{ color: '#FF6B35' }}>Para emprendedores</span>
            </div>
            <div className="flex items-center gap-1 flex-wrap sm:flex-nowrap overflow-x-auto">
              {[
                { icon: '📝', label: 'Regístrate' },
                { icon: '✏️', label: 'Completa tu perfil' },
                { icon: '📦', label: 'Publica tu catálogo' },
                { icon: '📬', label: 'Recibe pedidos' },
              ].map((step, i, arr) => (
                <div key={step.label} className="flex items-center gap-1 flex-shrink-0">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl" style={{ background: '#FFF0E8' }}>
                    <span className="text-sm">{step.icon}</span>
                    <span className="text-xs font-semibold whitespace-nowrap" style={{ color: '#19350C' }}>{step.label}</span>
                  </div>
                  {i < arr.length - 1 && (
                    <span className="text-xs mx-0.5" style={{ color: '#D5D3CC' }}>→</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ─── ¿CÓMO QUIERES ENTRAR? ─── */}
      <section className="py-16 px-6" style={{ background: '#F5F3EE' }}>
        <motion.div
          className="max-w-7xl mx-auto text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 style={{ color: '#19350C', fontWeight: 800, fontSize: '1.75rem' }}>¿Cómo quieres entrar?</h2>
          <p className="mt-2 mb-10 text-sm" style={{ color: '#406768' }}>Elige tu rol y empieza ahora</p>
          <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {/* Emprendedor */}
            <div
              className="rounded-2xl p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              style={{ background: 'white', boxShadow: '0 4px 16px rgba(25,53,12,0.08)', border: '2px solid transparent' }}
            >
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl" style={{ background: '#687D31' }}>
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
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl" style={{ background: '#19350C' }}>
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
        </motion.div>
      </section>

      {/* ─── BLOG ─── */}
      <section className="py-16 px-6" style={{ background: 'white' }}>
        <motion.div
          className="max-w-7xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
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
        </motion.div>
      </section>

      {/* ─── SOPORTE ─── */}
      <section className="py-16 px-6" style={{ background: '#F5F3EE' }}>
        <motion.div
          className="max-w-7xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
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
        </motion.div>
      </section>
    </div>
  );
}
