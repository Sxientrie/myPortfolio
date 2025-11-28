import React from 'react';
import {
    Monitor,
    Settings,
    LayoutTemplate,
    PenTool,
    Headphones,
    Figma,
    Github,
    Terminal,
    Video
} from 'lucide-react';

interface SkillIconProps {
    name?: string;
    size?: number;
    className?: string;
}

export const SkillIcon: React.FC<SkillIconProps> = ({ name, size = 14, className }) => {
    switch (name) {
        case 'monitor': return <Monitor size={size} className={className} />;
        case 'settings': return <Settings size={size} className={className} />;
        case 'layout-template': return <LayoutTemplate size={size} className={className} />;
        case 'pen-tool': return <PenTool size={size} className={className} />;
        case 'headphones': return <Headphones size={size} className={className} />;
        case 'figma': return <Figma size={size} className={className} />;
        case 'github': return <Github size={size} className={className} />;
        case 'video': return <Video size={size} className={className} />;
        default: return <Terminal size={size} className={className} />;
    }
};
