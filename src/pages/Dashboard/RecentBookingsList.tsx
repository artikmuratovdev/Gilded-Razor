import { Button } from "@/components/ui/Button";
import type { Booking } from "@/types";
import { CalendarDays } from "lucide-react";
import { useMemo, useState } from "react";
import { Badge } from "../../components/ui/Badge";
import { Card, CardContent } from "../../components/ui/Card";
import { Modal } from "../../components/ui/Modal";
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { useGetAppoitmentsQuery } from "@/app/api/appoitmentsApi/appoitmentsApi";
import type { AppoitmentRes } from "@/app/api/appoitmentsApi/type";


const statusVariant = (status: Booking["status"]) => {
  if (status === "completed") return "success";
  if (status === "pending") return "warning";
  if (status === "confirmed") return "success";
  return "info";
};

const BookingRow = ({ booking }: { booking: AppoitmentRes['data'][0] }) => (
  <div className="flex items-center gap-4 py-2 px-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer border border-transparent hover:border-primary/20 group">
    {booking ? (
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>{booking.client_name}</AvatarFallback>
        <AvatarBadge className="bg-green-600 dark:bg-green-800" />
      </Avatar>
    ) : (
      <div className="w-12 h-12 rounded-full bg-surface-light flex items-center justify-center
      text-white font-bold shrink-0">
        ...
      </div>
    )}
    <div className="flex-1 min-w-0">
      <h4 className="text-sm font-bold text-white truncate">
        {booking.client_name}
      </h4>
      <p className="text-xs text-gray-400">
        {booking.service_name} • {booking.staff_member_name}
      </p>
    </div>
    <div className="flex flex-col items-end gap-1">
      <span className="text-xs text-gray-400">{booking.date}</span>
      <span className="text-xs font-bold text-white">{booking.start_time}</span>
      <Badge variant={statusVariant(booking.status)} className="text-[10px]">
        {booking.status === "completed"
          ? "Yakunlangan"
          : booking.status === "pending"
            ? "Kutilmoqda"
            : booking.status === "confirmed"
              ? "Tasdiqlangan"
                : booking.status}
      </Badge>
    </div>
  </div>
);

export const RecentBookingsList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const datetime_from = useMemo(() => {
    return new Date().toISOString();
  }, []);

  const { data ,isLoading} = useGetAppoitmentsQuery({
    page: 1,
    page_size: 10,
    datetime_from,
  });

  console.log("QueryData", data);
  if(isLoading) return <p>Loading</p>
  if(!data) return;
  return (
    <>
      <Card className=" flex flex-col">
        <CardContent className="p-3 flex-1 flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-bold text-white">Navbatdagilar</h3>
            <Button
              onClick={() => setIsModalOpen(true)}
              variant="secondary"
              size="sm"
              className="rounded-full"
            >
              Barchasini Ko'rish
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto space-y-2 custom-scrollbar">
            {data.data.slice(0, 4).map((booking) => (
              <BookingRow key={booking.id} booking={booking} />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* All Bookings Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Barcha So'nggi Bronlar"
        description={`${data.data.length} ta bron mavjud`}
        icon={<CalendarDays className="h-8 w-8 text-primary" />}
      >
        <div className="space-y-2 max-h-105 overflow-y-auto pr-1 custom-scrollbar">
          {data.data.map((booking) => (
            <BookingRow key={booking.id} booking={booking} />
          ))}
        </div>
      </Modal>
    </>
  );
};
