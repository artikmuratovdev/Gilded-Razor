import { Save } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';

export const GeneralSettings = () => {
  return (
    <Card>
      <CardHeader className='border-b border-white/5 pb-6'>
        <CardTitle>Biznes Ma'lumotlari</CardTitle>
        <p className='text-sm text-gray-400'>
          Sartaroshxona ma'lumotlari va umumiy profilni boshqaring.
        </p>
      </CardHeader>
      <CardContent className='pt-6 space-y-6'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <Input label="Do'kon Nomi" defaultValue='Jasur Barber' />
          <Input label='Telefon Raqam' defaultValue='+1 (555) 000-0000' />
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <Input
            label='Elektron Pochta'
            defaultValue='contact@gildedrazor.com'
          />
          <Input label='Vebsayt' defaultValue='www.gildedrazor.com' />
        </div>
        <Input
          label='Manzil'
          defaultValue='123 Barber Street, New York, NY 10001'
        />

        <div className='pt-4 border-t border-white/5'>
          <h4 className='text-sm font-bold text-white mb-4'>Ish Soatlari</h4>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <label className='text-xs text-gray-400'>Ish Kunlari</label>
              <div className='flex gap-2'>
                <Input type='time' defaultValue='09:00' />
                <Input type='time' defaultValue='20:00' />
              </div>
            </div>
            <div className='space-y-2'>
              <label className='text-xs text-gray-400'>Dam Olish Kunlari</label>
              <div className='flex gap-2'>
                <Input type='time' defaultValue='10:00' />
                <Input type='time' defaultValue='18:00' />
              </div>
            </div>
          </div>
        </div>

        <div className='flex justify-end pt-4'>
          <Button className='gap-2'>
            <Save className='h-4 w-4' /> O'zgarishlarni Saqlash
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
