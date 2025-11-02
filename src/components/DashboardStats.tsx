import { type Project, type Payment } from '../types';
import {
  countPaidVsUnpaid,
  calculateTotalBudget,
  calculateTotalPayments,
  formatCurrency
} from '../utils/helpers';
import { Briefcase, DollarSign, CheckCircle, XCircle } from 'lucide-react';

interface DashboardStatsProps {
  projects: Project[];
  payments: Payment[];
}

export function DashboardStats({ projects, payments }: DashboardStatsProps) {
  const { paid, unpaid } = countPaidVsUnpaid(projects);
  const totalBudget = calculateTotalBudget(projects);
  const totalPaymentsReceived = calculateTotalPayments(payments);

  const stats = [
    {
      label: "Total Projects",
      value: projects.length.toString(),
      icon: Briefcase,
      color: "bg-blue-100 text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      label: "Total Budget",
      value: formatCurrency(totalBudget),
      icon: DollarSign,
      color: "bg-green-100 text-green-600",
      bgColor: "bg-green-50"
    },
    {
      label: "Paid Projects",
      value: paid.toString(),
      icon: CheckCircle,
      color: "bg-green-100 text-green-600",
      bgColor: "bg-green-50"
    },
    {
      label: "Unpaid Projects",
      value: unpaid.toString(),
      icon: XCircle,
      color: "bg-red-100 text-red-600",
      bgColor: "bg-red-50"
    },
    {
      label: "Total Payments Received",
      value: formatCurrency(totalPaymentsReceived),
      icon: DollarSign,
      color: "bg-green-100 text-green-600",
      bgColor: "bg-green-50"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className={`${stat.bgColor} rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`${stat.color} p-3 rounded-full`}>
                <Icon className="w-6 h-6" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
            <p className="text-sm text-gray-600">{stat.label}</p>
          </div>
        );
      })}
    </div>
  );
}
