import React, { useState, useEffect } from 'react';
import { ProjectDrawer } from './components/ProjectDrawer';
import { Project } from './types';
import { Sidebar } from './components/layout/Sidebar';
import { MainContent } from './components/layout/MainContent';
import { Navigation } from './components/layout/Navigation';
import { BackgroundEffects } from './components/ui/BackgroundEffects';
import { Github } from 'lucide-react';
import { useScrollSpy } from './hooks/useScrollSpy';
import { AnimatePresence } from 'framer-motion';

/**
 * Root component that orchestrates the layout.
 * Manages drawer state, scroll tracking, and global theme enforcement.
 */
const App = () => {
  const activeSection = useScrollSpy(['experience', 'projects', 'expertise']);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  const openDrawer = (project: Project) => {
    setSelectedProject(project);
  };

  const closeDrawer = () => {
    setSelectedProject(null);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePrint = (e: React.MouseEvent) => {
    e.preventDefault();
    window.print();
  };

  return (
    <div className="min-h-screen w-full bg-void text-primary font-sans selection:bg-accent selection:text-black overflow-x-hidden print:bg-white print:text-black">
      <AnimatePresence>
        {selectedProject && (
          <ProjectDrawer
            key="project-drawer"
            project={selectedProject}
            onClose={closeDrawer}
          />
        )}
      </AnimatePresence>

      <BackgroundEffects />

      <Navigation
        activeSection={activeSection}
        scrollToSection={scrollToSection}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24">
          <Sidebar handlePrint={handlePrint} />
          <MainContent openDrawer={openDrawer} />
        </div>

        <footer className="pt-12 pb-8 border-t border-structure flex flex-col md:flex-row justify-between items-center gap-6 print:hidden opacity-90 hover:opacity-100 transition-opacity duration-300">
          <div className="flex flex-col items-center md:items-start gap-1.5">
            <span className="text-xs font-medium text-primary tracking-wide">
              © {new Date().getFullYear()} Jayson Rico
            </span>
            <span className="text-xs font-mono text-muted">
              Engineered with React, Tailwind & Precision.
            </span>
          </div>

          <a
            href="https://github.com/Sxientrie"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-3 py-1.5 bg-zinc-900/50 border border-zinc-800/50 rounded-full hover:border-accent/50 hover:bg-zinc-800/50 transition-all group cursor-pointer"
          >
            <Github size={14} className="text-muted group-hover:text-white transition-colors" />
            <span className="text-zinc-700 font-light">|</span>
            <span className="text-[10px] font-mono text-secondary group-hover:text-accent uppercase tracking-widest">
              Sxentrie
            </span>
          </a>
        </footer>
      </div>
    </div>
  );
};

export default App;
