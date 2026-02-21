import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../components/ui/Card';

interface IncomeExpenseChartProps {
  data: { name: string; income: number; expense: number }[];
}

export const IncomeExpenseChart = ({ data }: IncomeExpenseChartProps) => {
  return (
    <Card className='h-[400px] flex flex-col'>
      <CardHeader>
        <CardTitle>
          <h3 className='font-bold text-white'>Daromad va Xarajatlar</h3>
        </CardTitle>
      </CardHeader>
      <CardContent className='flex-1 min-h-0'>
        <ResponsiveContainer width='100%' height='100%'>
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis
              dataKey='name'
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6b7280', fontSize: 12 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6b7280', fontSize: 12 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#2a261a',
                borderColor: 'rgba(255,255,255,0.1)',
                color: '#fff',
                borderRadius: '8px',
              }}
              formatter={(value, name) => [
                `$${Number(value).toLocaleString()}`,
                name === 'income' ? 'Daromad' : 'Xarajat',
              ]}
              cursor={{ fill: 'rgba(255,255,255,0.05)' }}
            />
            <Bar dataKey='income' fill='#d4af35' radius={[4, 4, 0, 0]} />
            <Bar dataKey='expense' fill='#3b82f6' radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
