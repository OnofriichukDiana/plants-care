export default function getIdFromSlug(slug: string | undefined): number | null {
  if (!slug) {
    console.error("Invalid slug:", slug);
    return null;
  }
  const parts = slug.split("_");
  if (parts.length === 2 && !isNaN(Number(parts[0]))) {
    return parseInt(parts[0], 10);
  } else {
    console.error("Invalid slug format:", slug);
    return null;
  }
}
