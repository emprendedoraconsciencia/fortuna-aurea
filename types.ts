export interface UserProfile {
  name: string;
  email: string;
  birthDate: string; // YYYY-MM-DD
}

export interface NumerologyData {
  lifePathNumber: number;
  personalYearNumber: number;
  destinyNumber: number; 
}

export interface ChartDataPoint {
  month: string;
  energy: number;
}

export interface AIAnalysis {
  archetype: string;
  wealthStrengths: string[];
  wealthChallenges: string[];
  yearForecast: string;
  luckyColors: string[];
  luckyGem: string;
  investmentStyle: string;
  monthlyEnergy: number[]; // Array of 12 numbers
  // Premium Fields
  monthlyBreakdown: { month: string; advice: string }[];
  wealthRitual: string;
  bestInvestmentSectors: string[];
  businessCompatibility: string;
}

export interface FullReport {
  numerology: NumerologyData;
  analysis: AIAnalysis;
}