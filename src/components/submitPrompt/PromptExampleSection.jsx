import { ImagePlus, Loader2, X } from 'lucide-react';
import SectionImage from './SectionImage';

const fieldClasses = `
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
`;

export default function PromptExampleSection({
  exampleDescription,
  exampleInput,
  exampleOutput,
  onExampleDescriptionChange,
  onExampleInputChange,
  onExampleOutputChange,
  previewImageUrl,
  previewImageName,
  previewImageSize,
  onPreviewImageSelect,
  onPreviewImageRemove,
  isProcessingImage,
  imageError,
  imageSrc,
  imageAlt,
}) {
  function handleFileChange(event) {
    const file = event.target.files?.[0];
    if (file) {
      onPreviewImageSelect(file);
    }
    event.target.value = '';
  }

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
              What does this example show?
            </label>

            <textarea
              value={exampleDescription}
              onChange={(event) => onExampleDescriptionChange(event.target.value)}
              placeholder="Briefly describe the result, e.g. “A clean product shot on a neutral background”."
              rows={3}
              className={fieldClasses}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#44423E] mb-2">
              Example input
            </label>

            <textarea
              value={exampleInput}
              onChange={(event) => onExampleInputChange(event.target.value)}
              placeholder="Paste an example input..."
              rows={4}
              className={fieldClasses}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#44423E] mb-2">
              Example output
            </label>

            <textarea
              value={exampleOutput}
              onChange={(event) => onExampleOutputChange(event.target.value)}
              placeholder="Show the kind of result this prompt produces..."
              rows={5}
              className={fieldClasses}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#44423E] mb-2">
              Example image
            </label>

            {previewImageUrl ? (
              <div className="relative overflow-hidden rounded-xl border border-black/[0.08] bg-[#FBFAF7]">
                <img
                  src={previewImageUrl}
                  alt="Selected example preview"
                  decoding="async"
                  className="block w-full max-h-[260px] object-contain bg-[#F2F1EC]"
                />

                <button
                  type="button"
                  onClick={onPreviewImageRemove}
                  className="absolute top-2.5 right-2.5 w-8 h-8 rounded-lg bg-white/90 border border-black/[0.08] text-[#55534E] flex items-center justify-center hover:bg-white shadow-sm transition-colors"
                  aria-label="Remove example image"
                >
                  <X className="w-4 h-4" />
                </button>

                {(previewImageName || previewImageSize) && (
                  <div className="flex items-center justify-between gap-3 px-3.5 py-2.5 border-t border-black/[0.06] bg-white">
                    <span className="text-xs text-[#77756F] truncate">
                      {previewImageName}
                    </span>
                    {previewImageSize && (
                      <span className="text-[11px] text-[#AAA79F] shrink-0">
                        {previewImageSize}
                      </span>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <label
                className="
                  flex
                  flex-col
                  items-center
                  justify-center
                  gap-2
                  w-full
                  min-h-[130px]
                  rounded-xl
                  border border-dashed border-black/[0.12]
                  bg-[#FBFAF7]
                  text-center
                  px-5
                  py-6
                  cursor-pointer
                  hover:bg-white
                  hover:border-black/[0.2]
                  transition-all
                "
              >
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/avif,image/gif"
                  onChange={handleFileChange}
                  disabled={isProcessingImage}
                  className="sr-only"
                />

                {isProcessingImage ? (
                  <>
                    <Loader2 className="w-5 h-5 text-[#8A8881] animate-spin" />
                    <span className="text-sm text-[#77756F]">Optimising image...</span>
                  </>
                ) : (
                  <>
                    <span className="w-10 h-10 rounded-xl bg-white border border-black/[0.06] flex items-center justify-center">
                      <ImagePlus className="w-4 h-4 text-[#8A8881]" />
                    </span>
                    <span className="text-sm font-medium text-[#55534E]">
                      Upload an example image
                    </span>
                    <span className="text-xs text-[#AAA79F]">
                      PNG, JPG, WebP, AVIF or GIF. Up to 15 MB.
                    </span>
                  </>
                )}
              </label>
            )}

            {imageError && (
              <p className="mt-2 text-xs text-[#B14A4A]">{imageError}</p>
            )}
          </div>
        </div>
      </div>

      <SectionImage src={imageSrc} alt={imageAlt} className="order-2" />
    </section>
  );
}
