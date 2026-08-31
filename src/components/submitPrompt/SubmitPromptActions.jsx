import { Link } from 'react-router-dom';
import { Save } from 'lucide-react';

export default function SubmitPromptActions({ isEditMode, isSaving, id }) {
  return (
    <div
      className="
        flex
        flex-col
        sm:flex-row
        items-center
        justify-between
        gap-4
        pt-2
      "
    >
      <p className="text-xs text-[#AAA79F]">
        {isEditMode ? 'Your changes will update this prompt.' : 'Review everything before publishing.'}
      </p>

      <div className="flex items-center gap-3">
        <Link
          to={isEditMode ? `/prompt/${id}` : '/discover'}
          className="
            inline-flex
            items-center
            gap-2
            h-11
            px-5
            rounded-xl
            border border-black/[0.08]
            bg-white
            text-sm
            font-medium
            text-[#55534E]
            hover:bg-[#F3F2EE]
            transition-colors
          "
        >
          Cancel
        </Link>

        <button
          type="submit"
          disabled={isSaving}
          className="
            inline-flex
            items-center
            gap-2
            h-11
            px-6
            rounded-xl
            bg-[#252525]
            text-white
            text-sm
            font-medium
            hover:bg-[#111]
            disabled:opacity-60
            disabled:cursor-not-allowed
            transition-all
          "
        >
          {isSaving ? (
            <>
              <div
                className="
                  w-4
                  h-4
                  border-2
                  border-white/30
                  border-t-white
                  rounded-full
                  animate-spin
                "
              />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              {isEditMode ? 'Save Changes' : 'Publish Prompt'}
            </>
          )}
        </button>
      </div>
    </div>
  );
}
