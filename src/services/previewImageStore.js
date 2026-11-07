/**
 * Lightweight client-side image storage for prompt example previews.
 *
 * Prompt metadata continues to live in localStorage (the existing
 * architecture). Binary image blobs live in IndexedDB so we never have to
 * serialise large base64 strings into localStorage, which has a ~5MB quota.
 *
 * The stored data model only keeps a `hasImage` flag + intrinsic dimensions
 * on the prompt itself, so migrating to a real backend later is as simple as
 * replacing `hasImage` with an uploaded image URL.
 */

const DB_NAME = 'prompthub-preview-images';
const STORE_NAME = 'images';
const DB_VERSION = 1;

let dbPromise = null;

function indexedDbAvailable() {
  return typeof window !== 'undefined' && 'indexedDB' in window;
}

function openDb() {
  if (!indexedDbAvailable()) {
    return Promise.reject(new Error('Image storage is not available in this browser.'));
  }

  if (!dbPromise) {
    dbPromise = new Promise((resolve, reject) => {
      const request = window.indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME);
        }
      };

      request.onsuccess = () => resolve(request.result);

      request.onerror = () => {
        dbPromise = null;
        reject(request.error || new Error('Could not open image storage.'));
      };

      request.onblocked = () => {
        dbPromise = null;
        reject(new Error('Image storage is blocked by another tab.'));
      };
    });
  }

  return dbPromise;
}

export function getPreviewImageKey(promptId) {
  return `preview-${promptId}`;
}

export async function savePreviewImage(promptId, blob) {
  const db = await openDb();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    transaction.objectStore(STORE_NAME).put(blob, getPreviewImageKey(promptId));
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error || new Error('Could not save image.'));
    transaction.onabort = () => reject(transaction.error || new Error('Could not save image.'));
  });
}

export async function getPreviewImageBlob(promptId) {
  const db = await openDb();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readonly');
    const request = transaction.objectStore(STORE_NAME).get(getPreviewImageKey(promptId));

    request.onsuccess = () => {
      resolve(request.result instanceof Blob ? request.result : null);
    };
    request.onerror = () => reject(request.error || new Error('Could not read image.'));
  });
}

export async function deletePreviewImage(promptId) {
  const db = await openDb();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    transaction.objectStore(STORE_NAME).delete(getPreviewImageKey(promptId));
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error || new Error('Could not delete image.'));
    transaction.onabort = () => reject(transaction.error || new Error('Could not delete image.'));
  });
}
