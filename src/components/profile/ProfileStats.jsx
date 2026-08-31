import React from 'react';

function ProfileStats({ stats = [] }) {
  return (
    <div
      className="
        mt-9
        pt-7
        border-t
        border-black/[0.06]
        grid
        grid-cols-2
        sm:grid-cols-4
        gap-6
      "
    >
      {stats.map(({ value, label }) => (
        <div key={label}>
          <div className="text-2xl font-bold tracking-[-0.03em] text-[#252525]">{value}</div>
          <div className="mt-1 text-xs font-medium text-[#8A8881]">{label}</div>
        </div>
      ))}
    </div>
  );
}

export default ProfileStats;
