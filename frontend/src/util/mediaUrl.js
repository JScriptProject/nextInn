export const resolveMediaUrl = (url) => {
  if (!url) return "";
  if (url.includes("localhost")) return "";
  return url;
};
