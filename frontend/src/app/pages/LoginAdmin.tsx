import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Eye, EyeOff, Shield, Rocket, ArrowLeft } from 'lucide-react';

export default function LoginAdmin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Credenciales incorrectas');
      }

      // Check role
      if (data.user.role !== 'ADMIN') {
        throw new Error('Acceso denegado: No tienes permisos de administrador');
      }

      sessionStorage.setItem('yo_impulso_logged', '1');
      sessionStorage.setItem('yo_impulso_token', data.access_token);
      sessionStorage.setItem('yo_impulso_email', data.user.email);
      sessionStorage.setItem('yo_impulso_role', data.user.role);

      navigate('/admin/panel');
    } catch (err: any) {
      setError(err.message || 'Error de conexión con el servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden"
      style={{ background: '#19350C' }}
    >
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10" style={{ background: '#687D31', transform: 'translate(30%,-30%)' }} />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-10" style={{ background: '#6FA9BB', transform: 'translate(-30%,30%)' }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 rounded-full opacity-5" style={{ background: '#FF6B35', transform: 'translate(-50%,-50%)' }} />
        {/* Grid texture */}
        <svg width="100%" height="100%" className="absolute inset-0 opacity-5">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="w-full max-w-sm relative z-10">
        {/* Back button */}
        <div className="mb-4">
          <Link
            to="/"
            className="inline-flex items-center gap-1 text-sm transition-all hover:underline"
            style={{ color: 'rgba(213,211,204,0.75)' }}
          >
            <ArrowLeft size={14} /> Inicio
          </Link>
        </div>

        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)' }}>
            <Rocket size={20} style={{ color: '#FF6B35' }} />
          </div>
          <span style={{ fontWeight: 800, fontSize: '1.4rem' }}>
            <span style={{ color: 'white' }}>Yo</span>
            <span style={{ color: '#6FA9BB' }}> Impulso</span>
          </span>
        </div>

        {/* Card */}
        <div
          className="rounded-3xl p-8"
          style={{
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.12)',
            backdropFilter: 'blur(20px)',
          }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.1)' }}>
              <Shield size={20} style={{ color: '#6FA9BB' }} />
            </div>
            <div>
              <h2 className="font-bold text-white" style={{ fontSize: '1.2rem' }}>Panel de Administración</h2>
              <p className="text-xs" style={{ color: 'rgba(213,211,204,0.7)' }}>Acceso exclusivo por invitación</p>
            </div>
          </div>

          {error && (
            <div
              className="p-3.5 rounded-xl text-xs font-semibold mb-4 text-center transition-all duration-200"
              style={{
                background: 'rgba(255, 107, 53, 0.15)',
                border: '1px solid rgba(255, 107, 53, 0.3)',
                color: '#FF6B35',
              }}
            >
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="block text-sm font-semibold mb-1.5" style={{ color: '#D5D3CC' }}>
                Correo electrónico
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="admin@yoimpulso.bo"
                required
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  border: '1.5px solid rgba(255,255,255,0.15)',
                  color: 'white',
                }}
                onFocus={el => (el.target.style.borderColor = '#6FA9BB')}
                onBlur={el => (el.target.style.borderColor = 'rgba(255,255,255,0.15)')}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1.5" style={{ color: '#D5D3CC' }}>
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
                    background: 'rgba(255,255,255,0.08)',
                    border: '1.5px solid rgba(255,255,255,0.15)',
                    color: 'white',
                  }}
                  onFocus={el => (el.target.style.borderColor = '#6FA9BB')}
                  onBlur={el => (el.target.style.borderColor = 'rgba(255,255,255,0.15)')}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  style={{ color: 'rgba(213,211,204,0.7)' }}
                >
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl font-bold text-white transition-all duration-200 hover:opacity-90 disabled:opacity-60"
              style={{ background: '#FF6B35', fontSize: '0.95rem' }}
            >
              {loading ? '⏳ Verificando…' : 'Acceder al panel'}
            </button>
          </form>

          <p className="text-center mt-5 text-xs" style={{ color: 'rgba(213,211,204,0.5)' }}>
            Solo cuentas autorizadas por Fundación Gaia Pacha
          </p>
        </div>
      </div>
    </div>
  );
}
