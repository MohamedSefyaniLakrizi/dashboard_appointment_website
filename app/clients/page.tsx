import { getClients } from "@/lib/actions/clients";
import { DataTable } from "@/app/components/clients/data-table";
import { AddClientDialog } from "@/app/components/clients/add-client-dialog";

export default async function ClientsPage() {
  const result = await getClients();

  if (!result.success) {
    return (
      <div className="container mx-auto py-10">
        <div className="text-red-500">Erreur: {result.error}</div>
      </div>
    );
  }

  const clients = result.data || [];

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Clients</h1>
          <p className="text-muted-foreground">
            Gérez vos clients et leurs informations
          </p>
        </div>
      </div>

      <DataTable data={clients} />
    </div>
  );
}
