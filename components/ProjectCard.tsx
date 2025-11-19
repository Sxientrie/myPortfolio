import React from 'react';
import { Project } from '../types';
import { ArrowUpRight, Folder, Code } from 'lucide-react';
import { Card } from './ui/Card';

interface ProjectCardProps {
  project: Project;
  onClick?: () => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  return (
    <div onClick={onClick} className="cursor-pointer h-full">
      <Card className="group h-full hover:border-accent/50 transition-colors duration-300">
        <div className="flex justify-between items-start mb-6">
          <div className="p-3 bg-gray-100 dark:bg-white/5 rounded-lg text-accent/80 group-hover:text-accent group-hover:bg-accent/10 transition-colors">
            {project.type === 'dev' ? <Code size={20} /> : <Folder size={20} />}
          </div>
          <div className="text-gray-400 dark:text-gray-600 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300">
            <ArrowUpRight size={20} />
          </div>
        </div>

        <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-3 group-hover:text-accent transition-colors">
          {project.title}
        </h4>
        
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-gray-200 dark:border-white/5 transition-colors duration-500">
          {project.tags.map((tag, i) => (
            <span key={i} className="text-xs font-mono text-gray-500">
              #{tag}
            </span>
          ))}
        </div>
      </Card>
    </div>
  );
};