import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Eye, EyeOff, Rocket } from 'lucide-react';
import { TurtleMascot } from '../components/TurtleMascot';

export default function LoginEmprendedor() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/gestion');
    }, 1200);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-12"
      style={{ background: '#F5F3EE' }}
    >
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div
            className="flex items-center justify-center w-10 h-10 rounded-xl"
            style={{ background: 'linear-gradient(135deg, #19350C, #687D31)' }}
          >
            <Rocket size={20} style={{ color: '#FF6B35' }} />
          </div>
          <span style={{ fontWeight: 800, fontSize: '1.4rem' }}>
            <span style={{ color: '#19350C' }}>Yo</span>
            <span style={{ color: '#687D31' }}> Impulso</span>
          </span>
        </div>

        {/* Card */}
        <div
          className="rounded-3xl p-8 relative overflow-hidden"
          style={{ background: 'white', boxShadow: '0 8px 48px rgba(25,53,12,0.12)' }}
        >
          {/* Turtle mascot - top right corner */}
          <div className="absolute -top-4 -right-4 opacity-90">
            <TurtleMascot size={110} variant="wave" />
          </div>

          <h2 className="mb-1" style={{ color: '#19350C', fontWeight: 800, fontSize: '1.5rem' }}>
            Bienvenido, emprendedor
          </h2>
          <p className="text-sm mb-7" style={{ color: '#406768' }}>
            Accede a tu panel de gestión y sigue creciendo 🌱
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="block text-sm font-semibold mb-1.5" style={{ color: '#19350C' }}>
                Correo electrónico
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="tu@emprendimiento.com"
                required
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
                style={{
                  border: '2px solid #E8E6E0',
                  background: '#FAFAFA',
                  color: '#19350C',
                }}
                onFocus={el => (el.target.style.borderColor = '#687D31')}
                onBlur={el => (el.target.style.borderColor = '#E8E6E0')}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1.5" style={{ color: '#19350C' }}>
                Contraseña
              </label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200 pr-12"
                  style={{
                    border: '2px solid #E8E6E0',
                    background: '#FAFAFA',
                    color: '#19350C',
                  }}
                  onFocus={el => (el.target.style.borderColor = '#687D31')}
                  onBlur={el => (el.target.style.borderColor = '#E8E6E0')}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  style={{ color: '#406768' }}
                >
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl font-bold text-white transition-all duration-200 hover:opacity-90 disabled:opacity-60"
              style={{ background: 'linear-gradient(135deg, #19350C, #687D31)', fontSize: '0.95rem' }}
            >
              {loading ? '⏳ Iniciando sesión…' : 'Iniciar sesión'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t text-center" style={{ borderColor: '#E8E6E0' }}>
            <p className="text-sm" style={{ color: '#406768' }}>¿Aún no registraste tu emprendimiento?</p>
            <Link
              to="/registro"
              className="inline-flex items-center gap-1 mt-2 text-sm font-bold transition-opacity hover:opacity-80"
              style={{ color: '#FF6B35' }}
            >
              Registrar mi emprendimiento →
            </Link>
          </div>
        </div>

        <p className="text-center mt-6 text-xs" style={{ color: '#406768' }}>
          ¿Eres administrador?{' '}
          <Link to="/admin" className="font-semibold hover:opacity-80 transition-opacity" style={{ color: '#19350C' }}>
            Accede al panel admin
          </Link>
        </p>
      </div>
    </div>
  );
}
