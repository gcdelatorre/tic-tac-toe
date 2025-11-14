export function generateBoxes() {
  return Array.from({ length: 9 }, (_, i) => ({
    text: null,
    active: false,
    id: i + 1
  }));
}