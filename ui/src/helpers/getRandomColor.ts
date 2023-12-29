export const hexColors = [
  "#3498db", // Dodger Blue
  "#2ecc71", // Emerald
  "#e74c3c", // Alizarin Crimson
  "#f39c12", // Sunflower
  "#9b59b6", // Amethyst
  "#3498db", // Dodger Blue
  "#2ecc71", // Emerald
  "#f39c12", // Sunflower
  "#16a085", // Green Sea
  "#e67e22", // Carrot Orange
  "#1abc9c", // Turquoise
  "#2d2d2d", // Dark Gray
  "#9933ff", // Dark Violet
  "#ff6666", // Dark Salmon
  "#66ccff", // Sky Blue
  "#667dff", // Dark Blue
  "#ff99cc", // Pink
  "#cc99ff", // Purple
  "#66ffcc", // Light Green
  "#ff6666", // Dark Salmon
];

export function getRandomColor() {
  const randomIndex = Math.floor(Math.random() * hexColors.length);
  return hexColors[randomIndex];
}
