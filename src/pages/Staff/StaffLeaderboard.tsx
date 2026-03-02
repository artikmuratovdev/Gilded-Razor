import { Star } from "lucide-react";
import { Badge } from "../../components/ui/Badge";
import { Card, CardContent } from "../../components/ui/Card";
import { cn } from "../../lib/utils";
import usePaginatedStaffs from "@/hooks/usePaginatedStaffs";
import { Spinner } from "@/components/ui/spinner";
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

export const StaffLeaderboard = () => {
  const { data, isLoading } = usePaginatedStaffs({
    page: 1,
    ordering: "-rating",
  });
  console.log(data);

  if (isLoading) return <Spinner className="size-8" />;
  if (!data) return;
  return (
    <Card className="overflow-hidden">
      <div className="p-4 sm:p-6 border-b border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h3 className="font-bold text-white text-base sm:text-lg">
          Haftalik Ko'rsatkich Reytingi
        </h3>
      </div>

      <CardContent className="p-0">
        {/* Mobile Leaderboard Cards */}
        <div className="sm:hidden divide-y divide-white/5">
          {data.data.map((staff, idx) => (
            <div
              key={staff.id}
              className="p-4 flex flex-col gap-3 hover:bg-white/2 transition-colors"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <span
                      className={cn(
                        "absolute -top-1 -left-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold z-10",
                        idx === 0
                          ? "bg-primary text-background"
                          : "bg-surface-light text-gray-400",
                      )}
                    >
                      #{idx + 1}
                    </span>
                    <Avatar>
                      <AvatarImage
                        src={staff.avatar || "https://github.com/shadcn.png"}
                        alt="@shadcn"
                      />
                      <AvatarFallback>{staff.name}</AvatarFallback>
                      <AvatarBadge className="bg-green-600 dark:bg-green-800" />
                    </Avatar>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">
                      {staff.name}
                    </h4>
                    <p className="text-[10px] text-gray-500">Master Barber</p>
                  </div>
                </div>
                <Badge variant="success" className="text-[10px]">
                  {staff.efficiency} Samaradorlik
                </Badge>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-2">
                <div className="bg-surface-light rounded-lg p-2 text-center">
                  <p className="text-[8px] text-gray-500 font-bold uppercase mb-0.5">
                    Bronlar
                  </p>
                  <p className="text-xs font-bold text-white">{staff.bookings}</p>
                </div>
                <div className="bg-surface-light rounded-lg p-2 text-center">
                  <p className="text-[8px] text-gray-500 font-bold uppercase mb-0.5">
                    Reyting
                  </p>
                  <p className="text-xs font-bold text-primary flex items-center justify-center gap-1">
                    {parseFloat(staff.rating).toFixed(1)}{" "}
                    <Star className="w-2.5 h-2.5 fill-current" />
                  </p>
                </div>
                <div className="bg-surface-light rounded-lg p-2 text-center">
                  <p className="text-[8px] text-gray-500 font-bold uppercase mb-0.5">
                    Daromad
                  </p>
                  <p className="text-xs font-bold text-white">{staff.income != null ? `${staff.income.toString()} so'm` : '—'}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Leaderboard Table */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5 text-xs text-gray-500 font-bold uppercase tracking-wider bg-white/1">
                <th className="p-4 pl-6">Reyting va Sartarosh</th>
                <th className="p-4">Bronlar</th>
                <th className="p-4">O'rt. Reyting</th>
                <th className="p-4">Daromad</th>
                <th className="p-4 pr-6 text-right">Samaradorlik</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {data.data.map((staff, idx) => (
                <tr
                  key={staff.id}
                  className="hover:bg-white/5 transition-colors group"
                >
                  <td className="p-4 pl-6 flex items-center gap-4">
                    <span
                      className={cn(
                        "text-sm font-bold w-6",
                        idx === 0 ? "text-primary" : "text-gray-500",
                      )}
                    >
                      #{idx + 1}
                    </span>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage
                          src={staff.avatar || "https://github.com/shadcn.png"}
                          alt="@shadcn"
                        />
                        <AvatarFallback>{staff.name}</AvatarFallback>
                        <AvatarBadge className="bg-green-600 dark:bg-green-800" />
                      </Avatar>
                      <span className="text-sm font-bold text-white group-hover:text-primary transition-colors">
                        {staff.name}
                      </span>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-gray-300">{staff.bookings}</td>
                  <td className="p-4 text-sm font-bold text-primary">
                    <div className="flex items-center gap-1">
                      {parseFloat(staff.rating).toFixed(1)}{" "}
                      <Star className="w-3 h-3 fill-current" />
                    </div>
                  </td>
                  <td className="p-4 text-sm font-bold text-white">{staff.income != null ? `${staff.income.toString()} so'm` : '—'}</td>
                  <td className="p-4 pr-6 text-right">
                    <Badge variant="success">{staff.efficiency}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};
