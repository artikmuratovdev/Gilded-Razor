import { Button } from "@/components/ui/Button";
import { CalendarDays } from "lucide-react";
import { useMemo, useState } from "react";
import { Card, CardContent } from "../../components/ui/Card";
import { Modal } from "../../components/ui/Modal";
import { useGetAppoitmentsQuery } from "@/app/api/appoitmentsApi/appoitmentsApi";
import BookingRow from "./BookingRow";


export const RecentBookingsList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const datetime_from = useMemo(() => new Date().toISOString(), []);

  const datetime_to = useMemo(() => {
    const date = new Date();
    date.setHours(23, 59, 0, 0);
    return date.toISOString();
  }, []);

  const { data ,isLoading} = useGetAppoitmentsQuery({
    page: 1,
    page_size: 10,
    datetime_from,
    datetime_to
  });

  console.log("QueryData", data?.data.length);
  console.log("dateTimeFrom", datetime_from);
  console.log("dateTimeTo", datetime_to);
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
            {data.data.length > 0 ? data.data.slice(0, 4).map((booking) => (
              <BookingRow key={booking.id} booking={booking} />
            )) : 
            <div className="flex items-center justify-center h-full">
              <p className="text-center text-gray-400 py-5">Bugunga uchrashuvlar mavjud emas</p>
            </div>
            }
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

