/**
 * Resize + compress an uploaded example image entirely in the browser.
 *
 * Keeping the encoded blob small matters because the current app is
 * frontend-only. Images are stored as blobs in IndexedDB, and capping the
 * output keeps both rendering and future export/import fast.
 */

const MAX_FILE_BYTES = 15 * 1024 * 1024;
const MAX_OUTPUT_BYTES = 850 * 1024;
const MAX_DIMENSION = 1600;
const MIN_DIMENSION = 900;

const ALLOWED_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/avif',
  'image/gif',
];

function loadImageSource(file) {
  if ('createImageBitmap' in window) {
    return createImageBitmap(file).then((bitmap) => ({
      source: bitmap,
      width: bitmap.width,
      height: bitmap.height,
      cleanup: () => bitmap.close?.(),
    }));
  }

  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const image = new Image();

    image.onload = () => {
      resolve({
        source: image,
        width: image.naturalWidth,
        height: image.naturalHeight,
        cleanup: () => URL.revokeObjectURL(url),
      });
    };

    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Could not read this image.'));
    };

    image.src = url;
  });
}

function canvasToBlob(canvas, quality) {
  return new Promise((resolve) => {
    canvas.toBlob(resolve, 'image/webp', quality);
  });
}

export async function processPreviewImage(file) {
  if (!file) {
    throw new Error('No image selected.');
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error('Please choose a PNG, JPG, WebP, AVIF, or GIF image.');
  }

  if (file.size > MAX_FILE_BYTES) {
    throw new Error('This image is too large. Please use an image under 15 MB.');
  }

  const loaded = await loadImageSource(file);

  try {
    let width = loaded.width;
    let height = loaded.height;

    const initialScale = Math.min(1, MAX_DIMENSION / Math.max(width, height));
    width = Math.max(1, Math.round(width * initialScale));
    height = Math.max(1, Math.round(height * initialScale));

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    if (!context) {
      throw new Error('Your browser could not process this image.');
    }

    let blob = null;
    let quality = 0.86;

    for (let attempt = 0; attempt < 7; attempt += 1) {
      canvas.width = width;
      canvas.height = height;
      context.clearRect(0, 0, width, height);
      context.drawImage(loaded.source, 0, 0, width, height);

      blob = await canvasToBlob(canvas, quality);

      if (blob && blob.size <= MAX_OUTPUT_BYTES) {
        break;
      }

      if (quality > 0.62) {
        quality -= 0.08;
      } else if (Math.max(width, height) > MIN_DIMENSION) {
        width = Math.max(1, Math.round(width * 0.82));
        height = Math.max(1, Math.round(height * 0.82));
        quality = 0.78;
      } else {
        break;
      }
    }

    if (!blob) {
      throw new Error('Could not compress this image.');
    }

    if (blob.size > MAX_OUTPUT_BYTES) {
      throw new Error('This image could not be compressed enough. Try a smaller image.');
    }

    return {
      blob,
      width,
      height,
      originalName: file.name,
    };
  } finally {
    loaded.cleanup?.();
  }
}

export function formatFileSize(bytes) {
  if (!bytes) return '';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
