import { create } from 'zustand';
import { Project } from '@/types/project';
import mockData from '@/data/mock_data.json';

interface ProjectState {
  projects: Project[];
  filteredProjects: Project[];
  selectedProject: Project | null;
  currentPage: number;
  itemsPerPage: number;
  setProjects: (projects: Project[]) => void;
  setSelectedProject: (project: Project | null) => void;
  searchProjects: (query: string) => void;
  setCurrentPage: (page: number) => void;
  setItemsPerPage: (n: number) => void;
}

export const useProjectStore = create<ProjectState>((set) => ({
  projects: mockData as Project[],
  filteredProjects: mockData as Project[],
  selectedProject: null,
  currentPage: 1,
  itemsPerPage: 10,

  setSelectedProject: (project) => set({ selectedProject: project }),

  searchProjects: (query) => set((state) => ({
    filteredProjects: state.projects.filter(p =>
      p.title.toLowerCase().includes(query.toLowerCase())
    ),
    currentPage: 1
  })),

  setProjects: (projects) => set({ projects, filteredProjects: projects }),

  setCurrentPage: (page) => set({ currentPage: page }),
  setItemsPerPage: (n) => set({ itemsPerPage: n }),
}));
