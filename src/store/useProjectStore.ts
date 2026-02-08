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

  searchProjects: (query) => set((state) => {
    if (!query.trim()) {
      return { filteredProjects: state.projects, currentPage: 1 };
    }

    const filteredProjects = state.projects.filter(p => {
      const title = p.title.toLowerCase();
      const searchQuery = query.toLowerCase();
      
      // Check if the search query has leading zeros (e.g., "01", "02", "001")
      const hasLeadingZero = /^0\d+$/.test(query);
      
      if (hasLeadingZero) {
        // Extract the number from the query (e.g., "01" -> 1, "002" -> 2)
        const searchNumber = parseInt(query, 10);
        
        // Extract the number from the project title (e.g., "Project-1" -> 1)
        const match = title.match(/project-(\d+)$/);
        if (match) {
          const projectNumber = parseInt(match[1], 10);
          return projectNumber === searchNumber;
        }
        return false;
      }
      
      // Default behavior: partial match
      return title.includes(searchQuery);
    });

    return { filteredProjects, currentPage: 1 };
  }),

  sortProjects: (criteria) => set((state) => {
    const sorted = [...state.filteredProjects].sort((a, b) => {
      if (criteria === 'alphabetical') {
        return a.title.localeCompare(b.title);
      }
      
      const countItems = (project: Project, type: string) => 
        (project.incidents ?? []).filter(i => i.item?.toString().toLowerCase() === type).length;

      if (criteria === 'incidents') return countItems(b, 'incidents') - countItems(a, 'incidents');
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
