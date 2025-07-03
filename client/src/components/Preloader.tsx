import React, { useEffect, useState } from 'react';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [animationStep, setAnimationStep] = useState(0);

  useEffect(() => {
    const timeline = [
      { step: 1, delay: 500 },   // Start brush animation
      { step: 2, delay: 1000 },  // Start paint trail
      { step: 3, delay: 1500 },  // Start paint drops around brush
      { step: 4, delay: 2500 },  // Reveal logo and text
      { step: 5, delay: 3000 },  // Paint drops around logo/text
      { step: 6, delay: 3500 },  // Glow effect
      { step: 7, delay: 5000 },  // Hold and fade out
    ];

    timeline.forEach(({ step, delay }) => {
      setTimeout(() => setAnimationStep(step), delay);
    });

    // Complete animation
    setTimeout(() => {
      onComplete();
    }, 6500);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" style={{ backgroundColor: '#0A1A3C' }}>
      {/* Paint Drops Around Brush */}
      {animationStep >= 3 && (
        <div className="absolute inset-0">
          {[...Array(12)].map((_, i) => (
            <div
              key={`brush-drop-${i}`}
              className="absolute rounded-full animate-bounce opacity-80"
              style={{
                backgroundColor: ['#1E40AF', '#F59E0B', '#EC4899', '#F97316', '#8B5CF6'][i % 5],
                width: `${4 + Math.random() * 8}px`,
                height: `${4 + Math.random() * 8}px`,
                left: `${40 + Math.random() * 25}%`,
                top: `${35 + Math.random() * 15}%`,
                animationDelay: `${i * 0.15}s`,
                animationDuration: `${0.8 + Math.random() * 0.4}s`,
                boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
              }}
            />
          ))}
        </div>
      )}

      {/* Paint Drops Around Logo and Text */}
      {animationStep >= 5 && (
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => {
            const angle = (i / 20) * 2 * Math.PI;
            const radius = 180 + Math.random() * 100;
            const x = 50 + Math.cos(angle) * (radius / 8);
            const y = 50 + Math.sin(angle) * (radius / 12);
            
            return (
              <div
                key={`logo-drop-${i}`}
                className="absolute rounded-full animate-pulse opacity-70"
                style={{
                  backgroundColor: ['#1E40AF', '#F59E0B', '#EC4899', '#F97316', '#8B5CF6', '#10B981'][i % 6],
                  width: `${3 + Math.random() * 6}px`,
                  height: `${3 + Math.random() * 6}px`,
                  left: `${Math.max(10, Math.min(90, x))}%`,
                  top: `${Math.max(20, Math.min(80, y))}%`,
                  animationDelay: `${i * 0.1}s`,
                  animationDuration: `${1 + Math.random() * 0.5}s`,
                  boxShadow: '0 1px 3px rgba(0,0,0,0.4)',
                  transform: `scale(${0.5 + Math.random() * 0.5})`,
                }}
              />
            );
          })}
        </div>
      )}

      {/* Realistic Paintbrush */}
      {animationStep >= 1 && (
        <div className="absolute inset-0">
          <div
            className={`absolute transition-all duration-1500 ease-out ${
              animationStep >= 1 ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
            }`}
            style={{
              left: animationStep >= 2 ? '65%' : '5%',
              top: '38%',
              transform: 'rotate(-20deg)',
              transformOrigin: 'left center',
              width: '120px',
              height: '40px',
            }}
          >
            {/* Brush Handle - Wooden texture */}
            <div 
              className="relative"
              style={{
                width: '80px',
                height: '12px',
                background: 'linear-gradient(45deg, #8B4513 0%, #D2691E 25%, #CD853F 50%, #DEB887 75%, #8B4513 100%)',
                borderRadius: '6px',
                boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.3), 0 1px 3px rgba(0,0,0,0.2)',
              }}
            >
              {/* Handle grip lines */}
              <div className="absolute inset-0">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute bg-black/20"
                    style={{
                      left: `${10 + i * 8}px`,
                      top: '2px',
                      width: '1px',
                      height: '8px',
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Metal Ferrule (band that holds bristles) */}
            <div
              className="absolute"
              style={{
                left: '75px',
                top: '1px',
                width: '20px',
                height: '10px',
                background: 'linear-gradient(45deg, #C0C0C0 0%, #E5E5E5 50%, #A9A9A9 100%)',
                borderRadius: '2px',
                boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.3), 0 1px 2px rgba(0,0,0,0.2)',
              }}
            >
              {/* Ferrule ridges */}
              <div className="absolute inset-0">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute bg-black/10"
                    style={{
                      left: `${2 + i * 6}px`,
                      top: '0px',
                      width: '1px',
                      height: '10px',
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Brush Bristles - More realistic */}
            <div
              className="absolute"
              style={{
                left: '90px',
                top: '-2px',
                width: '25px',
                height: '16px',
              }}
            >
              {/* Individual bristle groups */}
              {[...Array(15)].map((_, i) => (
                <div
                  key={i}
                  className="absolute"
                  style={{
                    left: `${i * 1.5}px`,
                    top: `${Math.random() * 3}px`,
                    width: '2px',
                    height: `${12 + Math.random() * 4}px`,
                    background: `linear-gradient(to bottom, #4A4A4A 0%, #2C2C2C 50%, ${
                      ['#1E40AF', '#F59E0B', '#EC4899', '#F97316'][Math.floor(Math.random() * 4)]
                    } 80%, #1A1A1A 100%)`,
                    borderRadius: '1px',
                    transform: `rotate(${-5 + Math.random() * 10}deg)`,
                    opacity: 0.9,
                  }}
                />
              ))}
              
              {/* Paint dripping from bristles */}
              {animationStep >= 2 && (
                <div className="absolute -bottom-2 left-2">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute animate-pulse"
                      style={{
                        left: `${i * 4}px`,
                        width: '3px',
                        height: `${4 + Math.random() * 6}px`,
                        background: ['#1E40AF', '#F59E0B', '#EC4899', '#F97316'][i % 4],
                        borderRadius: '0 0 50% 50%',
                        animationDelay: `${i * 0.2}s`,
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Paint Trail */}
      {animationStep >= 2 && (
        <div className="absolute inset-0">
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="paintGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#1E40AF" />
                <stop offset="25%" stopColor="#F59E0B" />
                <stop offset="50%" stopColor="#EC4899" />
                <stop offset="75%" stopColor="#F97316" />
                <stop offset="100%" stopColor="#8B5CF6" />
              </linearGradient>
              <filter id="paintGlow">
                <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            <path
              d="M 8 42 Q 25 38 45 42 Q 65 46 85 48"
              stroke="url(#paintGradient)"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              filter="url(#paintGlow)"
              className="animate-pulse"
              style={{
                strokeDasharray: '300',
                strokeDashoffset: animationStep >= 2 ? '0' : '300',
                transition: 'stroke-dashoffset 2s ease-out',
                opacity: 0.9,
              }}
            />
            {/* Secondary paint streak */}
            <path
              d="M 10 44 Q 30 40 50 44 Q 70 48 88 50"
              stroke="url(#paintGradient)"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              style={{
                strokeDasharray: '250',
                strokeDashoffset: animationStep >= 2 ? '0' : '250',
                transition: 'stroke-dashoffset 2.2s ease-out',
                opacity: 0.6,
              }}
            />
          </svg>
        </div>
      )}

      {/* Logo Container */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center relative">
          {/* Logo */}
          <div
            className={`mb-8 transition-all duration-1000 ease-out ${
              animationStep >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <img
              src="/logo_1.png"
              alt="Royal Play Basha Logo"
              className="w-32 h-32 mx-auto object-contain"
              style={{
                filter: animationStep >= 6 ? 'drop-shadow(0 0 20px rgba(255, 255, 255, 0.3))' : 'none',
              }}
            />
          </div>

          {/* Text */}
          <div
            className={`transition-all duration-1000 ease-out delay-300 ${
              animationStep >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h1
              className={`text-4xl md:text-5xl font-bold text-white mb-2 tracking-wider ${
                animationStep >= 6 ? 'animate-pulse' : ''
              }`}
              style={{
                textShadow: animationStep >= 6 ? '0 0 20px rgba(255, 255, 255, 0.5)' : 'none',
                fontFamily: 'serif',
              }}
            >
              ROYAL PLAY BASHA
            </h1>
            <p
              className={`text-lg md:text-xl text-amber-300 tracking-widest font-light ${
                animationStep >= 6 ? 'animate-pulse' : ''
              }`}
              style={{
                textShadow: animationStep >= 6 ? '0 0 15px rgba(251, 191, 36, 0.5)' : 'none',
              }}
            >
              WALL PAINTING DESIGNER
            </p>
          </div>

          {/* Enhanced Glow Effect */}
          {animationStep >= 6 && (
            <div className="absolute inset-0 -z-10">
              <div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full animate-pulse"
                style={{
                  background: 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, rgba(251, 191, 36, 0.05) 50%, transparent 70%)',
                }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Fade Out Overlay */}
      {animationStep >= 7 && (
        <div
          className="absolute inset-0 bg-slate-900 transition-opacity duration-1000"
          style={{ opacity: animationStep >= 7 ? 1 : 0 }}
        />
      )}

      {/* Loading Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex space-x-2">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 bg-white rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Preloader;