import { CircleDollarSign, Receipt, Wallet } from 'lucide-react';

const expenseSummary = [
  { label: 'Oy bo`yicha xarajat', value: "12 450 000 so'm", icon: Wallet },
  { label: 'Bugungi xarajat', value: "540 000 so'm", icon: CircleDollarSign },
  { label: 'Tranzaksiyalar', value: '47 ta', icon: Receipt },
];

const recentExpenses = [
  {
    id: 1,
    name: 'Elektr energiyasi',
    category: 'Kommunal',
    amount: "320 000 so'm",
  },
  {
    id: 2,
    name: 'Soch mahsulotlari',
    category: 'Inventar',
    amount: "1 280 000 so'm",
  },
  {
    id: 3,
    name: 'Marketing reklama',
    category: 'Marketing',
    amount: "850 000 so'm",
  },
];

export const Expenses = () => {
  return (
    <div className='space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500'>


      <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
        {expenseSummary.map((item) => (
          <div key={item.label} className='rounded-xl border border-white/10 bg-surface p-4'>
            <div className='flex items-center justify-between'>
              <p className='text-sm text-gray-400'>{item.label}</p>
              <item.icon className='h-5 w-5 text-primary' />
            </div>
            <p className='text-lg font-bold text-white mt-3'>{item.value}</p>
          </div>
        ))}
      </div>

      <div className='rounded-xl border border-white/10 bg-surface'>
        <div className='p-4 border-b border-white/10'>
          <h3 className='text-white font-semibold'>So`nggi xarajatlar</h3>
        </div>
        <div className='divide-y divide-white/10'>
          {recentExpenses.map((expense) => (
            <div key={expense.id} className='p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2'>
              <div>
                <p className='text-white font-medium'>{expense.name}</p>
                <p className='text-xs text-gray-400'>Kategoriya: {expense.category}</p>
              </div>
              <span className='text-sm font-semibold text-red-300'>{expense.amount}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
