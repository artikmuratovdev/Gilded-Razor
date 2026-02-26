import type { RevenueByService } from '@/app/api/reportApi/type';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../components/ui/Card';

interface ServiceDistributionChartProps {
  data?: RevenueByService;
  colors: string[];
}

export const ServiceDistributionChart = ({
  data,
  colors,
}: ServiceDistributionChartProps) => {
  const chartData =
    data?.services?.map((item) => ({
      name: item.service,
      value: item.revenue,
    })) || [];

  return (
    <Card className='h-100 flex flex-col'>
      <CardHeader>
        <CardTitle>Xizmat Bo'yicha Daromad</CardTitle>
      </CardHeader>
      <CardContent className='flex-1 min-h-0 relative'>
        {chartData.length === 0 ? (
          <div className='flex items-center justify-center h-full text-gray-400'>
            Ma'lumot topilmadi
          </div>
        ) : (
          <>
            <ResponsiveContainer width='100%' height='100%'>
              <PieChart>
                <Pie
                  data={chartData}
                  cx='50%'
                  cy='50%'
                  innerRadius={80}
                  outerRadius={120}
                  fill='#8884d8'
                  paddingAngle={5}
                  dataKey='value'
                  stroke='none'
                >
                  {chartData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={colors[index % colors.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#2a261a',
                    borderColor: 'rgba(255,255,255,0.1)',
                    color: '#fff',
                    borderRadius: '8px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            {/* Center Text */}
            <div className='absolute inset-0 flex flex-col items-center justify-center pointer-events-none'>
              <span className='text-3xl font-bold text-white'>Jami</span>
              <span className='text-sm text-gray-400'>Xizmatlar</span>
            </div>
          </>
        )}
      </CardContent>
      {chartData.length > 0 && (
        <div className='p-6 pt-0 flex justify-center gap-4 flex-wrap'>
          {chartData.map((item, index) => (
            <div key={item.name} className='flex items-center gap-2'>
              <span
                className='w-3 h-3 rounded-full'
                style={{ backgroundColor: colors[index % colors.length] }}
              ></span>
              <span className='text-xs text-gray-300'>{item.name}</span>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};
