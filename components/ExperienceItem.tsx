import React from 'react';
import { Experience } from '../types';
import { Reveal } from './Reveal';
import { Briefcase, ChefHat } from 'lucide-react';

interface ExperienceItemProps {
  data: Experience;
}

export const ExperienceItem: React.FC<ExperienceItemProps> = ({ data }) => {
  const isTech = data.type === 'tech';

  return (
    <div className="mb-12 last:mb-0 relative border-l border-structure pl-8 ml-2">
      <span className={`
        absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full
        ${isTech ? 'bg-accent shadow-[0_0_8px_rgba(249,115,22,0.6)]' : 'bg-muted'}
      `} />
      
      <Reveal width="100%">
        <div className="flex justify-between items-baseline mb-2 gap-4">
          {/* Interface Font: Title - Light (300), Tight tracking */}
          <h3 className="text-xl font-light text-primary tracking-tight">
            {data.company}
          </h3>
          {/* Data Font: Timestamp - Mono XS with Debossed Effect */}
          <span className="font-mono text-xs text-secondary bg-zinc-950/60 border border-zinc-800 shadow-[inset_0_1px_3px_rgba(0,0,0,0.4)] px-2 py-1 rounded whitespace-nowrap shrink-0">
            {data.period}
          </span>
        </div>
        
        <div className="flex items-center gap-2 text-accent mb-4">
           {isTech ? <Briefcase size={14} /> : <ChefHat size={14} />}
           {/* Interface Font: Uppercase Label - Medium, Wide tracking */}
           <span className="text-sm font-medium uppercase tracking-wide">{data.role}</span>
        </div>

        <ul className="space-y-2">
          {data.description.map((desc, i) => (
            <li key={i} className="text-secondary text-sm font-normal leading-relaxed flex items-start gap-3">
              <span className="mt-1.5 w-1 h-1 bg-muted rounded-full flex-shrink-0" />
              {desc}
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  );
};