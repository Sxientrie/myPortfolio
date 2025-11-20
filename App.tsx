import React, { useState, useEffect } from 'react';
import { ProjectDrawer } from './components/ProjectDrawer';
import { Project } from './types';
import { Sidebar } from './components/layout/Sidebar';
import { MainContent } from './components/layout/MainContent';
import { Navigation } from './components/layout/Navigation';
import { ThemeToggle } from './components/ui/ThemeToggle';
import { BackgroundEffects } from './components/ui/BackgroundEffects';

const App = () => {

  const [activeSection, setActiveSection] = useState('experience');
  const [isScrolled, setIsScrolled] = useState(false);

  // Drawer State
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Initialize theme from localStorage or default to true (dark)
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      return saved ? JSON.parse(saved) : true;
    }
    return true;
  });

  // Handle Theme Change
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'false');
    }
  }, [isDark]);

  // Handle Body Scroll Lock when Drawer is open
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      // specific check to ensure we don't unlock if simply transitioning
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isDrawerOpen]);

  // Drawer Handlers
  const openDrawer = (project: Project) => {
    setSelectedProject(project);
    // Small delay to allow component to mount before triggering transition
    setTimeout(() => setIsDrawerOpen(true), 10);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    // Wait for transition (300ms) to finish before removing data/unmounting
    setTimeout(() => {
      setSelectedProject(null);
    }, 300);
  };

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Handle Active Section Logic
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

          // Handle Theme Toggle Visibility
          if (window.scrollY > 50) {
            setIsScrolled(true);
          } else {
            setIsScrolled(false);
          }

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

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <div className="min-h-screen w-full bg-gray-50 dark:bg-obsidian text-gray-900 dark:text-gray-300 font-sans selection:bg-accent selection:text-black overflow-x-hidden print:bg-white print:text-black transition-colors duration-500">

      <ProjectDrawer
        project={selectedProject}
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
      />

      <BackgroundEffects />

      <ThemeToggle
        isDark={isDark}
        toggleTheme={toggleTheme}
        isScrolled={isScrolled}
      />

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
        <footer className="pt-12 pb-6 border-t border-gray-200 dark:border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 print:hidden transition-colors duration-500">
          <p className="text-xs text-gray-500 dark:text-gray-600">© {new Date().getFullYear()} Jayson Jamora</p>
          <div className="flex items-center gap-6">
            {/* Footer links could also be extracted if needed, but kept simple here */}
          </div>
        </footer>

      </div>
    </div>
  );
};

export default App;