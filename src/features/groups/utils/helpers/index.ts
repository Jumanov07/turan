export const getMetersWordForm = (count: number) => {
  if (count === 1) {
    return "Счётчик";
  }

  if (count >= 2 && count <= 4) {
    return "Счётчика";
  }

  return "Счётчиков";
};
