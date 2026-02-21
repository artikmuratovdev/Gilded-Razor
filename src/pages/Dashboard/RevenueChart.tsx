import { useState } from 'react';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import { Card, CardContent } from '../../components/ui/Card';

const weeklyData = [
  { name: 'Du', value: 1200 },
  { name: 'Se', value: 1800 },
  { name: 'Chor', value: 900 },
  { name: 'Pay', value: 2400 },
  { name: 'Jum', value: 3100 },
  { name: 'Shan', value: 3500 },
  { name: 'Yak', value: 2100 },
];

const monthlyData = [
  { name: 'Yan', value: 18000 },
  { name: 'Fev', value: 22000 },
  { name: 'Mar', value: 19500 },
  { name: 'Apr', value: 26000 },
  { name: 'May', value: 31000 },
  { name: 'Iyun', value: 28500 },
  { name: 'Iyul', value: 35000 },
  { name: 'Avg', value: 32000 },
  { name: 'Sen', value: 29000 },
  { name: 'Okt', value: 38000 },
  { name: 'Nov', value: 41000 },
  { name: 'Dek', value: 45000 },
];

type Period = 'weekly' | 'monthly';

export const RevenueChart = () => {
  const [period, setPeriod] = useState<Period>('weekly');

  const chartData = period === 'weekly' ? weeklyData : monthlyData;
  const subtitle =
    period === 'weekly'
      ? "Bu hafta daromad ko'rsatkichi"
      : "Bu yil daromad ko'rsatkichi";

  return (
    <Card className='xl:col-span-2 h-[420px] flex flex-col'>
      <CardContent className='p-6 flex-1 flex flex-col'>
        <div className='flex items-center justify-between mb-8'>
          <div>
            <h3 className='text-lg font-bold text-white'>
              Daromad Umumiy Ko'rinishi
            </h3>
            <p className='text-sm text-gray-400'>{subtitle}</p>
          </div>
          <div className='flex bg-white/5 rounded-full p-1'>
            <button
              onClick={() => setPeriod('weekly')}
              className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 ${
                period === 'weekly'
                  ? 'bg-primary text-background shadow-sm'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Haftalik
            </button>
            <button
              onClick={() => setPeriod('monthly')}
              className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 ${
                period === 'monthly'
                  ? 'bg-primary text-background shadow-sm'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Oylik
            </button>
          </div>
        </div>

        <div className='flex-1 w-full min-h-0'>
          <ResponsiveContainer width='100%' height='100%'>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id='colorValue' x1='0' y1='0' x2='0' y2='1'>
                  <stop offset='5%' stopColor='#d4af35' stopOpacity={0.3} />
                  <stop offset='95%' stopColor='#d4af35' stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey='name'
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#6b7280', fontSize: 12 }}
                dy={10}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#2a261a',
                  borderColor: 'rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  color: '#fff',
                }}
                itemStyle={{ color: '#d4af35' }}
                cursor={{ stroke: 'rgba(255,255,255,0.1)' }}
                formatter={(value: number | undefined) => [
                  `$${(value ?? 0).toLocaleString()}`,
                  'Daromad',
                ]}
              />
              <Area
                type='monotone'
                dataKey='value'
                stroke='#d4af35'
                strokeWidth={3}
                fillOpacity={1}
                fill='url(#colorValue)'
                animationDuration={500}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
