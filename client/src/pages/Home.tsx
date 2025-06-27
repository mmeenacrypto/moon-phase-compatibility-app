import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { CelebritySearch } from "@/components/CelebritySearch";
import { useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import type { Celebrity } from "../data/celebrities";
import type { CompatibilityRequest } from "@shared/schema";
import { Calendar, Star, Users, Rocket } from "lucide-react";

type InputMode = 'date-date' | 'date-celeb' | 'celeb-celeb';

export default function Home() {
  const [, setLocation] = useLocation();
  const [inputMode, setInputMode] = useState<InputMode>('date-date');
  const [firstDate, setFirstDate] = useState('');
  const [secondDate, setSecondDate] = useState('');
  const [firstCeleb, setFirstCeleb] = useState<Celebrity | null>(null);
  const [secondCeleb, setSecondCeleb] = useState<Celebrity | null>(null);

  const compatibilityMutation = useMutation({
    mutationFn: async (data: CompatibilityRequest) => {
      const response = await fetch('/api/compatibility', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to calculate compatibility');
      return response.json();
    },
    onSuccess: (data) => {
      // Navigate to results page with the data
      setLocation(`/results/${data.shareUrl}`);
    },
  });

  const handleCalculateCompatibility = () => {
    let person1Type: 'date' | 'celebrity';
    let person1Value: string;
    let person2Type: 'date' | 'celebrity';
    let person2Value: string;

    // Validate and prepare data based on input mode
    if (inputMode === 'date-date') {
      if (!firstDate || !secondDate) {
        alert('Please select both birth dates');
        return;
      }
      person1Type = 'date';
      person1Value = firstDate;
      person2Type = 'date';
      person2Value = secondDate;
    } else if (inputMode === 'date-celeb') {
      if (!firstDate || !secondCeleb) {
        alert('Please select a birth date and celebrity');
        return;
      }
      person1Type = 'date';
      person1Value = firstDate;
      person2Type = 'celebrity';
      person2Value = secondCeleb.slug;
    } else {
      if (!firstCeleb || !secondCeleb) {
        alert('Please select both celebrities');
        return;
      }
      person1Type = 'celebrity';
      person1Value = firstCeleb.slug;
      person2Type = 'celebrity';
      person2Value = secondCeleb.slug;
    }

    compatibilityMutation.mutate({
      person1Type,
      person1Value,
      person2Type,
      person2Value,
    });
  };

  return (
    <div className="min-h-screen bg-cosmic-black text-white">
      {/* Header */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <img 
            src="https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=800" 
            alt="Deep space nebula background" 
            className="w-full h-full object-cover" 
          />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 py-12 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-cosmic-orange bg-clip-text text-transparent">
            MOON PHASE COMPATIBILITY
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Are you soulmates? Enter two birthdays and find out if they are soulmates by comparing the two moon phases with each other.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Input Mode Selector */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Button
              variant={inputMode === 'date-date' ? 'default' : 'secondary'}
              onClick={() => setInputMode('date-date')}
              className={`py-4 px-6 text-lg font-semibold transition-all duration-200 ${
                inputMode === 'date-date' 
                  ? 'bg-cosmic-orange hover:bg-cosmic-orange/90 text-white glow-effect' 
                  : 'bg-cosmic-gray hover:bg-cosmic-light text-white'
              }`}
            >
              <Calendar className="w-5 h-5 mr-2" />
              Date + Date
            </Button>
            <Button
              variant={inputMode === 'date-celeb' ? 'default' : 'secondary'}
              onClick={() => setInputMode('date-celeb')}
              className={`py-4 px-6 text-lg font-semibold transition-all duration-200 ${
                inputMode === 'date-celeb' 
                  ? 'bg-cosmic-orange hover:bg-cosmic-orange/90 text-white glow-effect' 
                  : 'bg-cosmic-gray hover:bg-cosmic-light text-white'
              }`}
            >
              <Star className="w-5 h-5 mr-2" />
              Date + Celeb
            </Button>
            <Button
              variant={inputMode === 'celeb-celeb' ? 'default' : 'secondary'}
              onClick={() => setInputMode('celeb-celeb')}
              className={`py-4 px-6 text-lg font-semibold transition-all duration-200 ${
                inputMode === 'celeb-celeb' 
                  ? 'bg-cosmic-orange hover:bg-cosmic-orange/90 text-white glow-effect' 
                  : 'bg-cosmic-gray hover:bg-cosmic-light text-white'
              }`}
            >
              <Users className="w-5 h-5 mr-2" />
              Celeb + Celeb
            </Button>
          </div>
        </div>

        {/* Input Forms */}
        <div className="max-w-4xl mx-auto">
          <Card className="bg-cosmic-gray border-cosmic-light mb-8">
            <div className="p-6">
              {inputMode === 'date-date' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label className="block text-sm font-medium text-gray-300 uppercase tracking-wide">
                      1st Birthday
                    </Label>
                    <Input
                      type="date"
                      value={firstDate}
                      onChange={(e) => setFirstDate(e.target.value)}
                      className="w-full bg-cosmic-gray border border-cosmic-light text-white focus:border-cosmic-orange"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label className="block text-sm font-medium text-gray-300 uppercase tracking-wide">
                      2nd Birthday
                    </Label>
                    <Input
                      type="date"
                      value={secondDate}
                      onChange={(e) => setSecondDate(e.target.value)}
                      className="w-full bg-cosmic-gray border border-cosmic-light text-white focus:border-cosmic-orange"
                    />
                  </div>
                </div>
              )}

              {inputMode === 'date-celeb' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label className="block text-sm font-medium text-gray-300 uppercase tracking-wide">
                      1st Birthday
                    </Label>
                    <Input
                      type="date"
                      value={firstDate}
                      onChange={(e) => setFirstDate(e.target.value)}
                      className="w-full bg-cosmic-gray border border-cosmic-light text-white focus:border-cosmic-orange"
                    />
                  </div>
                  <CelebritySearch
                    label="2nd Celebrity"
                    value={secondCeleb?.name || ''}
                    onSelect={setSecondCeleb}
                  />
                </div>
              )}

              {inputMode === 'celeb-celeb' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <CelebritySearch
                    label="1st Celebrity"
                    value={firstCeleb?.name || ''}
                    onSelect={setFirstCeleb}
                  />
                  <CelebritySearch
                    label="2nd Celebrity"
                    value={secondCeleb?.name || ''}
                    onSelect={setSecondCeleb}
                  />
                </div>
              )}
            </div>
          </Card>

          {/* Find Out Button */}
          <div className="text-center">
            <Button
              onClick={handleCalculateCompatibility}
              disabled={compatibilityMutation.isPending}
              className="bg-cosmic-orange hover:bg-cosmic-orange/90 text-white font-bold py-4 px-12 text-xl transition-all duration-200 transform hover:scale-105 glow-effect"
            >
              {compatibilityMutation.isPending ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Calculating...
                </>
              ) : (
                <>
                  <Rocket className="w-6 h-6 mr-2" />
                  Find Out!
                </>
              )}
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
