import { type Client } from '../types/index';
import { User, Mail, Globe } from 'lucide-react';

interface ClientCardProps {
  client: Client;
}

export function ClientCard({ client }: ClientCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-gray-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="bg-blue-100 p-3 rounded-full">
            <User className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{client.name}</h3>
            <p className="text-sm text-gray-500">Client ID: {client.id}</p>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-gray-700">
          <Globe className="w-4 h-4 text-gray-400" />
          <span className="text-sm">{client.country}</span>
        </div>

        {client.email ? (
          <div className="flex items-center gap-2 text-gray-700">
            <Mail className="w-4 h-4 text-gray-400" />
            <span className="text-sm">{client.email}</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-gray-400">
            <Mail className="w-4 h-4" />
            <span className="text-sm italic">No email provided</span>
          </div>
        )}
      </div>
    </div>
  );
}
