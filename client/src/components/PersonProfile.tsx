import { Card, CardContent } from "@/components/ui/card";

interface PersonData {
  name: string;
  date: string;
  image: string | null;
  moonPhase: string;
  zodiacSign: string;
  moonImage: string;
  description: string;
}

interface PersonProfileProps {
  person: PersonData;
}

export function PersonProfile({ person }: PersonProfileProps) {
  const formatDate = (dateString: string) => {
    // If it's already a formatted date or person name, return as is
    if (dateString.includes(',') || !dateString.includes('-')) {
      return dateString;
    }
    
    // Format YYYY-MM-DD to readable date
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Card className="bg-cosmic-gray border-cosmic-light cosmic-gradient">
      <CardContent className="p-6">
        <div className="text-center mb-6">
          <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden bg-cosmic-light">
            {person.image ? (
              <img 
                src={person.image} 
                alt={person.name} 
                className="w-full h-full object-cover"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-cosmic-orange font-bold text-lg">
                {person.name.charAt(0)}
              </div>
            )}
          </div>
          <h3 className="text-xl font-semibold mb-2 text-white">
            {person.name}
          </h3>
          <p className="text-gray-300">
            {formatDate(person.date)}
          </p>
        </div>

        <div className="text-center mb-6">
          <p className="text-cosmic-orange font-semibold text-lg mb-4">
            {person.moonPhase} in {person.zodiacSign}
          </p>
          <div className="w-32 h-32 mx-auto mb-4">
            <img 
              src={person.moonImage} 
              alt={person.moonPhase} 
              className="w-full h-full object-cover rounded-full glow-effect"
              loading="lazy"
            />
          </div>
        </div>

        <div className="text-gray-300 leading-relaxed">
          <p>{person.description}</p>
        </div>
      </CardContent>
    </Card>
  );
}
