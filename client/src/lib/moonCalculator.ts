import { LunarDataEngine } from "./lunarDataEngine";

export interface MoonPhaseResult {
  phase: string;
  zodiacSign: string;
  image: string;
  description: string;
  element: string;
  characteristics: string[];
  illumination: number;
  energy: string;
  compatibility_meaning: string;
  rating: string;
  score: number;
}

export function calculateMoonPhase(dateString: string): MoonPhaseResult {
  return LunarDataEngine.calculateMoonPhase(dateString);
}
