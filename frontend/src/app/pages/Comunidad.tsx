import { useState } from 'react';
import { Link } from 'react-router';
import { X, Search, Image, Package, Tag, ArrowLeft } from 'lucide-react';
import { EMPRENDIMIENTOS, SELLOS_DISPONIBLES } from '../data/emprendimientos';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

const ME = EMPRENDIMIENTOS[0]; // Yoghi Probit — logged-in emprendimiento

const MENU_ITEMS = ['Feed principal', 'Alianzas', 'Mis conexiones', 'Eventos y ferias', 'Recursos compartidos'];

const SUGERIDOS = EMPRENDIMIENTOS.filter(e => e.estado === 'Activo' && e.id !== ME.id).slice(0, 3);

interface Post {
  id: string;
  autor: typeof EMPRENDIMIENTOS[0];
  tipo: 'normal' | 'alianza' | 'recurso';
  texto: string;
  imagen?: string;
  apoyos: number;
  comentarios: number;
  timestamp: string;
  comentariosData?: Array<{ autor: string; texto: string }>;
}

const FEED_POSTS: Post[] = [
  {
    id: 'p1',
    autor: EMPRENDIMIENTOS[1],
    tipo: 'alianza',
    texto: '¡Buscamos alianza con emprendimientos de alimentos para ofrecer canastas combinadas! Ofrecemos: cosmética natural para incluir en el combo. Buscamos: emprendimientos de alimentos locales para co-distribuir.',
    apoyos: 24,
    comentarios: 5,
    timestamp: 'hace 2 horas',
    comentariosData: [
      { autor: 'Frigus', texto: '¡Nos interesa! Les escribimos por interno 🌱' },
      { autor: 'Yoghi Probit', texto: 'Excelente idea, podríamos coordinar.' },
    ],
  },
  {
    id: 'p2',
    autor: EMPRENDIMIENTOS[3],
    tipo: 'normal',
    texto: 'Acabamos de abrir nuestra nueva línea de vasijas ceremoniales con arcilla local de los valles. Cada pieza tarda 3 días en completarse. ¿A alguien le interesa una demo en vivo? 🏺',
    imagen: EMPRENDIMIENTOS[3].imagen,
    apoyos: 38,
    comentarios: 8,
    timestamp: 'hace 5 horas',
    comentariosData: [
      { autor: 'Mishitos', texto: '¡Preciosas! Nos encantan 😍' },
    ],
  },
  {
    id: 'p3',
    autor: EMPRENDIMIENTOS[5],
    tipo: 'recurso',
    texto: 'Compartimos nuestra guía para calcular la huella de carbono en emprendimientos pequeños. Tardamos 3 meses en desarrollarla — esperamos que sea útil para toda la comunidad. ¡Descarga gratuita! 📊',
    apoyos: 51,
    comentarios: 12,
    timestamp: 'hace 1 día',
    comentariosData: [],
  },
  {
    id: 'p4',
    autor: EMPRENDIMIENTOS[8],
    tipo: 'normal',
    texto: 'Nuestro aloe vera está floreciendo esta temporada 🌵 Preparen sus pedidos — en 2 semanas tendremos nueva cosecha lista. Aceites, cremas y tónicos recién formulados.',
    imagen: EMPRENDIMIENTOS[8].imagen,
    apoyos: 29,
    comentarios: 6,
    timestamp: 'hace 2 días',
    comentariosData: [],
  },
];

const ALIANZAS_ACTIVAS = [
  { id: 'a1', emp1: EMPRENDIMIENTOS[0], emp2: EMPRENDIMIENTOS[4], tipo: 'Co-producción', nueva: true },
  { id: 'a2', emp1: EMPRENDIMIENTOS[1], emp2: EMPRENDIMIENTOS[8], tipo: 'Marketing conjunto', nueva: true },
  { id: 'a3', emp1: EMPRENDIMIENTOS[3], emp2: EMPRENDIMIENTOS[6], tipo: 'Distribución', nueva: false },
  { id: 'a4', emp1: EMPRENDIMIENTOS[5], emp2: EMPRENDIMIENTOS[7], tipo: 'Ferias', nueva: false },
];

const EVENTOS = [
  { id: 'e1', nombre: 'Feria Verde Cochabamba', fecha: '31 May 2025', lugar: 'Parque Simón Bolívar' },
  { id: 'e2', nombre: 'Expo Sostenible Bolivia', fecha: '14 Jun 2025', lugar: 'Fexpocruz, Santa Cruz' },
  { id: 'e3', nombre: 'Mercado Agroecológico', fecha: '7 Jun 2025', lugar: 'Plaza Colón, Cbba.' },
];

