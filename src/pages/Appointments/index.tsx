import { data as appointmentsData } from '@/constants/appointments';
import { endOfWeek, format, startOfWeek } from 'date-fns';
import { useMemo, useState } from 'react';
import { AppointmentsToolbar } from './AppointmentsToolbar';
import { DayView } from './DayView';
import { ListView } from './ListView';
import { WeekView } from './WeekView';

export const Appointments = () => {
  const [view, setView] = useState<'day' | 'week' | 'list'>('list');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAppointments = useMemo(() => {
    return appointmentsData.filter((appt) => {
      const matchesSearch = appt.client
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      const apptDateStr = appt.date;

      if (view === 'day') {
        return apptDateStr === format(selectedDate, 'd');
      }

      if (view === 'week') {
        const start = startOfWeek(selectedDate, { weekStartsOn: 1 });
        const end = endOfWeek(selectedDate, { weekStartsOn: 1 });

        const dayInMonth = parseInt(apptDateStr);
        const startDay = parseInt(format(start, 'd'));
        const endDay = parseInt(format(end, 'd'));
        if (start.getMonth() === end.getMonth()) {
          return dayInMonth >= startDay && dayInMonth <= endDay;
        }
        return true;
      }

      const apptDay = parseInt(apptDateStr);
      const selectedDay = parseInt(format(selectedDate, 'd'));

      return apptDay >= selectedDay;
    });
  }, [selectedDate, searchQuery, view]);

  return (
    <div className='space-y-4 sm:space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 w-full max-w-full'>
      <div className='relative'>
        <AppointmentsToolbar
          view={view}
          onViewChange={setView}
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
          onSearchChange={setSearchQuery}
        />
      </div>

      <div className='min-h-[600px] w-full max-w-full'>
        {view === 'day' && (
          <DayView
            selectedDate={selectedDate}
            appointments={filteredAppointments}
          />
        )}
        {view === 'week' && (
          <WeekView
            selectedDate={selectedDate}
            appointments={filteredAppointments}
          />
        )}
        {view === 'list' && <ListView appointments={filteredAppointments} />}
      </div>
    </div>
  );
};
