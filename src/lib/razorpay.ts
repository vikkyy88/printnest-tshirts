import Razorpay from 'razorpay';

if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
  throw new Error('Razorpay credentials are not configured');
}

export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export interface CreateOrderParams {
  amount: number; // Amount in paise (e.g., 100 for ₹1)
  currency?: string;
  receipt?: string;
  notes?: Record<string, string>;
}

export async function createRazorpayOrder(params: CreateOrderParams) {
  const { amount, currency = 'INR', receipt, notes } = params;
  
  const order = await razorpay.orders.create({
    amount,
    currency,
    receipt: receipt || `receipt_${Date.now()}`,
    notes: notes || {},
  });

  return order;
}
