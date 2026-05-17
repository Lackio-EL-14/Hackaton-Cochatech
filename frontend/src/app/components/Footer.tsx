import { Link } from 'react-router';
import { Rocket, Facebook, Instagram, Send } from 'lucide-react';
import { useState } from 'react';

export function Footer() {
  const [email, setEmail] = useState('');

  return (
    <footer style={{ background: '#19350C', color: 'white' }}>
      <div className="max-w-7xl mx-auto px-6 pt-14 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center justify-center w-9 h-9 rounded-lg" style={{ background: 'rgba(255,255,255,0.1)' }}>
                <Rocket size={18} style={{ color: '#FF6B35' }} />
              </div>
              <span style={{ fontWeight: 800, fontSize: '1.2rem' }}>
                <span style={{ color: 'white' }}>Yo</span>
                <span style={{ color: '#6FA9BB' }}> Impulso</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-4" style={{ color: '#D5D3CC' }}>
              Impulsado por <span style={{ color: '#6FA9BB', fontWeight: 600 }}>Fundación Gaia Pacha</span>
            </p>
            <p className="text-xs leading-relaxed" style={{ color: 'rgba(213,211,204,0.7)' }}>
              Conectamos consumidores conscientes con emprendimientos verdes que transforman Bolivia.
            </p>
          </div>

          {/* Plataforma */}
          <div>
            <h4 className="text-sm mb-4" style={{ color: '#6FA9BB', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Plataforma
            </h4>
            <ul className="flex flex-col gap-3">
              {[['Inicio', '/'], ['Emprendimientos', '/emprendimientos'], ['Mapa Verde', '/mapa']].map(([label, to]) => (
                <li key={to}>
                  <Link to={to} className="text-sm transition-colors duration-200 hover:opacity-100" style={{ color: '#D5D3CC', opacity: 0.8 }}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Emprendedores */}
          <div>
            <h4 className="text-sm mb-4" style={{ color: '#6FA9BB', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Emprendedores
            </h4>
            <ul className="flex flex-col gap-3">
              {[['Registrar mi emprendimiento', '/registro'], ['Iniciar sesión', '/login'], ['Gestión de perfil', '/gestion'], ['Plan Premium', '/login']].map(([label, to]) => (
                <li key={label}>
                  <Link to={to} className="text-sm transition-colors duration-200 hover:opacity-100" style={{ color: '#D5D3CC', opacity: 0.8 }}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter + Legal */}
          <div>
            <h4 className="text-sm mb-4" style={{ color: '#6FA9BB', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Novedades verdes
            </h4>
            <p className="text-sm mb-3" style={{ color: '#D5D3CC', opacity: 0.8 }}>
              Recibe tips, historias de impacto y novedades de la comunidad.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="flex-1 px-3 py-2 rounded-lg text-sm outline-none"
                style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: 'white' }}
              />
              <button
                className="flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200 hover:opacity-90 flex-shrink-0"
                style={{ background: '#687D31' }}
              >
                <Send size={16} className="text-white" />
              </button>
            </div>

            {/* Social */}
            <div className="flex gap-3 mt-5">
              {[
                { icon: <Facebook size={16} />, label: 'Facebook' },
                { icon: <Instagram size={16} />, label: 'Instagram' },
                {
                  icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.24 8.24 0 0 0 4.83 1.54V6.79a4.85 4.85 0 0 1-1.06-.1Z"/></svg>,
                  label: 'TikTok'
                },
              ].map(({ icon, label }) => (
                <button
                  key={label}
                  className="flex items-center justify-center w-9 h-9 rounded-full transition-all duration-200 hover:opacity-80"
                  style={{ background: 'rgba(255,255,255,0.1)', color: 'white' }}
                  title={label}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t pt-6 flex flex-col sm:flex-row justify-between items-center gap-3" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
          <p className="text-xs" style={{ color: 'rgba(213,211,204,0.5)' }}>
            © 2025 Yo Impulso — Fundación Gaia Pacha. Todos los derechos reservados.
          </p>
          <div className="flex gap-4">
            {['Términos y condiciones', 'Política de privacidad'].map(label => (
              <a key={label} href="#" className="text-xs transition-opacity duration-200 hover:opacity-100" style={{ color: 'rgba(213,211,204,0.5)' }}>
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
