import { useState } from 'react';
import { GeneralSettings } from './GeneralSettings';
import { NotificationSettings } from './NotificationSettings';
import { ProfileSettings } from './ProfileSettings';
import { SecuritySettings } from './SecuritySettings';
import { SettingsTabs } from './SettingsTabs';

export const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');

  return (
    <div className='flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500'>
      {/* Settings Navigation - Top Columns */}
      <SettingsTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Content Area */}
      <div className='flex-1'>
        {activeTab === 'general' && <GeneralSettings />}

        {activeTab === 'notifications' && <NotificationSettings />}

        {activeTab === 'profile' && <ProfileSettings />}

        {activeTab === 'security' && <SecuritySettings />}
      </div>
    </div>
  );
};
