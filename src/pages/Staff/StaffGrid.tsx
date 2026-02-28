import type { GetStaffRes } from "@/app/api/staffApi/type";
import { Link } from "react-router";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { Card, CardContent } from "../../components/ui/Card";
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

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
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>{staff.name}</AvatarFallback>
                <AvatarBadge className="bg-green-600 dark:bg-green-800" />
              </Avatar>
              <div className="text-right">
                <Badge
                  variant={
                    staff.status === 'available'
                      ? "success"
                      : staff.status === 'off_duty'
                        ? "danger"
                      : staff.status === 'in_session'
                        ? "gold"
                        : 'info'
                  }
                  className="mb-2 text-[9px] sm:text-[10px]"
                >
                  {staff.status_display ?? staff.status}
                </Badge>
                <p className="text-[8px] sm:text-[10px] text-gray-400 font-bold uppercase">
                  Bugungi Daromad
                </p>
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

            <div className="grid grid-cols-1 gap-2 sm:gap-3">
              <Link to={`/staff/${staff.id}`} className="w-full">
                <Button
                  variant="outline"
                  className="w-full text-[10px] sm:text-xs h-8 sm:h-9"
                >
                  Profil
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
