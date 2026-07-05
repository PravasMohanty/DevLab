export const adjectives = [
  "brave",
  "silent",
  "rapid",
  "mighty",
  "frozen",
  "crimson",
  "silver",
  "golden",
  "ancient",
  "shadow",
  "storm",
  "lucky",
  "cosmic",
  "royal",
  "wild"
];

export const nouns = [
  "tiger",
  "falcon",
  "dragon",
  "phoenix",
  "lion",
  "panther",
  "eagle",
  "cobra",
  "wolf",
  "shark",
  "viper",
  "rhino",
  "orca",
  "hawk",
  "bear"
];

export const generateContainerName = () => {

  const adjective =
    adjectives[Math.floor(Math.random() * adjectives.length)];

  const noun =
    nouns[Math.floor(Math.random() * nouns.length)];

  const number =
    Math.floor(100 + Math.random() * 900);

  return `${adjective}_${noun}_${number}`;
}