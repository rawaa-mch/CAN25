import React, { useEffect, useState } from 'react';
import ChampionCard from '@/components/ChampionCard';

const Portfolios = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20, // max movement 20px
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const players = [
    {
      id: 1,
      name: "Rawâa M'chaâbat",
      role: "Web Full Stack Developer",
      status: "Click here to explore my portfolio",
      image: "/portfolios/rawaa.png",
      link: "https://portfoliomch-3foa.vercel.app/",
      number: 1
    },
    {
      id: 2,
      name: "Hassania El-falah",
      role: "Web Full Stack Developer",
      status: "Click here to explore my portfolio",
      image: "/portfolios/hassania.png",
      link: "https://myportfolio1-hia1.vercel.app/",
      number: 2
    },
    {
      id: 3,
      name: "Aya Asrir",
      role: "Web Full Stack Developer",
      status: "Click here to explore my portfolio",
      image: "/portfolios/aya.png",
      link: "https://portfolioaya-git-main-ayas-projects-1623d1c3.vercel.app/",
      number: 3
    }
  ];

  return (
    <div className="min-h-screen relative overflow-x-hidden pt-20 pb-20 perspective-1000">
      {/* Background with Overlay */}
      <div
        className="fixed inset-0 z-0 transition-transform duration-100 ease-out"
        style={{ transform: `translate(${-mousePos.x}px, ${-mousePos.y}px) scale(1.05)` }}
      >
        <img
          src="/images/soccer-field.png"
          alt="Field Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
      </div>

      <div className="relative z-10 container mx-auto px-4 flex flex-col items-center">
        {/* Header Section */}
        <div className="text-center mb-16 space-y-4 animate-in fade-in slide-in-from-top-10 duration-700 perspective-1000">
          <h1
            className="text-5xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-yellow-300 to-yellow-600 uppercase tracking-tighter drop-shadow-xl filter transform transition-transform hover:scale-110 duration-500"
            style={{
              transform: `rotateX(${mousePos.y * 2}deg) rotateY(${mousePos.x * 2}deg)`,
              textShadow: "0 10px 30px rgba(0,0,0,0.5)"
            }}
          >
            Our Teams
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto font-medium shadow-black drop-shadow-md">
            Meet the legends behind the code. Click on their cards to explore their championship portfolios.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-12 max-w-7xl w-full perspective-1000">
          {players.map((player, index) => (
            <div
              key={player.id}
              className="animate-in fade-in zoom-in duration-500"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <ChampionCard
                {...player}
              />
            </div>
          ))}
        </div>

        {/* Footer Prompt */}
        <div className="mt-20 flex flex-col items-center gap-4 animate-bounce">
          <img
            src="/soccer_ball.png"
            alt="ball"
            className="w-32 h-32 object-contain animate-spin-slow mix-blend-screen rounded-full"
          />
          <div className="text-sm md:text-base font-bold text-yellow-500 uppercase tracking-[0.3em] bg-black/40 px-6 py-2 rounded-full border border-yellow-500/30 backdrop-blur-sm">
            Click on the photos
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolios;
