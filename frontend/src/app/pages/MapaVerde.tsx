import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { Search, X, MapPin, Navigation, ArrowLeft } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix standard leaflet icon path issues in Vite
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

L.Icon.Default.mergeOptions({
  iconRetinaUrl: iconRetina,
  iconUrl: iconUrl,
  shadowUrl: shadowUrl,
});

export interface Emprendimiento {
  id: string;
  nombre: string;
  categoria: string;
  categoriaColor: string;
  ciudad: string;
  modalidad: string;
  imagen: string;
  descripcion: string;
  badges: string[];
  contacto: string;
  estado: string;
  latitude: number;
  longitude: number;
}

const FILTROS_MODALIDAD = [
  { key: 'VIRTUAL', label: 'Negocio virtual', icon: '💻' },
  { key: 'PRESENCIAL', label: 'Punto de venta/entrega', icon: '🏪' },
  { key: 'AMBOS', label: 'Híbrido', icon: '🎪' },
];

const CATEGORY_ICONS: Record<string, string> = {
  'Alimentos y bebidas': '🍎',
  'Cosmética natural': '🌿',
  'Artesanías': '🧶',
  'Para el hogar': '🏡',
  'Cuidado personal': '🧴',
  'Servicios Vive y Aprende': '🌱',
};

// Map controller to handle flyTo and Geolocation
function MapController({ selectedEmp, setUserLoc }: { selectedEmp: Emprendimiento | null, setUserLoc: (loc: L.LatLng) => void }) {
  const map = useMap();

  useEffect(() => {
    if (selectedEmp && selectedEmp.latitude !== 0) {
      map.flyTo([selectedEmp.latitude, selectedEmp.longitude], 16, { duration: 1.5 });
    }
  }, [selectedEmp, map]);

  useEffect(() => {
    map.locate({ setView: true, maxZoom: 15 });
    map.on('locationfound', function (e) {
      setUserLoc(e.latlng);
    });
    map.on('locationerror', function(e) {
      console.warn('No se pudo obtener la ubicación:', e.message);
    });
  }, [map, setUserLoc]);

  return null;
}

// Generate slight jitter so pins at the exact same location don't overlap completely
const getJitteredCoord = (lat: number, lng: number, id: string): [number, number] => {
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = id.charCodeAt(i) + ((hash << 5) - hash);
  const jitterLat = ((hash % 100) - 50) * 0.0003; 
  const jitterLng = (((hash >> 3) % 100) - 50) * 0.0003;
  
  // If coordinates are 0 (not set), fallback to Cochabamba center + jitter
  if (!lat || lat === 0) return [-17.3895 + jitterLat, -66.1568 + jitterLng];
  return [lat + jitterLat, lng + jitterLng];
};

