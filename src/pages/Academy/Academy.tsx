import { BookOpen, GraduationCap, Users } from 'lucide-react';

const academyStats = [
  { label: 'Faol kurslar', value: 6, icon: BookOpen },
  { label: 'O`quvchilar', value: 124, icon: Users },
  { label: 'Mentorlar', value: 8, icon: GraduationCap },
];

const upcomingLessons = [
  {
    id: 1,
    title: 'Barber Basic 101',
    mentor: 'Akmal Islomov',
    time: '10:00 - 12:00',
  },
  {
    id: 2,
    title: 'Fade Masterclass',
    mentor: 'Javohir Xasanov',
    time: '14:00 - 16:00',
  },
  {
    id: 3,
    title: 'Customer Service',
    mentor: 'Madina Olimova',
    time: '17:00 - 18:00',
  },
];

export const Academy = () => {
  return (
    <div className='space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500'>
      {/* <div>
        <h2 className='text-xl sm:text-2xl font-bold text-white'>Akademiya</h2>
        <p className='text-xs sm:text-sm text-gray-400'>
          Kurslar, o`quvchilar va darslar jadvalini boshqarish bo`limi.
        </p>
      </div> */}

      <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
        {academyStats.map((stat) => (
          <div key={stat.label} className='rounded-xl border border-white/10 bg-surface p-4'>
            <div className='flex items-center justify-between'>
              <p className='text-sm text-gray-400'>{stat.label}</p>
              <stat.icon className='h-5 w-5 text-primary' />
            </div>
            <p className='text-2xl font-bold text-white mt-3'>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className='rounded-xl border border-white/10 bg-surface'>
        <div className='p-4 border-b border-white/10'>
          <h3 className='text-white font-semibold'>Yaqinlashayotgan darslar</h3>
        </div>
        <div className='divide-y divide-white/10'>
          {upcomingLessons.map((lesson) => (
            <div key={lesson.id} className='p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2'>
              <div>
                <p className='text-white font-medium'>{lesson.title}</p>
                <p className='text-xs text-gray-400'>Mentor: {lesson.mentor}</p>
              </div>
              <span className='text-sm font-medium text-primary'>{lesson.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
