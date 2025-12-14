import React from 'react';
import { Project } from '../types';
import { ProjectCard } from '../components/ProjectCard';
import { Button } from '../components/Button';
import { useLanguage } from '../contexts/LanguageContext';

interface DashboardProps {
  projects: Project[];
  onCreateNew: () => void;
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ projects, onCreateNew, onEdit, onDelete }) => {
  const { t } = useLanguage();

  return (
    <div className="p-4 pb-24 min-h-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t.dashboard.title}</h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{t.dashboard.subtitle}</p>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-12 px-4 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-2xl bg-white dark:bg-gray-800">
          <div className="w-16 h-16 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-500 dark:text-indigo-400 rounded-full flex items-center justify-center mx-auto mb-4">
             <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="font-bold text-gray-900 dark:text-white mb-2">{t.dashboard.emptyTitle}</h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm">{t.dashboard.emptySubtitle}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {projects.map((p) => (
            <ProjectCard 
              key={p.id} 
              project={p} 
              onEdit={() => onEdit(p)}
              onDelete={() => onDelete(p.id)}
            />
          ))}
        </div>
      )}

      {/* Floating Action Button for Mobile / Sticky Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-white via-white to-transparent dark:from-gray-900 dark:via-gray-900 max-w-md mx-auto pointer-events-none">
        <div className="pointer-events-auto">
          <Button 
            fullWidth 
            variant="primary" 
            onClick={onCreateNew}
            className="shadow-xl"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            {t.dashboard.newProject}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;