export interface User {
  name: string;
  lastName: string;
}

export interface IncidentItem {
  item: string;
  // other fields can be added as needed
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
