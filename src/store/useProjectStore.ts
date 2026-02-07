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
  sortProjects: (criteria: string) => void;
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

  sortProjects: (criteria) => set((state) => {
    const sorted = [...state.filteredProjects].sort((a, b) => {
      if (criteria === 'alphabetical') {
        return a.title.localeCompare(b.title);
      }
      
      const countItems = (project: Project, type: string) => 
        (project.incidents ?? []).filter(i => i.item?.toString().toLowerCase() === type).length;

      if (criteria === 'incidents') return countItems(b, 'incident') - countItems(a, 'incident');
      if (criteria === 'rfi') return countItems(b, 'rfi') - countItems(a, 'rfi');
      if (criteria === 'tasks') return countItems(b, 'task') - countItems(a, 'task');
      
      return 0;
    });
    return { filteredProjects: sorted };
  }),

  setProjects: (projects) => set({ projects, filteredProjects: projects }),

  setCurrentPage: (page) => set({ currentPage: page }),
  setItemsPerPage: (n) => set({ itemsPerPage: n }),
}));
