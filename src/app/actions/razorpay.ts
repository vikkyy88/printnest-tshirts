'use server';

import crypto from 'crypto';
import { createRazorpayOrder } from '@/lib/razorpay';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  discountPrice?: number;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

export interface CustomerInfo {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  zip: string;
  country: string;
  phone?: string;
}

export async function createOrder(
  cartItems: CartItem[],
  customerInfo: CustomerInfo
) {
  try {
    // Calculate total amount in paise (1 INR = 100 paise)
    const totalAmount = cartItems.reduce(
      (sum, item) => sum + (item.discountPrice || item.price) * item.quantity,
      0
    );
    const amountInPaise = Math.round(totalAmount * 100);

    // Create order with Razorpay
    const order = await createRazorpayOrder({
      amount: amountInPaise,
      currency: 'INR',
      receipt: `order_${Date.now()}`,
      notes: {
        customer_email: customerInfo.email,
        customer_name: `${customerInfo.firstName} ${customerInfo.lastName}`,
        shipping_address: `${customerInfo.address}, ${customerInfo.city}, ${customerInfo.zip}, ${customerInfo.country}`,
      },
    });

    return {
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    };
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    return {
      success: false,
      error: 'Failed to create order. Please try again.',
    };
  }
}

export async function verifyPayment(
  razorpay_order_id: string,
  razorpay_payment_id: string,
  razorpay_signature: string
) {
  try {
    const secret = process.env.RAZORPAY_KEY_SECRET!;
    
    // Create expected signature
    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(body)
      .digest('hex');

    // Verify signature
    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      // Payment is verified - in a real app, you'd update your database here
      return {
        success: true,
        message: 'Payment verified successfully',
        paymentId: razorpay_payment_id,
      };
    } else {
      return {
        success: false,
        error: 'Payment verification failed',
      };
    }
  } catch (error) {
    console.error('Error verifying payment:', error);
    return {
      success: false,
      error: 'Payment verification failed. Please contact support.',
    };
  }
}
