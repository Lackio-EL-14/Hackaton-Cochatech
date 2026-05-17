import { useState } from 'react';
import { Link } from 'react-router';
import { Search, X, MapPin, Navigation, ArrowLeft } from 'lucide-react';
import { EMPRENDIMIENTOS, Emprendimiento } from '../data/emprendimientos';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

const FILTROS_MODALIDAD = [
  { key: 'virtual', label: 'Negocio virtual', icon: '💻' },
  { key: 'venta', label: 'Punto de venta', icon: '🏪' },
  { key: 'entrega', label: 'Punto de entrega', icon: '📦' },
  { key: 'ferias', label: 'Ferias sostenibles', icon: '🎪' },
];

// Map pin positions (normalized 0-100 within the SVG map bounds)
const PIN_POSITIONS: Record<string, { x: number; y: number }> = {
  '1': { x: 55, y: 52 },
  '2': { x: 42, y: 44 },
  '3': { x: 60, y: 64 },
  '4': { x: 68, y: 46 },
  '5': { x: 35, y: 36 },
  '6': { x: 62, y: 58 },
  '7': { x: 30, y: 28 },
  '8': { x: 50, y: 48 },
  '9': { x: 58, y: 56 },
  '10': { x: 45, y: 62 },
};

const CATEGORY_ICONS: Record<string, string> = {
  'Alimentos y bebidas': '🍎',
  'Cosmética natural': '🌿',
  'Artesanías': '🧶',
  'Para el hogar': '🏡',
  'Cuidado personal': '🧴',
  'Servicios Vive y Aprende': '🌱',
};

