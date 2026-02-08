export interface User {
  name: string;
  lastName: string;
  email?: string;
  role?: string;
  _id?: string;
}

export interface IncidentItem {
  _id: string;
  status: string;
  item: string;
  description: string;
  owner: string;
  tag: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  limitDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface PartnerClient {
  _id: string;
  maxUsers?: number;
  maxAdmins?: number;
  maxStorage?: number;
}

export interface Project {
  _id: string;
  title: string;
  description?: string;
  projectPlan?: {
    _id: string;
  };
  status?: string;
  img?: string;
  lastVisit?: string;
  position?: {
    _id: string;
    lat: number;
    lng: number;
  };
  users?: User[];
  clientData?: {
    title: string;
    _id: string;
  };
  city?: string;
  country?: string | number;
  lastUpdated?: string;
  partnerClients?: PartnerClient[];
  companyId?: string;
  address?: string;
  projectClientAdmin?: string[];
  projectPlanData?: {
    plan: string;
  };
  createdAt?: string;
  incidents?: IncidentItem[];
}

