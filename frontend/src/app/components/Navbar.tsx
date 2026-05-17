import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { ShoppingCart, Menu, X, Rocket } from 'lucide-react';

const isLoggedIn = () => sessionStorage.getItem('yo_impulso_logged') === '1';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isPerfilPage = location.pathname.startsWith('/emprendimientos/');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Inicio', to: '/' },
    { label: 'Emprendimientos', to: '/emprendimientos' },
    { label: 'Mapa Verde', to: '/mapa' },
    { label: 'Comunidad', to: '/comunidad', protected: true },
  ];

  return (
    <nav
      className="sticky top-0 z-50 w-full transition-all duration-300"
      style={{
        background: 'white',
        boxShadow: scrolled ? '0 2px 16px rgba(25,53,12,0.12)' : '0 1px 3px rgba(25,53,12,0.06)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <div
              className="flex items-center justify-center w-9 h-9 rounded-lg"
              style={{ background: 'linear-gradient(135deg, #19350C, #687D31)' }}
            >
              <Rocket size={18} className="text-white" style={{ color: '#FF6B35' }} />
            </div>
            <span style={{ fontWeight: 800, fontSize: '1.2rem', letterSpacing: '-0.5px' }}>
              <span style={{ color: '#19350C' }}>Yo</span>
              <span style={{ color: '#687D31' }}> Impulso</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.protected && !isLoggedIn() ? '/login?from=comunidad' : link.to}
                className="text-sm transition-colors duration-200 hover:opacity-80"
                style={{
                  color: location.pathname === link.to ? '#687D31' : '#406768',
                  fontWeight: location.pathname === link.to ? 600 : 500,
                  borderBottom: location.pathname === link.to ? '2px solid #687D31' : '2px solid transparent',
                  paddingBottom: '2px',
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-3">
            {isPerfilPage && (
              <button
                className="relative flex items-center gap-1 px-3 py-2 rounded-full text-sm transition-colors duration-200 hover:opacity-80"
                style={{ color: '#406768' }}
              >
                <ShoppingCart size={18} />
                <span
                  className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 rounded-full text-white"
                  style={{ background: '#FF6B35', fontSize: '10px', fontWeight: 700 }}
                >
                  2
                </span>
              </button>
            )}
            <Link
              to="/login"
              className="px-4 py-2 rounded-full border text-sm transition-all duration-200 hover:opacity-80"
              style={{
                borderColor: '#687D31',
                color: '#687D31',
                fontWeight: 600,
              }}
            >
              Iniciar sesión emprendedor
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg transition-colors duration-200"
            style={{ color: '#19350C' }}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="md:hidden border-t px-4 py-4 flex flex-col gap-3"
          style={{ borderColor: '#D5D3CC', background: '#F5F3EE' }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.protected && !isLoggedIn() ? '/login?from=comunidad' : link.to}
              className="py-2 text-sm font-medium"
              style={{ color: '#19350C' }}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/login"
            className="mt-2 px-4 py-2 rounded-full border text-sm text-center font-semibold"
            style={{ borderColor: '#687D31', color: '#687D31' }}
            onClick={() => setMobileOpen(false)}
          >
            Iniciar sesión emprendedor
          </Link>
        </div>
      )}
    </nav>
  );
}
