import { useState } from 'react';
import { AppProvider, useAppContext } from './context/AppContext';
import { ClientCard } from './components/ClientCards';
import { ProjectList } from './components/ProjectLists';
import { DashboardStats } from './components/DashboardStats';
import { PaymentList } from './components/PaymentList';
import { FilterSection } from './components/FilterSection';
import {
  searchProjects,
  filterProjectsByStatus,
  filterProjectsByPaymentStatus
} from './utils/helpers';
import { type ProjectStatus, type PaymentStatus } from './types';
import { LayoutDashboard } from 'lucide-react';

function Dashboard() {
  const { state } = useAppContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<ProjectStatus | "all">("all");
  const [paymentFilter, setPaymentFilter] = useState<PaymentStatus | "all">("all");

  let filteredProjects = state.projects;

  if (searchTerm) {
    filteredProjects = searchProjects(filteredProjects, searchTerm);
  }

  if (statusFilter !== "all") {
    filteredProjects = filterProjectsByStatus(filteredProjects, statusFilter);
  }

  if (paymentFilter !== "all") {
    filteredProjects = filterProjectsByPaymentStatus(filteredProjects, paymentFilter);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-3 rounded-lg">
              <LayoutDashboard className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Freelance Management Dashboard
              </h1>
              <p className="text-gray-600 mt-1">
                Manage your clients, projects, and payments
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <section>
            <DashboardStats projects={state.projects} payments={state.payments} />
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Clients</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {state.clients.map((client) => (
                <ClientCard key={client.id} client={client} />
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Projects</h2>
            <div className="space-y-6">
              <FilterSection
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                statusFilter={statusFilter}
                onStatusFilterChange={setStatusFilter}
                paymentFilter={paymentFilter}
                onPaymentFilterChange={setPaymentFilter}
              />
              <ProjectList projects={filteredProjects} />
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment History</h2>
            <PaymentList payments={state.payments} projects={state.projects} />
          </section>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <Dashboard />
    </AppProvider>
  );
}

export default App;
