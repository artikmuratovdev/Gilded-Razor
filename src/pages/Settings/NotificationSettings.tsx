import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../components/ui/Card';

export const NotificationSettings = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Bildirishnoma Sozlamalari</CardTitle>
      </CardHeader>
      <CardContent className='space-y-6'>
        <div className='space-y-4'>
          {[
            {
              label: 'Yangi Uchrashuv Ogohlantirishlari',
              desc: "Mijoz onlayn bron qilganda xabardor bo'ling.",
            },
            {
              label: 'Kunlik Xulosalar',
              desc: 'Daromadlar va bronlar haqida kunlik hisobot oling.',
            },
            {
              label: 'Kam Zaxira Ogohlantirishlari',
              desc: 'Ombordagi mahsulotlar chegaradan pastga tushsa xabardor eting.',
            },
          ].map((item, i) => (
            <div
              key={i}
              className='flex items-center justify-between p-4 rounded-xl bg-surface-light border border-white/5'
            >
              <div>
                <h4 className='text-sm font-bold text-white'>{item.label}</h4>
                <p className='text-xs text-gray-400'>{item.desc}</p>
              </div>
              <label className='relative inline-flex items-center cursor-pointer'>
                <input
                  type='checkbox'
                  className='sr-only peer'
                  defaultChecked={i === 0}
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
