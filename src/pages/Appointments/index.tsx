import { useState } from 'react';
import { AppointmentsToolbar } from './AppointmentsToolbar';
import { DayView } from './DayView';
import { WeekView } from './WeekView';
import { ListView } from './ListView';

export const Appointments = () => {
  const [view, setView] = useState<'day' | 'week' | 'list'>('list');

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 w-full max-w-full">
      <AppointmentsToolbar view={view} onViewChange={setView} />

      <div className="min-h-[600px] w-full max-w-full">
        {view === 'day' && <DayView />}
        {view === 'week' && <WeekView />}
        {view === 'list' && <ListView />}
      </div>
    </div>
  );
};