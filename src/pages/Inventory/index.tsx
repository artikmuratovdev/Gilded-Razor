import { InventoryStats } from './InventoryStats';
import { InventoryTable } from './InventoryTable';

const inventory = [
  {
    id: 1,
    name: 'Gilded Pomade (Strong Hold)',
    category: 'Styling',
    stock: 45,
    maxStock: 100,
    price: 24.0,
    status: 'In Stock',
  },
  {
    id: 2,
    name: 'Beard Oil - Sandalwood',
    category: 'Beard Care',
    stock: 12,
    maxStock: 50,
    price: 18.5,
    status: 'Low Stock',
  },
  {
    id: 3,
    name: 'Safety Razor Blades (100pk)',
    category: 'Shaving',
    stock: 8,
    maxStock: 30,
    price: 12.0,
    status: 'Critical',
  },
  {
    id: 4,
    name: 'Aftershave Balm',
    category: 'Shaving',
    stock: 28,
    maxStock: 40,
    price: 22.0,
    status: 'In Stock',
  },
  {
    id: 5,
    name: 'Texture Powder',
    category: 'Styling',
    stock: 0,
    maxStock: 25,
    price: 19.0,
    status: 'Out of Stock',
  },
];

export const Inventory = () => {
  return (
    <div className='space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500'>
      {/* Stats Cards */}
      <InventoryStats />

      <div className='flex justify-between items-center gap-4'>
        <h2 className='text-xl font-bold text-white'>Mahsulot Ombori</h2>
      </div>

      <InventoryTable inventory={inventory} />
    </div>
  );
};
