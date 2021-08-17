const colors = [
  "#16a085",
  "#27ae60",
  "#2c3e50",
  "#f39c12",
  "#e74c3c",
  "#9b59b6",
  "#FB6964",
  "#342224",
  "#472E32",
  "#BDBB99",
  "#77B1A9",
  "#73A857",
];

const random = (array) => Math.floor(Math.random() * array.length);

const getRandomColor = () => {
  const color = random(colors);
  return colors[color];
};

const getRandomQuotes = (quotes) => {
  const quote = random(quotes);
  return quotes[quote];
};

export { random, getRandomColor, getRandomQuotes };
