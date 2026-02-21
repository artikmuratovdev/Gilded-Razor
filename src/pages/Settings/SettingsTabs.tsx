import { Bell, Shield, Store, User } from 'lucide-react';
import { cn } from '../../lib/utils';

interface SettingsTabsProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export const SettingsTabs = ({ activeTab, onTabChange }: SettingsTabsProps) => {
  const tabs = [
    { id: 'general', label: 'Umumiy Sozlamalar', icon: Store },
    { id: 'profile', label: 'Mening Profilim', icon: User },
    { id: 'notifications', label: 'Bildirishnomalar', icon: Bell },
    { id: 'security', label: 'Xavfsizlik', icon: Shield },
  ];

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4'>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={cn(
            'flex flex-col items-center justify-center gap-3 p-4 rounded-xl transition-all border',
            activeTab === tab.id
              ? 'bg-surface border-primary/50 text-primary shadow-lg shadow-primary/10'
              : 'bg-surface/50 border-white/5 text-gray-400 hover:bg-surface hover:text-white hover:border-white/10',
          )}
        >
          <div
            className={cn(
              'p-2 rounded-full',
              activeTab === tab.id ? 'bg-primary/10' : 'bg-white/5',
            )}
          >
            <tab.icon className='h-5 w-5' />
          </div>
          <span className='text-sm font-bold'>{tab.label}</span>
        </button>
      ))}
    </div>
  );
};
