import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../components/ui/Card';

interface ServiceDistributionChartProps {
  data: { name: string; value: number }[];
  colors: string[];
}

export const ServiceDistributionChart = ({
  data,
  colors,
}: ServiceDistributionChartProps) => {
  return (
    <Card className='h-[400px] flex flex-col'>
      <CardHeader>
        <CardTitle>Xizmat Bo'yicha Daromad</CardTitle>
      </CardHeader>
      <CardContent className='flex-1 min-h-0 relative'>
        <ResponsiveContainer width='100%' height='100%'>
          <PieChart>
            <Pie
              data={data}
              cx='50%'
              cy='50%'
              innerRadius={80}
              outerRadius={120}
              fill='#8884d8'
              paddingAngle={5}
              dataKey='value'
              stroke='none'
            >
              {data.map((_, index) => (
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
      </CardContent>
      <div className='p-6 pt-0 flex justify-center gap-4 flex-wrap'>
        {data.map((item, index) => (
          <div key={item.name} className='flex items-center gap-2'>
            <span
              className='w-3 h-3 rounded-full'
              style={{ backgroundColor: colors[index] }}
            ></span>
            <span className='text-xs text-gray-300'>{item.name}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};
