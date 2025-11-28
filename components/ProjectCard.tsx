import React from 'react';
import { Project } from '../types';
import { ArrowUpRight, Cpu, Code, ExternalLink } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  index: number;
  onClick?: () => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, onClick }) => {
  const isDev = project.type === 'dev';
  // Generate a technical ID (e.g., PRJ-01)
  const projectId = `PRJ-${(index + 1).toString().padStart(2, '0')}`;

  return (
    <div
      onClick={onClick}
      className="group relative flex flex-col h-full bg-zinc-950/60 border border-zinc-800/60 hover:border-accent/30 transition-all duration-300 cursor-pointer rounded-xl overflow-hidden shadow-[inset_0_1px_0_0_rgba(255,255,255,0.02),inset_0_4px_8px_rgba(0,0,0,0.4)] hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.03),inset_0_6px_12px_rgba(0,0,0,0.5)]"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
    >
      {/* Hover Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Technical Header Bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800/50 bg-zinc-900/20 backdrop-blur-sm group-hover:bg-zinc-900/40 transition-colors">
        <div className="flex items-center gap-3">
          {/* Status Icon */}
          <span className="text-muted group-hover:text-accent transition-colors duration-300">
            {isDev ? <Code size={14} /> : <Cpu size={14} />}
          </span>
          
          {/* Data Font: ID */}
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] text-muted group-hover:text-secondary transition-colors">
              {projectId}
            </span>
          </div>
        </div>

        {/* Action Icon */}
        <div className="flex items-center gap-3">
            <ArrowUpRight 
              size={16} 
              className="text-muted group-hover:text-accent transition-colors transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 duration-300" 
            />
        </div>
      </div>

      {/* Content Body */}
      <div className="p-5 flex-1 flex flex-col gap-4 relative z-10">
        <div className="flex justify-between items-start gap-4">
          {/* Interface Font: Title - Light (300), Tight tracking */}
          <h4 className="text-xl font-light tracking-tight text-primary mb-3 group-hover:text-white transition-colors">
            {project.title}
          </h4>

          {/* Demo Button - Positioned Top Right of Title */}
          {project.demoUrl && (
            <a 
              href={project.demoUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()} 
              className="flex items-center gap-1.5 px-2 py-1 bg-zinc-900 border border-zinc-700 hover:border-accent rounded text-[10px] font-bold text-secondary hover:text-accent transition-all z-20 shrink-0 uppercase tracking-wider"
            >
              Live Demo
              <ExternalLink size={10} />
            </a>
          )}
        </div>

        {/* Interface Font: Description - Regular (400) */}
        <p className="text-sm font-normal text-secondary leading-relaxed line-clamp-3">
          {project.description}
        </p>

        {/* Tech Stack / Footer */}
        <div className="mt-auto pt-4 border-t border-zinc-800/50">
          <div className="flex flex-wrap gap-2">
            {/* Data Font: Tags - Mono XS */}
            {project.tags.map((tag, i) => (
              <span 
                key={i} 
                className="px-1.5 py-0.5 text-[10px] font-mono text-muted border border-zinc-800/80 rounded bg-zinc-950/40 shadow-inner"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Corner Accent (Visual Flair) */}
      <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-2 h-2 border-t border-r border-accent/50" />
      </div>
    </div>
  );
};