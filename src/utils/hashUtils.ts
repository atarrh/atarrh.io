/** FNV-1a 32-bit hash */
function fnv1a32(str: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = (h + (h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24)) >>> 0;
  }
  return h >>> 0;
}

/**
 * Rendezvous hashing:
 * score(item) = hash(key + "|" + itemId)
 * pick the item with the max score
 *
 * Stable when adding/removing keys (posts).
 * Minimal reshuffling when adding/removing items (images).
 */
export function pickLandscape(
  landscapes: ImageMetadata[],
  postId: string
): ImageMetadata | undefined {
  if (!landscapes.length) return undefined;

  let best = landscapes[0];
  let bestScore = -1;

  for (const img of landscapes) {
    // img.src is a stable identifier for the imported asset
    const score = fnv1a32(`${postId}|${img.src}`);
    if (score > bestScore) {
      bestScore = score;
      best = img;
    }
  }
  return best;
}