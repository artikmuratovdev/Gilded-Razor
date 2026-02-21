import { Card, CardContent } from '../../components/ui/Card';
import { ClientsHeader } from './ClientsHeader';
import { ClientsFilters } from './ClientsFilters';
import { ClientsTable } from './ClientsTable';

export const Clients = () => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <ClientsHeader />

      <Card>
        <CardContent className="p-0">
          <ClientsFilters />
          <ClientsTable />
        </CardContent>
      </Card>
    </div>
  );
};
