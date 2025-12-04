import { GoogleGenAI, Type } from "@google/genai";
import { AIAnalysis } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Datos de respaldo y para DEMO gratuita (sin consumo de API)
export const FALLBACK_DATA: AIAnalysis = {
  archetype: "El Mago Práctico",
  wealthStrengths: ["Intuición para las gangas", "Capacidad de ahorro", "Generosidad"],
  wealthChallenges: ["Miedo a gastar en ti mismo", "Desorden en los papeles"],
  yearForecast: `Este año la abundancia entrará por la puerta de tu casa. Ordena tu espacio físico para permitir que fluyan nuevas oportunidades económicas.`,
  luckyColors: ["Verde Bosque", "Dorado"],
  luckyGem: "Citrino",
  investmentStyle: "Intuitivo y Casero",
  monthlyEnergy: [40, 50, 65, 80, 75, 60, 50, 85, 95, 80, 60, 70],
  monthlyBreakdown: [
    { month: "Enero", advice: "Limpia a fondo tu bolso o cartera. Tira tickets viejos para dejar espacio a lo nuevo." },
    { month: "Febrero", advice: "Pon tres hojas de laurel en tu zapato para atraer caminos prósperos." },
    { month: "Marzo", advice: "Empieza un 'Bote de los Deseos': guarda cada moneda de 2€ que caiga en tus manos." },
    { month: "Abril", advice: "Revisa los armarios y vende o regala lo que no uses. La energía estancada bloquea el dinero." },
    { month: "Mayo", advice: "Compra una planta del dinero (Plectranthus) y colócala en la entrada." },
    { month: "Junio", advice: "Invierte en sábanas nuevas o algo que mejore tu descanso. El descanso trae claridad." },
    { month: "Julio", advice: "Evita prestar dinero este mes, regala tu tiempo o comida en su lugar." },
    { month: "Agosto", advice: "Escribe una carta de agradecimiento al dinero por lo que te permite hacer." },
    { month: "Septiembre", advice: "Arregla cualquier cosa rota en casa, especialmente fugas de agua." },
    { month: "Octubre", advice: "Enciende una vela verde los jueves visualizando tus metas cumplidas." },
    { month: "Noviembre", advice: "Cocina con canela y clavo para endulzar tus finanzas antes de fin de año." },
    { month: "Diciembre", advice: "Haz una donación pequeña pero significativa para mantener la rueda de dar y recibir." }
  ],
  wealthRitual: "Toma un billete, úntalo con un poco de aceite de canela y guárdalo en un compartimento secreto de tu cartera como imán.",
  bestInvestmentSectors: ["Decoración del hogar", "Tu bienestar físico", "Regalos para seres queridos"],
  businessCompatibility: "Personas nacidas los días 4 y 8"
};

export const generateFinancialReading = async (
  lifePath: number,
  personalYear: number,
  birthDate: string,
  targetYear: number
): Promise<AIAnalysis> => {
  
  const prompt = `
    Actúa como un Coach Espiritual de Abundancia y Numerólogo Intuitivo. Tu audiencia son personas que creen en la energía y lo místico.

    CONTEXTO TEMPORAL:
    Estamos creando una predicción para el AÑO: ${targetYear}.
    Asegúrate de que todas las fechas y consejos se refieran a este año.

    Datos del usuario:
    - Sendero de Vida (Life Path): ${lifePath}
    - Año Personal para ${targetYear}: ${personalYear}
    - Fecha nacimiento: ${birthDate}
    
    Genera un "Reporte de Abundancia y Flujo de Dinero ${targetYear}".
    
    INSTRUCCIONES CLAVE PARA EL CONTENIDO (TONO "DE ANDAR POR CASA" / MÍSTICO ACCIONABLE):
    1. 'monthlyBreakdown': Acciones MUY SENCILLAS y domésticas. Mezcla psicología del dinero con energía.
       - Genera 12 consejos, uno para cada mes de ${targetYear}.
       - EJEMPLOS BUENOS: "Limpia tu cartera de tickets viejos para dejar espacio al dinero", "Pon una planta de albahaca en tu cocina", "Cancela esa suscripción que no usas", "Guarda todas las monedas de 2€ en un bote", "Arregla los grifos que gotean (fuga de dinero)".
       - EJEMPLOS PROHIBIDOS: "Invierte en ETFs", "Diversifica tu portfolio", "Compra bonos".
    
    2. 'bestInvestmentSectors': No digas sectores de bolsa. Di áreas de su vida personal donde poner el dinero.
       - Ejemplos: "Reformas en el hogar", "Cursos de cocina", "Tu propia imagen", "Viajes espirituales".

    3. 'wealthRitual': Un acto psicomágico muy fácil de hacer en casa con ingredientes comunes (sal, canela, velas, papel, laurel).
    
    IMPORTANTE: El array monthlyEnergy debe tener 12 números (0-100).
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            archetype: { type: Type.STRING, description: "Título místico del perfil (ej: El Guardián del Hogar, El Alquimista)" },
            wealthStrengths: { type: Type.ARRAY, items: { type: Type.STRING }, description: "3 fortalezas naturales" },
            wealthChallenges: { type: Type.ARRAY, items: { type: Type.STRING }, description: "2 bloqueos emocionales con el dinero" },
            yearForecast: { type: Type.STRING, description: "Predicción general inspiradora (max 40 palabras)" },
            luckyColors: { type: Type.ARRAY, items: { type: Type.STRING } },
            luckyGem: { type: Type.STRING },
            investmentStyle: { type: Type.STRING, description: "Estilo de manejo del dinero (ej: Hormiguita, Generoso, Intuitivo)" },
            monthlyEnergy: { type: Type.ARRAY, items: { type: Type.INTEGER }, description: "Niveles 0-100 para 12 meses" },
            // Premium Data
            monthlyBreakdown: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  month: { type: Type.STRING },
                  advice: { type: Type.STRING, description: "Acción casera/mística concreta" }
                }
              },
              description: "Guía mes a mes. 12 items."
            },
            wealthRitual: { type: Type.STRING, description: "Ritual casero detallado." },
            bestInvestmentSectors: { type: Type.ARRAY, items: { type: Type.STRING }, description: "3 áreas de vida donde gastar/invertir." },
            businessCompatibility: { type: Type.STRING, description: "Números con buena vibra para ti." }
          },
          required: ["archetype", "wealthStrengths", "wealthChallenges", "yearForecast", "luckyColors", "luckyGem", "investmentStyle", "monthlyEnergy", "monthlyBreakdown", "wealthRitual", "bestInvestmentSectors", "businessCompatibility"],
        },
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text) as AIAnalysis;
  } catch (error) {
    console.error("Error generating reading:", error);
    // Return Fallback data extended
    // Actualizamos el año en el fallback dinámicamente si falla la API
    return {
        ...FALLBACK_DATA,
        yearForecast: FALLBACK_DATA.yearForecast.replace("Este año", `Este año ${targetYear}`)
    };
  }
};
