let cachedTheme = null;
export const setTheme = (theme) => {
  cachedTheme = theme;
};

export const getTheme = () => {
  return cachedTheme || "theme1";
};
