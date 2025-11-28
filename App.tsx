import React, { useState, useEffect } from 'react';
import { ProjectDrawer } from './components/ProjectDrawer';
import { Project } from './types';
import { Sidebar } from './components/layout/Sidebar';
import { MainContent } from './components/layout/MainContent';
import { Navigation } from './components/layout/Navigation';
import { BackgroundEffects } from './components/ui/BackgroundEffects';
import { Github } from 'lucide-react';

const App = () => {

  const [activeSection, setActiveSection] = useState('experience');
  
  // Drawer State
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Force Dark Mode for Void Protocol
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  // Handle Body Scroll Lock & Jitter Prevention when Drawer is open
  useEffect(() => {
    if (isDrawerOpen) {
      // 1. Measure the width of the scrollbar before hiding it
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      
      // 2. Add padding to replace the scrollbar so content doesn't shift (jitter)
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      
      // 3. Lock scroll
      document.body.style.overflow = 'hidden';
    } else {
      // Reset styles
      document.body.style.paddingRight = '';
      document.body.style.overflow = '';
    }
    
    // Cleanup ensures state is reset if component unmounts unexpectedly
    return () => {
      document.body.style.paddingRight = '';
      document.body.style.overflow = '';
    };
  }, [isDrawerOpen]);

  // Drawer Handlers
  const openDrawer = (project: Project) => {
    setSelectedProject(project);
    setTimeout(() => setIsDrawerOpen(true), 10);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setTimeout(() => {
      setSelectedProject(null);
    }, 300);
  };

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const sections = ['experience', 'projects', 'expertise'];
          const scrollPosition = window.scrollY + window.innerHeight * 0.3;

          let current = sections[0];
          for (const section of sections) {
            const el = document.getElementById(section);
            if (el && el.offsetTop <= scrollPosition) {
              current = section;
            }
          }
          setActiveSection(current);
          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

      <ProjectDrawer
        project={selectedProject}
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
      />

      <BackgroundEffects />

      <Navigation
        activeSection={activeSection}
        scrollToSection={scrollToSection}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12 lg:py-24">

        {/* SPLIT LAYOUT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24">

          {/* LEFT COLUMN: Sticky Info */}
          <Sidebar handlePrint={handlePrint} />

          {/* RIGHT COLUMN: Scrollable Content */}
          <MainContent openDrawer={openDrawer} />
        </div>

        {/* FOOTER AREA */}
        <footer className="pt-12 pb-8 border-t border-structure flex flex-col md:flex-row justify-between items-center gap-6 print:hidden opacity-90 hover:opacity-100 transition-opacity duration-300">
          
          {/* Left: Branding & Tech Stack */}
          <div className="flex flex-col items-center md:items-start gap-1.5">
            <span className="text-xs font-medium text-primary tracking-wide">
              © {new Date().getFullYear()} Jayson Rico
            </span>
            <span className="text-[10px] font-mono text-muted">
              Engineered with React, Tailwind & Precision.
            </span>
          </div>

          {/* Right: GitHub Profile */}
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