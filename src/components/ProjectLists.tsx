import { type Project } from '../types';
import { useAppContext } from '../context/AppContext';
import {
  findClientByIdSafe,
  formatCurrency,
  getProjectStatusColor,
  getPaymentStatusColor
} from '../utils/helpers';
import { Briefcase, DollarSign, CheckCircle } from 'lucide-react';

interface ProjectListProps {
  projects: Project[];
}

export function ProjectList({ projects }: ProjectListProps) {
  const { state, dispatch } = useAppContext();

  const handleMarkAsPaid = (projectId: string) => {
    dispatch({ type: "MARK_PROJECT_PAID", payload: projectId });

    const project = projects.find(p => p.id === projectId);
    if (project) {
      const payment = {
        projectId: project.id,
        amount: project.budget,
        date: new Date().toISOString()
      };
      dispatch({ type: "ADD_PAYMENT", payload: payment });
    }
  };

  const getClientName = (clientId: string): string => {
    const client = findClientByIdSafe(state.clients, clientId);
    return client ? client.name : "Client not found";
  };

  if (projects.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center text-gray-500">
        No projects found
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {projects.map((project) => (
        <div
          key={project.id}
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-gray-200"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-start gap-3 flex-1">
              <div className="bg-blue-100 p-3 rounded-full">
                <Briefcase className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {project.title}
                </h3>
                <p className="text-sm text-gray-600">{getClientName(project.clientId)}</p>
              </div>
            </div>

            <div className="flex flex-col items-end gap-2">
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium border ${getProjectStatusColor(
                  project.status
                )}`}
              >
                {project.status.replace("-", " ")}
              </span>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium border ${getPaymentStatusColor(
                  project.paymentStatus
                )}`}
              >
                {project.paymentStatus}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-gray-400" />
              <span className="text-lg font-semibold text-gray-900">
                {formatCurrency(project.budget)}
              </span>
            </div>

            {project.paymentStatus === "unpaid" && (
              <button
                onClick={() => handleMarkAsPaid(project.id)}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors font-medium text-sm"
              >
                <CheckCircle className="w-4 h-4" />
                Mark as Paid
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
