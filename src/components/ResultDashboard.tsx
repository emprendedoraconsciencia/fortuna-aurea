import React, { useState } from 'react';
import { FullReport } from '../types';
import EnergyChart from './EnergyChart';
import { Diamond, TrendingUp, Sparkles, RefreshCw, Wallet, Lock, CheckCircle, Star, ExternalLink, Heart, Download } from 'lucide-react';

interface ResultDashboardProps {
  report: FullReport;
  userName: string;
  onReset: () => void;
  targetYear: number;
}

const ResultDashboard: React.FC<ResultDashboardProps> = ({ report, userName, onReset, targetYear }) => {
  const { numerology, analysis } = report;
  const [isUnlocked, setIsUnlocked] = useState(false);
  
  // ---------------------------------------------------------------------------
  // CONFIGURACIÓN DE PAGO (HOTMART / SYSTEM.IO / STRIPE)
  // ---------------------------------------------------------------------------
  // Pega aquí tu enlace de pago real (Checkout Page)
  const PAYMENT_LINK = "https://pay.hotmart.com/TU_CODIGO_DE_PRODUCTO?checkoutMode=10"; 
  // ---------------------------------------------------------------------------

  const handleUnlockRedirect = () => {
    // 1. Abrir la pasarela en nueva pestaña
    window.open(PAYMENT_LINK, '_blank');
    
    // 2. Preguntar al usuario si completó el pago
    // En una integración real (avanzada), esto se haría leyendo un parámetro URL (?paid=true)
    const confirm = window.confirm(
        "Se ha abierto la pasarela de pago segura en una nueva pestaña.\n\n" +
        "1. Completa tu compra en Hotmart/Stripe.\n" +
        "2. Vuelve a esta pestaña y haz clic en ACEPTAR para ver tu reporte.\n"
    );

    if(confirm) {
        setIsUnlocked(true);
        // Scroll suave hacia arriba para ver el contenido desbloqueado
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 animate-fade-in-up pb-20 print:text-black">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center bg-gradient-to-r from-mystic-800 to-indigo-900 p-6 rounded-2xl border border-white/10 shadow-lg relative overflow-hidden print:bg-white print:border-black print:shadow-none">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20 print:hidden"></div>
        <div className="relative z-10 print:text-black">
          <h2 className="text-3xl font-serif text-white print:text-black">Hola, {userName}</h2>
          <div className="flex items-center gap-2 mt-2">
            <span className="bg-gold-500/20 text-gold-400 text-xs px-2 py-1 rounded border border-gold-500/30 uppercase tracking-wide font-bold print:border-black print:text-black">Tu Arquetipo Mágico</span>
            <p className="text-purple-100 font-medium print:text-gray-700">{analysis.archetype}</p>
          </div>
        </div>
        <div className="flex gap-6 mt-6 md:mt-0 relative z-10">
          <div className="text-center p-3 bg-black/20 rounded-lg backdrop-blur-sm border border-white/5 print:border-gray-300 print:bg-gray-100">
            <div className="text-[10px] text-purple-300 uppercase tracking-wider mb-1 print:text-gray-600">Sendero de Vida</div>
            <div className="text-3xl font-bold text-gold-400 font-serif print:text-black">{numerology.lifePathNumber}</div>
          </div>
          <div className="text-center p-3 bg-black/20 rounded-lg backdrop-blur-sm border border-white/5 print:border-gray-300 print:bg-gray-100">
            <div className="text-[10px] text-purple-300 uppercase tracking-wider mb-1 print:text-gray-600">Año Personal {targetYear}</div>
            <div className="text-3xl font-bold text-emerald-400 font-serif print:text-black">{numerology.personalYearNumber}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* FREE: Main Forecast Card */}
        <div className="md:col-span-2 bg-mystic-900/50 backdrop-blur border border-white/5 p-6 rounded-2xl shadow-xl print:bg-white print:border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
                <Sparkles className="text-gold-400 h-5 w-5 print:text-black" />
                <h3 className="text-lg font-semibold text-white print:text-black">Tu Horóscopo Financiero {targetYear}</h3>
            </div>
            <span className="text-xs text-emerald-400 bg-emerald-900/30 px-2 py-1 rounded border border-emerald-500/20 print:hidden">Gratuito</span>
          </div>
          
          <p className="text-gray-300 leading-relaxed italic border-l-2 border-gold-500 pl-4 py-2 mb-6 print:text-gray-700">
            "{analysis.yearForecast}"
          </p>
          
          <div className="print:hidden">
             <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="text-emerald-400 h-5 w-5" />
                <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wide">Tu Energía de Abundancia</h3>
             </div>
             <EnergyChart data={analysis.monthlyEnergy} />
             <p className="text-xs text-center text-gray-500 mt-2">Meses con mayor apertura energética para recibir</p>
          </div>
        </div>

        {/* FREE: Quick Stats */}
        <div className="space-y-6">
           <div className="bg-mystic-800/80 p-6 rounded-2xl border border-white/5 shadow-lg print:bg-white print:border-gray-200">
              <div className="flex items-center gap-2 mb-4 text-purple-300 print:text-black">
                <Diamond className="h-5 w-5" />
                <span className="font-semibold">Amuletos Personales</span>
              </div>
              <ul className="space-y-4">
                 <li className="flex justify-between items-center border-b border-white/5 pb-2 print:border-gray-200">
                    <span className="text-gray-400 text-sm print:text-gray-600">Cristal de Poder</span>
                    <span className="text-white font-medium print:text-black">{analysis.luckyGem}</span>
                 </li>
                 <li className="flex justify-between items-center border-b border-white/5 pb-2 print:border-gray-200">
                    <span className="text-gray-400 text-sm print:text-gray-600">Colores</span>
                    <div className="flex gap-1">
                        {analysis.luckyColors.map((c, i) => (
                            <span key={i} className="text-[10px] bg-white/10 px-2 py-1 rounded text-white border border-white/10 print:text-black print:border-black">{c}</span>
                        ))}
                    </div>
                 </li>
                 <li className="flex flex-col gap-1 pt-1">
                    <span className="text-gray-400 text-sm print:text-gray-600">Tu Estilo</span>
                    <span className="text-emerald-300 font-medium text-sm print:text-black">{analysis.investmentStyle}</span>
                 </li>
              </ul>
           </div>

           <div className="bg-gradient-to-br from-emerald-900/20 to-mystic-900 p-6 rounded-2xl border border-emerald-500/20 print:bg-white print:border-gray-200">
              <div className="flex items-center gap-2 mb-3 text-emerald-400 print:text-black">
                <Wallet className="h-5 w-5" />
                <span className="font-semibold">Tus Dones Naturales</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {analysis.wealthStrengths.map((s, i) => (
                    <span key={i} className="bg-emerald-500/10 text-emerald-200 text-xs px-3 py-1.5 rounded-full border border-emerald-500/20 shadow-sm print:text-black print:border-black">
                        {s}
                    </span>
                ))}
              </div>
           </div>
        </div>
      </div>

      {/* PREMIUM GATE SECTION */}
      <div className="relative">
        
        {/* Banner de éxito al desbloquear */}
        {isUnlocked && (
           <div className="bg-gold-500/10 border border-gold-500/50 rounded-xl p-4 mb-6 flex items-center justify-between animate-fade-in-up print:hidden">
              <div className="flex items-center gap-3">
                 <div className="bg-gold-500 rounded-full p-1">
                    <CheckCircle className="h-5 w-5 text-black" />
                 </div>
                 <div>
                    <h3 className="text-gold-400 font-bold text-sm">Reporte Premium Activado</h3>
                    <p className="text-gray-400 text-xs">Tienes acceso completo a la guía anual.</p>
                 </div>
              </div>
              <button onClick={handlePrint} className="bg-mystic-800 hover:bg-mystic-700 text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-colors border border-white/10">
                 <Download className="h-4 w-4" />
                 Descargar PDF
              </button>
           </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            
            {/* Premium: Monthly Advice */}
            <div className={`bg-mystic-800/60 p-6 rounded-2xl border transition-all duration-500 print:bg-white print:border-black ${isUnlocked ? 'border-gold-500/50 shadow-gold-500/10 shadow-lg bg-mystic-900' : 'border-white/10'}`}>
                <div className="flex items-center gap-2 mb-4 text-gold-400 print:text-black">
                    <Star className="h-5 w-5 fill-gold-400 print:fill-black" />
                    <h3 className="font-serif font-bold text-lg">Guía Mensual {targetYear}</h3>
                </div>
                
                <div className="space-y-0 relative">
                    {/* First item always visible as teaser */}
                    {analysis.monthlyBreakdown?.length > 0 && (
                         <div className="flex gap-3 text-sm border-b border-white/5 pb-3 mb-3 print:border-gray-300">
                            <span className="font-bold text-white min-w-[30px] print:text-black">{analysis.monthlyBreakdown[0].month.substring(0,3)}</span>
                            <span className="text-gray-200 print:text-gray-800">{analysis.monthlyBreakdown[0].advice}</span>
                        </div>
                    )}

                    {/* Rest of items */}
                    <div className={`space-y-3 transition-all duration-700 ${!isUnlocked ? 'filter blur-sm select-none opacity-40 pointer-events-none' : ''}`}>
                        {analysis.monthlyBreakdown?.slice(1).map((item, i) => (
                            <div key={i} className="flex gap-3 text-sm border-b border-white/5 pb-2 last:border-0 print:border-gray-300">
                                <span className="font-bold text-white min-w-[30px] print:text-black">{item.month.substring(0,3)}</span>
                                <span className="text-gray-300 print:text-gray-800">{item.advice}</span>
                            </div>
                        ))}
                    </div>
                    
                    {/* Gradient Overlay for Fade Effect when locked */}
                    {!isUnlocked && (
                         <div className="absolute inset-0 bg-gradient-to-b from-transparent to-mystic-900/90 z-0 print:hidden"></div>
                    )}
                </div>
            </div>

            <div className={`space-y-6 transition-all duration-700 ${!isUnlocked ? 'filter blur-md select-none opacity-50 pointer-events-none' : ''}`}>
                {/* Premium: Ritual */}
                <div className={`p-6 rounded-2xl border transition-all duration-500 print:bg-white print:border-black ${isUnlocked ? 'bg-indigo-900/40 border-indigo-400/50' : 'bg-indigo-900/30 border-indigo-500/30'}`}>
                    <h3 className="text-indigo-300 font-serif font-bold mb-2 flex items-center gap-2 print:text-black">
                        <Sparkles className="h-4 w-4"/> Ritual Abre-Caminos
                    </h3>
                    <p className="text-gray-200 text-sm leading-relaxed print:text-gray-800">{analysis.wealthRitual}</p>
                </div>

                {/* Premium: Sectors */}
                <div className={`p-6 rounded-2xl border transition-all duration-500 print:bg-white print:border-black ${isUnlocked ? 'bg-emerald-900/30 border-emerald-400/50' : 'bg-emerald-900/20 border-emerald-500/30'}`}>
                    <h3 className="text-emerald-300 font-serif font-bold mb-3 flex items-center gap-2 print:text-black">
                        <Heart className="h-4 w-4"/> Dónde poner tu energía ($)
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {analysis.bestInvestmentSectors?.map((sector, i) => (
                            <span key={i} className="bg-emerald-500/20 text-emerald-200 px-3 py-1 rounded text-sm font-medium border border-emerald-500/30 print:bg-gray-100 print:text-black print:border-gray-300">{sector}</span>
                        ))}
                    </div>
                </div>
                
                {/* Premium: Compatibility */}
                <div className={`p-6 rounded-2xl border transition-all duration-500 print:bg-white print:border-black ${isUnlocked ? 'bg-purple-900/30 border-purple-400/50' : 'bg-purple-900/20 border-purple-500/30'}`}>
                        <h3 className="text-purple-300 font-serif font-bold mb-2 print:text-black">Números Compatibles</h3>
                        <p className="text-gray-300 text-sm print:text-gray-800">{analysis.businessCompatibility}</p>
                </div>
            </div>
        </div>

        {/* The Lock Overlay */}
        {!isUnlocked && (
            <div className="absolute inset-0 z-10 flex items-center justify-center top-20 print:hidden">
                <div className="bg-mystic-900/95 border border-gold-500/50 p-8 rounded-2xl shadow-2xl max-w-md text-center transform hover:scale-105 transition-transform duration-300 group backdrop-blur-xl">
                    <div className="w-16 h-16 bg-gold-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-gold-500/50 group-hover:bg-gold-500/30 transition-colors">
                        <Lock className="h-8 w-8 text-gold-400" />
                    </div>
                    <h3 className="text-2xl font-serif text-white mb-2">Desbloquea tu Año Mágico {targetYear}</h3>
                    <p className="text-gray-400 text-sm mb-6">
                        Accede a tu guía completa. Consejos sencillos mes a mes y rituales prácticos para mejorar tu economía doméstica.
                    </p>
                    
                    <ul className="text-left text-sm text-gray-300 space-y-2 mb-6 bg-white/5 p-4 rounded-lg">
                        <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-emerald-400"/> Micro-acciones mes a mes</li>
                        <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-emerald-400"/> Áreas de vida donde florecerás</li>
                        <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-emerald-400"/> Ritual personalizado de prosperidad</li>
                    </ul>

                    <button 
                        onClick={handleUnlockRedirect}
                        className="w-full bg-gradient-to-r from-gold-500 to-amber-600 hover:from-gold-400 hover:to-amber-500 text-black font-bold py-3 rounded-lg shadow-lg flex items-center justify-center gap-2 transition-all active:scale-95 group-hover:shadow-gold-500/20"
                    >
                        <ExternalLink className="h-5 w-5" />
                        Ver Reporte Completo ($9.99)
                    </button>
                    <p className="text-[10px] text-gray-500 mt-3">Pago único y seguro. Acceso inmediato.</p>
                </div>
            </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="flex justify-center pt-8 border-t border-white/5 print:hidden">
        <button 
            onClick={onReset}
            className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors hover:bg-white/5 px-6 py-2 rounded-full text-sm"
        >
            <RefreshCw className="h-4 w-4" />
            Calcular otra fecha
        </button>
      </div>

    </div>
  );
};

export default ResultDashboard;
