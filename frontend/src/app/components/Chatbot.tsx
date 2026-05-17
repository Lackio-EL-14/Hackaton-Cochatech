import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router';
import { X, Send, MessageCircle } from 'lucide-react';
import { EMPRENDIMIENTOS, Emprendimiento } from '../data/emprendimientos';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Message {
  id: string;
  role: 'bot' | 'user';
  text?: string;
  cards?: Emprendimiento[];
  chips?: string[];
}

const QUICK_CHIPS = ['Alimentos naturales', 'Cosmética sin químicos', 'Artesanías locales', 'Productos para el hogar'];

const KEYWORD_MAP: Record<string, string[]> = {
  'alimento': ['Alimentos y bebidas'],
  'comida': ['Alimentos y bebidas'],
  'bebida': ['Alimentos y bebidas'],
  'yogur': ['Alimentos y bebidas'],
  'jabón': ['Cosmética natural', 'Cuidado personal'],
  'jabones': ['Cosmética natural', 'Cuidado personal'],
  'cosmética': ['Cosmética natural'],
  'cosmetica': ['Cosmética natural'],
  'crema': ['Cosmética natural'],
  'natural': ['Cosmética natural', 'Alimentos y bebidas'],
  'artesanía': ['Artesanías'],
  'artesania': ['Artesanías'],
  'cerámica': ['Artesanías', 'Para el hogar'],
  'ceramica': ['Artesanías', 'Para el hogar'],
  'hogar': ['Para el hogar'],
  'casa': ['Para el hogar'],
  'mascota': ['Para las mascotas'],
  'perro': ['Para las mascotas'],
  'gato': ['Para las mascotas'],
  'bisutería': ['Bisutería y accesorios'],
  'accesorio': ['Bisutería y accesorios'],
  'cuidado': ['Cuidado personal'],
  'shampoo': ['Cuidado personal'],
  'papelería': ['Papelería'],
  'papel': ['Papelería'],
  'servicio': ['Servicios Vive y Aprende'],
  'taller': ['Servicios Vive y Aprende'],
  'aloe': ['Cosmética natural'],
  'sostenible': ['Cosmética natural', 'Alimentos y bebidas', 'Artesanías'],
  'ecológico': ['Cosmética natural', 'Para el hogar'],
  'organico': ['Alimentos y bebidas', 'Cosmética natural'],
  'orgánico': ['Alimentos y bebidas', 'Cosmética natural'],
};

