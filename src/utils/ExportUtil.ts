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

/**
 * Detects low-end devices based on available hardware hints.
 * - deviceMemory <= 2 GB → low-end
 * - hardwareConcurrency <= 4 cores (fallback when deviceMemory unavailable) → low-end
 * Only applies to mobile; desktop always treated as high-end.
 */
export const isLowEndDevice = (): boolean => {
  if (!isMobile) return false;
  const memory = (navigator as any).deviceMemory as number | undefined;
  if (memory !== undefined) return memory <= 2;
  return navigator.hardwareConcurrency <= 4;
};

/**
 * Returns adaptive export config based on device capability.
 *
 * Low-end mobile  → pixelRatio 1, quality 0.60, scale 2
 *   Rationale: reduces canvas size 9× vs high-end path (scale 3 × pixelRatio 2),
 *   cuts memory pressure and encoding time significantly.
 *
 * High-end mobile → pixelRatio 2, quality 0.75, scale 3
 *   Rationale: retains original sharp output for modern devices & iPhones.
 *
 * Desktop         → handled via toJpeg, pixelRatio 2, quality 0.75 (unchanged).
 */
export const getExportConfig = () => {
  if (isLowEndDevice()) {
    return { pixelRatio: 1, quality: 0.6, scale: 2 } as const;
  }
  return { pixelRatio: 2, quality: 0.75, scale: 3 } as const;
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
