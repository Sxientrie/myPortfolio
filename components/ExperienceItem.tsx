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
    <div className="mb-12 last:mb-0 relative border-l border-gray-200 dark:border-white/10 pl-8 ml-2 transition-colors duration-500">
      <span className={`
        absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full transition-colors duration-500
        ${isTech ? 'bg-accent shadow-[0_0_8px_rgba(20,184,166,0.6)]' : 'bg-gray-400 dark:bg-gray-600'}
      `} />
      
      <Reveal width="100%">
        <div className="flex justify-between items-baseline mb-2 gap-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight transition-colors duration-500">
            {data.company}
          </h3>
          <span className="font-mono text-xs text-gray-600 dark:text-gray-500 bg-gray-100 dark:bg-white/5 px-2 py-1 rounded whitespace-nowrap shrink-0 transition-colors duration-500">
            {data.period}
          </span>
        </div>
        
        <div className="flex items-center gap-2 text-accent mb-4">
           {isTech ? <Briefcase size={14} /> : <ChefHat size={14} />}
           <span className="text-sm font-mono uppercase tracking-wider font-semibold">{data.role}</span>
        </div>

        <ul className="space-y-2">
          {data.description.map((desc, i) => (
            <li key={i} className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed flex items-start gap-3 transition-colors duration-500">
              <span className="mt-1.5 w-1 h-1 bg-gray-400 dark:bg-gray-700 rounded-full flex-shrink-0" />
              {desc}
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  );
};