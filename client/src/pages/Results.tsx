import { useQuery } from "@tanstack/react-query";
import { MoonPhaseSVG } from "../components/MoonPhaseSVG";
import { Heart, Star, Calendar, User } from "lucide-react";

interface ResultsProps {
  params: { shareUrl: string };
}

export default function Results({ params }: ResultsProps) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['/api/compatibility', params.shareUrl],
    queryFn: () => fetch(`/api/compatibility/${params.shareUrl}`).then(res => res.json())
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-cosmic-dark flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="relative">
            <div className="animate-spin w-16 h-16 border-4 border-cosmic-orange border-t-transparent rounded-full mx-auto"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <MoonPhaseSVG phase="Full Moon" size={40} />
            </div>
          </div>
          <p className="text-gray-300 text-lg">Calculating cosmic compatibility...</p>
          <div className="flex items-center justify-center space-x-2">
            <Star className="h-4 w-4 text-cosmic-orange animate-pulse" />
            <Star className="h-4 w-4 text-cosmic-purple animate-pulse" style={{ animationDelay: '0.5s' }} />
            <Star className="h-4 w-4 text-cosmic-orange animate-pulse" style={{ animationDelay: '1s' }} />
          </div>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-cosmic-dark flex items-center justify-center">
        <div className="text-center space-y-6 max-w-md mx-auto px-4">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto">
            <span className="text-red-400 text-2xl">✗</span>
          </div>
          <h2 className="text-xl font-semibold text-red-400">Compatibility Data Not Found</h2>
          <p className="text-gray-400">The cosmic alignment you're looking for has drifted beyond our reach.</p>
          <a 
            href="/" 
            className="inline-flex items-center space-x-2 bg-cosmic-orange text-white px-6 py-3 rounded-full hover:bg-cosmic-orange/80 transition-colors"
          >
            <span>Calculate New Compatibility</span>
          </a>
        </div>
      </div>
    );
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-400";
    if (score >= 65) return "text-yellow-400";
    if (score >= 50) return "text-orange-400";
    return "text-red-400";
  };

  const getScoreGradient = (score: number) => {
    if (score >= 80) return "from-green-400 to-emerald-600";
    if (score >= 65) return "from-yellow-400 to-orange-500";
    if (score >= 50) return "from-orange-400 to-red-500";
    return "from-red-400 to-pink-600";
  };

  const getCompatibilityIcon = (score: number) => {
    if (score >= 80) return "💫";
    if (score >= 65) return "🌟";
    if (score >= 50) return "✨";
    return "🌙";
  };

  const getZodiacSymbol = (sign: string) => {
    const symbols: Record<string, string> = {
      'Aries': '♈', 'Taurus': '♉', 'Gemini': '♊', 'Cancer': '♋',
      'Leo': '♌', 'Virgo': '♍', 'Libra': '♎', 'Scorpio': '♏',
      'Sagittarius': '♐', 'Capricorn': '♑', 'Aquarius': '♒', 'Pisces': '♓'
    };
    return symbols[sign] || '⭐';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cosmic-dark via-purple-900/10 to-cosmic-dark">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          
          {/* Header with Compatibility Score */}
          <div className="text-center mb-16">
            <div className="relative inline-block mb-8">
              <div className={`w-32 h-32 rounded-full bg-gradient-to-br ${getScoreGradient(data.compatibility.score)} p-1`}>
                <div className="w-full h-full bg-cosmic-dark rounded-full flex items-center justify-center">
                  <span className={`text-4xl font-bold ${getScoreColor(data.compatibility.score)}`}>
                    {data.compatibility.score}%
                  </span>
                </div>
              </div>
              <div className="absolute -top-2 -right-2 text-3xl">
                {getCompatibilityIcon(data.compatibility.score)}
              </div>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-cosmic-orange">
              {data.compatibility.title}
            </h2>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed">
              {data.compatibility.analysis}
            </p>
          </div>

          {/* Parallel Profile Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            
            {/* Person 1 Card */}
            <div className="bg-gradient-to-br from-cosmic-purple/10 to-cosmic-orange/10 backdrop-blur-sm rounded-2xl p-8 border border-cosmic-purple/30 transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center space-x-4 mb-6">
                {data.person1.image ? (
                  <img 
                    src={data.person1.image} 
                    alt={data.person1.name}
                    className="w-20 h-20 rounded-full object-cover border-4 border-cosmic-orange/50"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cosmic-purple to-cosmic-orange flex items-center justify-center">
                    <User className="w-10 h-10 text-white" />
                  </div>
                )}
                <div>
                  <h3 className="text-2xl font-bold text-white">{data.person1.name}</h3>
                  <div className="flex items-center space-x-2 text-gray-300">
                    <Calendar className="w-4 h-4" />
                    <span>{data.person1.date}</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="text-center">
                    <MoonPhaseSVG phase={data.person1.moonPhase} size={80} className="mx-auto mb-2" />
                    <p className="text-cosmic-orange font-semibold">{data.person1.moonPhase}</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-cosmic-purple/20 rounded-full flex items-center justify-center mb-2">
                      <span className="text-2xl">{getZodiacSymbol(data.person1.zodiacSign)}</span>
                    </div>
                    <p className="text-cosmic-purple font-semibold">{data.person1.zodiacSign}</p>
                  </div>
                </div>
                
                <div className="bg-cosmic-dark/50 rounded-xl p-4">
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {data.person1.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Person 2 Card */}
            <div className="bg-gradient-to-br from-cosmic-orange/10 to-cosmic-purple/10 backdrop-blur-sm rounded-2xl p-8 border border-cosmic-orange/30 transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center space-x-4 mb-6">
                {data.person2.image ? (
                  <img 
                    src={data.person2.image} 
                    alt={data.person2.name}
                    className="w-20 h-20 rounded-full object-cover border-4 border-cosmic-purple/50"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cosmic-orange to-cosmic-purple flex items-center justify-center">
                    <User className="w-10 h-10 text-white" />
                  </div>
                )}
                <div>
                  <h3 className="text-2xl font-bold text-white">{data.person2.name}</h3>
                  <div className="flex items-center space-x-2 text-gray-300">
                    <Calendar className="w-4 h-4" />
                    <span>{data.person2.date}</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="text-center">
                    <MoonPhaseSVG phase={data.person2.moonPhase} size={80} className="mx-auto mb-2" />
                    <p className="text-cosmic-orange font-semibold">{data.person2.moonPhase}</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-cosmic-orange/20 rounded-full flex items-center justify-center mb-2">
                      <span className="text-2xl">{getZodiacSymbol(data.person2.zodiacSign)}</span>
                    </div>
                    <p className="text-cosmic-purple font-semibold">{data.person2.zodiacSign}</p>
                  </div>
                </div>
                
                <div className="bg-cosmic-dark/50 rounded-xl p-4">
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {data.person2.description}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Analysis Section */}
          <div className="bg-gradient-to-br from-cosmic-dark/80 to-cosmic-purple/20 backdrop-blur-sm rounded-2xl p-8 border border-cosmic-purple/30 mb-12">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-cosmic-orange mb-4">
                Cosmic Compatibility Analysis
              </h3>
              <div className="flex items-center justify-center space-x-2">
                <Heart className="h-6 w-6 text-red-400" />
                <span className="text-gray-300">Powered by lunar wisdom and astronomical precision</span>
                <Heart className="h-6 w-6 text-red-400" />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-cosmic-purple/20 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl">🌙</span>
                </div>
                <h4 className="text-lg font-semibold text-cosmic-purple">Lunar Harmony</h4>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Your moon phases create a {data.compatibility.score >= 70 ? 'harmonious' : 'complex'} energetic dance, 
                  bringing together {data.person1.moonPhase.toLowerCase()} and {data.person2.moonPhase.toLowerCase()} influences.
                </p>
              </div>
              
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-cosmic-orange/20 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl">⭐</span>
                </div>
                <h4 className="text-lg font-semibold text-cosmic-orange">Zodiac Synergy</h4>
                <p className="text-gray-300 text-sm leading-relaxed">
                  The {data.person1.zodiacSign}-{data.person2.zodiacSign} combination offers 
                  {data.compatibility.score >= 70 ? ' natural understanding and shared values' : ' opportunities for growth and learning from differences'}.
                </p>
              </div>
              
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-yellow-400/20 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl">✨</span>
                </div>
                <h4 className="text-lg font-semibold text-yellow-400">Cosmic Potential</h4>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Your {data.compatibility.score}% compatibility suggests 
                  {data.compatibility.score >= 80 ? ' exceptional cosmic alignment' :
                   data.compatibility.score >= 60 ? ' strong potential for deep connection' :
                   ' valuable lessons and personal growth opportunities'}.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: 'Moon Phase Compatibility Results',
                    text: `Check out our ${data.compatibility.score}% cosmic compatibility!`,
                    url: window.location.href
                  });
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Link copied to clipboard!');
                }
              }}
              className="bg-gradient-to-r from-cosmic-orange to-cosmic-purple text-white px-8 py-4 rounded-full font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center space-x-2"
            >
              <Heart className="w-5 h-5" />
              <span>Share Results</span>
            </button>
            
            <a 
              href="/" 
              className="bg-cosmic-purple/20 border border-cosmic-purple/50 text-cosmic-purple px-8 py-4 rounded-full font-semibold hover:bg-cosmic-purple/30 transition-all duration-200 flex items-center space-x-2"
            >
              <Star className="w-5 h-5" />
              <span>Calculate Another</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}