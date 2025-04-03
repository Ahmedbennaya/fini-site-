
// Types for Razorpay
export interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description?: string;
  image?: string;
  order_id: string;
  handler: (response: RazorpayResponse) => void;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  notes?: {
    [key: string]: string;
  };
  theme?: {
    color?: string;
    hide_topbar?: boolean;
  };
  modal?: {
    ondismiss?: () => void;
    animation?: boolean;
    confirm_close?: boolean;
    escape?: boolean;
  };
}

export interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

export interface RazorpayInstance {
  open: () => void;
  on: (event: string, callback: Function) => void;
  off: (event: string, callback: Function) => void;
  close: () => void;
}

// Function to load Razorpay script dynamically
export const loadRazorpay = (): Promise<boolean> => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    
    document.body.appendChild(script);
  });
};

// Function to initialize Razorpay payment
export const initializeRazorpay = async (options: RazorpayOptions): Promise<RazorpayInstance | null> => {
  const isLoaded = await loadRazorpay();
  
  if (!isLoaded) {
    alert('Razorpay SDK failed to load. Check your internet connection.');
    return null;
  }
  
  // @ts-ignore - Razorpay is loaded from the script
  return new window.Razorpay(options);
};

// Function to create an order (this will call your Supabase Edge Function)
export const createRazorpayOrder = async (
  amount: number, 
  currency: string = 'INR',
  receipt?: string
): Promise<{ id: string } | null> => {
  try {
    const response = await fetch('/api/create-razorpay-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount,
        currency,
        receipt
      }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create order');
    }
    
    const data = await response.json();
    return data.order;
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    return null;
  }
};

// Function to verify payment (this will call your Supabase Edge Function)
export const verifyRazorpayPayment = async (
  paymentId: string,
  orderId: string,
  signature: string
): Promise<boolean> => {
  try {
    const response = await fetch('/api/verify-razorpay-payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        paymentId,
        orderId,
        signature
      }),
    });
    
    if (!response.ok) {
      throw new Error('Payment verification failed');
    }
    
    const data = await response.json();
    return data.verified;
  } catch (error) {
    console.error('Error verifying Razorpay payment:', error);
    return false;
  }
};
