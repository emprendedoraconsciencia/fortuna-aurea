import React, { useState } from 'react';
import { Calendar, ArrowRight, Mail } from 'lucide-react';

interface InputFormProps {
  onSubmit: (name: string, date: string, email: string) => void;
  isLoading: boolean;
}

const InputForm: React.FC<InputFormProps> = ({ onSubmit, isLoading }) => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && date && email) {
      onSubmit(name, date, email);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-mystic-800/50 p-8 rounded-2xl border border-white/10 backdrop-blur-md shadow-2xl relative overflow-hidden">
      {/* Decorative glow */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-gold-500/20 rounded-full blur-3xl"></div>
      
      <div className="text-center mb-8 relative z-10">
        <h2 className="text-3xl font-serif text-white mb-2 text-transparent bg-clip-text bg-gradient-to-r from-gold-300 to-amber-500">Fortuna Áurea</h2>
        <p className="text-gray-400 text-sm">Ingresa tus datos para generar tu Carta Natal de Riqueza.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
        <div>
          <label className="block text-xs font-semibold text-gold-400 uppercase tracking-wider mb-2">Nombre Completo</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-mystic-900/80 border border-purple-900/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-all placeholder-gray-600"
            placeholder="Ej. Juan Pérez"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gold-400 uppercase tracking-wider mb-2">Correo Electrónico</label>
          <div className="relative">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-mystic-900/80 border border-purple-900/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-all placeholder-gray-600"
              placeholder="tu@email.com"
            />
             <Mail className="absolute right-3 top-3.5 h-5 w-5 text-gray-500 pointer-events-none" />
          </div>
          <p className="text-[10px] text-gray-500 mt-1">* Enviaremos tu resumen gratuito a este correo.</p>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gold-400 uppercase tracking-wider mb-2">Fecha de Nacimiento</label>
          <div className="relative">
            <input
              type="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-mystic-900/80 border border-purple-900/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-all scheme-dark"
            />
            <Calendar className="absolute right-3 top-3.5 h-5 w-5 text-gray-500 pointer-events-none" />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="group w-full bg-gradient-to-r from-gold-500 to-amber-600 hover:from-gold-400 hover:to-amber-500 text-black font-bold py-4 rounded-lg shadow-lg shadow-gold-900/30 transform transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 border border-white/10"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Consultando Astros...
            </span>
          ) : (
            <>
              Revelar mi Fortuna gratis
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default InputForm;