function getRecommendations(query: string): Emprendimiento[] {
  const q = query.toLowerCase();
  const matchedCats = new Set<string>();
  for (const [kw, cats] of Object.entries(KEYWORD_MAP)) {
    if (q.includes(kw)) cats.forEach(c => matchedCats.add(c));
  }
  let results = EMPRENDIMIENTOS.filter(e =>
    e.estado === 'Activo' &&
    (matchedCats.size === 0
      ? e.nombre.toLowerCase().includes(q) || e.descripcion.toLowerCase().includes(q)
      : matchedCats.has(e.categoria))
  );
  if (results.length === 0) {
    results = EMPRENDIMIENTOS.filter(e => e.estado === 'Activo').slice(0, 3);
  }
  return results.slice(0, 3);
}

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'bot',
      text: '¡Hola! Soy tu asistente verde 🌿 ¿Qué tipo de producto o emprendimiento sostenible estás buscando hoy?',
      chips: QUICK_CHIPS,
    },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), role: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setTyping(true);

    setTimeout(() => {
      setTyping(false);
      const recs = getRecommendations(text);
      const botMsg: Message = {
        id: Date.now().toString() + '_bot',
        role: 'bot',
        text: recs.length > 0
          ? 'Estos emprendimientos podrían interesarte 🌿'
          : 'No encontré emprendimientos exactos, pero mira estas alternativas…',
        cards: recs,
        chips: recs.length > 0 ? ['Ver más resultados'] : undefined,
      };
      setMessages(prev => [...prev, botMsg]);
    }, 1200);
  };

  const handleChip = (chip: string) => {
    if (chip === 'Ver más resultados') return;
    sendMessage(chip);
  };

  return (
    <>
      {/* Floating button */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
        {!open && (
          <button
            onClick={() => setOpen(true)}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="flex items-center gap-2 rounded-full transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
            style={{
              background: '#687D31',
              padding: hovered ? '12px 20px' : '14px',
              color: 'white',
            }}
          >
            <MessageCircle size={22} />
            {hovered && (
              <span className="text-sm font-semibold whitespace-nowrap">¿Qué buscas?</span>
            )}
          </button>
        )}

        {/* Chat panel */}
        {open && (
          <div
            className="flex flex-col rounded-2xl overflow-hidden"
            style={{
              width: '360px',
              height: '520px',
              background: '#F5F3EE',
              boxShadow: '0 16px 64px rgba(25,53,12,0.2)',
              border: '1px solid #E8E6E0',
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-4 py-3 flex-shrink-0"
              style={{ background: '#19350C' }}
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-sm"
                  style={{ background: '#687D31' }}
                >
                  🌿
                </div>
                <div>
                  <span className="text-white text-sm font-bold">Asistente Verde</span>
                  <span className="text-xs ml-2" style={{ color: 'rgba(213,211,204,0.7)' }}>Yo Impulso</span>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-7 h-7 rounded-full flex items-center justify-center transition-all hover:opacity-80"
                style={{ background: 'rgba(255,255,255,0.1)', color: 'white' }}
              >
                <X size={14} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-3 py-4 flex flex-col gap-3">
              {messages.map(msg => (
                <div key={msg.id} className={`flex flex-col gap-2 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                  {msg.text && (
                    <div
                      className="max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed"
                      style={{
                        background: msg.role === 'bot' ? '#D5D3CC' : '#687D31',
                        color: msg.role === 'bot' ? '#19350C' : 'white',
                        borderRadius: msg.role === 'bot' ? '4px 16px 16px 16px' : '16px 4px 16px 16px',
                      }}
                    >
                      {msg.text}
                    </div>
                  )}

                  {/* Recommendation cards */}
                  {msg.cards && msg.cards.length > 0 && (
                    <div className="flex flex-col gap-2 w-full">
                      {msg.cards.map(e => (
                        <div
                          key={e.id}
                          className="flex items-center gap-3 p-2.5 rounded-xl"
                          style={{ background: 'white', border: '1px solid #E8E6E0' }}
                        >
                          <ImageWithFallback
                            src={e.imagen}
                            alt={e.nombre}
                            className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold truncate" style={{ color: '#19350C' }}>{e.nombre}</p>
                            <span
                              className="text-xs px-1.5 py-0.5 rounded-full"
                              style={{ background: e.categoriaColor + '20', color: e.categoriaColor, fontWeight: 600 }}
                            >
                              {e.categoria}
                            </span>
                            <div className="flex items-center gap-1 mt-1">
                              <div className="h-1 rounded-full flex-1" style={{ background: '#E8EDD8' }}>
                                <div className="h-full rounded-full" style={{ width: `${e.perfilVerde}%`, background: '#687D31' }} />
                              </div>
                              <span className="text-xs font-bold" style={{ color: '#687D31' }}>{e.perfilVerde}%</span>
                            </div>
                          </div>
                          <Link
                            to={`/emprendimientos/${e.id}`}
                            onClick={() => setOpen(false)}
                            className="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-white flex-shrink-0 transition-opacity hover:opacity-90"
                            style={{ background: '#687D31' }}
                          >
                            Ver
                          </Link>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Chips */}
                  {msg.chips && (
                    <div className="flex flex-wrap gap-1.5">
                      {msg.chips.map(chip => (
                        <Link
                          key={chip}
                          to={chip === 'Ver más resultados' ? '/emprendimientos' : '#'}
                          onClick={chip !== 'Ver más resultados' ? () => handleChip(chip) : undefined}
                          className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 hover:opacity-90"
                          style={{
                            background: chip === 'Ver más resultados' ? '#FF6B35' : '#19350C',
                            color: 'white',
                          }}
                        >
                          {chip}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Typing indicator */}
              {typing && (
                <div className="flex items-start">
                  <div
                    className="px-4 py-3 rounded-2xl flex items-center gap-1"
                    style={{ background: '#D5D3CC', borderRadius: '4px 16px 16px 16px' }}
                  >
                    {[0, 1, 2].map(i => (
                      <div
                        key={i}
                        className="w-2 h-2 rounded-full"
                        style={{
                          background: '#687D31',
                          animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div
              className="flex items-center gap-2 px-3 py-3 border-t flex-shrink-0"
              style={{ borderColor: '#E8E6E0', background: 'white' }}
            >
              <input
                type="text"
                placeholder="Escribe aquí…"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
                className="flex-1 px-3 py-2 rounded-xl text-sm outline-none"
                style={{ background: '#F5F3EE', color: '#19350C', border: '1.5px solid #E8E6E0' }}
                onFocus={el => (el.target.style.borderColor = '#687D31')}
                onBlur={el => (el.target.style.borderColor = '#E8E6E0')}
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={!input.trim()}
                className="w-9 h-9 rounded-xl flex items-center justify-center text-white transition-all duration-200 hover:opacity-90 disabled:opacity-40"
                style={{ background: '#FF6B35', flexShrink: 0 }}
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-6px); }
        }
      `}</style>
    </>
  );
}
