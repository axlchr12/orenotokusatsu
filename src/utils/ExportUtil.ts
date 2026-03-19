import { isMobile } from '../pages/content/ExportGrid';

export const toBase64 = async (url: string) => {
  const response = await fetch(url, { mode: 'cors' });
  const blob = await response.blob();
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

export const waitForImages = (
  imgs: NodeListOf<HTMLImageElement>,
): Promise<void> => {
  const promises = Array.from(imgs).map(img => {
    if (img.complete && img.naturalWidth > 0) return Promise.resolve();
    return new Promise<void>(resolve => {
      img.onload = () => resolve();
      img.onerror = () => resolve(); // tetap lanjut meski error
    });
  });
  return Promise.all(promises).then(() => void 0);
};

const MAX_CANVAS_SIDE = 4096;

/**
 * Detects low-end devices based on available hardware hints.
 * - deviceMemory <= 4 GB → low-end
 * - hardwareConcurrency <= 4 cores (fallback when deviceMemory unavailable) → low-end
 * Only applies to mobile; desktop always treated as high-end.
 */
export const isLowEndDevice = (): boolean => {
  if (!isMobile) return false;
  const memory = (navigator as any).deviceMemory as number | undefined;
  if (memory !== undefined) return memory <= 4;
  return navigator.hardwareConcurrency <= 4;
};

export const getExportConfig = (element: HTMLElement) => {
  if (!isMobile) return { pixelRatio: 2, quality: 0.75, scale: 3 };

  const scale3W = element.offsetWidth * 3;
  const scale3H = element.offsetHeight * 3;

  if (scale3W > MAX_CANVAS_SIDE || scale3H > MAX_CANVAS_SIDE) {
    const safeScale = Math.floor(
      Math.min(
        MAX_CANVAS_SIDE / element.offsetWidth,
        MAX_CANVAS_SIDE / element.offsetHeight,
      ),
    );
    const scale = Math.max(1, safeScale);
    return { pixelRatio: 1, quality: 0.6, scale };
  }

  return { pixelRatio: 2, quality: 0.75, scale: 3 };
};

/**
 * Converts images to base64 in controlled batches to prevent overwhelming
 * memory / network on low-end devices.
 *
 * @param images    - NodeList of <img> elements inside the export container
 * @param originalSrcs - mutable array that will be populated with original src values
 * @param batchSize - how many images to process concurrently (default 3)
 */
export const convertImagesToBase64Batched = async (
  images: NodeListOf<HTMLImageElement>,
  originalSrcs: string[],
  batchSize = 3,
): Promise<void> => {
  const imageArray = Array.from(images);

  for (let i = 0; i < imageArray.length; i += batchSize) {
    const batch = imageArray.slice(i, i + batchSize);

    await Promise.all(
      batch.map(async (img, batchIndex) => {
        const globalIndex = i + batchIndex;
        originalSrcs[globalIndex] = img.src;

        if (img.src && !img.src.startsWith('data:')) {
          try {
            const base64 = await toBase64(img.src);
            img.src = base64;
          } catch (e) {
            throw new Error(
              `Failed to change image to base64 for index-${globalIndex}`,
              { cause: e },
            );
          }
        }
      }),
    );
  }
};
