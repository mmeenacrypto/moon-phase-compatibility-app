import { Moon, Heart, Stars, Github } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-cosmic-dark/95 border-t border-cosmic-purple/20 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Moon className="h-6 w-6 text-cosmic-orange" />
              <span className="text-lg font-bold bg-gradient-to-r from-cosmic-orange to-cosmic-purple bg-clip-text text-transparent">
                Moon Compatibility
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Discover cosmic connections through ancient lunar wisdom. 
              Calculate compatibility using moon phases, zodiac signs, and celestial influences.
            </p>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-cosmic-orange font-semibold">Features</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-center space-x-2">
                <Heart className="h-3 w-3 text-cosmic-purple" />
                <span>Celebrity Compatibility</span>
              </li>
              <li className="flex items-center space-x-2">
                <Stars className="h-3 w-3 text-cosmic-purple" />
                <span>Accurate Moon Phases</span>
              </li>
              <li className="flex items-center space-x-2">
                <Moon className="h-3 w-3 text-cosmic-purple" />
                <span>Zodiac Analysis</span>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-cosmic-orange font-semibold">About</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Based on astronomical data and astrological traditions, 
              this tool provides insights into romantic compatibility through celestial alignments.
            </p>
          </div>
        </div>
        
        <div className="border-t border-cosmic-purple/20 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © 2025 Moon Compatibility. Powered by cosmic energy.
          </p>
          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            <span className="text-xs text-gray-500">Made with lunar precision</span>
            <div className="flex space-x-1">
              <Moon className="h-3 w-3 text-cosmic-orange animate-pulse" />
              <Stars className="h-3 w-3 text-cosmic-purple animate-pulse" style={{ animationDelay: '0.5s' }} />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}