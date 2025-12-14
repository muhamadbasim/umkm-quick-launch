import React, { useState } from 'react';
import { Project } from '../types';
import { ShareModal } from './ShareModal';
import { useLanguage } from '../contexts/LanguageContext';

interface ProjectCardProps {
  project: Project;
  onEdit?: () => void;
  onDelete?: () => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onEdit, onDelete }) => {
  const [isShareOpen, setIsShareOpen] = useState(false);
  const { t } = useLanguage();

  const statusColors = {
    draft: 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300',
    publishing: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
    published: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  };

  const handleShare = async () => {
    if (!project.publishedUrl) return;

    if (navigator.share) {
      try {
        await navigator.share({
          title: project.businessName,
          text: project.headline,
          url: project.publishedUrl,
        });
      } catch (error) {
        console.debug('Share canceled:', error);
      }
    } else {
      setIsShareOpen(true);
    }
  };

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 mb-4 transition-all active:scale-[0.99] group">
        <div className="flex gap-4">
          <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-gray-200 dark:bg-gray-700">
            <img 
              src={project.imageUrl} 
              alt={project.businessName} 
              className="w-full h-full object-cover" 
              loading="lazy"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start mb-1">
              <h3 className="font-bold text-gray-900 dark:text-white truncate pr-2">{project.businessName}</h3>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide ${statusColors[project.status]}`}>
                {project.status}
              </span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mb-2">{project.story}</p>
            
            <div className="flex items-center justify-between mt-3">
              {project.status === 'published' ? (
                <a href={project.publishedUrl} target="_blank" rel="noopener noreferrer" className="flex items-center text-xs text-indigo-600 dark:text-indigo-400 font-medium hover:underline">
                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  {t.projectCard.viewSite}
                </a>
              ) : (
                  <div></div> // Spacer
              )}

              <div className="flex items-center gap-2">
                 {project.status === 'published' && (
                   <button 
                      onClick={(e) => { e.stopPropagation(); handleShare(); }}
                      className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-gray-700 rounded-md transition-colors"
                      title={t.projectCard.share}
                  >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                      </svg>
                  </button>
                 )}
                 {onEdit && (
                  <button 
                      onClick={(e) => { e.stopPropagation(); onEdit(); }}
                      className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-gray-700 rounded-md transition-colors"
                      title={t.projectCard.edit}
                  >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                  </button>
                 )}
                 {onDelete && (
                  <button 
                      onClick={(e) => { e.stopPropagation(); onDelete(); }}
                      className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-gray-700 rounded-md transition-colors"
                      title={t.projectCard.delete}
                  >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                  </button>
                 )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <ShareModal 
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        projectUrl={project.publishedUrl || ''}
        projectName={project.businessName}
        projectHeadline={project.headline}
      />
    </>
  );
};