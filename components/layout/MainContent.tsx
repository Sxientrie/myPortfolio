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
                    {/* Interface Font: Uppercase Labels - Medium + Wide tracking */}
                    <h3 className="text-xs font-medium text-muted mb-8 tracking-wide uppercase flex items-center gap-4">
                        <span className="w-8 h-px bg-structure"></span>
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
                    <h3 className="text-xs font-medium text-muted mb-8 tracking-wide uppercase flex items-center gap-4">
                        <span className="w-8 h-px bg-structure"></span>
                        Hobby Projects
                    </h3>
                </Reveal>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {PROJECTS.map((project, idx) => (
                        <Reveal key={idx}>
                            <ProjectCard
                                project={project}
                                index={idx}
                                onClick={() => openDrawer(project)}
                            />
                        </Reveal>
                    ))}
                </div>
            </section>

            {/* TECHNICAL EXPERTISE */}
            <section id="expertise" className="scroll-mt-24">
                <Reveal>
                    <h3 className="text-xs font-medium text-muted mb-8 tracking-wide uppercase flex items-center gap-4">
                        <span className="w-8 h-px bg-structure"></span>
                        Technical Proficiency
                    </h3>
                </Reveal>

                {/* SKILLS CARD */}
                <Card className="w-full" glow>
                    {/* Interface Font: Titles - Light (300) + Tight tracking */}
                    <h4 className="text-primary font-light tracking-tight mb-6 flex items-center gap-2">
                        <Terminal size={18} className="text-accent" />
                        Tech Skills
                    </h4>
                    <div className="flex flex-wrap gap-2">
                        {SKILLS.map((skill, idx) => (
                            <div
                                key={idx}
                                className="flex items-center gap-2 bg-zinc-950/50 hover:bg-zinc-800/50 border border-structure hover:border-accent/30 px-3 py-2 rounded-md transition-all cursor-default group"
                            >
                                <span className="text-muted group-hover:text-accent transition-colors">
                                    <SkillIcon name={skill.icon} />
                                </span>
                                {/* Interface Font: UI Elements - Medium (500) */}
                                <span className="text-sm font-medium text-secondary">{skill.name}</span>
                            </div>
                        ))}
                    </div>
                </Card>
            </section>

        </main>
    );
};