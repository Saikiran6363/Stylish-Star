import { HTMLAttributes } from 'react';

interface LogoProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function Logo({ className = "text-4xl", ...props }: LogoProps) {
  return (
    <div 
      className={`flex flex-col items-center justify-center font-black leading-none ${className}`} 
      style={{ fontFamily: 'Arial Black, Impact, sans-serif' }}
      {...props}
    >
      {/* STYLISH */}
      <div className="relative mb-[-0.13em] z-10" style={{ fontSize: '0.34em', letterSpacing: '0.1em', marginLeft: '0.1em' }}>
        <span className="absolute left-0 top-0 text-black" style={{ WebkitTextStroke: '0.15em black' }}>STYLISH</span>
        <span className="relative text-white">STYLISH</span>
      </div>
      
      {/* ST[Star]R */}
      <div className="flex items-center" style={{ fontSize: '1em' }}>
        {/* ST */}
        <span className="relative">
          <span className="absolute left-0 top-0 text-black" style={{ WebkitTextStroke: '0.06em white' }}>ST</span>
          <span className="absolute left-0 top-0 text-black" style={{ WebkitTextStroke: '0.04em black' }}>ST</span>
          <span className="relative text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(to bottom, #ff7b00 10%, #fff700 50%, #ff7b00 90%)' }}>ST</span>
        </span>
        
        {/* Star Replacement for A */}
        <div className="relative flex items-center justify-center z-20" style={{ width: '1.2em', height: '1em', margin: '0 0.05em' }}>
          <svg viewBox="0 0 100 100" className="absolute" style={{ width: '1.6em', height: '1.6em', top: '-0.25em', left: '-0.2em' }}>
            <polygon 
              points="50,15 61,38 86,40 67,56 73,81 50,68 27,81 33,56 14,40 39,38" 
              fill="#fff200" 
              stroke="#800000" 
              strokeWidth="2.5" 
            />
            {/* Cyan */}
            <path d="M25,100 C40,75 55,50 82,45 C55,55 35,80 29,105 Z" fill="#00AEEF" />
            {/* Pink */}
            <path d="M31,105 C45,78 58,54 82,45 C58,58 40,82 35,105 Z" fill="#ED1C24" />
            {/* Purple */}
            <path d="M37,105 C50,80 62,58 82,45 C60,60 45,85 41,105 Z" fill="#662D91" />
          </svg>
        </div>

        {/* R */}
        <span className="relative">
          <span className="absolute left-0 top-0 text-black" style={{ WebkitTextStroke: '0.06em white' }}>R</span>
          <span className="absolute left-0 top-0 text-black" style={{ WebkitTextStroke: '0.04em black' }}>R</span>
          <span className="relative text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(to bottom, #ff7b00 10%, #fff700 50%, #ff7b00 90%)' }}>R</span>
        </span>
      </div>

      {/* PARLOUR */}
      <div className="relative mt-[0.25em] z-10" style={{ fontSize: '0.34em', letterSpacing: '0.2em', marginLeft: '0.1em' }}>
        <span className="absolute left-0 top-0 text-black" style={{ WebkitTextStroke: '0.15em black' }}>PARLOUR</span>
        <span className="relative text-gold-500">PARLOUR</span>
      </div>
    </div>
  );
}
