import { Card, CardContent } from '@/components/ui/Card';
import { Search, Plus, Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Spinner } from '@/components/ui/spinner';
import { Button } from '@/components/ui/Button';
import { useDispatch } from 'react-redux';
import { openModal, setAdditionalExpenseToDelete, setAdditionalExpenseToEdit } from '@/app/slices/modalSlice';
import { useGetAllAdditionalExpensesQuery } from '@/app/api/additionalExpenses/additionalExpenses';
import Pagination from '@/components/Pagination';

const QoshimchaExpenses = () => {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearch] = useState<string>('');
  const { data, isLoading } = useGetAllAdditionalExpensesQuery({ page, search: searchQuery });
  const dispatch = useDispatch();

  const expenseList = data?.data ?? [];

  const handleAddExpense = () => {
    dispatch(openModal('additionalExpense'));
  };

  const handleEditExpense = (expense: typeof expenseList[0]) => {
    dispatch(setAdditionalExpenseToEdit({
      id: expense.id,
      name: expense.name,
      description: expense.description,
      price: expense.price,
    }));
    dispatch(openModal('editAdditionalExpense'));
  };

  const handleDeleteExpense = (expense: typeof expenseList[0]) => {
    dispatch(setAdditionalExpenseToDelete({ id: expense.id, name: expense.name }));
    dispatch(openModal('deleteAdditionalExpense'));
  };

  if (isLoading || !data) {
    return (
      <div className='flex h-screen items-center justify-center'>
        <Spinner className='h-8 w-8 text-primary' />
      </div>
    );
  }

  return (
    <div className='space-y-4 sm:space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500'>
      <Card>
        <CardContent className='p-0'>
          <div className='p-4 border-b border-white/5 flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-between'>
            <div className='relative flex-1 w-full'>
              <Input
                type='text'
                value={searchQuery}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                icon={<Search />}
                placeholder='Qidirish...'
                className='w-full h-10 pl-10 pr-4 rounded-xl bg-surface-light border border-white/5 focus:border-primary/50 outline-none text-sm text-white'
              />
            </div>
            <Button
              variant='default'
              className='gap-2 w-full sm:w-auto'
              onClick={handleAddExpense}
            >
              <Plus className='h-4 w-4' />
              Xarajat Qo'shish
            </Button>
          </div>

          {/* Table */}
          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead className='bg-surface-light border-b border-white/5'>
                <tr>
                  <th className='px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider'>
                    Nomi
                  </th>
                  <th className='px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider'>
                    Tavsif
                  </th>
                  <th className='px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider'>
                    Narx
                  </th>
                  <th className='px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider'>
                    Yaratilgan Sana
                  </th>
                  <th className='px-4 py-3 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider'>
                    Amallar
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-white/5'>
                {expenseList.length === 0 ? (
                  <tr>
                    <td colSpan={5} className='px-4 py-8 text-center text-gray-400'>
                      Qo'shimcha xarajatlar topilmadi
                    </td>
                  </tr>
                ) : (
                  expenseList.map((expense) => (
                    <tr key={expense.id} className='hover:bg-surface-light/50 transition-colors'>
                      <td className='px-4 py-4'>
                        <div className='text-sm font-medium text-white'>{expense.name}</div>
                      </td>
                      <td className='px-4 py-4'>
                        <div className='text-sm text-gray-300 max-w-xs truncate'>{expense.description}</div>
                      </td>
                      <td className='px-4 py-4'>
                        <div className='text-sm font-semibold text-green-400'>{expense.price} so'm</div>
                      </td>
                      <td className='px-4 py-4'>
                        <div className='text-sm text-gray-300'>
                          {new Date(expense.created_at).toLocaleDateString('uz-UZ')}
                        </div>
                      </td>
                      <td className='px-4 py-4'>
                        <div className='flex items-center justify-end gap-2'>
                          <button
                            onClick={() => handleEditExpense(expense)}
                            className='p-2 rounded-lg hover:bg-primary/10 text-primary transition-colors'
                            title='Tahrirlash'
                          >
                            <Pencil className='h-4 w-4' />
                          </button>
                          <button
                            onClick={() => handleDeleteExpense(expense)}
                            className='p-2 rounded-lg hover:bg-red-500/10 text-red-500 transition-colors'
                            title="O'chirish"
                          >
                            <Trash2 className='h-4 w-4' />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <Pagination
            page={page}
            setPage={setPage}
            prev={data?.pagination?.previous}
            next={data?.pagination?.next}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default QoshimchaExpenses;
