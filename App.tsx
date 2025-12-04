import React, { useState, useEffect, useMemo } from 'react';
import { calculateLifePath, calculatePersonalYear } from './services/numerologyUtils';
import { generateFinancialReading, FALLBACK_DATA } from './services/geminiService';
import InputForm from './components/InputForm';
import ResultDashboard from './components/ResultDashboard';
import { FullReport } from './types';
import { Moon, Sun, Sparkles, CheckCircle, X, Star } from 'lucide-react';

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<FullReport | null>(null);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [showToast, setShowToast] = useState(false);

  // Calcula el año objetivo para la predicción.
  // Si estamos en Octubre (9), Noviembre (10) o Diciembre (11), predecimos para el año siguiente.
  const targetYear = useMemo(() => {
    const today = new Date();
    const currentMonth = today.getMonth(); // 0 index
    const currentYear = today.getFullYear();
    return currentMonth >= 9 ? currentYear + 1 : currentYear;
  }, []);

  const handleFormSubmit = async (name: string, date: string, email: string) => {
    setLoading(true);
    setUserName(name);
    setUserEmail(email);
    
    // Simulación de envío de datos a backend de marketing
    console.log(`Lead capturado: ${email} - Nombre: ${name}`); 

    try {
      const lifePath = calculateLifePath(date);
      const personalYear = calculatePersonalYear(date, targetYear);
      
      let analysis;

      // OPTIMIZACIÓN DE COSTOS:
      // Si el usuario es el de la DEMO, usamos los datos estáticos (FALLBACK_DATA).
      // Esto evita llamar a la API de Google y gastar dinero/cuota innecesariamente.
      if (name === "Fortuna Demo") {
        await new Promise(resolve => setTimeout(resolve, 1500)); // Simular tiempo de carga para realismo
        analysis = {
            ...FALLBACK_DATA,
            // Ajustamos el texto del fallback para que coincida con el año objetivo actual
            yearForecast: FALLBACK_DATA.yearForecast.replace("Este año", `Este año ${targetYear}`)
        };
      } else {
        // Solo llamamos a la API si es un usuario real
        analysis = await generateFinancialReading(lifePath, personalYear, date, targetYear);
      }

      setReport({
        numerology: {
            lifePathNumber: lifePath,
            personalYearNumber: personalYear,
            destinyNumber: 0 
        },
        analysis
      });

      // Mostrar notificación de "Email enviado" tras generar el reporte
      setShowToast(true);

    } catch (error) {
      console.error(error);
      alert("Hubo un error consultando los astros. Por favor intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setReport(null);
    setUserName('');
    setUserEmail('');
    setShowToast(false);
  };

  // Auto-ocultar el toast después de 5 segundos
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  return (
    <div className="min-h-screen bg-[#0f0518] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-mystic-900 to-[#0f0518] text-white font-sans selection:bg-gold-500 selection:text-black overflow-x-hidden relative">
      
      {/* Background Decor */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-10 left-10 text-white/5 animate-float"><Sparkles size={40} /></div>
        <div className="absolute top-40 right-20 text-white/5 animate-pulse-slow"><Moon size={60} /></div>
        <div className="absolute bottom-20 left-1/3 text-white/5 animate-float" style={{animationDelay: '1s'}}><Sparkles size={24} /></div>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-5 right-5 z-50 animate-fade-in-up">
            <div className="bg-mystic-800/90 backdrop-blur border border-emerald-500/50 text-white px-4 py-3 rounded-lg shadow-2xl flex items-start gap-3 max-w-sm">
                <div className="bg-emerald-500/20 rounded-full p-1 mt-0.5">
                    <CheckCircle className="h-5 w-5 text-emerald-400" />
                </div>
                <div className="flex-1">
                    <h4 className="font-bold text-sm text-emerald-300">¡Resumen Enviado!</h4>
                    <p className="text-xs text-gray-300 mt-1">
                        Hemos enviado tu reporte gratuito a <span className="text-white font-medium">{userEmail}</span>. Revisa tu bandeja de entrada (o spam) en unos minutos.
                    </p>
                </div>
                <button onClick={() => setShowToast(false)} className="text-gray-400 hover:text-white">
                    <X className="h-4 w-4" />
                </button>
            </div>
        </div>
      )}

      <div className="relative z-10 container mx-auto px-4 py-8 md:py-12 flex flex-col min-h-screen">
        
        {/* Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center gap-3 mb-4 cursor-pointer hover:scale-105 transition-transform" onClick={handleReset}>
             <div className="relative flex items-center justify-center">
                <Sun className="text-gold-500 h-12 w-12 animate-pulse-slow" />
                <Sparkles className="text-white h-6 w-6 absolute -bottom-1 -right-1 animate-bounce" />
             </div>
             <h1 className="text-3xl md:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-200 via-gold-400 to-amber-600 tracking-tight drop-shadow-sm">
                Fortuna Áurea
             </h1>
          </div>
          <p className="text-indigo-200/80 text-sm md:text-base max-w-lg mx-auto">
            Descubre tu numerología financiera y tu código de prosperidad para el {targetYear}
          </p>
        </header>

        {/* Content */}
        <main className="flex-grow flex flex-col items-center justify-center w-full">
          {!report ? (
            <InputForm onSubmit={handleFormSubmit} isLoading={loading} />
          ) : (
            <ResultDashboard report={report} userName={userName} onReset={handleReset} targetYear={targetYear} />
          )}
        </main>

        {/* Footer */}
        <footer className="mt-16 text-center text-gray-600 text-xs pb-4">
          <div className="flex justify-center gap-4 mb-2">
            <span className="hover:text-gold-400 cursor-pointer">Términos</span>
            <span className="hover:text-gold-400 cursor-pointer">Privacidad</span>
            <span className="hover:text-gold-400 cursor-pointer">Contacto</span>
          </div>
          <p>© {new Date().getFullYear()} Fortuna Áurea. Combinando IA y Numerología.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;