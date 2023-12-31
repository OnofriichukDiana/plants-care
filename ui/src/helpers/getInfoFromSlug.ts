export function getIdFromSlug(slug: string | undefined): number | null {
  if (!slug) {
    console.error("Invalid slug:", slug);
    return null;
  }
  const parts = slug.split("_");
  if (parts.length >= 2 && !isNaN(Number(parts[0]))) {
    return parseInt(parts[0], 10);
  } else {
    console.error("Invalid slug format:", slug);
    return null;
  }
}

export function getTagsFromSlug(slug: string | undefined): string {
  if (!slug) {
    console.error("Invalid slug:", slug);
    return "Plants care community";
  }
  const decodedSlug = decodeURIComponent(slug);
  const tags = decodedSlug.split("_")[1];
  if (!tags) {
    console.error("Invalid slug format:", slug);
    return "Plants care community";
  }

  const res = tags.replace(/,/g, " | ");
  return res;
}

export function getNameFromSlug(slug: string | undefined): string {
  if (!slug) {
    console.error("Invalid slug:", slug);
    return "Plants care community";
  }
  const decodedSlug = decodeURIComponent(slug);
  const name = decodedSlug.split("_")[1];
  if (!name) {
    console.error("Invalid slug format:", slug);
    return "Plants care community";
  }

  return name;
}
