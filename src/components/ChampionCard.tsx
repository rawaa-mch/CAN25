import React from 'react';
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import TiltCard from './TiltCard';

interface ChampionCardProps {
  id: number;
  name: string;
  role: string;
  status: string;
  image: string;
  link: string;
  number: number;
  className?: string;
}

const ChampionCard = ({ name, role, status, image, link, number, className }: ChampionCardProps) => {
  return (
    <TiltCard className={cn("group w-full h-full", className)}>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="block relative w-full h-full bg-[#051c14] rounded-[2rem] p-4 border border-white/5 hover:border-yellow-500/30 transition-colors duration-300 overflow-visible"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Floating Background Elements (Parallax) */}
        <div
          className="absolute -right-8 -top-8 w-24 h-24 bg-yellow-500/10 rounded-full blur-[40px] pointer-events-none transition-transform duration-500 group-hover:translate-x-4 group-hover:-translate-y-4"
          style={{ transform: "translateZ(-20px)" }}
        />

        {/* Corner Brackets - Elevated */}
        <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-yellow-500 rounded-tl-lg" style={{ transform: "translateZ(20px)" }} />
        <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-yellow-500 rounded-tr-lg" style={{ transform: "translateZ(20px)" }} />
        <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-yellow-500 rounded-bl-lg" style={{ transform: "translateZ(20px)" }} />
        <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-yellow-500 rounded-br-lg" style={{ transform: "translateZ(20px)" }} />

        {/* Number Badge - High Elevation */}
        <div
          className="absolute top-0 right-8 -translate-y-1/2 bg-yellow-400 text-black font-black text-xl w-14 h-14 flex items-center justify-center rounded-full shadow-xl border-4 border-[#0a2e20] z-30 transition-transform duration-300"
          style={{ transform: "translateZ(50px)" }}
        >
          {number}
        </div>

        {/* Main Content Container */}
        <div className="relative w-full aspect-square mt-6 mb-4 rounded-xl overflow-hidden bg-gradient-to-b from-white/10 to-transparent p-1" style={{ transform: "translateZ(10px)" }}>
          {/* Inner Border/Glow */}
          <div className="absolute inset-0 rounded-xl border border-white/20 z-10" />

          {/* Image - Pop out slightly */}
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover rounded-lg shadow-2xl"
            style={{ transform: "translateZ(5px)" }}
          />

          {/* Holographic overlay effect */}
          <div className="absolute inset-0 bg-gradient-to-tr from-yellow-400/0 via-white/10 to-yellow-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 mix-blend-overlay" />
        </div>

        {/* Footer Content - Medium Elevation */}
        <div className="w-full relative z-20 mt-auto flex flex-col gap-2 pb-2 px-2" style={{ transform: "translateZ(30px)" }}>
          <Badge className="self-start bg-yellow-400 hover:bg-yellow-500 text-black font-bold border-none uppercase tracking-wider text-[10px] px-3 py-1 mb-1 shadow-lg shadow-yellow-500/20">
            {role}
          </Badge>

          <h3 className="text-3xl font-black text-white leading-none uppercase tracking-tight drop-shadow-md">
            {name}
          </h3>

          <div className="flex items-center gap-3 mt-2">
            <div className="h-[2px] w-8 bg-yellow-500 rounded-full shadow-[0_0_10px_rgba(234,179,8,0.8)]" />
            <p className="text-gray-300 text-[10px] font-bold uppercase tracking-[0.25em] text-shadow-sm">
              {status}
            </p>
          </div>
        </div>

        {/* Dynamic Glare Effect */}
        <div
          className="absolute inset-0 rounded-[2rem] bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300"
          style={{ transform: "translateZ(1px)" }}
        />
      </a>
    </TiltCard>
  );
};

export default ChampionCard;
