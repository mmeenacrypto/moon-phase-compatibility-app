export interface MoonPhaseData {
  name: string;
  image: string;
  description: string;
  element: string;
  characteristics: string[];
}

export const moonPhases: MoonPhaseData[] = [
  {
    name: "New Moon",
    image: "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
    description: "New Moon babies are natural innovators and pioneers. You have a fresh perspective on life and aren't afraid to start new ventures or explore uncharted territories. Your intuitive nature makes you deeply spiritual and connected to the mystical aspects of life.",
    element: "water",
    characteristics: ["innovative", "pioneering", "intuitive", "spiritual"]
  },
  {
    name: "Waxing Crescent",
    image: "https://images.unsplash.com/photo-1494253109108-2e30c049369b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
    description: "Those born under a Waxing Crescent are optimistic and determined. You have a natural ability to see potential in everything and everyone. Your growing energy helps you manifest your dreams into reality.",
    element: "earth",
    characteristics: ["optimistic", "determined", "potential-focused", "manifesting"]
  },
  {
    name: "First Quarter",
    image: "https://images.unsplash.com/photo-1446776634373-fda9e2d65b07?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
    description: "First Quarter moon natives are natural problem-solvers and decision-makers. You thrive on challenges and have the courage to take action when others hesitate. Your balanced nature helps you see both sides of any situation.",
    element: "air",
    characteristics: ["problem-solving", "decisive", "courageous", "balanced"]
  },
  {
    name: "Waxing Gibbous",
    image: "https://images.unsplash.com/photo-1569640214047-e7c2dba7b95d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
    description: "Waxing Gibbous individuals are perfectionists with a strong desire to improve everything around them. You have incredible patience and persistence, always working toward your highest potential.",
    element: "earth",
    characteristics: ["perfectionist", "improving", "patient", "persistent"]
  },
  {
    name: "Full Moon",
    image: "https://images.unsplash.com/photo-1509233725247-49e657c54213?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
    description: "People born under a Full Moon are naturally charismatic and emotionally expressive. You have a strong presence and tend to be the center of attention in social situations. Your emotional nature is intense and you feel things deeply.",
    element: "fire",
    characteristics: ["charismatic", "expressive", "intense", "magnetic"]
  },
  {
    name: "Waning Gibbous",
    image: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
    description: "Waning Gibbous natives are natural teachers and healers. You have a deep wisdom and love sharing your knowledge with others. Your nurturing nature makes you incredibly supportive to those around you.",
    element: "water",
    characteristics: ["teaching", "healing", "wise", "nurturing"]
  },
  {
    name: "Last Quarter",
    image: "https://images.unsplash.com/photo-1446776691208-bbec3a9efc13?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
    description: "Last Quarter moon individuals are introspective and philosophical. You have a natural ability to release what no longer serves you and help others do the same. Your wisdom comes from deep inner reflection.",
    element: "air",
    characteristics: ["introspective", "philosophical", "releasing", "wise"]
  },
  {
    name: "Waning Crescent",
    image: "https://images.unsplash.com/photo-1446776558166-79c8ba645993?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
    description: "Waning Crescent people are old souls with profound spiritual insight. You have a natural connection to the mystical realms and often serve as a bridge between the physical and spiritual worlds.",
    element: "water",
    characteristics: ["old-soul", "spiritual", "mystical", "bridge-builder"]
  }
];

export const zodiacSigns = [
  "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
  "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"
];
