export function generateCardNumber() {
  return Array.from({ length: 4 }, () =>
    Math.floor(1000 + Math.random() * 9000)
  ).join("");
}

export function generateExpiryDate() {
  const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, "0");
  const year = String(new Date().getFullYear() + 2).slice(-2);
  return `${month}/${year}`;
}

export const generateCVV = () => Math.floor(100 + Math.random() * 900);
