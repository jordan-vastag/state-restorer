export const getIconPath = (iconName: string, colorMode: "light" | "dark") => {
  const suffix = colorMode === "light" ? "dark" : "light";
  return `${iconName}/${iconName}-${suffix}.svg`;
};

export const getLogoPath = (size: "48" | "192", colorMode: "light" | "dark") => {
  const suffix = colorMode === "light" ? "dark" : "light";
  return `logo/${size}/logo-${suffix}.png`;
};