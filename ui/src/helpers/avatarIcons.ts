const AvatarIcons = [
  "palm",
  "garden",
  "rose",
  "poppy",
  "flower",
  "flower1",
  "flower2",
  "rose-flower",
  "cannabis",
  "greenery-nature",
  "plant-development",
  "botanical-nature",
  "cherry",
  "pepper",
];

export default function getRandomAvatarIcon(): string {
  const randomIndex = Math.floor(Math.random() * AvatarIcons.length);
  return AvatarIcons[randomIndex];
}
