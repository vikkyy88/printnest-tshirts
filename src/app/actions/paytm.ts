'use server';

import crypto from 'crypto';

interface CartItem {
  id: string;
  name: string;
  price: number;
  discountPrice?: number;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

interface CustomerInfo {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  city: string;
  zip: string;
  country: string;
}

const PAYTM_MERCHANT_ID = process.env.PAYTM_MERCHANT_ID || 'TEST_MERCHANT_ID';
const PAYTM_MERCHANT_KEY = process.env.PAYTM_MERCHANT_KEY || 'TEST_MERCHANT_KEY';
const PAYTM_WEBSITE = process.env.PAYTM_WEBSITE || 'WEBSTAGING';
const PAYTM_ENVIRONMENT = process.env.PAYTM_ENVIRONMENT || 'staging';

const getPaytmHost = () => {
  return PAYTM_ENVIRONMENT === 'production'
    ? 'https://securegw.paytm.in'
    : 'https://securegw-stage.paytm.in';
};

// Generate checksum for Paytm
const generateSignature = (params: string, key: string): string => {
  return crypto.createHmac('sha256', key).update(params).digest('hex');
};

export async function initiatePaytmTransaction(
  items: CartItem[],
  customerInfo: CustomerInfo
): Promise<{
  success: boolean;
  orderId?: string;
  txnToken?: string;
  amount?: string;
  error?: string;
}> {
  try {
    // Calculate total amount in paisa (Paytm uses paisa for amount)
    const totalAmount = items.reduce((acc, item) => {
      const price = item.discountPrice || item.price;
      return acc + price * item.quantity;
    }, 0);

    const orderId = `ORDER_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

    const paytmParams: Record<string, any> = {
      body: {
        requestType: 'Payment',
        mid: PAYTM_MERCHANT_ID,
        websiteName: PAYTM_WEBSITE,
        orderId: orderId,
        callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/paytm/callback`,
        txnAmount: {
          value: totalAmount.toFixed(2),
          currency: 'INR',
        },
        userInfo: {
          custId: customerInfo.email,
          mobile: customerInfo.phone,
          email: customerInfo.email,
          firstName: customerInfo.firstName,
          lastName: customerInfo.lastName,
        },
      },
      head: {
        signature: '',
      },
    };

    // Generate signature
    const bodyString = JSON.stringify(paytmParams.body);
    paytmParams.head.signature = generateSignature(bodyString, PAYTM_MERCHANT_KEY);

    // Initiate transaction to get txnToken
    const response = await fetch(
      `${getPaytmHost()}/theia/api/v1/initiateTransaction?mid=${PAYTM_MERCHANT_ID}&orderId=${orderId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paytmParams),
      }
    );

    const data = await response.json();

    if (data.body?.resultInfo?.resultStatus === 'S') {
      return {
        success: true,
        orderId: orderId,
        txnToken: data.body.txnToken,
        amount: totalAmount.toFixed(2),
      };
    } else {
      console.error('Paytm initiate transaction failed:', data);
      return {
        success: false,
        error: data.body?.resultInfo?.resultMsg || 'Failed to initiate payment',
      };
    }
  } catch (error) {
    console.error('Paytm transaction error:', error);
    return {
      success: false,
      error: 'Failed to initiate payment. Please try again.',
    };
  }
}

export async function verifyPaytmTransaction(
  orderId: string
): Promise<{
  success: boolean;
  status?: string;
  error?: string;
}> {
  try {
    const paytmParams: Record<string, any> = {
      body: {
        mid: PAYTM_MERCHANT_ID,
        orderId: orderId,
      },
      head: {
        signature: '',
      },
    };

    const bodyString = JSON.stringify(paytmParams.body);
    paytmParams.head.signature = generateSignature(bodyString, PAYTM_MERCHANT_KEY);

    const response = await fetch(
      `${getPaytmHost()}/v3/order/status`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paytmParams),
      }
    );

    const data = await response.json();

    if (data.body?.resultInfo?.resultStatus === 'TXN_SUCCESS') {
      return {
        success: true,
        status: 'SUCCESS',
      };
    } else {
      return {
        success: false,
        status: data.body?.resultInfo?.resultStatus,
        error: data.body?.resultInfo?.resultMsg || 'Transaction verification failed',
      };
    }
  } catch (error) {
    console.error('Paytm verification error:', error);
    return {
      success: false,
      error: 'Failed to verify payment',
    };
  }
}
