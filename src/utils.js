const sources = ["imdb", "tmdb"];

export const getOtherSource = source => {
  const s = [...sources];
  s.splice(sources.indexOf(source), 1);
  return s[0];
};

export const getMainColor = source =>
  source === "imdb" ? `rgba(119, 176, 216)` : `rgba(216,119,176)`;

export const getOtherColor = (source, alpha = 1) =>
  source === "imdb"
    ? `rgba(216,119,176, ${alpha})`
    : `rgba(119, 176, 216, ${alpha})`;
