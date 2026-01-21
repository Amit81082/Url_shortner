export const timeAgo = (createdAt) => {
  const seconds = Math.floor((Date.now() - new Date(createdAt)) / 1000);

  const map = [
    [1, "seconds"],
    [60, "minutes"],
    [3600, "hours"],
    [86400, "days"],
    [604800, "weeks"],
    [31536000, "years"],
  ];

  for (let i = map.length - 1; i >= 0; i--) {
    const [limit, label] = map[i];
    if (seconds >= limit) {
      return `${Math.floor(seconds / limit)} ${label} ago`;
    }
  }

  return "just now";
};
