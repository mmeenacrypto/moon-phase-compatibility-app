import { Link, useLocation } from "wouter";
import { Moon, Heart, Stars } from "lucide-react";

export function Navigation() {
  const [location] = useLocation();

  return (
    <nav className="bg-cosmic-dark/95 backdrop-blur-sm border-b border-cosmic-purple/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2 text-cosmic-orange hover:text-cosmic-orange/80 transition-colors">
            <Moon className="h-8 w-8" />
            <span className="text-xl font-bold bg-gradient-to-r from-cosmic-orange to-cosmic-purple bg-clip-text text-transparent">
              Moon Compatibility
            </span>
          </Link>
          
          <div className="flex items-center space-x-6">
            <Link 
              href="/"
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                location === '/' 
                  ? 'bg-cosmic-purple/20 text-cosmic-orange' 
                  : 'text-gray-300 hover:text-cosmic-orange'
              }`}
            >
              <Heart className="h-4 w-4" />
              <span>Calculate</span>
            </Link>
            
            <div className="flex items-center space-x-1 text-gray-400">
              <Stars className="h-4 w-4" />
              <span className="text-sm">Cosmic Insights</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}