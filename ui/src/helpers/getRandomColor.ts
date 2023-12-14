export const hexColors = [
  "#2c3e50", // Midnight Blue
  "#34495e", // Wet Asphalt
  "#7f8c8d", // Concrete
  "#95a5a6", // Alizarin
  "#34495e", // Midnight Blue
  "#2c3e50", // Wet Asphalt
  "#555555", // Concrete
  "#666666", // Alizarin
  "#1f2c39", // Dark Charcoal
  "#262626", // Graphite
  "#1a1a1a", // Black
  "#2d2d2d", // Dark Gray
  "#393939", // Gray
  "#4d4d4d", // Dim Gray
  "#5c5c5c", // Gray
  "#474747", // Dim Gray
  "#3a3a3a", // Davy's Gray
  "#2e2e2e", // Charcoal
  "#1f1f1f", // Jet Black
  "#0d0d0d", // Black
];

export function getRandomColor() {
  const randomIndex = Math.floor(Math.random() * hexColors.length);
  return hexColors[randomIndex];
}
