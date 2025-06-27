import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PersonProfile } from "@/components/PersonProfile";
import { RotateCcw, Share } from "lucide-react";

interface ResultsProps {
  params: { shareUrl: string };
}

export default function Results({ params }: ResultsProps) {
  const [, setLocation] = useLocation();

  const { data, isLoading, error } = useQuery({
    queryKey: ['/api/compatibility', params.shareUrl],
    queryFn: async () => {
      const response = await fetch(`/api/compatibility/${params.shareUrl}`);
      if (!response.ok) throw new Error('Failed to load compatibility result');
      return response.json();
    },
  });

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Moon Phase Compatibility Results',
          text: 'Check out our cosmic compatibility!',
          url: window.location.href,
        });
      } catch (error) {
        // User cancelled sharing
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      } catch (error) {
        console.error('Failed to copy link:', error);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-cosmic-black text-white flex items-center justify-center">
        <div className="text-center py-12">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-cosmic-orange rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-300">Loading cosmic compatibility...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-cosmic-black text-white flex items-center justify-center">
        <div className="text-center py-12">
          <p className="text-red-400 mb-4">Failed to load compatibility results</p>
          <Button onClick={() => setLocation('/')} variant="outline">
            Go Back Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cosmic-black text-white">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Compatibility Score Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-cosmic-orange">
              {data.compatibility.title}
            </h2>
            <p className="text-gray-300 text-lg">Your cosmic connection has been calculated</p>
          </div>

          {/* Profile Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <PersonProfile person={data.person1} />
            <PersonProfile person={data.person2} />
          </div>

          {/* Compatibility Analysis */}
          <Card className="bg-cosmic-gray border-cosmic-light mb-8 cosmic-gradient">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-center mb-6 text-cosmic-orange">
                Compatibility Analysis
              </h3>
              <div className="text-gray-300 leading-relaxed space-y-4">
                <p>{data.compatibility.analysis}</p>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => setLocation('/')}
              className="bg-cosmic-orange hover:bg-cosmic-orange/90 text-white font-semibold py-3 px-8 transition-all duration-200 glow-effect"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Try Other Birthdays
            </Button>
            <Button
              onClick={handleShare}
              variant="secondary"
              className="bg-cosmic-light hover:bg-cosmic-gray text-white font-semibold py-3 px-8 transition-all duration-200"
            >
              <Share className="w-5 h-5 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-8 mt-16">
        <p className="text-gray-500 text-sm">Advertisements</p>
      </footer>
    </div>
  );
}
