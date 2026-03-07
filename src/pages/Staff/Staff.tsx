import usePaginatedStaffs from '@/hooks/usePaginatedStaffs';
import type { StaffSpecialization } from '@/app/api/staffApi/type';
import { useState } from 'react';
import { StaffGrid } from './StaffGrid';
import { StaffLeaderboard } from './StaffLeaderboard';

interface StaffPageProps {
  specialization?: StaffSpecialization;
  title?: string;
}

export const StaffPage = ({ specialization, title = 'Faol Sartaroshlar' }: StaffPageProps) => {
  const [page, setPage] = useState(1);

  const { data, nextData, isLoading, isFetching } = usePaginatedStaffs({
    page,
    specialization,
  });

  const staffList = data?.data ?? [];
  const totalPages = data?.pagination?.total_pages ?? 1;
  const hasNext = !!nextData?.data?.length && page < totalPages;
  const hasPrev = page > 1;

  return (
    <div className='space-y-6 sm:space-y-8 animate-in fade-in zoom-in-95 duration-500'>
      {/* Top Stats */}
      {/* <StaffStats /> */}

      <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3'>
        <h2 className='text-lg sm:text-xl font-bold text-white'>
          {title}
        </h2>
        {totalPages > 1 && (
          <div className='flex items-center gap-2'>
            <button
              onClick={() => setPage((p) => p - 1)}
              disabled={!hasPrev || isFetching}
              className='px-3 py-1.5 rounded-lg text-xs font-semibold text-white border border-white/10 hover:border-white/30 disabled:opacity-40 disabled:cursor-not-allowed transition-colors not-disabled:bg-primary hover:bg-primary/90 '
            >
              ← Oldingi
            </button>
            <span className='text-xs text-gray-500'>
              {page} / {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={!hasNext || isFetching}
              className='px-3 py-1.5 rounded-lg text-xs font-semibold text-white border border-white/10 hover:border-white/30 disabled:opacity-40 disabled:cursor-not-allowed transition-colors not-disabled:bg-primary hover:bg-primary/90 '
            >
              Keyingi →
            </button>
          </div>
        )}
      </div>

      {/* Barbers Grid */}
      {(!isLoading && staffList.length === 0) ? (
        <div className='rounded-2xl border border-white/10 bg-surface-light/30 p-8 text-center text-gray-300'>
          Ma'lumot hali yozilmagan
        </div>
      ) : (
        <>
          <StaffGrid staffMembers={staffList} isLoading={isLoading} />

          {/* Leaderboard Table */}
          <div className='pt-2'>
            <StaffLeaderboard specialization={specialization} />
          </div>
        </>
      )}
    </div>
  );
};
