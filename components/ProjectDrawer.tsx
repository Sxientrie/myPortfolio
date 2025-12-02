import React, { useEffect } from 'react';
import { Project } from '../types';
import { X, Server, Cpu, Layers } from 'lucide-react';

interface ProjectDrawerProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Slide-out panel for detailed project information.
 * Locks scroll and handles escape key for closure.
 */
export const ProjectDrawer: React.FC<ProjectDrawerProps> = ({ project, isOpen, onClose }) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!project) return null;

  return (
    <div className={`fixed inset-0 z-[60] flex justify-end ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
      <div
        className={`
          absolute inset-0 bg-void/80 backdrop-blur-sm transition-opacity duration-300 ease-in-out
          ${isOpen ? 'opacity-100' : 'opacity-0'}
        `}
        onClick={onClose}
      />

      <div
        className={`
          relative w-full max-w-2xl h-full bg-void 
          border-l border-structure shadow-2xl overflow-y-auto
          transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >

        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-muted hover:text-primary hover:bg-zinc-800 rounded-full transition-colors z-50"
          aria-label="Close project details"
        >
          <X size={24} />
        </button>

        <div className="p-8 lg:p-12 space-y-10">

          <div className="space-y-4">
            <div className="flex items-center gap-3 text-accent font-medium text-xs tracking-wide uppercase">
              <Server size={14} />
              <span>{project.type === 'dev' ? 'Development' : 'System Architecture'}</span>
            </div>
            <h2 className="text-3xl font-light tracking-tight text-primary leading-tight">
              {project.title}
            </h2>
            <div className="flex flex-wrap gap-2 pt-2">
              {project.tags.map((tag, i) => (
                <span key={i} className="px-2 py-1 bg-zinc-900 border border-structure rounded text-[10px] font-mono text-secondary">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="prose prose-invert max-w-none">
            <p className="text-sm font-normal text-secondary leading-relaxed">
              {project.longDescription}
            </p>
          </div>

          {project.architecture && (
            <div>
              <h3 className="text-xs font-medium text-muted uppercase tracking-wide mb-4 flex items-center gap-2">
                <Cpu size={14} /> Technical Architecture
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {project.architecture.map((item, i) => (
                  <div key={i} className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6 border-b border-structure pb-2">
                    <span className="text-xs font-medium text-primary min-w-[100px]">{item.label}</span>
                    <span className="text-xs text-secondary font-mono">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {project.features && (
            <div>
              <h3 className="text-xs font-medium text-muted uppercase tracking-wide mb-4 flex items-center gap-2">
                <Layers size={14} /> Core Functionality
              </h3>
              <ul className="space-y-3">
                {project.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-xs font-normal text-secondary leading-relaxed">
                    <span className="mt-1.5 w-1 h-1 bg-accent rounded-full flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
