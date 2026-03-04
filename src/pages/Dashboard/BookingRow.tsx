import type { AppoitmentRes } from "@/app/api/appoitmentsApi/type";
import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/Badge";
import type { Booking } from "@/types";

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

export default BookingRow