import React from 'react';

function ProfileTabs({ tabs = [], activeTab, onChange }) {
  return (
    <div className="flex items-center gap-1 border-b border-black/[0.07] overflow-x-auto no-scrollbar">
      {tabs.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => onChange(id)}
          className={`
                  flex
                  items-center
                  gap-2
                  px-4
                  py-3
                  text-sm
                  font-medium
                  border-b-2
                  transition-colors
                  whitespace-nowrap

                  ${
                    activeTab === id
                      ? 'border-[#252525] text-[#252525]'
                      : 'border-transparent text-[#77756F] hover:text-[#44423E]'
                  }
                `}
        >
          <Icon className="w-4 h-4" />
          {label}
        </button>
      ))}
    </div>
  );
}

export default ProfileTabs;
