export const formatTags = (tags: string | undefined | null) => {
  if (!tags) return [];
  return tags.split(",").map((tag) => tag.trim());
};
