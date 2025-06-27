interface MoonPhaseSVGProps {
  phase: string;
  size?: number;
  className?: string;
}

export function MoonPhaseSVG({ phase, size = 100, className = "" }: MoonPhaseSVGProps) {
  const getMoonPath = (phase: string) => {
    switch (phase.toLowerCase()) {
      case 'new moon':
        return (
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="#1a1a1a"
            stroke="#444"
            strokeWidth="2"
          />
        );
      
      case 'waxing crescent':
        return (
          <g>
            <circle cx="50" cy="50" r="45" fill="#1a1a1a" stroke="#444" strokeWidth="2" />
            <path
              d="M 50 5 A 45 45 0 0 1 50 95 A 30 30 0 0 0 50 5"
              fill="#f5f5dc"
            />
          </g>
        );
      
      case 'first quarter':
        return (
          <g>
            <circle cx="50" cy="50" r="45" fill="#1a1a1a" stroke="#444" strokeWidth="2" />
            <path
              d="M 50 5 A 45 45 0 0 1 50 95 Z"
              fill="#f5f5dc"
            />
          </g>
        );
      
      case 'waxing gibbous':
        return (
          <g>
            <circle cx="50" cy="50" r="45" fill="#1a1a1a" stroke="#444" strokeWidth="2" />
            <path
              d="M 50 5 A 45 45 0 0 1 50 95 A 25 25 0 0 1 50 5"
              fill="#f5f5dc"
            />
          </g>
        );
      
      case 'full moon':
        return (
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="#f5f5dc"
            stroke="#ddd"
            strokeWidth="2"
          />
        );
      
      case 'waning gibbous':
        return (
          <g>
            <circle cx="50" cy="50" r="45" fill="#f5f5dc" stroke="#ddd" strokeWidth="2" />
            <path
              d="M 50 5 A 45 45 0 0 1 50 95 A 25 25 0 0 0 50 5"
              fill="#1a1a1a"
            />
          </g>
        );
      
      case 'last quarter':
        return (
          <g>
            <circle cx="50" cy="50" r="45" fill="#f5f5dc" stroke="#ddd" strokeWidth="2" />
            <path
              d="M 50 5 A 45 45 0 0 1 50 95 Z"
              fill="#1a1a1a"
            />
          </g>
        );
      
      case 'waning crescent':
        return (
          <g>
            <circle cx="50" cy="50" r="45" fill="#f5f5dc" stroke="#ddd" strokeWidth="2" />
            <path
              d="M 50 5 A 45 45 0 0 1 50 95 A 30 30 0 0 1 50 5"
              fill="#1a1a1a"
            />
          </g>
        );
      
      default:
        return (
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="#444"
            stroke="#666"
            strokeWidth="2"
          />
        );
    }
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
    >
      <defs>
        <filter id="moonGlow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <g filter="url(#moonGlow)">
        {getMoonPath(phase)}
      </g>
    </svg>
  );
}