export default function MapaVerde() {
  const [search, setSearch] = useState('');
  const [selectedEmp, setSelectedEmp] = useState<Emprendimiento | null>(null);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const toggleFilter = (key: string) => {
    setActiveFilters(prev => prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]);
  };

  const visibleEmps = EMPRENDIMIENTOS.filter(e => {
    if (e.estado === 'Bloqueado') return false;
    const q = search.toLowerCase();
    if (q && !e.nombre.toLowerCase().includes(q) && !e.categoria.toLowerCase().includes(q)) return false;
    return true;
  });

  return (
    <div className="flex h-[calc(100vh-64px)]" style={{ background: '#F5F3EE' }}>
      {/* Left panel */}
      <div
        className="w-80 flex-shrink-0 flex flex-col border-r overflow-hidden"
        style={{ background: 'white', borderColor: '#E8E6E0' }}
      >
        {/* Header */}
        <div className="p-4 border-b" style={{ borderColor: '#E8E6E0' }}>
          <Link
            to="/"
            className="inline-flex items-center gap-1 text-xs mb-3 transition-all hover:underline"
            style={{ color: '#687D31' }}
          >
            <ArrowLeft size={12} /> Inicio
          </Link>
          <h2 className="font-bold mb-3" style={{ color: '#19350C', fontSize: '1.1rem' }}>🗺️ Mapa Verde</h2>
          {/* Search */}
          <div
            className="flex items-center gap-2 px-3 py-2 rounded-xl"
            style={{ background: '#F5F3EE', border: '1px solid #D5D3CC' }}
          >
            <Search size={14} style={{ color: '#406768', flexShrink: 0 }} />
            <input
              type="text"
              placeholder="Buscar emprendimiento…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="flex-1 bg-transparent outline-none text-xs"
              style={{ color: '#19350C' }}
            />
            {search && (
              <button onClick={() => setSearch('')}><X size={12} style={{ color: '#406768' }} /></button>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="p-4 border-b" style={{ borderColor: '#E8E6E0' }}>
          <p className="text-xs font-bold mb-3 uppercase tracking-wide" style={{ color: '#687D31' }}>Filtrar por</p>
          <div className="flex flex-col gap-2">
            {FILTROS_MODALIDAD.map(f => (
              <label key={f.key} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={activeFilters.includes(f.key)}
                  onChange={() => toggleFilter(f.key)}
                  className="sr-only"
                />
                <div
                  className="w-4 h-4 rounded flex items-center justify-center flex-shrink-0 transition-all duration-200"
                  style={{
                    background: activeFilters.includes(f.key) ? '#687D31' : 'transparent',
                    border: `2px solid ${activeFilters.includes(f.key) ? '#687D31' : '#D5D3CC'}`,
                  }}
                >
                  {activeFilters.includes(f.key) && <span className="text-white" style={{ fontSize: '9px', fontWeight: 900 }}>✓</span>}
                </div>
                <span className="text-xs flex items-center gap-1.5" style={{ color: '#19350C' }}>
                  {f.icon} {f.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
          <p className="text-xs" style={{ color: '#406768' }}>
            <span className="font-bold" style={{ color: '#19350C' }}>{visibleEmps.length}</span> emprendimientos en el mapa
          </p>
          {visibleEmps.map(e => (
            <button
              key={e.id}
              onClick={() => setSelectedEmp(selectedEmp?.id === e.id ? null : e)}
              className="flex items-center gap-3 p-3 rounded-xl text-left transition-all duration-200 hover:shadow-md w-full"
              style={{
                background: selectedEmp?.id === e.id ? '#F0F5E8' : '#F5F3EE',
                border: `1px solid ${selectedEmp?.id === e.id ? '#687D31' : '#E8E6E0'}`,
              }}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm"
                style={{ background: '#687D31' }}
              >
                {CATEGORY_ICONS[e.categoria] || '🌱'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold truncate" style={{ color: '#19350C' }}>{e.nombre}</p>
                <p className="text-xs truncate" style={{ color: '#406768' }}>{e.ciudad} · {e.modalidad}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Map area */}
      <div className="flex-1 relative overflow-hidden">
        {/* Map background - stylized Cochabamba */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(160deg, #B8D4C0 0%, #A8C8B8 30%, #9DBFB0 60%, #88AFA0 100%)' }}
        >
          {/* Terrain texture with SVG */}
          <svg width="100%" height="100%" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
            {/* Roads */}
            <path d="M100 300 Q 250 280 400 300 Q 550 320 700 300" stroke="white" strokeWidth="3" fill="none" opacity="0.5" />
            <path d="M400 100 Q 390 250 400 400 Q 410 500 400 580" stroke="white" strokeWidth="2.5" fill="none" opacity="0.5" />
            <path d="M200 200 Q 300 250 400 300 Q 500 350 600 400" stroke="white" strokeWidth="2" fill="none" opacity="0.4" />
            <path d="M150 400 Q 270 380 400 400 Q 530 420 650 390" stroke="white" strokeWidth="2" fill="none" opacity="0.3" />
            {/* Parks/green zones */}
            <ellipse cx="350" cy="280" rx="60" ry="40" fill="#7FB88A" opacity="0.4" />
            <ellipse cx="500" cy="350" rx="45" ry="30" fill="#7FB88A" opacity="0.3" />
            <ellipse cx="250" cy="320" rx="35" ry="25" fill="#7FB88A" opacity="0.3" />
            {/* Water */}
            <ellipse cx="400" cy="480" rx="80" ry="30" fill="#6FA9BB" opacity="0.35" />
            {/* City blocks */}
            {[...Array(20)].map((_, i) => (
              <rect
                key={i}
                x={150 + (i % 5) * 100 + Math.sin(i) * 10}
                y={150 + Math.floor(i / 5) * 80 + Math.cos(i) * 8}
                width={50 + Math.random() * 30}
                height={35 + Math.random() * 20}
                rx="3"
                fill="white"
                opacity="0.12"
              />
            ))}
            {/* Labels */}
            <text x="380" y="300" fill="#19350C" fontSize="14" fontWeight="bold" opacity="0.7">Cochabamba</text>
            <text x="380" y="315" fill="#406768" fontSize="10" opacity="0.6">Centro</text>
            <text x="250" y="200" fill="#19350C" fontSize="11" opacity="0.6">Quillacollo</text>
            <text x="520" y="180" fill="#19350C" fontSize="11" opacity="0.6">Sacaba</text>
          </svg>

          {/* Pin markers */}
          {visibleEmps.map(e => {
            const pos = PIN_POSITIONS[e.id] || { x: 50, y: 50 };
            const isSelected = selectedEmp?.id === e.id;
            return (
              <button
                key={e.id}
                onClick={() => setSelectedEmp(selectedEmp?.id === e.id ? null : e)}
                className="absolute transition-all duration-300 hover:scale-110 z-10"
                style={{ left: `${pos.x}%`, top: `${pos.y}%`, transform: `translate(-50%, -100%) scale(${isSelected ? 1.2 : 1})` }}
                title={e.nombre}
              >
                <div
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-white text-xs font-bold shadow-lg"
                  style={{
                    background: isSelected ? '#FF6B35' : '#19350C',
                    boxShadow: isSelected ? '0 4px 16px rgba(255,107,53,0.5)' : '0 4px 12px rgba(25,53,12,0.4)',
                  }}
                >
                  <span>{CATEGORY_ICONS[e.categoria] || '🌱'}</span>
                  {isSelected && <span>{e.nombre}</span>}
                </div>
                <div
                  className="w-2 h-2 mx-auto rounded-full"
                  style={{ background: isSelected ? '#FF6B35' : '#19350C', marginTop: '-3px' }}
                />
              </button>
            );
          })}
        </div>

        {/* Popup card */}
        {selectedEmp && (
          <div
            className="absolute bottom-6 right-6 w-80 rounded-2xl overflow-hidden z-20"
            style={{ background: 'white', boxShadow: '0 8px 32px rgba(25,53,12,0.2)' }}
          >
            <div className="relative h-32 overflow-hidden">
              <ImageWithFallback
                src={selectedEmp.imagen}
                alt={selectedEmp.nombre}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedEmp(null)}
                className="absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center text-white"
                style={{ background: 'rgba(0,0,0,0.5)' }}
              >
                <X size={14} />
              </button>
              <span
                className="absolute bottom-2 left-2 px-2 py-0.5 rounded-full text-xs font-semibold text-white"
                style={{ background: selectedEmp.categoriaColor }}
              >
                {selectedEmp.categoria}
              </span>
            </div>
            <div className="p-4">
              <h3 className="font-bold mb-1" style={{ color: '#19350C', fontSize: '1rem' }}>{selectedEmp.nombre}</h3>
              <div className="flex items-center gap-1 mb-2">
                <MapPin size={12} style={{ color: '#406768' }} />
                <span className="text-xs" style={{ color: '#406768' }}>{selectedEmp.ciudad} · {selectedEmp.modalidad}</span>
              </div>
              <div className="flex gap-1 flex-wrap mb-3">
                {selectedEmp.badges.slice(0, 2).map(b => (
                  <span key={b} className="px-2 py-0.5 rounded-full text-xs" style={{ background: '#F0F5E8', color: '#687D31' }}>
                    {b}
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <Link
                  to={`/emprendimientos/${selectedEmp.id}`}
                  className="flex-1 py-2 rounded-xl text-xs font-semibold text-center text-white transition-opacity hover:opacity-90"
                  style={{ background: '#687D31' }}
                >
                  Ver perfil
                </Link>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-1 px-3 py-2 rounded-xl text-xs font-semibold transition-opacity hover:opacity-90"
                  style={{ background: '#F0F5E8', color: '#406768' }}
                >
                  <Navigation size={12} /> Cómo llegar
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Map legend */}
        <div
          className="absolute top-4 left-4 px-3 py-2 rounded-xl z-20"
          style={{ background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(8px)', boxShadow: '0 2px 12px rgba(25,53,12,0.1)' }}
        >
          <p className="text-xs font-bold mb-1.5" style={{ color: '#19350C' }}>Leyenda</p>
          {Object.entries(CATEGORY_ICONS).slice(0, 4).map(([cat, icon]) => (
            <div key={cat} className="flex items-center gap-1.5 mb-1">
              <span style={{ fontSize: '10px' }}>{icon}</span>
              <span className="text-xs" style={{ color: '#406768', fontSize: '10px' }}>{cat}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
