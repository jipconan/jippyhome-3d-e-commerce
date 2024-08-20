// Represents a user with optional ID, email, and password
export type User = {
  id?: string;
  email: string;
  password: string;
  salt?: string;
  iterations?: number;
  confirm?: string;
  addressLine1?: string;
  addressLine2?: string;
  postalCode?: string;
};

// Contains details needed for signing in, including name, salt, and iterations
export type SignInDetails = {
  name: string;
  salt: string;
  iterations: number;
};

export type storeToken = {
  token: SignInDetails;
};

// Response type for sign-in details, indicating success and optional data or error
export type SignInDetailsResponse = {
  success: boolean;
  data?: SignInDetails;
  error?: string;
};

export type UserDetailsProps = {
  email: string;
  firstName: string;
  lastName: string;
  addressLine1?: string;
  addressLine2?: string;
  postalCode?: string;
};
