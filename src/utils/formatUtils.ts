export const formatArrayToStringWithPipe = (items: string[]): string => {
  return items.join("|");
};

export const formatArrayToStringWithComma = (items: string[]): string => {
  return items.map((item) => `${item}`).join(", ");
};

export const capitalizeWords = (text: string): string => {
  return text
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export function formatDate(dateString: string): string {
  const date = new Date(dateString);

  const day = date.getDate().toString().padStart(2, "0");
  const monthAbbrev = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear().toString().slice(-4);

  return `${day} ${monthAbbrev} ${year}`;
}
