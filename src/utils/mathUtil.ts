// Function to get a random integer between min and max (inclusive of min, exclusive of max)
export function getRndInteger(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min)) + min;
}

// Function to get the CSS column template string for a given number of columns
export const getColumnTemplate = (numColumns: number): string => {
  const columnWidth = 1 / numColumns;
  return `repeat(${numColumns}, ${columnWidth}fr)`;
};

export const getRowTemplate = (numRows: number): string => {
  return `repeat(${numRows}, 1fr)`;
};
