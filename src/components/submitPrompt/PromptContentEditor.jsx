import { Info, WandSparkles } from 'lucide-react';
import SectionImage from './SectionImage';

export default function PromptContentEditor({
  content,
  error,
  onContentChange,
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
        min-h-[520px]
      "
    >
      <div
        className="
          order-1
          bg-white
          rounded-3xl
          border border-black/[0.06]
          p-6
          sm:p-8
          shadow-[0_4px_20px_rgba(30,30,30,0.03)]
        "
      >
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <WandSparkles className="w-4 h-4 text-[#77756F]" />
            <h2 className="text-base font-semibold">The prompt</h2>
          </div>

          <p className="text-sm text-[#8A8881]">
            Write the exact prompt people should copy and use.
          </p>
        </div>

        <div className="relative">
          <textarea
            value={content}
            onChange={(event) => onContentChange(event.target.value)}
            placeholder={`Act as a senior React engineer...

Analyze the following code and identify...`}
            className="
              w-full
              min-h-[390px]
              px-5
              py-5
              rounded-2xl
              border border-black/[0.08]
              bg-[#F7F6F2]
              text-[14px]
              leading-[1.8]
              font-mono
              text-[#34322F]
              placeholder:text-[#A6A39B]
              outline-none
              resize-y
              focus:bg-white
              focus:border-black/[0.2]
              transition-all
            "
          />

          <div
            className="
              absolute
              bottom-4
              right-4
              px-2
              py-1
              rounded-md
              bg-white/80
              border border-black/[0.05]
              text-[10px]
              text-[#AAA79F]
            "
          >
            Prompt
          </div>
        </div>

        {error && (
          <p className="text-xs text-[#B14A4A] mt-2">{error}</p>
        )}

        <div className="flex items-start gap-2 mt-4 text-xs text-[#8A8881]">
          <Info className="w-3.5 h-3.5 mt-0.5 shrink-0" />
          <p>
            Avoid including passwords, API keys, private information, or other sensitive
            data in your prompt.
          </p>
        </div>
      </div>

      <SectionImage src={imageSrc} alt={imageAlt} className="order-2" />
    </section>
  );
}
