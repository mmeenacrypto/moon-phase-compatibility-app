import { calculateMoonPhase } from "./moonCalculator";
import { calculateCompatibility } from "./compatibilityEngine";
import { celebrities } from "../data/celebrities";

export interface CompatibilityInput {
  person1Type: 'date' | 'celebrity';
  person1Value: string;
  person2Type: 'date' | 'celebrity';
  person2Value: string;
}

export interface PersonData {
  name: string;
  date: string;
  image: string | null;
  moonPhase: string;
  zodiacSign: string;
  moonImage: string;
  description: string;
}

export interface CompatibilityResultData {
  person1: PersonData;
  person2: PersonData;
  compatibility: {
    score: number;
    title: string;
    analysis: string;
    isSoulmate: boolean;
  };
  shareUrl: string;
}

export function calculateClientCompatibility(input: CompatibilityInput): CompatibilityResultData {
  // Process person 1
  let person1Date: string;
  let person1Name: string;
  let person1Image: string | null = null;
  
  if (input.person1Type === 'date') {
    person1Date = input.person1Value;
    person1Name = person1Date;
  } else {
    const celeb = celebrities.find(c => c.slug === input.person1Value);
    if (!celeb) {
      throw new Error("Celebrity not found");
    }
    person1Date = celeb.birthDate;
    person1Name = celeb.name;
    person1Image = celeb.image;
  }
  
  // Process person 2
  let person2Date: string;
  let person2Name: string;
  let person2Image: string | null = null;
  
  if (input.person2Type === 'date') {
    person2Date = input.person2Value;
    person2Name = person2Date;
  } else {
    const celeb = celebrities.find(c => c.slug === input.person2Value);
    if (!celeb) {
      throw new Error("Celebrity not found");
    }
    person2Date = celeb.birthDate;
    person2Name = celeb.name;
    person2Image = celeb.image;
  }
  
  // Calculate moon phases
  const person1MoonData = calculateMoonPhase(person1Date);
  const person2MoonData = calculateMoonPhase(person2Date);
  
  // Calculate compatibility
  const compatibility = calculateCompatibility(person1MoonData, person2MoonData);
  
  // Generate share URL
  const shareUrl = `${input.person1Value}+${input.person2Value}`;
  
  return {
    person1: {
      name: person1Name,
      date: person1Date,
      image: person1Image,
      moonPhase: person1MoonData.phase,
      zodiacSign: person1MoonData.zodiacSign,
      moonImage: person1MoonData.image,
      description: person1MoonData.description,
    },
    person2: {
      name: person2Name,
      date: person2Date,
      image: person2Image,
      moonPhase: person2MoonData.phase,
      zodiacSign: person2MoonData.zodiacSign,
      moonImage: person2MoonData.image,
      description: person2MoonData.description,
    },
    compatibility: compatibility,
    shareUrl,
  };
}

export function searchCelebrities(query: string): typeof celebrities {
  if (!query || query.length < 2) {
    return [];
  }
  
  return celebrities.filter(celeb => 
    celeb.name.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 10);
}

// URL encoding/decoding for sharing results
export function encodeShareData(input: CompatibilityInput): string {
  const data = {
    p1t: input.person1Type,
    p1v: input.person1Value,
    p2t: input.person2Type,
    p2v: input.person2Value,
  };
  return btoa(JSON.stringify(data));
}

export function decodeShareData(encoded: string): CompatibilityInput | null {
  try {
    const decoded = JSON.parse(atob(encoded));
    return {
      person1Type: decoded.p1t,
      person1Value: decoded.p1v,
      person2Type: decoded.p2t,
      person2Value: decoded.p2v,
    };
  } catch {
    return null;
  }
}