const TENDENCIAS = [
  { tag: '#EmpaquesSostenibles', posts: 34 },
  { tag: '#ProductoBoliviano', posts: 28 },
  { tag: '#CeroResiduos', posts: 22 },
  { tag: '#ComercioJusto', posts: 19 },
  { tag: '#AgriculturaNatural', posts: 15 },
];

const TIPO_ALIANZA = ['Distribución', 'Co-producción', 'Marketing conjunto', 'Ferias'];

export default function Comunidad() {
  const [activeMenu, setActiveMenu] = useState('Feed principal');
  const [activeTab, setActiveTab] = useState<'Recientes' | 'Populares' | 'Alianzas' | 'Mi red'>('Recientes');
  const [posts, setPosts] = useState(FEED_POSTS);
  const [apoyados, setApoyados] = useState<Set<string>>(new Set());
  const [expandedComments, setExpandedComments] = useState<Set<string>>(new Set());
  const [postText, setPostText] = useState('');
  const [showAlianzaModal, setShowAlianzaModal] = useState(false);
  const [showPropuestaModal, setShowPropuestaModal] = useState(false);
  const [sellosVisible, setSellosVisible] = useState<string | null>(null);

  const toggleApoyo = (id: string) => {
    setApoyados(prev => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  };

  const publishPost = () => {
    if (!postText.trim()) return;
    const newPost: Post = {
      id: Date.now().toString(),
      autor: ME,
      tipo: 'normal',
      texto: postText,
      apoyos: 0,
      comentarios: 0,
      timestamp: 'ahora mismo',
      comentariosData: [],
    };
    setPosts(prev => [newPost, ...prev]);
    setPostText('');
  };

  const getSelloData = (key: string) => SELLOS_DISPONIBLES.find(s => s.key === key);

  const PostCard = ({ post }: { post: Post }) => {
    const commentsOpen = expandedComments.has(post.id);
    return (
      <div className="rounded-2xl overflow-hidden" style={{ background: 'white', border: '1px solid #E8E6E0', boxShadow: '0 2px 8px rgba(25,53,12,0.04)' }}>
        {/* Special badge */}
        {post.tipo === 'alianza' && (
          <div className="px-4 py-2.5 flex items-center gap-2" style={{ background: '#FFF0E8', borderBottom: '1px solid #FFD4BF' }}>
            <span className="text-sm font-bold" style={{ color: '#FF6B35' }}>🤝 Busco alianza</span>
          </div>
        )}
        {post.tipo === 'recurso' && (
          <div className="px-4 py-2.5 flex items-center gap-2" style={{ background: '#EEF5F8', borderBottom: '1px solid #C5DDE8' }}>
            <span className="text-sm font-bold" style={{ color: '#406768' }}>📦 Recurso compartido</span>
          </div>
        )}

        <div className="p-4">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                <ImageWithFallback src={post.autor.imagen} alt={post.autor.nombre} className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="text-sm font-bold" style={{ color: '#19350C' }}>{post.autor.nombre}</p>
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: post.autor.categoriaColor + '20', color: post.autor.categoriaColor }}>
                    {post.autor.categoria}
                  </span>
                  {/* Sellos mini */}
                  {post.autor.sellos.obtenidos.slice(0, 2).map(s => {
                    const sello = getSelloData(s.key);
                    if (!sello) return null;
                    return (
                      <span key={s.key} className="text-xs" title={sello.nombre}>{sello.icono}</span>
                    );
                  })}
                  <span className="text-xs" style={{ color: '#D5D3CC' }}>·</span>
                  <span className="text-xs" style={{ color: '#D5D3CC' }}>{post.timestamp}</span>
                </div>
              </div>
            </div>
            <button className="w-8 h-8 rounded-full flex items-center justify-center text-sm" style={{ color: '#D5D3CC' }}>•••</button>
          </div>

          {/* Content */}
          <p className="text-sm leading-relaxed mb-3" style={{ color: '#406768' }}>
            {post.texto.length > 180 ? post.texto.slice(0, 180) + '… ' : post.texto}
            {post.texto.length > 180 && <button className="font-semibold" style={{ color: '#687D31' }}>ver más</button>}
          </p>

          {post.imagen && (
            <div className="rounded-xl overflow-hidden mb-3 h-48">
              <ImageWithFallback src={post.imagen} alt="" className="w-full h-full object-cover" />
            </div>
          )}

          {post.tipo === 'alianza' && (
            <button
              onClick={() => setShowPropuestaModal(true)}
              className="mb-3 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ background: '#687D31' }}
            >
              Proponer alianza
            </button>
          )}
          {post.tipo === 'recurso' && (
            <button className="mb-3 px-4 py-2 rounded-xl text-sm font-semibold transition-opacity hover:opacity-90" style={{ background: '#EEF5F8', color: '#406768' }}>
              Ver recurso
            </button>
          )}

          {/* Footer */}
          <div className="flex items-center gap-1 pt-2 border-t" style={{ borderColor: '#F0F0EE' }}>
            <button
              onClick={() => toggleApoyo(post.id)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200 hover:opacity-80"
              style={{
                background: apoyados.has(post.id) ? '#F0F5E8' : 'transparent',
                color: apoyados.has(post.id) ? '#687D31' : '#406768',
              }}
            >
              🌱 {post.apoyos + (apoyados.has(post.id) ? 1 : 0)}
            </button>
            <button
              onClick={() => setExpandedComments(prev => { const n = new Set(prev); n.has(post.id) ? n.delete(post.id) : n.add(post.id); return n; })}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all hover:opacity-80"
              style={{ color: '#406768' }}
            >
              💬 {post.comentarios}
            </button>
            <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold hover:opacity-80" style={{ color: '#406768' }}>
              ↗ Compartir
            </button>
            <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold hover:opacity-80 ml-auto" style={{ color: '#406768' }}>
              🔖 Guardar
            </button>
          </div>

          {/* Comments */}
          {commentsOpen && post.comentariosData && post.comentariosData.length > 0 && (
            <div className="mt-3 pt-3 border-t flex flex-col gap-2" style={{ borderColor: '#F0F0EE' }}>
              {post.comentariosData.slice(0, 2).map((c, i) => (
                <div key={i} className="flex items-start gap-2">
                  <div className="w-7 h-7 rounded-full flex-shrink-0" style={{ background: '#E8EDD8' }} />
                  <div className="flex-1 px-3 py-2 rounded-xl text-xs" style={{ background: '#F5F3EE', color: '#19350C' }}>
                    <span className="font-bold mr-1">{c.autor}</span>{c.texto}
                  </div>
                </div>
              ))}
              <div className="flex items-center gap-2 mt-1">
                <div className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0">
                  <ImageWithFallback src={ME.imagen} alt="" className="w-full h-full object-cover" />
                </div>
                <input
                  type="text"
                  placeholder="Escribe un comentario…"
                  className="flex-1 px-3 py-1.5 rounded-xl text-xs outline-none"
                  style={{ background: '#F5F3EE', border: '1px solid #E8E6E0', color: '#19350C' }}
                  onFocus={el => (el.target.style.borderColor = '#687D31')}
                  onBlur={el => (el.target.style.borderColor = '#E8E6E0')}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const AlianzasView = () => (
    <div className="flex flex-col gap-4">
      <div>
        <button
          onClick={() => setActiveMenu('Feed principal')}
          className="inline-flex items-center gap-1 text-sm mb-3 transition-all hover:underline"
          style={{ color: '#687D31' }}
        >
          <ArrowLeft size={14} /> Comunidad
        </button>
      </div>
      <div className="flex items-center justify-between">
        <h2 className="font-bold" style={{ color: '#19350C', fontSize: '1.1rem' }}>Alianzas entre emprendimientos</h2>
        <button
          onClick={() => setShowAlianzaModal(true)}
          className="px-4 py-2 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
          style={{ background: '#FF6B35' }}
        >
          + Proponer alianza
        </button>
      </div>
      {/* Mis alianzas tab */}
      <div className="flex gap-1 p-1 rounded-xl" style={{ background: 'white', border: '1px solid #E8E6E0', width: 'fit-content' }}>
        {['Todas las alianzas', 'Mis alianzas'].map(t => (
          <button key={t} className="px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200"
            style={{ background: t === 'Todas las alianzas' ? '#19350C' : 'transparent', color: t === 'Todas las alianzas' ? 'white' : '#406768' }}>
            {t}
          </button>
        ))}
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        {ALIANZAS_ACTIVAS.map(a => (
          <div key={a.id} className="rounded-2xl p-4" style={{ background: 'white', border: '1px solid #E8E6E0' }}>
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="flex flex-col items-center gap-1">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <ImageWithFallback src={a.emp1.imagen} alt={a.emp1.nombre} className="w-full h-full object-cover" />
                </div>
                <p className="text-xs font-semibold text-center" style={{ color: '#19350C', maxWidth: '60px' }}>{a.emp1.nombre}</p>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: '#F0F5E8' }}>🤝</div>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: '#F0F5E8', color: '#687D31' }}>{a.tipo}</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <ImageWithFallback src={a.emp2.imagen} alt={a.emp2.nombre} className="w-full h-full object-cover" />
                </div>
                <p className="text-xs font-semibold text-center" style={{ color: '#19350C', maxWidth: '60px' }}>{a.emp2.nombre}</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs px-2 py-1 rounded-full font-semibold" style={{ background: '#F0F5E8', color: '#687D31' }}>Activa</span>
              {a.nueva && <span className="text-xs px-2 py-1 rounded-full font-bold" style={{ background: '#FF6B35', color: 'white' }}>Nueva</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div style={{ background: '#F5F3EE', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg,#19350C,#2D5A1A)', padding: '2rem 1.5rem' }}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-3">
            <Link
              to="/"
              className="inline-flex items-center gap-1 text-sm transition-all hover:underline"
              style={{ color: 'rgba(245,243,238,0.75)' }}
            >
              <ArrowLeft size={14} /> Inicio
            </Link>
          </div>
          <h1 className="text-white mb-1" style={{ fontWeight: 800, fontSize: '1.5rem' }}>Comunidad de emprendedores</h1>
          <p style={{ color: 'rgba(245,243,238,0.7)', fontSize: '0.9rem' }}>Conecta, colabora y crece con otros emprendimientos verdes de Bolivia</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr_280px] gap-6">

          {/* ─── LEFT COLUMN ─── */}
          <div className="flex flex-col gap-4">
            {/* Profile */}
            <div className="rounded-2xl p-4" style={{ background: 'white', border: '1px solid #E8E6E0' }}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                  <ImageWithFallback src={ME.imagen} alt={ME.nombre} className="w-full h-full object-cover" />
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-sm truncate" style={{ color: '#19350C' }}>{ME.nombre}</p>
                  <span className="text-xs px-2 py-0.5 rounded-full font-bold" style={{ background: '#FFF0E8', color: '#FF6B35' }}>⭐ Premium</span>
                </div>
              </div>
              {/* Sellos mini */}
              <div className="flex flex-wrap gap-1.5">
                {ME.sellos.obtenidos.map(s => {
                  const sello = getSelloData(s.key);
                  if (!sello) return null;
                  return (
                    <span
                      key={s.key}
                      className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold"
                      style={{ background: sello.bg, color: sello.color }}
                      title={sello.nombre}
                    >
                      {sello.icono} {sello.nombreCorto}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Menu */}
            <div className="rounded-2xl overflow-hidden" style={{ background: 'white', border: '1px solid #E8E6E0' }}>
              {MENU_ITEMS.map(item => (
                <button
                  key={item}
                  onClick={() => setActiveMenu(item)}
                  className="w-full text-left px-4 py-3 text-sm font-semibold transition-all duration-200 border-b last:border-0 hover:opacity-80"
                  style={{
                    borderColor: '#F0F0EE',
                    background: activeMenu === item ? '#F0F5E8' : 'transparent',
                    color: activeMenu === item ? '#687D31' : '#406768',
                  }}
                >
                  {activeMenu === item && '→ '}{item}
                </button>
              ))}
            </div>

            {/* Sugeridos */}
            <div className="rounded-2xl p-4" style={{ background: 'white', border: '1px solid #E8E6E0' }}>
              <p className="text-xs font-bold mb-3 uppercase tracking-wide" style={{ color: '#687D31' }}>Sugeridos para conectar</p>
              <div className="flex flex-col gap-3">
                {SUGERIDOS.map(e => (
                  <div key={e.id} className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0">
                      <ImageWithFallback src={e.imagen} alt={e.nombre} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold truncate" style={{ color: '#19350C' }}>{e.nombre}</p>
                      <p className="text-xs truncate" style={{ color: '#406768' }}>{e.categoria}</p>
                    </div>
                    <button
                      className="px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 hover:opacity-90 flex-shrink-0"
                      style={{ border: '1.5px solid #687D31', color: '#687D31', background: 'transparent' }}
                    >
                      Conectar
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ─── CENTER COLUMN ─── */}
          <div className="flex flex-col gap-4">
            {(activeMenu === 'Feed principal' || activeMenu === 'Mis conexiones') && (
              <>
                {/* Post creator */}
                <div className="rounded-2xl p-4" style={{ background: 'white', border: '1px solid #E8E6E0' }}>
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0">
                      <ImageWithFallback src={ME.imagen} alt={ME.nombre} className="w-full h-full object-cover" />
                    </div>
                    <textarea
                      placeholder="Comparte algo con la comunidad…"
                      value={postText}
                      onChange={e => setPostText(e.target.value)}
                      rows={3}
                      className="flex-1 px-4 py-2.5 rounded-xl text-sm outline-none resize-none"
                      style={{ background: '#F5F3EE', border: '1.5px solid #E8E6E0', color: '#19350C' }}
                      onFocus={el => (el.target.style.borderColor = '#687D31')}
                      onBlur={el => (el.target.style.borderColor = '#E8E6E0')}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      {[{ icon: <Image size={14} />, label: 'Foto' }, { icon: <Package size={14} />, label: 'Producto' }, { icon: <Tag size={14} />, label: 'Categoría' }].map(b => (
                        <button key={b.label} className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-opacity hover:opacity-80" style={{ background: '#F5F3EE', color: '#406768' }}>
                          {b.icon} {b.label}
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={publishPost}
                      disabled={!postText.trim()}
                      className="px-5 py-2 rounded-xl text-xs font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-40"
                      style={{ background: '#687D31' }}
                    >
                      Publicar
                    </button>
                  </div>
                </div>

                {/* Feed tabs */}
                <div className="flex gap-1 p-1 rounded-xl" style={{ background: 'white', border: '1px solid #E8E6E0', width: 'fit-content' }}>
                  {(['Recientes', 'Populares', 'Alianzas', 'Mi red'] as const).map(t => (
                    <button
                      key={t}
                      onClick={() => setActiveTab(t)}
                      className="px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-200"
                      style={{
                        background: activeTab === t ? '#19350C' : 'transparent',
                        color: activeTab === t ? 'white' : '#406768',
                      }}
                    >
                      {t}
                    </button>
                  ))}
                </div>

                {/* Posts */}
                {posts
                  .filter(p => activeTab === 'Alianzas' ? p.tipo === 'alianza' : true)
                  .map(post => <PostCard key={post.id} post={post} />)}
              </>
            )}

            {activeMenu === 'Alianzas' && <AlianzasView />}

            {activeMenu === 'Eventos y ferias' && (
              <div className="flex flex-col gap-4">
                <h2 className="font-bold" style={{ color: '#19350C', fontSize: '1.1rem' }}>Próximos eventos y ferias sostenibles</h2>
                {EVENTOS.map(ev => (
                  <div key={ev.id} className="rounded-2xl p-5" style={{ background: 'white', border: '1px solid #E8E6E0' }}>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-bold" style={{ color: '#19350C' }}>{ev.nombre}</p>
                        <p className="text-sm mt-1" style={{ color: '#406768' }}>📅 {ev.fecha}</p>
                        <p className="text-sm" style={{ color: '#406768' }}>📍 {ev.lugar}</p>
                      </div>
                      <button className="px-4 py-2 rounded-xl text-xs font-semibold text-white flex-shrink-0" style={{ background: '#687D31' }}>
                        Me interesa
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeMenu === 'Recursos compartidos' && (
              <div className="flex flex-col gap-4">
                <h2 className="font-bold" style={{ color: '#19350C', fontSize: '1.1rem' }}>Recursos compartidos por la comunidad</h2>
                {posts.filter(p => p.tipo === 'recurso').map(post => <PostCard key={post.id} post={post} />)}
              </div>
            )}
          </div>

          {/* ─── RIGHT COLUMN ─── */}
          <div className="flex flex-col gap-4">
            {/* Alianzas activas */}
            <div className="rounded-2xl p-4" style={{ background: 'white', border: '1px solid #E8E6E0' }}>
              <p className="text-xs font-bold mb-3 uppercase tracking-wide" style={{ color: '#687D31' }}>Alianzas activas en la comunidad</p>
              <div className="flex flex-col gap-3">
                {ALIANZAS_ACTIVAS.slice(0, 3).map(a => (
                  <div key={a.id} className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      <div className="w-7 h-7 rounded-full overflow-hidden border-2 border-white">
                        <ImageWithFallback src={a.emp1.imagen} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div className="w-7 h-7 rounded-full overflow-hidden border-2 border-white">
                        <ImageWithFallback src={a.emp2.imagen} alt="" className="w-full h-full object-cover" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold truncate" style={{ color: '#19350C' }}>{a.emp1.nombre} + {a.emp2.nombre}</p>
                      <p className="text-xs" style={{ color: '#406768' }}>{a.tipo}</p>
                    </div>
                    {a.nueva && <span className="text-xs px-1.5 py-0.5 rounded-full font-bold" style={{ background: '#FF6B35', color: 'white' }}>Nueva</span>}
                  </div>
                ))}
              </div>
            </div>

            {/* Eventos */}
            <div className="rounded-2xl p-4" style={{ background: 'white', border: '1px solid #E8E6E0' }}>
              <p className="text-xs font-bold mb-3 uppercase tracking-wide" style={{ color: '#687D31' }}>Próximos eventos</p>
              <div className="flex flex-col gap-3">
                {EVENTOS.map(ev => (
                  <div key={ev.id} className="flex items-start gap-2">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-base" style={{ background: '#F0F5E8' }}>📅</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold truncate" style={{ color: '#19350C' }}>{ev.nombre}</p>
                      <p className="text-xs" style={{ color: '#406768' }}>{ev.fecha} · {ev.lugar}</p>
                    </div>
                    <button className="text-xs font-semibold flex-shrink-0" style={{ color: '#687D31' }}>+</button>
                  </div>
                ))}
              </div>
            </div>

            {/* Tendencias */}
            <div className="rounded-2xl p-4" style={{ background: 'white', border: '1px solid #E8E6E0' }}>
              <p className="text-xs font-bold mb-3 uppercase tracking-wide" style={{ color: '#687D31' }}>Temas en tendencia</p>
              <div className="flex flex-col gap-2">
                {TENDENCIAS.map((t, i) => (
                  <div key={t.tag} className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold" style={{ color: '#19350C' }}>{t.tag}</p>
                      <p className="text-xs" style={{ color: '#406768' }}>{t.posts} publicaciones</p>
                    </div>
                    <span className="text-xs" style={{ color: '#D5D3CC' }}>#{i + 1}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal: Proponer alianza */}
      {(showAlianzaModal || showPropuestaModal) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="rounded-3xl p-6 w-full max-w-md" style={{ background: 'white' }}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold" style={{ color: '#19350C', fontSize: '1.1rem' }}>🤝 Proponer alianza</h3>
              <button onClick={() => { setShowAlianzaModal(false); setShowPropuestaModal(false); }} style={{ color: '#406768' }}>
                <X size={20} />
              </button>
            </div>
            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-bold mb-1.5" style={{ color: '#406768' }}>Buscar emprendimiento</label>
                <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl" style={{ border: '2px solid #E8E6E0', background: '#FAFAFA' }}>
                  <Search size={14} style={{ color: '#406768' }} />
                  <input type="text" placeholder="Ej: Mishitos, Amaria…" className="flex-1 text-sm outline-none bg-transparent" style={{ color: '#19350C' }} />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold mb-2" style={{ color: '#406768' }}>Tipo de alianza</label>
                <div className="flex flex-wrap gap-2">
                  {TIPO_ALIANZA.map(t => (
                    <button key={t} className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all" style={{ background: '#F5F3EE', color: '#406768', border: '1.5px solid #E8E6E0' }}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold mb-1.5" style={{ color: '#406768' }}>Mensaje / propuesta</label>
                <textarea rows={3} placeholder="Describe qué propones y qué buscas en esta alianza…" className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none" style={{ border: '2px solid #E8E6E0', background: '#FAFAFA', color: '#19350C' }} onFocus={el => (el.target.style.borderColor = '#687D31')} onBlur={el => (el.target.style.borderColor = '#E8E6E0')} />
              </div>
            </div>
            <div className="flex gap-2 mt-5">
              <button onClick={() => { setShowAlianzaModal(false); setShowPropuestaModal(false); }} className="flex-1 py-3 rounded-xl text-sm font-semibold" style={{ background: '#F5F3EE', color: '#406768' }}>Cancelar</button>
              <button onClick={() => { setShowAlianzaModal(false); setShowPropuestaModal(false); }} className="flex-1 py-3 rounded-xl text-sm font-bold text-white" style={{ background: '#687D31' }}>Enviar propuesta</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
