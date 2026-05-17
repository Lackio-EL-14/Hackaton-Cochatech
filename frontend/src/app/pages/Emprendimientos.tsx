import { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router';
import { Search, SlidersHorizontal, ArrowLeft } from 'lucide-react';
import { EMPRENDIMIENTOS, CATEGORIAS } from '../data/emprendimientos';
import { EmprendimientoCard } from '../components/EmprendimientoCard';

const MODALIDADES = ['Todos', 'Presencial', 'Negocio virtual', 'Punto de entrega'];

export default function Emprendimientos() {
  const [searchParams] = useSearchParams();
  const initialCat = searchParams.get('cat') || 'Todos';
  const initialQ = searchParams.get('q') || '';

  const [search, setSearch] = useState(initialQ);
  const [activeCategory, setActiveCategory] = useState(initialCat);
  const [activeModalidad, setActiveModalidad] = useState('Todos');

  const filtered = useMemo(() => {
    return EMPRENDIMIENTOS.filter(e => {
      if (e.estado === 'Bloqueado') return false;
      const matchesCat = activeCategory === 'Todos' || e.categoria === activeCategory;
      const matchesMod = activeModalidad === 'Todos' || e.modalidad === activeModalidad;
      const q = search.toLowerCase();
      const matchesSearch = !q || e.nombre.toLowerCase().includes(q) || e.categoria.toLowerCase().includes(q) || e.ciudad.toLowerCase().includes(q);
      return matchesCat && matchesMod && matchesSearch;
    });
  }, [search, activeCategory, activeModalidad]);

  return (
    <div style={{ background: '#F5F3EE', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #19350C, #2D5A1A)', padding: '3rem 1.5rem 5rem' }}>
        <div className="max-w-7xl mx-auto">
          {/* Back button */}
          <div className="mb-4">
            <Link
              to="/"
              className="inline-flex items-center gap-1 text-sm transition-all hover:underline"
              style={{ color: 'rgba(245,243,238,0.75)' }}
            >
              <ArrowLeft size={14} /> Inicio
            </Link>
          </div>
        </div>
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-white mb-3" style={{ fontWeight: 800, fontSize: 'clamp(1.5rem,4vw,2.5rem)' }}>
            Emprendimientos verdes de Bolivia
          </h1>
          <p style={{ color: 'rgba(245,243,238,0.8)', marginBottom: '2rem', fontSize: '0.95rem' }}>
            Descubre {EMPRENDIMIENTOS.filter(e => e.estado === 'Activo').length} marcas con propósito que cuidan el planeta
          </p>
          {/* Search */}
          <div className="flex items-center gap-3 px-4 py-3 rounded-2xl max-w-xl mx-auto" style={{ background: 'white', boxShadow: '0 4px 24px rgba(0,0,0,0.15)' }}>
            <Search size={18} style={{ color: '#687D31', flexShrink: 0 }} />
            <input
              type="text"
              placeholder="Buscar emprendimiento, rubro o ciudad…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="flex-1 bg-transparent outline-none text-sm"
              style={{ color: '#19350C' }}
            />
            {search && (
              <button onClick={() => setSearch('')} className="text-xs" style={{ color: '#406768' }}>✕</button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-8">
        {/* Category filters */}
        <div
          className="rounded-2xl p-4 mb-6 overflow-x-auto"
          style={{ background: 'white', boxShadow: '0 4px 16px rgba(25,53,12,0.08)' }}
        >
          <div className="flex gap-2 flex-nowrap min-w-max">
            <button
              onClick={() => setActiveCategory('Todos')}
              className="px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-200"
              style={{
                background: activeCategory === 'Todos' ? '#19350C' : '#F5F3EE',
                color: activeCategory === 'Todos' ? 'white' : '#406768',
              }}
            >
              🌱 Todos
            </button>
            {CATEGORIAS.map(cat => (
              <button
                key={cat.nombre}
                onClick={() => setActiveCategory(activeCategory === cat.nombre ? 'Todos' : cat.nombre)}
                className="px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-200"
                style={{
                  background: activeCategory === cat.nombre ? cat.color : cat.bg,
                  color: activeCategory === cat.nombre ? 'white' : cat.color,
                }}
              >
                {cat.emoji} {cat.nombre}
              </button>
            ))}
          </div>
        </div>

        {/* Modalidad + results count */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={16} style={{ color: '#406768' }} />
            <span className="text-sm" style={{ color: '#406768' }}>Modalidad:</span>
            <div className="flex gap-1 flex-wrap">
              {MODALIDADES.map(mod => (
                <button
                  key={mod}
                  onClick={() => setActiveModalidad(mod)}
                  className="px-3 py-1 rounded-full text-xs font-medium transition-all duration-200"
                  style={{
                    background: activeModalidad === mod ? '#406768' : '#E8E6E0',
                    color: activeModalidad === mod ? 'white' : '#406768',
                  }}
                >
                  {mod}
                </button>
              ))}
            </div>
          </div>
          <p className="text-sm" style={{ color: '#406768' }}>
            <span className="font-bold" style={{ color: '#19350C' }}>{filtered.length}</span> emprendimientos encontrados
          </p>
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-16">
            {filtered.map(e => <EmprendimientoCard key={e.id} emprendimiento={e} />)}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🌿</div>
            <h3 className="font-bold mb-2" style={{ color: '#19350C', fontSize: '1.2rem' }}>No encontramos resultados</h3>
            <p className="text-sm" style={{ color: '#406768' }}>Intenta con otra búsqueda o categoría</p>
            <button
              onClick={() => { setSearch(''); setActiveCategory('Todos'); setActiveModalidad('Todos'); }}
              className="mt-4 px-5 py-2 rounded-xl text-sm font-semibold text-white"
              style={{ background: '#687D31' }}
            >
              Limpiar filtros
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
