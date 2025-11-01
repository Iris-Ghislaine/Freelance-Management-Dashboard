export interface Client {
  id: string;
  name: string;
  country: string;
  email?: string;
}

export type ProjectStatus = "pending" | "in-progress" | "completed";
export type PaymentStatus = "paid" | "unpaid";

export interface Project {
  id: string;
  clientId: string;
  title: string;
  budget: number;
  status: ProjectStatus;
  paymentStatus: PaymentStatus;
}

export interface Payment {
  projectId: string;
  amount: number;
  date: string;
}

export interface AppState {
  clients: Client[];
  projects: Project[];
  payments: Payment[];
}

export type ActionType =
  | { type: "ADD_PAYMENT"; payload: Payment }
  | { type: "MARK_PROJECT_PAID"; payload: string }
  | { type: "ADD_CLIENT"; payload: Client }
  | { type: "ADD_PROJECT"; payload: Project }
  | { type: "UPDATE_PROJECT_STATUS"; payload: { projectId: string; status: ProjectStatus } };
