import SectionImage from './SectionImage';

export default function PromptExampleSection({
  exampleInput,
  exampleOutput,
  onExampleInputChange,
  onExampleOutputChange,
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
        min-h-[500px]
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
        <div className="mb-7">
          <h2 className="text-base font-semibold">
            Show an example
            <span className="ml-2 text-xs font-normal text-[#AAA79F]">Optional</span>
          </h2>

          <p className="text-sm text-[#8A8881] mt-1">
            Demonstrate what someone can expect from your prompt.
          </p>
        </div>

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-[#44423E] mb-2">
              Example input
            </label>

            <textarea
              value={exampleInput}
              onChange={(event) => onExampleInputChange(event.target.value)}
              placeholder="Paste an example input..."
              rows={5}
              className="
                w-full
                px-4
                py-3
                rounded-xl
                border border-black/[0.08]
                bg-[#FBFAF7]
                text-sm
                text-[#252525]
                placeholder:text-[#AAA79F]
                outline-none
                resize-none
                focus:bg-white
                focus:border-black/[0.2]
                transition-all
              "
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#44423E] mb-2">
              Example output
            </label>

            <textarea
              value={exampleOutput}
              onChange={(event) => onExampleOutputChange(event.target.value)}
              placeholder="
Show the kind of result this prompt produces...
"
              rows={6}
              className="
                w-full
                px-4
                py-3
                rounded-xl
                border border-black/[0.08]
                bg-[#FBFAF7]
                text-sm
                text-[#252525]
                placeholder:text-[#AAA79F]
                outline-none
                resize-none
                focus:bg-white
                focus:border-black/[0.2]
                transition-all
              "
            />
          </div>
        </div>
      </div>

      <SectionImage src={imageSrc} alt={imageAlt} className="order-2" />
    </section>
  );
}
