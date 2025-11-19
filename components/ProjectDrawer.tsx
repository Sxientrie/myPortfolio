import React, { useEffect } from 'react';
import { Project } from '../types';
import { X, Server, Cpu, Layers } from 'lucide-react';

interface ProjectDrawerProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectDrawer: React.FC<ProjectDrawerProps> = ({ project, isOpen, onClose }) => {
  // Handle Escape Key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  // Even if project is null, we render the container to allow exit animations 
  // (although in App.tsx logic, project is null only after animation finishes)
  if (!project) return null;

  return (
    <div className={`fixed inset-0 z-[60] flex justify-end ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
      {/* Backdrop */}
      <div 
        className={`
          absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ease-in-out
          ${isOpen ? 'opacity-100' : 'opacity-0'}
        `}
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div 
        className={`
          relative w-full max-w-2xl h-full bg-obsidian/95 dark:bg-charcoal/95 
          border-l border-white/10 shadow-2xl overflow-y-auto
          transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors z-50"
        >
          <X size={24} />
        </button>

        <div className="p-8 lg:p-12 space-y-10">
          
          {/* Header */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-accent font-mono text-sm tracking-wider uppercase">
              <Server size={16} />
              <span>{project.type === 'dev' ? 'Development' : 'System Architecture'}</span>
            </div>
            <h2 className="text-4xl font-bold text-white leading-tight">
              {project.title}
            </h2>
            <div className="flex flex-wrap gap-2 pt-2">
              {project.tags.map((tag, i) => (
                <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded text-xs font-mono text-gray-300">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Long Description */}
          <div className="prose prose-invert max-w-none">
            <p className="text-lg text-gray-300 leading-relaxed">
              {project.longDescription}
            </p>
          </div>

          {/* Architecture Grid */}
          {project.architecture && (
            <div>
              <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-6 flex items-center gap-3">
                <Cpu size={16} /> Technical Architecture
              </h3>
              <div className="grid grid-cols-1 gap-4">
                {project.architecture.map((item, i) => (
                  <div key={i} className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6 border-b border-white/5 pb-3">
                    <span className="text-sm font-bold text-white min-w-[100px]">{item.label}</span>
                    <span className="text-sm text-gray-400 font-mono">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Features List */}
          {project.features && (
            <div>
              <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-6 flex items-center gap-3">
                <Layers size={16} /> Core Functionality
              </h3>
              <ul className="space-y-4">
                {project.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-4 text-sm text-gray-300 leading-relaxed">
                    <span className="mt-1.5 w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0" />
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