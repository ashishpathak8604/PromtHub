import cat from '../../assets/optimized/pic20.webp';

function PreviewLabel({ children }) {
  return (
    <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-[#ECEAE4] text-[11px] font-medium text-[#55534E]">
      {children}
    </span>
  );
}

export default function PromptPreview({
  category,
  model,
  title,
  description,
  content,
  tags,
  exampleDescription,
  exampleInput,
  exampleOutput,
  previewImageUrl,
}) {
  const hasExample = Boolean(
    exampleDescription?.trim() ||
    exampleInput?.trim() ||
    exampleOutput?.trim() ||
    previewImageUrl
  );

  return (
    <div className="max-w-4xl mx-auto ">
      <div
        className="
          bg-white
          rounded-3xl
          border border-black/[0.07]
          p-8
          sm:p-12
          shadow-[0_4px_24px_rgba(30,30,30,0.04)]
        "
      >
        <div className="flex items-center gap-2 mb-6">
          <span
            className="
              px-2.5
              py-1
              rounded-lg
              bg-[#ECEAE4]
              text-xs
              font-medium
              text-[#55534E]
            "
          >
            {category || 'Uncategorized'}
          </span>

          {model && <span className="text-xs text-[#AAA79F]">{model}</span>}
        </div>

        <h1
          className="
            text-3xl
            sm:text-4xl
            font-bold
            tracking-[-0.03em]
            text-[#252525]
          "
        >
          {title || 'Untitled prompt'}
        </h1>

        <p
          className="
            mt-4
            text-sm
            leading-relaxed
            text-[#77756F]
          "
        >
          {description || 'No description added yet.'}
        </p>

        <div className="mt-10">
          <div className="flex items-center justify-between mb-3">
            <h3
              className="
                text-xs
                font-semibold
                uppercase
                tracking-wider
                text-[#77756F]
              "
            >
              Prompt
            </h3>
          </div>

          <div
            className="
              bg-[#F7F6F2]
              border border-black/[0.06]
              rounded-2xl
              p-6
              font-mono
              text-sm
              leading-[1.8]
              whitespace-pre-wrap
              text-[#3D3B37]
            "
          >
            {content || 'No prompt content added yet.'}
          </div>
        </div>

        {hasExample && (
          <section className="mt-10 pt-8 border-t border-black/[0.06]">
            <div className="flex items-center gap-2.5 mb-5">
              <h3 className="text-sm font-semibold text-[#44423E] uppercase tracking-wider">
                Example Preview
              </h3>
              <PreviewLabel>Preview</PreviewLabel>
            </div>

            {exampleDescription?.trim() && (
              <p className="text-sm text-[#77756F] leading-relaxed mb-5 whitespace-pre-wrap">
                {exampleDescription.trim()}
              </p>
            )}

            {exampleInput?.trim() && (
              <div className="mb-5">
                <div className="flex items-center gap-2 mb-2">
                  <PreviewLabel>Example input</PreviewLabel>
                </div>
                <div className="rounded-2xl border border-dashed border-black/[0.1] bg-[#FBFAF7] p-5">
                  <pre className="whitespace-pre-wrap break-words font-mono text-[13px] leading-[1.8] text-[#55534E]">
                    {exampleInput.trim()}
                  </pre>
                </div>
              </div>
            )}

            {previewImageUrl && (
              <div className="mb-5">
                <div className="flex items-center gap-2 mb-2">
                  <PreviewLabel>Generated output</PreviewLabel>
                </div>
                <img
                  src={previewImageUrl}
                  alt="Example preview"
                  className="block w-full max-h-[420px] object-contain rounded-2xl border border-black/[0.06] bg-[#F7F6F2]"
                />
              </div>
            )}

            {exampleOutput?.trim() && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <PreviewLabel>
                    {previewImageUrl ? 'Additional output' : 'Generated output'}
                  </PreviewLabel>
                </div>
                <div className="rounded-2xl border border-black/[0.06] bg-[#F7F6F2] p-5 sm:p-6">
                  <pre className="whitespace-pre-wrap break-words font-mono text-[13px] leading-[1.8] text-[#3D3B37]">
                    {exampleOutput.trim()}
                  </pre>
                </div>
              </div>
            )}
          </section>
        )}

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-6">
            {tags.map((tag) => (
              <span key={tag} className="text-xs text-[#8A8881]">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
      <div className="mt-12 flex justify-center">
        <img
          src={cat}
          alt="Cat illustration"
          width={340}
          height={324}
          loading="lazy"
          decoding="async"
          className="w-40 sm:w-40 md:w-70 h-auto object-contain"
        />
      </div>
    </div>
  );
}
