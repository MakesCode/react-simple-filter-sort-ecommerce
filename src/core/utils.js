export function getUniqueItems(
  items,
  key,
) {
  const dedupe = [...new Set(items.map((item) => item[key]))];
  return dedupe
}
