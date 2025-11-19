import React, { useState, useEffect } from 'react';
import { MapPin, Mail, Linkedin, Github, Globe, GraduationCap, Terminal, ArrowUpRight, Sparkles, Download, ArrowRight, BookOpen, Languages as LangIcon, Moon, Sun } from 'lucide-react';
import { ABOUT_TEXT, CONTACT, EDUCATION, EXPERIENCE, LANGUAGES, SKILLS, PROJECTS } from './constants';
import { ExperienceItem } from './components/ExperienceItem';
import { ProjectCard } from './components/ProjectCard';
import { Reveal } from './components/Reveal';
import { Card } from './components/ui/Card';
import { ProjectDrawer } from './components/ProjectDrawer';
import { Project } from './types';
import profileImage from './assets/img/profile.png';

const App = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
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
    const updateMouse = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', updateMouse);
    return () => window.removeEventListener('mousemove', updateMouse);
  }, []);

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

      {/* Background Noise Texture - Adjusted opacity for light mode */}
      <div className="fixed inset-0 bg-noise opacity-[0.03] dark:opacity-30 pointer-events-none z-0 mix-blend-overlay print:hidden" />

      {/* Ambient Spotlight tracking mouse - Color adjusted for light mode */}
      <div 
        className="fixed w-[800px] h-[800px] bg-accent/5 dark:bg-accent/5 rounded-full blur-[120px] pointer-events-none z-0 transition-transform duration-75 ease-out -translate-x-1/2 -translate-y-1/2 print:hidden"
        style={{ left: mousePosition.x, top: mousePosition.y }}
      />

      {/* THEME TOGGLE BUTTON - Fixed Top Right, Hides on Scroll */}
      <button 
        onClick={toggleTheme}
        className={`
          fixed top-6 right-6 z-50 p-2.5 rounded-lg 
          bg-white/80 dark:bg-white/5 backdrop-blur-md 
          border border-gray-200 dark:border-white/10 shadow-sm 
          hover:border-accent/50 dark:hover:border-white/30 
          transition-all duration-500 ease-in-out print:hidden
          ${isScrolled ? 'opacity-0 -translate-y-4 pointer-events-none' : 'opacity-100 translate-y-0'}
        `}
        aria-label="Toggle Theme"
      >
        {isDark ? (
          <Sun size={18} className="text-yellow-500" />
        ) : (
          <Moon size={18} className="text-indigo-500" />
        )}
      </button>

      {/* FIXED RIGHT NAVIGATION - Hidden on Print */}
      <nav className="fixed right-8 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-end gap-6 z-40 print:hidden">
        {[
          { id: 'experience', label: 'Experience' },
          { id: 'projects', label: 'Projects' },
          { id: 'expertise', label: 'Expertise' }
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className="group flex items-center gap-4 focus:outline-none"
            aria-label={`Scroll to ${item.label}`}
            aria-current={activeSection === item.id ? 'true' : 'false'}
          >
            <span className={`
              text-xs font-mono uppercase tracking-widest transition-all duration-300
              ${activeSection === item.id 
                ? 'text-accent translate-x-0 opacity-100' 
                : 'text-gray-400 dark:text-gray-600 translate-x-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0'
              }
            `}>
              {item.label}
            </span>
            <div className={`
              w-1.5 h-1.5 rounded-full transition-all duration-500 border border-accent
              ${activeSection === item.id ? 'bg-accent scale-150 shadow-[0_0_10px_rgba(20,184,166,0.5)]' : 'bg-transparent scale-100 group-hover:bg-accent/50'}
            `} />
          </button>
        ))}
        {/* Vertical connecting line visual */}
        <div className="absolute right-[2.5px] top-0 bottom-0 w-px bg-gray-300 dark:bg-white/5 -z-10 transition-colors duration-500" />
      </nav>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12 lg:py-24">
        
        {/* SPLIT LAYOUT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24">
          
          {/* LEFT COLUMN: Sticky Info */}
          <aside className="lg:col-span-4 lg:sticky lg:top-24 h-fit flex flex-col gap-10">
            
            {/* Header & About */}
            <div>
              <Reveal>
                <div className="relative w-48 h-64 mb-8 group print:hidden">
                  {/* Glow Effect Layer */}
                  <div className="absolute inset-0 bg-accent rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                  
                  {/* Image Container */}
                  <div className="relative w-full h-full rounded-2xl border-2 border-white/20 dark:border-white/10 bg-white/50 dark:bg-white/5 overflow-hidden shadow-2xl dark:shadow-none">
                    <img 
                      src={profileImage} 
                      alt="Jayson Jamora" 
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>

                  {/* Badge */}
                  <div className="absolute -bottom-3 -right-3 bg-white dark:bg-charcoal border border-gray-100 dark:border-white/10 p-3 rounded-xl shadow-xl z-10 transition-colors duration-500">
                    <Sparkles size={20} className="text-accent" />
                  </div>
                </div>
              </Reveal>

              <Reveal>
                <h1 className="text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tighter leading-none mb-4 print:text-black transition-colors duration-500">
                  JAYSON<br/>JAMORA<span className="text-accent">.</span>
                </h1>
              </Reveal>
              
              <Reveal>
                <h2 className="text-lg font-mono text-accent mb-6 flex items-center gap-2 print:text-gray-800">
                  <Terminal size={16} />
                  TECH_SUPPORT_SPEC
                </h2>
              </Reveal>

              <Reveal>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm mb-8 print:text-gray-600 transition-colors duration-500">
                  {ABOUT_TEXT}
                </p>
              </Reveal>

              <Reveal>
                <button 
                  onClick={handlePrint}
                  className="group flex items-center gap-3 px-5 py-3 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 border border-gray-200 dark:border-white/10 hover:border-accent/30 rounded-lg transition-all duration-300 print:hidden"
                >
                  <Download size={16} className="text-accent group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-200 group-hover:text-black dark:group-hover:text-white">Download Resume</span>
                </button>
              </Reveal>
            </div>

            <div className="w-12 h-px bg-gray-200 dark:bg-white/10 transition-colors duration-500"></div>

            {/* Education Sidebar Section */}
            <Reveal>
              <div>
                <h3 className="text-xs font-mono text-gray-500 dark:text-gray-500 mb-4 uppercase tracking-widest flex items-center gap-2">
                  <GraduationCap size={14} /> Education
                </h3>
                <div className="text-sm">
                  <h4 className="text-gray-900 dark:text-white font-bold mb-1 transition-colors duration-500">{EDUCATION.institution}</h4>
                  <span className="text-xs font-mono text-accent block mb-2">{EDUCATION.period}</span>
                  <p className="text-gray-600 dark:text-gray-500 text-xs leading-relaxed transition-colors duration-500">
                    {EDUCATION.details}
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Languages Sidebar Section */}
            <Reveal>
              <div>
                <h3 className="text-xs font-mono text-gray-500 dark:text-gray-500 mb-4 uppercase tracking-widest flex items-center gap-2">
                  <LangIcon size={14} /> Languages
                </h3>
                <div className="space-y-3">
                  {LANGUAGES.map((lang, idx) => (
                    <div key={idx} className="text-sm">
                      <div className="flex justify-between text-gray-500 dark:text-gray-400 mb-1 transition-colors duration-500">
                        <span>{lang.lang}</span>
                        <span className="font-mono text-xs text-gray-500 dark:text-gray-600">{lang.level}</span>
                      </div>
                      <div className="h-1 w-full bg-gray-200 dark:bg-white/5 rounded-full overflow-hidden transition-colors duration-500">
                        <div 
                          className="h-full bg-accent/50" 
                          style={{ width: lang.level === 'B2' ? '75%' : '25%' }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
            
            <div className="w-12 h-px bg-gray-200 dark:bg-white/10 transition-colors duration-500"></div>

            {/* Contact Links */}
            <Reveal>
              <div className="flex flex-col gap-4 print:text-black pb-12">
                <a href={`mailto:${CONTACT.email}`} className="group flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors print:text-black">
                  <div className="p-2 bg-gray-100 dark:bg-white/5 rounded-lg border border-gray-200 dark:border-white/5 group-hover:border-accent/50 transition-colors print:border-gray-300">
                    <Mail size={16} />
                  </div>
                  <span>{CONTACT.email}</span>
                </a>
                <a href={`https://${CONTACT.linkedin}`} target="_blank" rel="noreferrer" className="group flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors print:text-black">
                  <div className="p-2 bg-gray-100 dark:bg-white/5 rounded-lg border border-gray-200 dark:border-white/5 group-hover:border-accent/50 transition-colors print:border-gray-300">
                    <Linkedin size={16} />
                  </div>
                  <span>/in/jaysonrico-career</span>
                </a>
                <a href={`https://${CONTACT.portfolio}`} target="_blank" rel="noreferrer" className="group flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors print:text-black">
                  <div className="p-2 bg-gray-100 dark:bg-white/5 rounded-lg border border-gray-200 dark:border-white/5 group-hover:border-accent/50 transition-colors print:border-gray-300">
                    <Globe size={16} />
                  </div>
                  <span>Github Portfolio</span>
                </a>
              </div>
            </Reveal>
          </aside>

          {/* RIGHT COLUMN: Scrollable Content */}
          <main className="lg:col-span-8 space-y-24">
            
            {/* WORK EXPERIENCE */}
            <section id="experience" className="scroll-mt-24">
              <Reveal>
                <h3 className="text-xs font-mono text-gray-500 dark:text-gray-500 mb-8 tracking-[0.2em] uppercase flex items-center gap-4">
                  <span className="w-8 h-px bg-gray-300 dark:bg-gray-700 transition-colors duration-500"></span>
                  Work Experience
                </h3>
              </Reveal>
              
              <div className="relative">
                {EXPERIENCE.map((exp) => (
                  <ExperienceItem key={exp.id} data={exp} />
                ))}
              </div>
            </section>

            {/* PROJECTS SECTION */}
            <section id="projects" className="scroll-mt-24">
              <Reveal>
                <h3 className="text-xs font-mono text-gray-500 dark:text-gray-500 mb-8 tracking-[0.2em] uppercase flex items-center gap-4">
                  <span className="w-8 h-px bg-gray-300 dark:bg-gray-700 transition-colors duration-500"></span>
                  Hobby Projects
                </h3>
              </Reveal>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {PROJECTS.map((project, idx) => (
                  <Reveal key={idx}>
                    <ProjectCard 
                      project={project} 
                      onClick={() => openDrawer(project)}
                    />
                  </Reveal>
                ))}
              </div>
            </section>

            {/* TECHNICAL EXPERTISE (Formerly Expertise & Edu) */}
            <section id="expertise" className="scroll-mt-24">
              <Reveal>
                <h3 className="text-xs font-mono text-gray-500 dark:text-gray-500 mb-8 tracking-[0.2em] uppercase flex items-center gap-4">
                  <span className="w-8 h-px bg-gray-300 dark:bg-gray-700 transition-colors duration-500"></span>
                  Technical Proficiency
                </h3>
              </Reveal>

              {/* SKILLS CARD - NOW FULL WIDTH */}
              <Card className="w-full" glow>
                <h4 className="text-gray-900 dark:text-white font-bold mb-6 flex items-center gap-2 transition-colors duration-500">
                  <Terminal size={18} className="text-accent" />
                  Tech Skills
                </h4>
                <div className="flex flex-wrap gap-2">
                  {SKILLS.map((skill, idx) => (
                    <div 
                      key={idx} 
                      className="flex items-center gap-2 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 border border-gray-200 dark:border-white/5 hover:border-accent/30 px-3 py-2 rounded-md transition-all cursor-default group"
                    >
                      <span className="text-gray-500 dark:text-gray-400 group-hover:text-accent transition-colors">{skill.icon}</span>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{skill.name}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </section>

          </main>
        </div>

        {/* FOOTER AREA */}
        <footer className="pt-12 pb-6 border-t border-gray-200 dark:border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 print:hidden transition-colors duration-500">
          <p className="text-xs text-gray-500 dark:text-gray-600">© {new Date().getFullYear()} Jayson Jamora</p>
          <div className="flex items-center gap-6">
              <div className="flex gap-4">
              <a 
                href={`https://${CONTACT.linkedin}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-accent transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a 
                href={`https://${CONTACT.portfolio}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-accent transition-colors"
                aria-label="GitHub Portfolio"
              >
                <Github size={18} />
              </a>
              </div>
          </div>
        </footer>

      </div>
    </div>
  );
};

export default App;