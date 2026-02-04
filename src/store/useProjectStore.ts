import { create } from 'zustand';
import { Project } from '@/types/project';
import mockData from '@/data/mock_data.json';

interface ProjectState {
  projects: Project[];
  filteredProjects: Project[];
  selectedProject: Project | null;
  setProjects: (projects: Project[]) => void;
  setSelectedProject: (project: Project | null) => void;
  searchProjects: (query: string) => void;
}

export const useProjectStore = create<ProjectState>((set) => ({
  projects: mockData as Project[],
  filteredProjects: mockData as Project[],
  selectedProject: null,

  setSelectedProject: (project) => set({ selectedProject: project }),

  searchProjects: (query) => set((state) => ({
    filteredProjects: state.projects.filter(p => 
      p.title.toLowerCase().includes(query.toLowerCase())
    )
  })),

  setProjects: (projects) => set({ projects, filteredProjects: projects }),
}));
