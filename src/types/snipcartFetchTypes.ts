// Define types for the Snipcart API response

// Define types for addresses
interface Address {
  fullAddress: string;
  postalCode: string;
  country: string;
  city: string;
  province: string;
  phone: string;
}

// Define types for user details
interface User {
  email: string;
  fullName: string;
  billingAddress?: Address;
  shippingAddress?: Address;
}

// Define types for item details
interface OrderItem {
  subtotal: number;
}

// Define types for order summary
interface OrderSummary {
  subtotal: number;
  total: number;
}

// Define types for the main order
interface Order {
  invoiceNumber: string;
  status: string;
  finalGrandTotal: number;
  currency: string;
  trackingNumber?: string;
  trackingUrl?: string;
  items: {
    items: OrderItem[];
    summary?: OrderSummary;
    user?: User;
    billingAddress?: Address;
    shippingAddress?: Address;
    paymentStatus: string;
    paymentMethod: string;
    cardHolderName: string;
    cardType: string;
    creditCardLast4Digits: string;
    trackingNumber?: string;
    trackingUrl?: string;
    status?: string;
    currency?: string;
    finalGrandTotal?: string;
    creationDate?: string;
  }[];
}

// Define the response type
export type SnipcartOrdersResponse = Order[];
