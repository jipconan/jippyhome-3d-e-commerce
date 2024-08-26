const sortProductPage = {
  "Name A-Z": (a, b) => a.name.localeCompare(b.name),
  "Name Z-A": (a, b) => b.name.localeCompare(a.name),
  "Price Low-High": (a, b) => a.price - b.price,
  "Price High-Low": (a, b) => b.price - a.price,
};

const sortMerchantPage = {
  "name-A-Z": (a, b) => a.name.localeCompare(b.name),
  "name-Z-A": (a, b) => b.name.localeCompare(a.name),
  "stock-Low-High": (a, b) => a.stock - b.stock,
  "stock-High-Low": (a, b) => b.stock - a.stock,
  "price-Low-High": (a, b) => a.price - b.price,
  "price-High-Low": (a, b) => b.price - a.price,
};
export { sortProductPage, sortMerchantPage };
