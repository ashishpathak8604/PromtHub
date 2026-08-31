import { Check } from 'lucide-react';

export default function PromptSettings({ visibility, onVisibilityChange }) {
  return (
    <section
      className="
        bg-white
        rounded-3xl
        border border-black/[0.06]
        p-6
        sm:p-8
        shadow-[0_4px_20px_rgba(30,30,30,0.03)]
      "
    >
      <div className="mb-6">
        <h2 className="text-base font-semibold">Visibility</h2>
        <p className="text-sm text-[#8A8881] mt-1">Decide who can discover this prompt.</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => onVisibilityChange('public')}
          className={`
            text-left
            p-4
            rounded-2xl
            border
            transition-all
            ${
              visibility === 'public'
                ? 'border-[#252525]/20 bg-[#F5F4F0]'
                : 'border-black/[0.07] bg-[#FBFAF7] hover:bg-[#F5F4F0]'
            }
          `}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold">Public</p>
              <p className="text-xs text-[#8A8881] mt-1">Anyone can discover and use it.</p>
            </div>

            {visibility === 'public' && <Check className="w-4 h-4 text-[#55534E]" />}
          </div>
        </button>

        <button
          type="button"
          onClick={() => onVisibilityChange('private')}
          className={`
            text-left
            p-4
            rounded-2xl
            border
            transition-all
            ${
              visibility === 'private'
                ? 'border-[#252525]/20 bg-[#F5F4F0]'
                : 'border-black/[0.07] bg-[#FBFAF7] hover:bg-[#F5F4F0]'
            }
          `}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold">Private</p>
              <p className="text-xs text-[#8A8881] mt-1">Only you can access it.</p>
            </div>

            {visibility === 'private' && <Check className="w-4 h-4 text-[#55534E]" />}
          </div>
        </button>
      </div>
    </section>
  );
}