export default function MapaVerde() {
  const [search, setSearch] = useState('');
  const [selectedEmp, setSelectedEmp] = useState<Emprendimiento | null>(null);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [emprendimientos, setEmprendimientos] = useState<Emprendimiento[]>([]);
  const [loading, setLoading] = useState(true);
  const [userLoc, setUserLoc] = useState<L.LatLng | null>(null);

  useEffect(() => {
    const fetchMapData = async () => {
      try {
        const res = await fetch('/api/businesses/search');
        if (!res.ok) throw new Error('Error fetching map data');
        const data = await res.json();
        
        const mappedData: Emprendimiento[] = data.map((b: any) => ({
          id: b.id,
          nombre: b.name,
          categoria: b.categories && b.categories.length > 0 ? b.categories[0].name : 'Otros',
          categoriaColor: '#687D31',
          ciudad: 'Cochabamba',
          modalidad: b.salesType || 'VIRTUAL',
          imagen: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=600',
          descripcion: b.description,
          badges: ['Verificado', 'Eco-amigable'],
          contacto: b.contactPhone,
          estado: b.status,
          latitude: Number(b.latitude) || 0,
          longitude: Number(b.longitude) || 0,
        }));
        
        setEmprendimientos(mappedData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMapData();
  }, []);

  const toggleFilter = (key: string) => {
    setActiveFilters(prev => prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]);
  };

  const visibleEmps = emprendimientos.filter(e => {
    if (e.estado === 'Bloqueado' || e.estado === 'REJECTED') return false;
    const q = search.toLowerCase();
    if (q && !e.nombre.toLowerCase().includes(q) && !e.categoria.toLowerCase().includes(q)) return false;
    if (activeFilters.length > 0 && !activeFilters.includes(e.modalidad)) return false;
    return true;
  });

  return (
    <div className="flex h-[calc(100vh-64px)]" style={{ background: '#F5F3EE' }}>
      {/* Left panel */}
      <div
        className="w-80 flex-shrink-0 flex flex-col border-r overflow-hidden relative z-10"
        style={{ background: 'white', borderColor: '#E8E6E0', boxShadow: '2px 0 12px rgba(0,0,0,0.05)' }}
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
          {loading ? (
            <div className="flex justify-center py-10">
              <div className="w-8 h-8 border-4 border-dashed rounded-full animate-spin" style={{ borderColor: '#687D31' }} />
            </div>
          ) : (
            <>
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
              {visibleEmps.length === 0 && (
                <div className="text-center py-6">
                  <p className="text-xs text-gray-500">No se encontraron resultados.</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Map area */}
      <div className="flex-1 relative overflow-hidden z-0">
        <MapContainer 
          center={[-17.3895, -66.1568]} 
          zoom={13} 
          style={{ height: '100%', width: '100%' }}
          zoomControl={true}
        >
          {/* Base Map Layer using a clean, light theme compatible with the green aesthetic */}
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          />
          
          <MapController selectedEmp={selectedEmp} setUserLoc={setUserLoc} />

          {/* User Location Marker */}
          {userLoc && (
            <Marker 
              position={userLoc}
              icon={L.divIcon({
                html: `<div style="background:#4285F4; width:16px; height:16px; border-radius:50%; border:3px solid white; box-shadow:0 0 10px rgba(0,0,0,0.3)"></div>`,
                className: '',
                iconSize: [16, 16],
                iconAnchor: [8, 8]
              })}
            />
          )}

          {/* Emprendimiento Markers */}
          {!loading && visibleEmps.map(e => {
            const isSelected = selectedEmp?.id === e.id;
            const emoji = CATEGORY_ICONS[e.categoria] || '🌱';
            
            const iconHtml = `
              <div style="
                background: ${isSelected ? '#FF6B35' : '#19350C'};
                color: white;
                border-radius: 50%;
                width: 32px;
                height: 32px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 16px;
                box-shadow: ${isSelected ? '0 4px 16px rgba(255,107,53,0.5)' : '0 4px 12px rgba(25,53,12,0.4)'};
                border: 2px solid white;
                transform: ${isSelected ? 'scale(1.2)' : 'scale(1)'};
                transition: transform 0.2s;
              ">
                ${emoji}
              </div>
            `;
            
            const customIcon = L.divIcon({
              html: iconHtml,
              className: '',
              iconSize: [32, 32],
              iconAnchor: [16, 16], // center
            });

            return (
              <Marker
                key={e.id}
                position={getJitteredCoord(e.latitude, e.longitude, e.id)}
                icon={customIcon}
                eventHandlers={{ click: () => setSelectedEmp(isSelected ? null : e) }}
              />
            );
          })}
        </MapContainer>

        {/* Popup card overlay */}
        {selectedEmp && (
          <div
            className="absolute bottom-6 right-6 w-80 rounded-2xl overflow-hidden z-[1000]"
            style={{ background: 'white', boxShadow: '0 8px 32px rgba(25,53,12,0.2)' }}
          >
            <div className="relative h-32 overflow-hidden bg-gray-100">
              <ImageWithFallback
                src={selectedEmp.imagen}
                alt={selectedEmp.nombre}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedEmp(null)}
                className="absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center text-white transition-opacity hover:bg-black/70"
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
                  href={`https://maps.google.com/?q=${selectedEmp.latitude},${selectedEmp.longitude}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-1 px-3 py-2 rounded-xl text-xs font-semibold transition-opacity hover:opacity-90"
                  style={{ background: '#F0F5E8', color: '#406768' }}
                >
                  <Navigation size={12} /> Llegar
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Map legend overlay */}
        <div
          className="absolute top-4 right-4 px-3 py-2 rounded-xl z-[1000]"
          style={{ background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(8px)', boxShadow: '0 2px 12px rgba(25,53,12,0.1)' }}
        >
          <p className="text-xs font-bold mb-1.5" style={{ color: '#19350C' }}>Categorías</p>
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

