import React from 'react';
import { Mail, Linkedin, Globe, GraduationCap, Terminal, Download, Languages as LangIcon } from 'lucide-react';
import { ABOUT_TEXT, CONTACT, EDUCATION, LANGUAGES } from '../../constants';
import { Reveal } from '../Reveal';

// Updated avatar to match "Jayson Rico" with new Ember color
import profileImage from '../../assets/img/profile.png';

interface SidebarProps {
    handlePrint: (e: React.MouseEvent) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ handlePrint }) => {
    return (
        <aside className="lg:col-span-4 lg:sticky lg:top-24 h-fit flex flex-col gap-10">

            {/* Header & About - Left Aligned */}
            <div className="flex flex-col items-start text-left">
                <Reveal width="100%">
                    <div className="relative w-80 h-auto mb-8 mx-auto print:hidden">
                        <div className="relative w-full">
                            <img
                                src={profileImage}
                                alt="Jayson Rico"
                                className="w-full h-auto object-contain"
                            />
                        </div>
                    </div>
                </Reveal>

                <Reveal>
                    {/* Brand Font: Outfit - Bold (700) + Single Line + Blinking Cursor */}
                    <h1 className="text-4xl lg:text-5xl font-bold font-display text-primary tracking-tight mb-4 print:text-black whitespace-nowrap leading-none flex items-baseline">
                        JAYSON RICO<span className="text-accent ml-1 animate-blink text-4xl lg:text-5xl translate-y-[-2px]">|</span>
                    </h1>
                </Reveal>

                <Reveal>
                    {/* Interface Font: Subtitles - Light (300) */}
                    <h2 className="text-lg font-light text-accent mb-6 flex items-center gap-2 print:text-gray-800 tracking-tight whitespace-nowrap">
                        <Terminal size={16} />
                        Technical Support & Creative Generalist
                    </h2>
                </Reveal>

                <Reveal width="100%">
                    <p className="text-secondary leading-relaxed text-sm mb-8 print:text-gray-600 text-left font-normal">
                        {ABOUT_TEXT}
                    </p>
                </Reveal>

                <Reveal>
                    {/* Interface Font: Buttons - Medium (500) - Aligned Left */}
                    <button
                        onClick={handlePrint}
                        className="group flex items-center gap-3 px-5 py-3 bg-surface hover:bg-zinc-800/40 border border-structure hover:border-accent/30 rounded-lg transition-all duration-200 print:hidden"
                    >
                        <Download size={16} className="text-accent group-hover:scale-110 transition-transform" />
                        <span className="text-sm font-medium text-primary group-hover:text-white">Download Resume</span>
                    </button>
                </Reveal>
            </div>

            <div className="w-12 h-px bg-structure"></div>

            {/* Education Sidebar Section */}
            <Reveal>
                <div>
                    {/* Interface Font: Uppercase Label - Medium + Wide tracking */}
                    <h3 className="text-xs font-medium text-muted mb-4 uppercase tracking-wide flex items-center gap-2">
                        <GraduationCap size={14} /> Education
                    </h3>
                    <div className="text-sm">
                        <h4 className="text-primary font-medium mb-1">{EDUCATION.institution}</h4>
                        {/* Data Font: Timestamps - Mono XS */}
                        <span className="text-xs font-mono text-accent block mb-2">{EDUCATION.period}</span>
                        <p className="text-secondary text-xs leading-relaxed">
                            {EDUCATION.details}
                        </p>
                    </div>
                </div>
            </Reveal>

            {/* Languages Sidebar Section */}
            <Reveal width="100%">
                <div>
                    {/* Interface Font: Uppercase Label - Medium + Wide tracking */}
                    <h3 className="text-xs font-medium text-muted mb-4 uppercase tracking-wide flex items-center gap-2">
                        <LangIcon size={14} /> Languages
                    </h3>
                    <div className="space-y-3">
                        {LANGUAGES.map((lang, idx) => (
                            <div key={idx} className="text-sm">
                                <div className="flex justify-between text-secondary mb-1">
                                    <span className="font-normal">{lang.lang}</span>
                                    {/* Data Font: Value - Mono XS */}
                                    <span className="font-mono text-xs text-muted">{lang.level}</span>
                                </div>
                                <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-accent"
                                        style={{ width: lang.level === 'B2' ? '75%' : '25%' }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Reveal>

            <div className="w-12 h-px bg-structure"></div>

            {/* Contact Links */}
            <Reveal>
                <div className="flex flex-col gap-4 print:text-black pb-12">
                    <a href={`mailto:${CONTACT.email}`} className="group flex items-center gap-4 text-sm text-secondary hover:text-white transition-colors print:text-black">
                        <div className="p-2 bg-surface rounded-lg border border-structure group-hover:border-accent/50 transition-colors print:border-gray-300">
                            <Mail size={16} />
                        </div>
                        {/* Data Font: Email - Mono XS */}
                        <span className="font-mono text-xs">{CONTACT.email}</span>
                    </a>
                    <a href={`https://${CONTACT.linkedin}`} target="_blank" rel="noreferrer" className="group flex items-center gap-4 text-sm text-secondary hover:text-white transition-colors print:text-black">
                        <div className="p-2 bg-surface rounded-lg border border-structure group-hover:border-accent/50 transition-colors print:border-gray-300">
                            <Linkedin size={16} />
                        </div>
                        <span className="font-mono text-xs">/in/jaysonrico-career</span>
                    </a>
                    <a href={`https://${CONTACT.portfolio}`} target="_blank" rel="noreferrer" className="group flex items-center gap-4 text-sm text-secondary hover:text-white transition-colors print:text-black">
                        <div className="p-2 bg-surface rounded-lg border border-structure group-hover:border-accent/50 transition-colors print:border-gray-300">
                            <Globe size={16} />
                        </div>
                        <span className="font-mono text-xs">Github Portfolio</span>
                    </a>
                </div>
            </Reveal>
        </aside>
    );
};