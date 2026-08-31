import { Link } from 'react-router-dom';
import { ArrowLeft, Eye } from 'lucide-react';

export default function SubmitPromptHeader({ isEditMode, id, showPreview, onTogglePreview }) {
  return (
    <div className="border-b border-black/[0.06] bg-white/70">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-4">
            <Link
              to={isEditMode ? `/prompt/${id}` : '/discover'}
              className="
                w-9
                h-9
                rounded-xl
                border border-black/[0.07]
                bg-white
                flex
                items-center
                justify-center
                text-[#77756F]
                hover:text-[#252525]
                hover:bg-[#F5F4F0]
                transition-colors
              "
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>

            <div>
              <p
                className="
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.16em]
                  text-[#AAA79F]
                "
              >
                {isEditMode ? 'Edit Prompt' : 'Create Prompt'}
              </p>

              <h1
                className="
                  text-lg
                  font-semibold
                  tracking-[-0.02em]
                "
              >
                {isEditMode ? 'Improve your prompt' : 'Share something useful'}
              </h1>
            </div>
          </div>

          <button
            type="button"
            onClick={onTogglePreview}
            className="
              hidden
              sm:flex
              items-center
              gap-2
              h-10
              px-3.5
              rounded-xl
              border border-black/[0.07]
              bg-white
              text-[#55534E]
              text-sm
              font-medium
              hover:bg-[#F3F2EE]
              transition-all
            "
          >
            <Eye className="w-4 h-4" />
            {showPreview ? 'Edit' : 'Preview'}
          </button>
        </div>
      </div>
    </div>
  );
}
