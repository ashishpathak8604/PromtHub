import React from 'react';

function EmptyState({ icon: Icon, title, body, action }) {
  return (
    <div className="text-center py-16 px-4 bg-white border border-dashed border-black/[0.1] rounded-2xl">
      <div className="w-12 h-12 mx-auto mb-4 rounded-2xl bg-[#F5F4F0] border border-black/[0.06] flex items-center justify-center">
        <Icon className="w-6 h-6 text-[#AAA79F]" />
      </div>

      <h3 className="text-[15px] font-semibold text-[#252525] mb-1.5">{title}</h3>

      <p className="text-sm text-[#8A8881] max-w-xs mx-auto leading-relaxed">{body}</p>

      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export default EmptyState;
