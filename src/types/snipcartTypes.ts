// src/types/snipcartGlobals.d.ts

export interface CartConfirmResponse {
  requiresRedirect: boolean;
  authenticationUrl: string;
  redirectUrl: string;
  cart: CartResponse;
  paymentSession?: PaymentSessionResponse;
  invoiceNumber?: string;
}

interface CartResponse {
  token: string;
  lang: string;
  email: string;
  status: string;
  paymentStatus: string;
  billingAddress: Address;
  shippingAddress: Address;
  shippingInformation: ShippingInformationResponse;
  shipToBillingAddress: boolean;
  items?: string[] | null; // Replace with actual type if available
  discounts?: string[] | null; // Replace with actual type if available
  customFields?: string[] | null; // Replace with actual type if available
  taxes?: string[] | null; // Replace with actual type if available
  currency: string;
  summary: CartSummary;
  invoiceNumber?: string;
  card?: {
    last4Digits: string;
    type: string;
  };
  paymentMethod?: string;
}

interface CartSummary {
  subtotal: number;
  total: number;
  taxes: string[] | null; // Replace with actual type if available
  discountInducedTaxesVariation: number;
}

interface Address {
  name: string;
  company?: string;
  address1: string;
  address2?: string;
  city: string;
  country: string;
  postalCode: string;
  province?: string;
  phone?: string;
  vatNumber?: string;
  errors?: ValidationError;
}

interface ShippingInformationResponse {
  fees: number;
  method: string;
}

interface ValidationError {
  // Define properties based on your needs
}

interface PaymentSessionResponse {
  // Define properties based on your needs
}

export interface SnipcartOrder {
  token?: string;
  creationDate?: string;
  modificationDate?: string;
  status?: string;
  paymentMethod?: string;
  invoiceNumber?: string;
  email?: string;
  cardHolderName?: string;
  creditCardLast4Digits?: string;
  billingAddressName?: string;
  billingAddressCompanyName?: string;
  billingAddressAddress1?: string;
  billingAddressAddress2?: string;
  billingAddressCity?: string;
  billingAddressCountry?: string;
  billingAddressProvince?: string;
  billingAddressPostalCode?: string;
  billingAddressPhone?: string;
  notes?: string | null;
  shippingAddressName?: string;
  shippingAddressCompanyName?: string;
  shippingAddressAddress1?: string;
  shippingAddressAddress2?: string;
  shippingAddressCity?: string;
  shippingAddressCountry?: string;
  shippingAddressProvince?: string;
  shippingAddressPostalCode?: string;
  shippingAddressPhone?: string;
  shippingAddressSameAsBilling?: boolean;
  finalGrandTotal?: number;
  shippingFees?: number;
  shippingMethod?: string;
  items?: string[]; // Update this type if you know the structure of the items
  taxes?: string[]; // Update this type if you know the structure of the taxes
  promocodes?: string[];
  willBePaidLater?: boolean;
  customFields?: string[];
  paymentTransactionId?: string;
}

export interface SnipcartOrdersResponse {
  totalItems?: number;
  offset?: number;
  limit?: number;
  items?: SnipcartOrder[];
}
