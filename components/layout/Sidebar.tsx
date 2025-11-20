import React from 'react';
import { Mail, Linkedin, Globe, GraduationCap, Terminal, Download, Languages as LangIcon } from 'lucide-react';
import { ABOUT_TEXT, CONTACT, EDUCATION, LANGUAGES } from '../../constants';
import { Reveal } from '../Reveal';
import profileImage from '../../assets/img/profile.png';

interface SidebarProps {
    handlePrint: (e: React.MouseEvent) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ handlePrint }) => {
    return (
        <aside className="lg:col-span-4 lg:sticky lg:top-24 h-fit flex flex-col gap-10">

            {/* Header & About */}
            <div className="flex flex-col items-center text-center">
                <Reveal>
                    <div className="relative w-60 h-auto mb-8 group print:hidden">
                        <div className="relative w-full">
                            <img
                                src={profileImage}
                                alt="Jayson Jamora"
                                className="w-full h-auto"
                            />
                        </div>
                    </div>
                </Reveal>

                <Reveal>
                    <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tighter leading-none mb-4 print:text-black transition-colors duration-500">
                        JAYSON<br />JAMORA<span className="text-accent">.</span>
                    </h1>
                </Reveal>

                <Reveal>
                    <h2 className="text-lg font-mono text-accent mb-6 flex items-center justify-center gap-2 print:text-gray-800">
                        <Terminal size={16} />
                        Web Developer & IT Support
                    </h2>
                </Reveal>

                <Reveal width="100%">
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm mb-8 print:text-gray-600 transition-colors duration-500 text-justify hyphens-auto">
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
    );
};
