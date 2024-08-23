// src/types/snipcartGlobals.d.ts

interface SnipcartEvent {
  detail?: {
    order?: CartState; // Adjust to your actual type
  };
}

interface SnipcartEvents {
  on(event: string, callback: (event: SnipcartEvent) => void): void;
}

declare const Snipcart: {
  events: SnipcartEvents;
};

// Extend the Window interface to include Snipcart
declare global {
  interface Window {
    Snipcart: typeof Snipcart;
  }
}

// This ensures the file is treated as a module
export {};
