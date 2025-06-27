import type { MoonPhaseResult } from "./moonCalculator";

export interface CompatibilityResult {
  score: number;
  title: string;
  analysis: string;
  isSoulmate: boolean;
}

export function calculateCompatibility(
  person1: MoonPhaseResult,
  person2: MoonPhaseResult
): CompatibilityResult {
  // Enhanced compatibility using lunar data engine results
  const phaseScore = getPhaseCompatibility(person1.phase, person2.phase);
  const elementScore = getElementCompatibility(person1.element, person2.element);
  const zodiacScore = getZodiacCompatibility(person1.zodiacSign, person2.zodiacSign);
  
  // Factor in illumination levels and energy types for more accurate results
  const illuminationScore = getIlluminationCompatibility(person1.illumination || 50, person2.illumination || 50);
  const energyScore = getEnergyCompatibility(person1.energy || 'Balanced', person2.energy || 'Balanced');
  
  // Weighted calculation with enhanced lunar factors
  const score = Math.round(
    (phaseScore * 0.25 + 
     elementScore * 0.20 + 
     zodiacScore * 0.25 + 
     illuminationScore * 0.15 + 
     energyScore * 0.15)
  );
  
  // Ensure score is within bounds
  const finalScore = Math.max(0, Math.min(100, score));
  
  const isSoulmate = finalScore >= 85;
  const title = isSoulmate ? "You Are Soulmates!" : `${finalScore}% Match!`;
  
  const analysis = generateCompatibilityAnalysis(person1, person2, finalScore);
  
  return {
    score: finalScore,
    title,
    analysis,
    isSoulmate,
  };
}

function getPhaseCompatibility(phase1: string, phase2: string): number {
  const phaseValues: Record<string, number> = {
    "New Moon": 0,
    "Waxing Crescent": 1,
    "First Quarter": 2,
    "Waxing Gibbous": 3,
    "Full Moon": 4,
    "Waning Gibbous": 5,
    "Last Quarter": 6,
    "Waning Crescent": 7,
  };
  
  const value1 = phaseValues[phase1];
  const value2 = phaseValues[phase2];
  
  if (value1 === undefined || value2 === undefined) return 0;
  
  const difference = Math.abs(value1 - value2);
  
  // Complementary phases (opposite) get high compatibility
  if (difference === 4) return 25;
  
  // Adjacent phases get medium compatibility
  if (difference === 1 || difference === 7) return 15;
  
  // Same phase gets good compatibility
  if (difference === 0) return 20;
  
  // Quarter phases (90 degrees apart) get moderate compatibility
  if (difference === 2 || difference === 6) return 10;
  
  // Other combinations get lower compatibility
  return 5;
}

function getElementCompatibility(element1: string, element2: string): number {
  const compatibleElements: Record<string, string[]> = {
    fire: ["air", "fire"],
    earth: ["water", "earth"],
    air: ["fire", "air"],
    water: ["earth", "water"],
  };
  
  if (compatibleElements[element1]?.includes(element2)) {
    return element1 === element2 ? 15 : 20; // Same element = 15, compatible = 20
  }
  
  return 5; // Incompatible elements
}

function getZodiacCompatibility(sign1: string, sign2: string): number {
  const compatibleSigns: Record<string, string[]> = {
    "Aries": ["Leo", "Sagittarius", "Gemini", "Aquarius"],
    "Taurus": ["Virgo", "Capricorn", "Cancer", "Pisces"],
    "Gemini": ["Libra", "Aquarius", "Aries", "Leo"],
    "Cancer": ["Scorpio", "Pisces", "Taurus", "Virgo"],
    "Leo": ["Aries", "Sagittarius", "Gemini", "Libra"],
    "Virgo": ["Taurus", "Capricorn", "Cancer", "Scorpio"],
    "Libra": ["Gemini", "Aquarius", "Leo", "Sagittarius"],
    "Scorpio": ["Cancer", "Pisces", "Virgo", "Capricorn"],
    "Sagittarius": ["Aries", "Leo", "Libra", "Aquarius"],
    "Capricorn": ["Taurus", "Virgo", "Scorpio", "Pisces"],
    "Aquarius": ["Gemini", "Libra", "Aries", "Sagittarius"],
    "Pisces": ["Cancer", "Scorpio", "Taurus", "Capricorn"],
  };
  
  if (sign1 === sign2) return 10; // Same sign
  if (compatibleSigns[sign1]?.includes(sign2)) return 15; // Compatible signs
  
  return 0; // Neutral compatibility
}

