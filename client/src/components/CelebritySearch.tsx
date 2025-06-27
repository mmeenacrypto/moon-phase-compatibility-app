import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { celebrities, type Celebrity } from "../data/celebrities";

interface CelebritySearchProps {
  label: string;
  value: string;
  onSelect: (celebrity: Celebrity) => void;
  placeholder?: string;
}

export function CelebritySearch({ label, value, onSelect, placeholder = "Search celebrity..." }: CelebritySearchProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCelebrities, setFilteredCelebrities] = useState<Celebrity[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (searchQuery.length > 0) {
      const filtered = celebrities.filter(celebrity =>
        celebrity.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCelebrities(filtered.slice(0, 10));
      setIsOpen(true);
      setShowAll(false);
    } else if (showAll) {
      setFilteredCelebrities(celebrities.slice(0, 20));
      setIsOpen(true);
    } else {
      setFilteredCelebrities([]);
      setIsOpen(false);
    }
  }, [searchQuery, showAll]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setShowAll(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectCelebrity = (celebrity: Celebrity) => {
    onSelect(celebrity);
    setSearchQuery('');
    setIsOpen(false);
    setShowAll(false);
  };

  const handleInputFocus = () => {
    if (!searchQuery) {
      setShowAll(true);
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={`celebrity-search-${label}`} className="text-cosmic-orange font-semibold">
        {label}
      </Label>
      <div className="relative" ref={dropdownRef}>
        <Input
          id={`celebrity-search-${label}`}
          type="text"
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={handleInputFocus}
          className="w-full bg-cosmic-dark/50 border-cosmic-purple/30 text-white placeholder:text-gray-400 focus:border-cosmic-orange focus:ring-cosmic-orange/20"
        />
        
        {/* Selected Celebrity Display */}
        {value && (
          <div className="mt-3 p-4 bg-gradient-to-r from-cosmic-purple/10 to-cosmic-orange/10 border border-cosmic-purple/30 rounded-xl">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <img 
                  src={celebrities.find(c => c.slug === value)?.image}
                  alt={celebrities.find(c => c.slug === value)?.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-cosmic-orange/50"
                />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-cosmic-orange rounded-full flex items-center justify-center">
                  <span className="text-xs">✨</span>
                </div>
              </div>
              <div>
                <span className="text-white font-semibold text-lg">
                  {celebrities.find(c => c.slug === value)?.name}
                </span>
                <div className="text-gray-300 text-sm">
                  Born: {celebrities.find(c => c.slug === value)?.birthDate}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Dropdown */}
        {isOpen && filteredCelebrities.length > 0 && (
          <div className="absolute z-50 w-full mt-1 bg-cosmic-dark/95 backdrop-blur-sm border border-cosmic-purple/30 rounded-xl shadow-2xl max-h-80 overflow-y-auto">
            <div className="p-2">
              {!searchQuery && (
                <div className="px-3 py-2 text-cosmic-orange text-sm font-medium border-b border-cosmic-purple/20 mb-2">
                  Popular Celebrities
                </div>
              )}
              {filteredCelebrities.map((celebrity, index) => (
                <button
                  key={celebrity.slug}
                  onClick={() => handleSelectCelebrity(celebrity)}
                  className="w-full p-3 text-left hover:bg-cosmic-purple/20 transition-all duration-200 rounded-lg focus:outline-none focus:bg-cosmic-purple/20 group"
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <img 
                        src={celebrity.image}
                        alt={celebrity.name}
                        className="w-12 h-12 rounded-full object-cover border border-cosmic-purple/30 group-hover:border-cosmic-orange/50 transition-colors"
                        loading="lazy"
                      />
                      {celebrity.platform && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-cosmic-purple rounded-full flex items-center justify-center">
                          <span className="text-xs">📱</span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="text-white font-medium group-hover:text-cosmic-orange transition-colors">
                        {celebrity.name}
                      </div>
                      <div className="text-gray-400 text-sm">
                        {celebrity.birthDate}
                        {celebrity.platform && (
                          <span className="ml-2 text-cosmic-purple text-xs">
                            {celebrity.platform}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
