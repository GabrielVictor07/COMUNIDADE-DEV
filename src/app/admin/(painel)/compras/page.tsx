import { getPurchases } from "@/server/payments";
import DataTable from "@/components/DataTable";

const statusColors: Record<string, string> = {
  PAID: "bg-green-500/20 text-green-400",
  PENDING: "bg-yellow-500/20 text-yellow-400",
  CANCELED: "bg-red-500/20 text-red-400",
  REFUNDED: "bg-gray-500/20 text-gray-400",
};

const statusLabels: Record<string, string> = {
  PAID: "Pago",
  PENDING: "Pendente",
  CANCELED: "Cancelado",
  REFUNDED: "Reembolsado",
};

export default async function ComprasPage() {
  const purchases = await getPurchases();

  const columns = [
    {
      key: "user",
      label: "Usuário",
      render: (_: any, row: any) => row.user?.name || "-",
    },
    {
      key: "email",
      label: "Email",
      render: (_: any, row: any) => row.user?.email || "-",
    },
    {
      key: "payment_id",
      label: "ID Pagamento",
      render: (value: string | null) => value || "-",
    },
    {
      key: "amount",
      label: "Valor",
      render: (value: number) =>
        new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(value),
    },
    {
      key: "status",
      label: "Status",
      render: (value: string) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[value] || ""}`}
        >
          {statusLabels[value] || value}
        </span>
      ),
    },
    {
      key: "created_at",
      label: "Data",
      render: (value: string) =>
        new Date(value).toLocaleDateString("pt-BR"),
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Compras</h1>
      <DataTable
        columns={columns}
        data={JSON.parse(JSON.stringify(purchases))}
        emptyMessage="Nenhuma compra encontrada."
      />
    </div>
  );
}
