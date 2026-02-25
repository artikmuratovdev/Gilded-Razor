import { useGetStaffByIdQuery } from '@/app/api/staffApi/staffApi';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { cn } from '@/lib/utils';
import {
  ArrowLeft,
  Calendar,
  Phone,
  Scissors,
  Star,
  TrendingUp,
  User,
} from 'lucide-react';
import { Link, useParams } from 'react-router';

export const StaffProfile = () => {
  const { id } = useParams<{ id: string }>();
  const { data: res, isLoading, isError } = useGetStaffByIdQuery(id ?? '');
  const staff = res?.data;

  if (isLoading) {
    return (
      <div className='flex items-center justify-center min-h-[60vh]'>
        <div className='flex flex-col items-center gap-4'>
          <div className='w-12 h-12 rounded-full border-2 border-primary border-t-transparent animate-spin' />
          <p className='text-gray-400 text-sm'>Yuklanmoqda...</p>
        </div>
      </div>
    );
  }

  if (isError || !staff) {
    return (
      <div className='flex flex-col items-center justify-center min-h-[60vh] gap-4'>
        <div className='w-16 h-16 rounded-2xl bg-surface-light flex items-center justify-center'>
          <User className='w-8 h-8 text-gray-500' />
        </div>
        <p className='text-white font-semibold'>Xodim topilmadi</p>
        <Link to='/staff'>
          <Button variant='outline' size='sm'>
            <ArrowLeft className='w-4 h-4 mr-2' />
            Ortga qaytish
          </Button>
        </Link>
      </div>
    );
  }

  const statusColor =
    staff.status === 'active'
      ? 'bg-green-500'
      : staff.status === 'busy'
        ? 'bg-blue-500'
        : 'bg-gray-500';

  const statusLabel =
    staff.status_display ?? (staff.status === 'active' ? 'Faol' : 'Nofaol');

  const badgeVariant =
    staff.status === 'active'
      ? 'success'
      : staff.status === 'busy'
        ? 'info'
        : 'default';

  return (
    <div className='space-y-6 animate-in fade-in zoom-in-95 duration-500'>
      {/* Back button */}
      <Link to='/staff'>
        <Button
          variant='outline'
          size='sm'
          className='gap-2 bg-[#D4AF35] hover:text-white -ml-1'
        >
          <ArrowLeft className='w-4 h-4' />
          Barcha xodimlar
        </Button>
      </Link>

      {/* Header card */}
      <Card className='overflow-hidden mt-4'>
        <CardContent className='p-6 sm:p-8'>
          <div className='flex flex-col sm:flex-row gap-6 items-start'>
            {/* Avatar */}
            <div className='relative shrink-0'>
              {staff.avatar ? (
                <img
                  src={staff.avatar}
                  alt={staff.name}
                  className='w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-2 border-white/10'
                />
              ) : (
                <div className='w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-surface-light border-2 border-white/10 flex items-center justify-center'>
                  <User className='w-10 h-10 text-gray-500' />
                </div>
              )}
              <div
                className={cn(
                  'absolute -bottom-1.5 -right-1.5 w-5 h-5 rounded-full border-2 border-surface',
                  statusColor,
                )}
              />
            </div>

            {/* Info */}
            <div className='flex-1 min-w-0'>
              <div className='flex flex-wrap items-center gap-3 mb-1'>
                <h1 className='text-2xl sm:text-3xl font-bold text-white'>
                  {staff.name}
                </h1>
                <Badge variant={badgeVariant} className='text-[10px]'>
                  {statusLabel.toUpperCase()}
                </Badge>
              </div>
              <p className='text-primary font-medium mb-4'>
                {staff.specialization_display ?? staff.specialization}
              </p>

              <div className='flex flex-wrap gap-4 text-sm text-gray-400'>
                {staff.phone && (
                  <div className='flex items-center gap-2'>
                    <Phone className='w-4 h-4 text-gray-500' />
                    <span>{staff.phone}</span>
                  </div>
                )}
                <div className='flex items-center gap-2'>
                  <Star className='w-4 h-4 text-yellow-400' />
                  <span className='text-white font-semibold'>
                    {staff.rating}
                  </span>
                  <span>reyting</span>
                </div>
                <div className='flex items-center gap-2'>
                  <Calendar className='w-4 h-4 text-gray-500' />
                  <span>
                    {String(staff?.created_at).slice(0, 10)} dan beri
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats row */}
      <div className='grid grid-cols-2 sm:grid-cols-3 gap-4'>
        <Card>
          <CardContent className='p-5'>
            <div className='flex items-center gap-3 mb-3'>
              <div className='w-9 h-9 rounded-xl bg-green-500/10 flex items-center justify-center'>
                <TrendingUp className='w-4 h-4 text-green-400' />
              </div>
              <p className='text-xs text-gray-400 font-semibold uppercase tracking-wider'>
                Bugungi daromad
              </p>
            </div>
            <p className='text-2xl font-bold text-white'>
              {(staff.today_revenue ?? 0).toLocaleString('uz-UZ')}
              <span className='text-sm text-gray-400 font-normal ml-1'>
                so'm
              </span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className='p-5'>
            <div className='flex items-center gap-3 mb-3'>
              <div className='w-9 h-9 rounded-xl bg-yellow-500/10 flex items-center justify-center'>
                <Star className='w-4 h-4 text-yellow-400' />
              </div>
              <p className='text-xs text-gray-400 font-semibold uppercase tracking-wider'>
                Reyting
              </p>
            </div>
            <p className='text-2xl font-bold text-white'>{staff.rating}</p>
          </CardContent>
        </Card>

        <Card className='col-span-2 sm:col-span-1'>
          <CardContent className='p-5'>
            <div className='flex items-center gap-3 mb-3'>
              <div className='w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center'>
                <Scissors className='w-4 h-4 text-primary' />
              </div>
              <p className='text-xs text-gray-400 font-semibold uppercase tracking-wider'>
                Komissiya
              </p>
            </div>
            <p className='text-2xl font-bold text-white'>
              {staff.commission_rate}
              <span className='text-sm text-gray-400 font-normal ml-1'>%</span>
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Details card */}
      <Card>
        <CardContent className='p-6'>
          <h2 className='text-base font-bold text-white mb-4'>
            Qo'shimcha ma'lumotlar
          </h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            {[
              {
                label: 'Mutaxassislik',
                value: staff.specialization_display ?? staff.specialization,
              },
              { label: 'Holat', value: statusLabel },
              {
                label: 'Komissiya stavkasi',
                value: `${staff.commission_rate}%`,
              },
              { label: 'Faollik', value: staff.is_active ? 'Faol' : 'Nofaol' },
            ].map((item) => (
              <div
                key={item.label}
                className='flex justify-between items-center py-3 border-b border-white/5 last:border-0'
              >
                <span className='text-sm text-gray-400'>{item.label}</span>
                <span className='text-sm font-semibold text-white'>
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
