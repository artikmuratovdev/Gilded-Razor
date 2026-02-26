import usePaginatedStaffs from '@/hooks/usePaginatedStaffs';
import { useState } from 'react';
import { StaffGrid } from './StaffGrid';
import { StaffLeaderboard } from './StaffLeaderboard';
import { StaffStats } from './StaffStats';

export const StaffPage = () => {
  const [page, setPage] = useState(1);

  const { data, nextData, isLoading, isFetching } = usePaginatedStaffs({
    page,
  });

  const staffList = data?.data ?? [];
  const totalPages = data?.pagination?.total_pages ?? 1;
  const hasNext = !!nextData?.data?.length && page < totalPages;
  const hasPrev = page > 1;

  return (
    <div className='space-y-6 sm:space-y-8 animate-in fade-in zoom-in-95 duration-500'>
      {/* Top Stats */}
      <StaffStats />

      <div className='flex items-center justify-between'>
        <h2 className='text-lg sm:text-xl font-bold text-white'>
          Faol Sartaroshlar
        </h2>
        {totalPages > 1 && (
          <div className='flex items-center gap-2'>
            <button
              onClick={() => setPage((p) => p - 1)}
              disabled={!hasPrev || isFetching}
              className='px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-400 hover:text-white border border-white/10 hover:border-white/30 disabled:opacity-40 disabled:cursor-not-allowed transition-colors'
            >
              ← Oldingi
            </button>
            <span className='text-xs text-gray-500'>
              {page} / {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={!hasNext || isFetching}
              className='px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-400 hover:text-white border border-white/10 hover:border-white/30 disabled:opacity-40 disabled:cursor-not-allowed transition-colors'
            >
              Keyingi →
            </button>
          </div>
        )}
      </div>

      {/* Barbers Grid */}
      <StaffGrid staffMembers={staffList} isLoading={isLoading} />

      {/* Leaderboard Table */}
      <div className='pt-2'>
        <StaffLeaderboard staffMembers={staffList} />
      </div>
    </div>
  );
};
