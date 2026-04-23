import { Package } from 'lucide-react';
import { Button } from '../../ui/Button';
import { Input, Select } from '../../ui/Input';
import { Modal } from '../../ui/Modal';
import type { ProductModalProps } from './types';

const ProductModal = ({ isOpen, productForm, onSubmit, onClose }: ProductModalProps) => (
  <Modal
    isOpen={isOpen}
    onClose={onClose}
    title="Yangi Mahsulot Qo'shish"
    description="Omborga yangi mahsulot qo'shing."
    icon={<Package className='text-primary h-8 w-8' />}
  >
    <form onSubmit={productForm.handleSubmit(onSubmit)} className='space-y-2 sm:space-y-4'>
      <div>
        <Input label='Mahsulot Nomi' placeholder='Masalan: Matt Loy' {...productForm.register('name')} />
        {productForm.formState.errors.name && (
          <p className='mt-1 text-xs text-red-500'>{productForm.formState.errors.name.message}</p>
        )}
      </div>
      <div className='grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4'>
        <div>
          <Select
            label='Kategoriya'
            icon={<Package className='h-4 w-4' />}
            {...productForm.register('category')}
          >
            <option value=''>Tanlang</option>
            <option>Soch Bezatish</option>
            <option>Sartaroshlik</option>
            <option>Soqol Parvarishi</option>
          </Select>
          {productForm.formState.errors.category && (
            <p className='mt-1 text-xs text-red-500'>{productForm.formState.errors.category.message}</p>
          )}
        </div>
        <div>
          <Input
            label='Narx'
            type='number'
            step='0.01'
            placeholder='0.00'
            {...productForm.register('price', { valueAsNumber: true })}
          />
          {productForm.formState.errors.price && (
            <p className='mt-1 text-xs text-red-500'>{productForm.formState.errors.price.message}</p>
          )}
        </div>
      </div>
      <div className='grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4'>
        <div>
          <Input
            label='Joriy Zaxira'
            type='number'
            placeholder='0'
            {...productForm.register('stock', { valueAsNumber: true })}
          />
          {productForm.formState.errors.stock && (
            <p className='mt-1 text-xs text-red-500'>{productForm.formState.errors.stock.message}</p>
          )}
        </div>
        <div>
          <Input
            label='Min Zaxira Ogohlantirishi'
            type='number'
            placeholder='10'
            {...productForm.register('minStock', { valueAsNumber: true })}
          />
          {productForm.formState.errors.minStock && (
            <p className='mt-1 text-xs text-red-500'>{productForm.formState.errors.minStock.message}</p>
          )}
        </div>
      </div>
      <div className='flex flex-col-reverse gap-2 border-t border-white/5 pt-3 sm:flex-row sm:justify-end sm:gap-3 sm:pt-5'>
        <Button variant='ghost' type='button' onClick={onClose} className='w-full sm:w-auto'>
          Bekor Qilish
        </Button>
        <Button variant='default' type='submit' className='w-full sm:w-auto'>
          Mahsulotni Saqlash
        </Button>
      </div>
    </form>
  </Modal>
);

export default ProductModal;
