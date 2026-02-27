import type { GetStaffRes } from "@/app/api/staffApi/type";
import { Clock, Scissors } from "lucide-react";
import { Link } from "react-router";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { Card, CardContent } from "../../components/ui/Card";
import { cn } from "../../lib/utils";
import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type StaffItem = GetStaffRes["data"][number];

interface StaffGridProps {
  staffMembers: StaffItem[];
  isLoading?: boolean;
}

export const StaffGrid = ({ staffMembers, isLoading }: StaffGridProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl bg-surface/40 border border-white/5 h-64 animate-pulse"
          />
        ))}
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
      {staffMembers.map((staff) => (
        <Card
          key={staff.id}
          className="overflow-hidden group hover:border-primary/50 transition-colors bg-surface/40"
        >
          <CardContent className="p-4 sm:p-6">
            <div className="flex justify-between items-start mb-4 sm:mb-6">
              <div className="relative">
                <Avatar size="lg">
                  <AvatarImage
                    src={staff.avatar || "https://github.com/maxleiter.png"}
                    alt={staff.name || "@maxleiter"}
                  />
                  <AvatarFallback>{staff.name}</AvatarFallback>
                  <AvatarBadge className="bg-green-600 dark:bg-green-800" />
                </Avatar>
                <div
                  className={cn(
                    "absolute -bottom-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 border-surface flex items-center justify-center",
                    staff.status === "active"
                      ? "bg-green-500"
                      : staff.status === "busy"
                        ? "bg-blue-500"
                        : "bg-gray-500",
                  )}
                >
                  {staff.status === "busy" && (
                    <Scissors className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
                  )}
                </div>
              </div>
              <div className="text-right">
                <Badge
                  variant={
                    staff.status === "active"
                      ? "success"
                      : staff.status === "busy"
                        ? "info"
                        : "default"
                  }
                  className="mb-2 text-[9px] sm:text-[10px]"
                >
                  {staff.status_display ?? staff.status}
                </Badge>
                <p className="text-[8px] sm:text-[10px] text-gray-400 font-bold uppercase">
                  Bugungi Daromad
                </p>
                <p className="text-base sm:text-lg font-bold text-white">—</p>
              </div>
            </div>

            <div className="mb-4 sm:mb-6">
              <h3 className="text-base sm:text-lg font-bold text-white truncate">
                {staff.name}
              </h3>
              <p className="text-xs sm:text-sm text-primary font-medium">
                {staff.specialization_display ?? staff.specialization}
              </p>
            </div>

            <div className="bg-surface-light rounded-xl p-2.5 sm:p-3 mb-4 border border-white/5">
              <p className="text-[9px] sm:text-[10px] text-gray-400 font-bold uppercase mb-1">
                Holat
              </p>
              <div className="flex justify-between items-center gap-2">
                <span className="text-xs sm:text-sm font-medium text-white truncate">
                  {staff.status_display ?? staff.status}
                </span>
                {staff.status === "Available" && (
                  <Badge
                    variant="gold"
                    className="text-[8px] sm:text-[9px] whitespace-nowrap px-1.5"
                  >
                    Hot Shave
                  </Badge>
                )}
                {staff.status === "In Session" && (
                  <Badge
                    variant="info"
                    className="text-[8px] sm:text-[9px] whitespace-nowrap px-1.5"
                  >
                    Fade Cut
                  </Badge>
                )}
                {staff.status === "busy" && (
                  <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400" />
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              <Button
                variant="outline"
                className="w-full text-[10px] sm:text-xs h-8 sm:h-9"
              >
                Jadval
              </Button>
              <Link to={`/staff/${staff.id}`} className="w-full">
                <Button
                  variant="ghost"
                  className="w-full text-[10px] sm:text-xs h-8 sm:h-9"
                >
                  Profil
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Add New Card */}
      {/* <button
        onClick={onAddStaff}
        className='rounded-2xl border border-dashed border-white/10 bg-surface/30 hover:bg-surface/50 hover:border-primary/50 transition-all flex flex-col items-center justify-center p-6 text-center group cursor-pointer h-full min-h-[220px] sm:min-h-[280px]'
      >
        <div className='w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary/20 transition-colors mb-3 sm:mb-4'>
          <Plus className='w-5 h-5 sm:w-6 sm:h-6 text-gray-400 group-hover:text-primary' />
        </div>
        <h3 className='text-base sm:text-lg font-bold text-white group-hover:text-primary transition-colors'>
          Jamoaga Qo'shish
        </h3>
        <p className='text-[10px] sm:text-sm text-gray-500 mt-1 sm:mt-2'>
          Sartaroshxona jamoangizni kengaytiring
        </p>
      </button> */}
    </div>
  );
};
