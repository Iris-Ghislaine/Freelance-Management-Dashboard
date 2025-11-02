import { createContext, useContext, useReducer, type ReactNode } from 'react';
import {type AppState, type ActionType, } from '../types';

const initialState: AppState = {
 clients: [
  {
    id: "c1",
    name: "Vuba Vuba",
    country: "Rwanda",
    email: "vubavuba@contact.rw"
  },
  {
    id: "c2",
    name: "Creative Agency Ltd.",
    country: "United Kingdom"
  },
  {
    id: "c3",
    name: "Irembo Ltd.",
    country: "Rwanda",
    email: "contact@irembo.rw"
  },
  {
    id: "c4",
    name: "SwissTech Innovations",
    country: "Switzerland",
    email: "info@swisstech.ch"
  }
],
 projects: [
  {
    id: "p1",
    clientId: "c1",
    title: "E-commerce Website Development",
    budget: 150000,
    status: "in-progress",
    paymentStatus: "unpaid"
  },
  {
    id: "p2",
    clientId: "c2",
    title: "Brand Identity Design",
    budget: 8000,
    status: "completed",
    paymentStatus: "paid"
  },
  {
    id: "p3",
    clientId: "c3",
    title: "Digital Payment Portal Upgrade",
    budget: 120000,
    status: "in-progress",
    paymentStatus: "unpaid"
  },
  {
    id: "p4",
    clientId: "c4",
    title: "AI-Driven Analytics Dashboard",
    budget: 250000,
    status: "pending",
    paymentStatus: "unpaid"
  }
],

 payments: [
  {
    projectId: "p2",
    amount: 8000,
    date: "2025-10-15T10:00:00Z"
  },
  {
    projectId: "p3",
    amount: 6000, // partial payment
    date: "2025-11-01T09:00:00Z"
  },
  {
    projectId: "p4",
    amount: 10000,
    date: "2025-11-02T14:30:00Z"
  }
]

};

function appReducer(state: AppState, action: ActionType): AppState {
  switch (action.type) {
    case "ADD_PAYMENT":
      return {
        ...state,
        payments: [...state.payments, action.payload]
      };
    case "MARK_PROJECT_PAID":
      return {
        ...state,
        projects: state.projects.map(project =>
          project.id === action.payload
            ? { ...project, paymentStatus: "paid" }
            : project
        )
      };
    case "ADD_CLIENT":
      return {
        ...state,
        clients: [...state.clients, action.payload]
      };
    case "ADD_PROJECT":
      return {
        ...state,
        projects: [...state.projects, action.payload]
      };
    case "UPDATE_PROJECT_STATUS":
      return {
        ...state,
        projects: state.projects.map(project =>
          project.id === action.payload.projectId
            ? { ...project, status: action.payload.status }
            : project
        )
      };
    default:
      return state;
  }
}

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<ActionType>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
