export const titleFilter = (title) => (track) =>
  track.title?.toLowerCase().includes(title.toLowerCase());
