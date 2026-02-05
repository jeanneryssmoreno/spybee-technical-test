export interface User {
  name: string;
  lastName: string;
}

export interface IncidentItem {
  item: string;
}

export interface Project {
  _id: string;
  title: string;
  description?: string;
  projectPlanData?: { plan: string };
  status?: string;
  users?: User[];
  incidents?: IncidentItem[];
}
