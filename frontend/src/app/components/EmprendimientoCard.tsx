import { Link } from 'react-router';
import { MapPin, MessageCircle, Star } from 'lucide-react';
import { Emprendimiento, SELLOS_DISPONIBLES } from '../data/emprendimientos';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface EmprendimientoCardProps {
  emprendimiento: Emprendimiento;
}

export function EmprendimientoCard({ emprendimiento: e }: EmprendimientoCardProps) {
  return (
    <div
      className="rounded-2xl overflow-hidden flex flex-col group transition-all duration-300 hover:-translate-y-1"
      style={{
        background: 'white',
        border: '1px solid #E8E6E0',
        boxShadow: '0 2px 8px rgba(25,53,12,0.06)',
      }}
      onMouseEnter={el => {
        (el.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 32px rgba(25,53,12,0.14)';
      }}
      onMouseLeave={el => {
        (el.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 8px rgba(25,53,12,0.06)';
      }}
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden">
        <ImageWithFallback
          src={e.imagen}
          alt={e.nombre}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Category badge */}
        <span
          className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold"
          style={{ background: e.categoriaColor, color: 'white' }}
        >
          {e.categoria}
        </span>
        {/* WA button */}
        <button
          className="absolute top-3 right-3 flex items-center justify-center w-9 h-9 rounded-full transition-all duration-200 hover:scale-110"
          style={{ background: '#25D366' }}
          title="Contactar por WhatsApp"
        >
          <MessageCircle size={18} className="text-white" />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1 gap-2">
        <div>
          <h3 className="font-bold" style={{ color: '#19350C', fontSize: '1rem' }}>{e.nombre}</h3>
          <div className="flex items-center gap-1.5 mt-1">
            <MapPin size={12} style={{ color: '#406768' }} />
            <span className="text-xs" style={{ color: '#406768' }}>{e.ciudad}</span>
            <span
              className="ml-1 px-2 py-0.5 rounded-full text-xs"
              style={{ background: '#F5F3EE', color: '#406768', border: '1px solid #D5D3CC' }}
            >
              {e.modalidad}
            </span>
          </div>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-1">
          {e.badges.slice(0, 3).map(badge => (
            <span
              key={badge}
              className="px-2 py-0.5 rounded-full text-xs"
              style={{ background: '#F0F5E8', color: '#687D31', border: '1px solid #C8D9A0' }}
            >
              {badge}
            </span>
          ))}
        </div>

        {/* Sellos verificados */}
        {e.sellos.obtenidos.length > 0 ? (
          <div className="flex flex-wrap gap-1">
            {e.sellos.obtenidos.slice(0, 3).map(s => {
              const sello = SELLOS_DISPONIBLES.find(sd => sd.key === s.key);
              if (!sello) return null;
              return (
                <span
                  key={s.key}
                  className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold"
                  style={{ background: sello.bg, color: sello.color, border: `1px solid ${sello.color}40` }}
                  title={sello.nombre}
                >
                  {sello.icono} {sello.nombreCorto}
                </span>
              );
            })}
          </div>
        ) : (
          <p className="text-xs" style={{ color: '#D5D3CC' }}>Sin sellos verificados aún</p>
        )}

        {/* Perfil Verde */}
        <div className="mt-auto pt-2">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-semibold flex items-center gap-1" style={{ color: '#687D31' }}>
              <Star size={12} fill="#687D31" />
              Perfil verde
            </span>
            <span className="text-xs font-bold" style={{ color: '#687D31' }}>{e.perfilVerde}%</span>
          </div>
          <div className="h-1.5 rounded-full overflow-hidden" style={{ background: '#E8EDD8' }}>
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${e.perfilVerde}%`, background: 'linear-gradient(90deg, #687D31, #19350C)' }}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-3">
          <Link
            to={`/emprendimientos/${e.id}`}
            className="flex-1 py-2 rounded-xl text-sm text-center font-semibold transition-all duration-200 hover:opacity-90"
            style={{ background: '#687D31', color: 'white' }}
          >
            Ver perfil
          </Link>
        </div>
      </div>
    </div>
  );
}
