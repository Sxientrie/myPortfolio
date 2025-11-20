import React from 'react';
import { Terminal } from 'lucide-react';
import { EXPERIENCE, PROJECTS, SKILLS } from '../../constants';
import { ExperienceItem } from '../ExperienceItem';
import { ProjectCard } from '../ProjectCard';
import { Reveal } from '../Reveal';
import { Card } from '../ui/Card';
import { SkillIcon } from '../SkillIcon';
import { Project } from '../../types';

interface MainContentProps {
    openDrawer: (project: Project) => void;
}

export const MainContent: React.FC<MainContentProps> = ({ openDrawer }) => {
    return (
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
                                <span className="text-gray-500 dark:text-gray-400 group-hover:text-accent transition-colors">
                                    <SkillIcon name={skill.icon} />
                                </span>
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{skill.name}</span>
                            </div>
                        ))}
                    </div>
                </Card>
            </section>

        </main>
    );
};
