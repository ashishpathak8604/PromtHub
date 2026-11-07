import { useEffect, useState } from 'react';
import { ImageOff, Maximize2, X } from 'lucide-react';
import { getPreviewImageBlob } from '../../services/previewImageStore';
import { getLenisInstance } from '../../utils/lenis';

function usePreviewImage(prompt) {
  const promptId = prompt?.id;
  const preview = prompt?.examplePreview;
  const hasImage = Boolean(preview?.hasImage);
  const imageVersion = preview?.imageUpdatedAt || '';
  const requestKey = hasImage && promptId ? `${promptId}:${imageVersion}` : '';

  const [state, setState] = useState({ key: '', src: '', status: 'idle' });

  useEffect(() => {
    if (!requestKey) {
      return undefined;
    }

    let cancelled = false;
    let objectUrl = '';

    getPreviewImageBlob(promptId)
      .then((blob) => {
        if (cancelled) return;

        if (!blob) {
          setState({ key: requestKey, src: '', status: 'missing' });
          return;
        }

        objectUrl = URL.createObjectURL(blob);
        setState({ key: requestKey, src: objectUrl, status: 'ready' });
      })
      .catch(() => {
        if (!cancelled) {
          setState({ key: requestKey, src: '', status: 'error' });
        }
      });

    return () => {
      cancelled = true;
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [promptId, requestKey]);

  if (!requestKey) {
    return { src: '', status: 'idle' };
  }

  // While a new request is in flight, ignore any state left over from
  // a previous prompt/image so a stale preview never flashes.
  if (state.key !== requestKey) {
    return { src: '', status: 'loading' };
  }

  return state;
}

function ImageLightbox({ src, alt, onClose }) {
  useEffect(() => {
    const lenis = getLenisInstance();
    lenis?.stop();

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      lenis?.start();
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[110] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Example preview image"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close image preview"
        className="absolute top-5 right-5 w-10 h-10 rounded-xl bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
      >
        <X className="w-5 h-5" />
      </button>

      <img
        src={src}
        alt={alt}
        className="max-h-[90vh] max-w-[92vw] object-contain rounded-xl shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      />
    </div>
  );
}

function PreviewLabel({ children }) {
  return (
    <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-[#ECEAE4] text-[11px] font-medium text-[#55534E]">
      {children}
    </span>
  );
}

export default function ExamplePreview({ prompt }) {
  const storedPreview = prompt?.examplePreview;
  const legacyPreview = !storedPreview && (prompt?.exampleInput || prompt?.exampleOutput)
    ? {
        type: 'text',
        hasImage: false,
        input: prompt.exampleInput,
        output: prompt.exampleOutput,
      }
    : null;
  const preview = storedPreview || legacyPreview;
  const hasOutput = Boolean(preview?.output?.trim());
  const hasImage = Boolean(preview?.hasImage);
  const hasPreview = Boolean(preview) && (hasOutput || hasImage);

  const { src, status } = usePreviewImage(prompt);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  if (!hasPreview) {
    return (
      <section className="mt-10 pt-8 border-t border-black/[0.06]">
        <div className="flex items-start gap-3 rounded-2xl border border-dashed border-black/[0.1] bg-[#FBFAF7] px-5 py-5">
          <div className="w-9 h-9 shrink-0 rounded-xl bg-white border border-black/[0.06] flex items-center justify-center">
            <ImageOff className="w-4 h-4 text-[#AAA79F]" />
          </div>

          <div>
            <h3 className="text-sm font-semibold text-[#44423E]">Example Preview</h3>
            <p className="mt-1 text-sm text-[#8A8881] leading-relaxed">
              The author hasn&apos;t shared an example of what this prompt produces yet.
            </p>
          </div>
        </div>
      </section>
    );
  }

  const width = preview.imageWidth || 0;
  const height = preview.imageHeight || 0;
  const aspectRatio = width && height ? `${width} / ${height}` : '16 / 10';
  const typeLabel =
    preview.type === 'both' ? 'Image + text' : preview.type === 'image' ? 'Image' : 'Text';
  const outputAlt = `${prompt.title} example output`;

  const renderImage = () => {
    if (status === 'loading') {
      return (
        <div
          className="w-full rounded-2xl border border-black/[0.06] bg-[#ECEAE4] animate-pulse"
          style={{ aspectRatio, maxHeight: '560px', minHeight: '200px' }}
          aria-label="Loading example image"
        />
      );
    }

    if (status === 'ready' && src) {
      return (
        <button
          type="button"
          onClick={() => setLightboxOpen(true)}
          className="group relative block w-full overflow-hidden rounded-2xl border border-black/[0.06] bg-[#F7F6F2] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#252525] focus-visible:ring-offset-2"
          title="Click to enlarge"
        >
          <img
            src={src}
            alt={outputAlt}
            width={width || undefined}
            height={height || undefined}
            loading="lazy"
            decoding="async"
            className="block w-full h-auto max-h-[560px] object-contain transition-transform duration-300 group-hover:scale-[1.005]"
            style={width && height ? { aspectRatio } : undefined}
          />

          <span className="absolute top-3 right-3 inline-flex items-center gap-1.5 rounded-lg bg-white/90 border border-black/[0.06] px-2.5 py-1.5 text-[11px] font-medium text-[#55534E] shadow-sm opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity">
            <Maximize2 className="w-3.5 h-3.5" />
            Enlarge
          </span>
        </button>
      );
    }

    return (
      <div className="flex items-center gap-3 rounded-2xl border border-dashed border-black/[0.1] bg-[#FBFAF7] px-5 py-5">
        <ImageOff className="w-4 h-4 text-[#AAA79F] shrink-0" />
        <p className="text-sm text-[#8A8881]">
          The example image for this prompt is unavailable.
        </p>
      </div>
    );
  };

  return (
    <section className="mt-10 pt-8 border-t border-black/[0.06]">
      <div className="flex items-start justify-between gap-4 mb-5">
        <div>
          <div className="flex items-center gap-2.5">
            <h3 className="text-sm font-semibold text-[#44423E] uppercase tracking-wider">
              Example Preview
            </h3>
            <PreviewLabel>{typeLabel}</PreviewLabel>
          </div>

          <p className="mt-2 text-xs text-[#AAA79F]">
            A demonstration shared by the author, not a live execution.
          </p>
        </div>
      </div>

      {preview.description && (
        <p className="text-sm text-[#77756F] leading-relaxed mb-5 whitespace-pre-wrap">
          {preview.description}
        </p>
      )}

      {preview.input && (
        <div className="mb-5">
          <div className="flex items-center gap-2 mb-2">
            <PreviewLabel>Example input</PreviewLabel>
          </div>

          <div className="rounded-2xl border border-dashed border-black/[0.1] bg-[#FBFAF7] p-5">
            <pre className="whitespace-pre-wrap break-words font-mono text-[13px] leading-[1.8] text-[#55534E] max-h-[280px] overflow-y-auto">
              {preview.input}
            </pre>
          </div>
        </div>
      )}

      {hasImage && (
        <div className="mb-5">
          <div className="flex items-center gap-2 mb-2">
            <PreviewLabel>Generated output</PreviewLabel>
          </div>
          {renderImage()}
        </div>
      )}

      {hasOutput && (
        <div>
          <div className="flex items-center gap-2 mb-2">
            <PreviewLabel>{hasImage ? 'Additional output' : 'Generated output'}</PreviewLabel>
          </div>

          <div className="rounded-2xl border border-black/[0.06] bg-[#F7F6F2] p-5 sm:p-6">
            <pre className="whitespace-pre-wrap break-words font-mono text-[13px] leading-[1.8] text-[#3D3B37] max-h-[520px] overflow-y-auto">
              {preview.output}
            </pre>
          </div>
        </div>
      )}

      {lightboxOpen && src && (
        <ImageLightbox
          src={src}
          alt={outputAlt}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </section>
  );
}
