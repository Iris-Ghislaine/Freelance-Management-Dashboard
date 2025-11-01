import { createContext, useContext, useReducer, type ReactNode } from 'react';
import { type AppState,type Client,type Payment, type ActionType, } from '../types/types';

const initialState: AppState = {
  clients: [
    {
      id: "c1",
      name: "Tech Solutions Inc.",
      country: "United States",
      email: "contact@techsolutions.com"
    },
    {
      id: "c2",
      name: "Creative Agency Ltd.",
      country: "United Kingdom"
    }
  ],
  projects: [
    {
      id: "p1",
      clientId: "c1",
      title: "E-commerce Website Development",
      budget: 15000,
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
    }
  ],
  payments: [
    {
      projectId: "p2",
      amount: 8000,
      date: "2025-10-15T10:00:00Z"
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
