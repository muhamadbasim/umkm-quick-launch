import React, { useState, useEffect } from 'react';
import { Project } from './types';
import Dashboard from './views/Dashboard';
import CreateProject from './views/CreateProject';
import { Layout } from './components/Layout';
import { useLanguage } from './contexts/LanguageContext';
import { getStoredProjects, setStoredProjects } from './utils/storage';

// Demo projects for first-time users
const DEMO_PROJECTS: Project[] = [
  {
    id: '1',
    businessName: 'Oase Coffee Lab',
    imageUrl: 'https://picsum.photos/400/300',
    headline: 'Artistry in Every Cup',
    story: 'Sourcing the finest local beans, roasted to perfection for a transcendent coffee experience.',
    phone: '628123456789',
    templateId: 'culinary',
    status: 'published',
    publishedUrl: 'https://oase-lab.brand.site',
    createdAt: Date.now() - 10000000,
  },
  {
    id: '2',
    businessName: 'Atelier Sutra',
    imageUrl: 'https://picsum.photos/400/301',
    headline: 'Timeless Woven Heritage',
    story: 'Reimagining traditional silk weaving for the modern connoisseur of fashion.',
    phone: '628198765432',
    templateId: 'fashion',
    status: 'draft',
    createdAt: Date.now() - 5000000,
  }
];

export default function App() {
  const [currentView, setCurrentView] = useState<'dashboard' | 'create'>('dashboard');
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const { t } = useLanguage();

  // Load projects from localStorage on mount, with demo fallback
  const [projects, setProjects] = useState<Project[]>(() => {
    const stored = getStoredProjects();
    return stored.length > 0 ? stored : DEMO_PROJECTS;
  });

  // Persist projects to localStorage whenever they change
  useEffect(() => {
    setStoredProjects(projects);
  }, [projects]);

  const handleCreateProject = () => {
    setEditingProject(null);
    setCurrentView('create');
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setCurrentView('create');
  };

  const handleDeleteProject = (id: string) => {
    if (window.confirm(t.app.deleteConfirm)) {
      setProjects(prev => prev.filter(p => p.id !== id));
    }
  };

  const handleProjectSave = (savedProject: Project) => {
    if (editingProject) {
      // Update existing project
      setProjects(prev => prev.map(p => p.id === savedProject.id ? savedProject : p));
    } else {
      // Add new project
      setProjects(prev => [savedProject, ...prev]);
    }
    setEditingProject(null);
    setCurrentView('dashboard');
  };

  const handleCancelCreate = () => {
    setEditingProject(null);
    setCurrentView('dashboard');
  };

  return (
    <Layout>
      {currentView === 'dashboard' && (
        <Dashboard
          projects={projects}
          onCreateNew={handleCreateProject}
          onEdit={handleEditProject}
          onDelete={handleDeleteProject}
        />
      )}
      {currentView === 'create' && (
        <CreateProject
          initialProject={editingProject || undefined}
          onSuccess={handleProjectSave}
          onCancel={handleCancelCreate}
        />
      )}
    </Layout>
  );
}