import { ChevronDown, Plus, Tag, X } from 'lucide-react';
import SectionImage from './SectionImage';

export default function PromptMetadataSection({
  category,
  model,
  tags,
  tagInput,
  errors,
  categories,
  models,
  onCategoryChange,
  onModelChange,
  onTagInputChange,
  onTagKeyDown,
  onAddTag,
  onRemoveTag,
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
      <SectionImage src={imageSrc} alt={imageAlt} className="order-2 lg:order-1" />

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
            <Tag className="w-4 h-4 text-[#77756F]" />
            <h2 className="text-base font-semibold">Give it some context</h2>
          </div>

          <p className="text-sm text-[#8A8881]">
            Add a category, AI model, and tags so people can find your prompt easily.
          </p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-[#44423E]">Category</label>
          <div className="relative">
            <select
              value={category}
              onChange={(event) => onCategoryChange(event.target.value)}
              className="
                appearance-none
                w-full
                h-12
                px-4
                pr-10
                rounded-xl
                border border-black/[0.08]
                bg-[#FBFAF7]
                text-sm
                text-[#252525]
                outline-none
                focus:bg-white
                focus:border-black/[0.2]
                transition-all
              "
            >
              <option value="">Select a category</option>
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            <ChevronDown
              className="
                absolute
                right-4
                top-1/2
                -translate-y-1/2
                w-4
                h-4
                text-[#8A8881]
                pointer-events-none
              "
            />
          </div>

          {errors.category && <p className="text-xs text-[#B14A4A]">{errors.category}</p>}
        </div>

        <div className="space-y-2 mt-6">
          <label className="text-sm font-medium text-[#44423E]">AI model</label>
          <div className="relative">
            <select
              value={model}
              onChange={(event) => onModelChange(event.target.value)}
              className="
                appearance-none
                w-full
                h-12
                px-4
                pr-10
                rounded-xl
                border border-black/[0.08]
                bg-[#FBFAF7]
                text-sm
                text-[#252525]
                outline-none
                focus:bg-white
                focus:border-black/[0.2]
                transition-all
              "
            >
              <option value="">Select an AI model</option>
              {models.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            <ChevronDown
              className="
                absolute
                right-4
                top-1/2
                -translate-y-1/2
                w-4
                h-4
                text-[#8A8881]
                pointer-events-none
              "
            />
          </div>
        </div>

        <div className="space-y-2 mt-6">
          <label className="text-sm font-medium text-[#44423E]">Tags</label>

          <div
            className="
              min-h-[52px]
              p-2.5
              rounded-xl
              border border-black/[0.08]
              bg-[#FBFAF7]
              flex
              flex-wrap
              items-center
              gap-2
              focus-within:bg-white
              focus-within:border-black/[0.2]
              transition-all
            "
          >
            {tags.map((tag) => (
              <span
                key={tag}
                className="
                  inline-flex
                  items-center
                  gap-1
                  px-2.5
                  py-1.5
                  rounded-lg
                  bg-[#ECEAE4]
                  text-xs
                  text-[#55534E]
                "
              >
                #{tag}
                <button
                  type="button"
                  onClick={() => onRemoveTag(tag)}
                  className="text-[#8A8881] hover:text-[#252525]"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}

            <input
              value={tagInput}
              onChange={(event) => onTagInputChange(event.target.value)}
              onKeyDown={onTagKeyDown}
              placeholder={tags.length ? 'Add another...' : 'Add tags...'}
              className="
                flex-1
                min-w-[120px]
                bg-transparent
                outline-none
                text-sm
                text-[#252525]
                placeholder:text-[#AAA79F]
                px-1
              "
            />

            <button
              type="button"
              onClick={onAddTag}
              className="
                w-8
                h-8
                rounded-lg
                bg-[#252525]
                text-white
                flex
                items-center
                justify-center
                hover:bg-[#111]
                transition-colors
              "
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {errors.tags && <p className="text-xs text-[#B14A4A]">{errors.tags}</p>}

          <p className="text-[11px] text-[#AAA79F]">Add up to 8 relevant tags.</p>
        </div>
      </div>
    </section>
  );
}
