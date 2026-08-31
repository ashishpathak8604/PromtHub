import { Sparkles } from 'lucide-react';
import SectionImage from './SectionImage';

export default function PromptBasicInfo({
  title,
  description,
  errors,
  onTitleChange,
  onDescriptionChange,
  imageSrc,
  imageAlt,
}) {
  return (
    <section
      className="
        grid
        lg:grid-cols-2
        gap-8
        items-center
        min-h-[460px]
      "
    >
      <SectionImage
        src={imageSrc}
        alt={imageAlt}
        className="order-2 lg:order-1"
      />

      <div
        className="
          order-1
          lg:order-2
          bg-white
          rounded-3xl
          border border-black/[0.06]
          p-6
          sm:p-8
          shadow-[0_4px_20px_rgba(30,30,30,0.03)]
        "
      >
        <div className="mb-7">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-[#77756F]" />
            <h2 className="text-base font-semibold">Start with the idea</h2>
          </div>

          <p className="text-sm text-[#8A8881]">
            Help people understand what your prompt is useful for.
          </p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-[#44423E]">Prompt title</label>
          <input
            value={title}
            onChange={(event) => onTitleChange(event.target.value)}
            placeholder="e.g. Senior React Code Reviewer"
            maxLength={100}
            className="
              w-full
              h-12
              px-4
              rounded-xl
              border border-black/[0.08]
              bg-[#FBFAF7]
              text-sm
              text-[#252525]
              placeholder:text-[#AAA79F]
              outline-none
              focus:bg-white
              focus:border-black/[0.2]
              transition-all
            "
          />

          <div className="flex justify-between">
            {errors.title ? (
              <p className="text-xs text-[#B14A4A]">{errors.title}</p>
            ) : (
              <span />
            )}

            <span className="text-[11px] text-[#AAA79F]">{title.length}/100</span>
          </div>
        </div>

        <div className="space-y-2 mt-6">
          <label className="text-sm font-medium text-[#44423E]">Description</label>
          <textarea
            value={description}
            onChange={(event) => onDescriptionChange(event.target.value)}
            placeholder="
Explain when someone should use this prompt and what result they can expect...
"
            rows={5}
            maxLength={500}
            className="
              w-full
              px-4
              py-3.5
              rounded-xl
              border border-black/[0.08]
              bg-[#FBFAF7]
              text-sm
              leading-relaxed
              text-[#252525]
              placeholder:text-[#AAA79F]
              outline-none
              resize-none
              focus:bg-white
              focus:border-black/[0.2]
              transition-all
            "
          />

          <div className="flex justify-between">
            {errors.description ? (
              <p className="text-xs text-[#B14A4A]">{errors.description}</p>
            ) : (
              <span />
            )}

            <span className="text-[11px] text-[#AAA79F]">{description.length}/500</span>
          </div>
        </div>
      </div>
    </section>
  );
}
