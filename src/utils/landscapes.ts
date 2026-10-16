const modules = import.meta.glob<{ default: ImageMetadata }>(
  "../assets/landscapes/*.{jpg,jpeg,png,webp,avif}",
  { eager: true }
);

export const landscapeEntries = Object.entries(modules).map(([path, mod]) => ({
  path,
  image: mod.default,
}));

export const landscapes: ImageMetadata[] = landscapeEntries.map((e) => e.image);