function generateCompatibilityAnalysis(
  person1: MoonPhaseResult,
  person2: MoonPhaseResult,
  score: number
): string {
  const analysisTemplates = {
    high: [
      `The ${person1.phase} and ${person2.phase} create a powerful cosmic connection that transcends ordinary relationships. This combination represents a rare alignment of energies that fosters both deep emotional understanding and exciting growth opportunities.`,
      `Your relationship has the potential for incredible transformation and mutual support. The ${person1.element} energy of ${person1.phase} beautifully complements the ${person2.element} nature of ${person2.phase}, creating a harmonious balance that few couples achieve.`,
      `Together, you embody the perfect synthesis of ${person1.characteristics.join(", ")} and ${person2.characteristics.join(", ")} qualities. This creates a relationship dynamic where both partners can flourish while maintaining their individual strengths.`,
    ],
    medium: [
      `The ${person1.phase} and ${person2.phase} pairing offers a balanced relationship with good potential for growth. While your lunar energies may sometimes create gentle friction, this actually helps both partners evolve and learn from each other.`,
      `Your compatibility lies in the way your different approaches to life complement each other. The ${person1.element} energy brings stability to the partnership, while the ${person2.element} influence adds the perfect amount of dynamic energy.`,
      `With mutual understanding and respect for your differences, this relationship can develop into something truly meaningful. Your combined ${person1.characteristics.join(", ")} and ${person2.characteristics.join(", ")} traits create opportunities for both passion and stability.`,
    ],
    low: [
      `The ${person1.phase} and ${person2.phase} combination presents interesting challenges that, when approached with awareness and patience, can lead to significant personal growth for both partners.`,
      `While your lunar energies may initially seem at odds, this contrast can actually create a fascinating dynamic where each partner brings something completely different to the relationship.`,
      `Success in this pairing requires embracing your differences rather than trying to change them. The ${person1.element} and ${person2.element} energies can learn much from each other when approached with openness and curiosity.`,
    ],
  };
  
  let category: 'high' | 'medium' | 'low';
  if (score >= 75) category = 'high';
  else if (score >= 50) category = 'medium';
  else category = 'low';
  
  return analysisTemplates[category].join(' ');
}

function getIlluminationCompatibility(illumination1: number, illumination2: number): number {
  const difference = Math.abs(illumination1 - illumination2);
  
  // Similar illumination levels indicate similar life phases and energy
  if (difference <= 10) return 25; // Very similar
  if (difference <= 25) return 20; // Somewhat similar
  if (difference <= 50) return 15; // Moderate difference
  if (difference <= 75) return 10; // Significant difference
  return 5; // Very different
}

function getEnergyCompatibility(energy1: string, energy2: string): number {
  const energyCompatibility: Record<string, Record<string, number>> = {
    'Renewal': { 'Renewal': 25, 'Growth': 20, 'Action': 15, 'Refinement': 15, 'Culmination': 10, 'Gratitude': 15, 'Release': 20, 'Reflection': 25 },
    'Growth': { 'Renewal': 20, 'Growth': 25, 'Action': 25, 'Refinement': 20, 'Culmination': 15, 'Gratitude': 10, 'Release': 15, 'Reflection': 20 },
    'Action': { 'Renewal': 15, 'Growth': 25, 'Action': 25, 'Refinement': 20, 'Culmination': 20, 'Gratitude': 15, 'Release': 10, 'Reflection': 15 },
    'Refinement': { 'Renewal': 15, 'Growth': 20, 'Action': 20, 'Refinement': 25, 'Culmination': 25, 'Gratitude': 20, 'Release': 15, 'Reflection': 15 },
    'Culmination': { 'Renewal': 10, 'Growth': 15, 'Action': 20, 'Refinement': 25, 'Culmination': 25, 'Gratitude': 25, 'Release': 20, 'Reflection': 15 },
    'Gratitude': { 'Renewal': 15, 'Growth': 10, 'Action': 15, 'Refinement': 20, 'Culmination': 25, 'Gratitude': 25, 'Release': 25, 'Reflection': 20 },
    'Release': { 'Renewal': 20, 'Growth': 15, 'Action': 10, 'Refinement': 15, 'Culmination': 20, 'Gratitude': 25, 'Release': 25, 'Reflection': 25 },
    'Reflection': { 'Renewal': 25, 'Growth': 20, 'Action': 15, 'Refinement': 15, 'Culmination': 15, 'Gratitude': 20, 'Release': 25, 'Reflection': 25 },
    'Balanced': { 'Renewal': 20, 'Growth': 20, 'Action': 20, 'Refinement': 20, 'Culmination': 20, 'Gratitude': 20, 'Release': 20, 'Reflection': 20 }
  };
  
  return energyCompatibility[energy1]?.[energy2] || energyCompatibility['Balanced'][energy2] || 15;
}
