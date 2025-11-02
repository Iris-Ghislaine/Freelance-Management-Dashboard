import {type Client,type Project, type Payment,type ProjectStatus,type PaymentStatus } from '../types';

export function countPaidVsUnpaid(projects: Project[]): { paid: number; unpaid: number } {
  return projects.reduce(
    (acc, project) => {
      if (project.paymentStatus === "paid") {
        acc.paid++;
      } else {
        acc.unpaid++;
      }
      return acc;
    },
    { paid: 0, unpaid: 0 }
  );
}

export function findClientById(clients: Client[], clientId: string): Client | undefined {
  return clients.find(client => client.id === clientId);
}

export function findClientByIdSafe(clients: Client[], clientId: string): Client | null {
  const client = clients.find(client => client.id === clientId);
  return client ?? null;
}

export function validatePayment(payment: Payment): boolean {
  if (!payment.projectId || typeof payment.projectId !== 'string') {
    return false;
  }
  if (typeof payment.amount !== 'number' || payment.amount <= 0) {
    return false;
  }
  if (!payment.date || typeof payment.date !== 'string') {
    return false;
  }
  try {
    new Date(payment.date);
    return true;
  } catch {
    return false;
  }
}

export function recordPayment(
  payment: Payment,
  projects: Project[],
  // payments: Payment[]
): { isValid: boolean; error?: string; payment?: Payment } {
  if (!validatePayment(payment)) {
    return { isValid: false, error: "Invalid payment data" };
  }

  const project = projects.find(p => p.id === payment.projectId);
  if (!project) {
    return { isValid: false, error: "Project not found" };
  }

  return { isValid: true, payment };
}

export function filterProjectsByStatus(projects: Project[], status: ProjectStatus): Project[] {
  return projects.filter(project => project.status === status);
}

export function filterProjectsByPaymentStatus(
  projects: Project[],
  paymentStatus: PaymentStatus
): Project[] {
  return projects.filter(project => project.paymentStatus === paymentStatus);
}

export function searchClients(clients: Client[], searchTerm: string): Client[] {
  const term = searchTerm.toLowerCase();
  return clients.filter(client =>
    client.name.toLowerCase().includes(term) ||
    client.country.toLowerCase().includes(term) ||
    client.email?.toLowerCase().includes(term)
  );
}

export function searchProjects(projects: Project[], searchTerm: string): Project[] {
  const term = searchTerm.toLowerCase();
  return projects.filter(project =>
    project.title.toLowerCase().includes(term)
  );
}

export function calculateTotalBudget(projects: Project[]): number {
  return projects.reduce((total, project) => total + project.budget, 0);
}

export function calculateTotalPayments(payments: Payment[]): number {
  return payments.reduce((total, payment) => total + payment.amount, 0);
}

export function getProjectStatusColor(status: ProjectStatus): string {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-800 border-yellow-300";
    case "in-progress":
      return "bg-blue-100 text-blue-800 border-blue-300";
    case "completed":
      return "bg-green-100 text-green-800 border-green-300";
    default:
      return "bg-gray-100 text-gray-800 border-gray-300";
  }
}

export function getPaymentStatusColor(paymentStatus: PaymentStatus): string {
  switch (paymentStatus) {
    case "paid":
      return "bg-green-100 text-green-800 border-green-300";
    case "unpaid":
      return "bg-red-100 text-red-800 border-red-300";
    default:
      return "bg-gray-100 text-gray-800 border-gray-300";
  }
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date);
}
