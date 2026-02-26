import type { ReportsReq } from '@/app/api/reportApi/type';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Spinner } from '@/components/ui/spinner';
import { useReportsData } from '@/hooks/useReportsData';
import { CalendarDays } from 'lucide-react';
import { useState } from 'react';
import { IncomeExpenseChart } from './IncomeExpenseChart';
import { ReportsMetrics } from './ReportsMetrics';
import { ServiceDistributionChart } from './ServiceDistributionChart';

const COLORS = ['#d4af35', '#3b82f6', '#10b981', '#6b7280'];

export const Reports = () => {
  const [selectedPeriod, setSelectedPeriod] =
    useState<ReportsReq['period']>('6months');
  const { data, isLoading, isError } = useReportsData(selectedPeriod);

  if (isLoading) {
    return (
      <div className='flex h-100 items-center justify-center'>
        <Spinner className='h-8 w-8 text-primary' />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className='flex h-100 items-center justify-center text-red-500'>
        Xatolik yuz berdi. Ma'lumotlarni yuklab bo'lmadi.
      </div>
    );
  }

  return (
    <div className='space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500'>
      <div className='flex justify-between items-center'>
        <div>
          <h2 className='text-2xl font-bold text-white'>
            Tahlil va Hisobotlar
          </h2>
          <p className='text-sm text-gray-400'>
            Biznesingiz samaradorlik ko'rsatkichlarini kuzating.
          </p>
        </div>
        <div className='flex gap-2'>
          <Select
            value={selectedPeriod}
            onValueChange={(value) =>
              setSelectedPeriod(value as ReportsReq['period'])
            }
          >
            <SelectTrigger className='w-45 bg-surface border-white/10 text-white'>
              <CalendarDays className='mr-2 h-4 w-4 opacity-50' />
              <SelectValue placeholder='Davrni tanlang' />
            </SelectTrigger>
            <SelectContent className='bg-surface border-white/10 text-white'>
              <SelectItem value='1months'>Oxirgi 1 Oy</SelectItem>
              <SelectItem value='3months'>Oxirgi 3 Oy</SelectItem>
              <SelectItem value='6months'>Oxirgi 6 Oy</SelectItem>
              <SelectItem value='1year'>Oxirgi 1 Yil</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {/* Income vs Expense Chart */}
        <IncomeExpenseChart data={data.expenses} />

        {/* Service Distribution */}
        <ServiceDistributionChart data={data.services} colors={COLORS} />
      </div>

      {/* Key Metrics Grid */}
      <ReportsMetrics summary={data.summary} />
    </div>
  );
};
