import { clients } from '@/constants/clients';
import { useState } from 'react';
import { Card, CardContent } from '../../components/ui/Card';
import { ClientsFilters } from './ClientsFilters';
import { ClientsTable } from './ClientsTable';

export const Clients = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredClients = clients.filter((client) => {
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch =
      client.name.toLowerCase().includes(searchLower) ||
      client.email.toLowerCase().includes(searchLower) ||
      client.phone.toLowerCase().includes(searchLower);

    const matchesStatus =
      statusFilter === 'all' ||
      client.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  return (
    <div className='space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500'>

      <Card>
        <CardContent className='p-0'>
          <ClientsFilters
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
          />
          <ClientsTable data={filteredClients} />
        </CardContent>
      </Card>
    </div>
  );
};
