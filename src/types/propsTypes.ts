import { Product, Category } from "./dataTypes";

// Defines a basic prop structure with an id and a name
export type Prop = {
  id: number;
  name: string;
};

// Defines the user type, which can be a string or null
export type User = string | null;

export type Admin = boolean;

// Defines props related to user information
export type UserProps = {
  user: User;
  admin: Admin;
};

// Defines props related to FilterDrawer information
export type FilterDrawerProps = {
  products: Product[];
  onFilterChange: (filteredProducts: Product[]) => void;
  isOpen: boolean;
  onClose: () => void;
};

// Defines props related to user information
export type UserMenuProps = {
  user: User;
  admin: Admin;
  products: Product[];
  categories: Category[];
};

// Defines props related to user & products
export type UserProductCategoryProps = {
  user: User;
  admin: Admin;
  products: Product[];
  categories: Category[];
};

// Defines the props required for the ProtectedRoute component
export type ProtectedRouteProps = {
  isUserLoggedIn: boolean;
  redirectTo: string;
  children: React.ReactNode;
};

// Defines the props required for the ProtectedRoute component
export type AdminRouteProps = {
  isUserAdmin: boolean;
  redirectTo: string;
  children: React.ReactNode;
};

// Defines the props for pagination results
export type PaginationResultProps = {
  currentPage: number;
  totalPages: number;
  currentProducts?: Product[];
  currentOrders?: Order[];
  handlePageChange: (page: number) => void;
};

// Defines the Ticket form structure
export type TicketFormState = {
  firstName: string;
  lastName: string;
  email: string;
  orderid: string;
  message: string;
};

// Defines the props for a home category component, including the image source, alt text, link, and button text
export type HomeCategoryProps = {
  src: string;
  alt: string;
  link: string;
  buttonText: string;
};

// Define a type for filters
export type Filters = {
  [key: string]: string | number | boolean;
};

export type FilterValues = {
  price: [number, number] | string[];
  color: string[];
  material: string[];
  subCategory: string[];
  furnitureCategory: string[];
  roomCategory: string[];
};

export type Order = {
  id: string;
  date: string;
  total: number;
  status: string;
};

export type ProductSort = {
  name: string;
  price: number;
};

export type MerchantSort = {
  name: string;
  price: number;
  stock: number;
};
