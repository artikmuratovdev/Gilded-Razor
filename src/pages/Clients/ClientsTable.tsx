import { Link, Pencil, Phone, Trash2 } from "lucide-react";
import { Button } from "../../components/ui/Button";
import type { GetClientsRes } from "@/app/api/clientsApi/type";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent } from "@/components/ui/Card";
import { useDispatch } from "react-redux";
import {
  openModal,
  setClientToDelete,
  setClientToEdit,
} from "@/app/slices/modalSlice";
import { useCreateConnectionMutation } from "@/app/api/clientsApi/clientsApi";
import { useHandleRequest } from "@/hooks/HandleRequest/useHandleRequest";
import { toast } from "sonner";

interface ClientsTableProps {
  data: GetClientsRes["data"];
  isRecentPage: boolean;
}

export const ClientsTable = ({ data, isRecentPage }: ClientsTableProps) => {
  const dispatch = useDispatch();
  const [createConnection] = useCreateConnectionMutation();
  const handleRequest = useHandleRequest();

  const handleDeleteClick = (client: GetClientsRes["data"][0]) => {
    dispatch(setClientToDelete({ id: client.id, name: client.full_name }));
    dispatch(openModal("deleteClient"));
  };

  const handleEditClick = (client: GetClientsRes["data"][0]) => {
    dispatch(
      setClientToEdit({
        id: client.id,
        first_name: client.first_name,
        last_name: client.last_name,
        email: "", // API doesn't return email in the list, will need to fetch or leave empty
        phone: client.phone,
      }),
    );
    dispatch(openModal("editClient"));
  };

  const handleConnection = (id: number) => {
    handleRequest({
      request: async () => await createConnection(id),
      onSuccess: (res) => {
        console.log(res.data);
        toast.success("Muvaffaqiyatli ulandi");
      },
      onError: (error) => {
        console.log(error?.error?.message || error);
        toast.error(error?.error?.message || error);
      },
    });
  };

  return (
    <>
      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-xs text-gray-500 font-bold uppercase tracking-wider bg-surface-light/30">
              <th className="p-4 pl-6">Mijoz Profili</th>
              <th className="p-4">Aloqa Ma'lumoti</th>
              <th className="p-4">Holat</th>
              <th className="p-4 pr-6 text-right">Amallar</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {data.map((client) => (
              <tr
                key={client.id}
                className="group hover:bg-white/2 transition-colors"
              >
                <td className="p-4 pl-6">
                  <p className="font-bold text-white text-sm">
                    {client.full_name}
                  </p>
                </td>
                <td className="p-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <Phone className="w-3 h-3" /> {client.phone}
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <Badge variant={client.is_active ? "success" : "warning"}>
                    {client.is_active ? "Faol" : "Faol Emas"}
                  </Badge>
                </td>
                <td className="p-4 pr-6 text-right">
                  <div className="flex justify-end gap-2">
                    {isRecentPage && (
                      <Button
                        variant="ghost"
                        size="icon"
                        // className="h-8 w-8 text-teal-400 hover:text-teal-300 hover:bg-teal-400/10"
                      className="h-8 w-8 text-[#201D12] bg-teal-500 hover:text-teal-300 hover:bg-teal-400/10"
                        title="Ulash"
                        onClick={() => handleConnection(client.id)}
                      >
                        <Link className="h-4 w-4" />
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-[#201D12] bg-white hover:text-white hover:bg-white/10"
                      title="Profilni Tahrirlash"
                      onClick={() => handleEditClick(client)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-[#201D12] bg-red-400 hover:text-red-300 hover:bg-red-400/10"
                      title="Mijozni O'chirish"
                      onClick={() => handleDeleteClick(client)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile/Tablet Card View */}
      <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
        {data.length > 0 ? (
          data.map((client) => (
            <Card
              key={client.id}
              className="overflow-hidden group border-primary transition-colors bg-surface/40  shadow-[#D4AF35]"
            >
              <CardContent className="p-4 space-y-4">
                <div className="flex justify-between items-start">
                  <h4 className="font-bold text-white">{client.full_name}</h4>
                  <Badge
                    className="text-base"
                    variant={client.is_active ? "success" : "warning"}
                  >
                    {client.is_active ? "Faol" : "Faol Emas"}
                  </Badge>
                </div>

                <div className="flex justify-between items-start">
                  <h4 className="font-bold text-white">Aloqa</h4>
                  <p className="text-[14px] text-gray-300">{client.phone}</p>
                </div>

                <div className="flex gap-2 w-full">
                  {isRecentPage && (
                    <Button
                      variant="outline"
                      size="sm"
                      // #201D12
                      // className="flex-1 h-9 text-xs gap-2 text-teal-400 hover:text-teal-300 hover:bg-teal-400/10"
                      className="flex-1 h-9 text-xs gap-2 text-[#201D12] bg-teal-500 hover:text-teal-300 hover:bg-teal-400/10"
                      onClick={() => handleConnection(client.id)}
                    >
                      <Link className="h-3.5 w-3.5" /> Ulash
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    // className="flex-1 h-9 text-xs gap-2"
                    className="flex-1 h-9 text-xs gap-2 text-[#201D12] bg-white hover:text-white hover:bg-white/10"
                    onClick={() => handleEditClick(client)}
                  >
                    <Pencil className="h-3.5 w-3.5" /> Tahrirlash
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    // className="flex-1 h-9 p-0 text-red-400 hover:text-red-300 hover:bg-red-400/10"
                    className="flex-1 h-9 p-0 text-[#201D12] bg-red-400 hover:text-red-300 hover:bg-red-400/10"
                    onClick={() => handleDeleteClick(client)}
                  >
                    <Trash2 className="h-3.5 w-3.5" /> O'chirish
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full p-10 text-center text-gray-500 italic">
            Mijozlar topilmadi
          </div>
        )}
      </div>
    </>
  );
};
