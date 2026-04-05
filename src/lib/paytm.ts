import crypto from 'crypto';

const PAYTM_MERCHANT_ID = process.env.PAYTM_MERCHANT_ID!;
const PAYTM_MERCHANT_KEY = process.env.PAYTM_MERCHANT_KEY!;
const PAYTM_WEBSITE = process.env.PAYTM_WEBSITE || 'DEFAULT';
const PAYTM_ENVIRONMENT = process.env.PAYTM_ENVIRONMENT || 'staging'; // 'staging' or 'production'

export const getPaytmHost = () => {
  return PAYTM_ENVIRONMENT === 'production'
    ? 'https://securegw.paytm.in'
    : 'https://securegw-stage.paytm.in';
};

export const generateChecksum = (params: Record<string, string>, merchantKey: string): string => {
  const sortedParams = Object.keys(params)
    .sort()
    .map(key => `${key}=${params[key]}`)
    .join('|');
  
  const salt = crypto.randomBytes(4).toString('hex');
  const hash = crypto.createHmac('sha256', merchantKey)
    .update(sortedParams + '|' + salt)
    .digest('hex');
  
  const checksumWithSalt = hash + salt;
  const base64Checksum = Buffer.from(checksumWithSalt, 'hex').toString('base64');
  
  return base64Checksum;
};

export const verifyChecksum = (params: Record<string, string>, checksum: string, merchantKey: string): boolean => {
  try {
    const receivedChecksum = Buffer.from(checksum, 'base64').toString('hex');
    const salt = receivedChecksum.slice(-8);
    const receivedHash = receivedChecksum.slice(0, -8);
    
    const sortedParams = Object.keys(params)
      .filter(key => key !== 'CHECKSUMHASH')
      .sort()
      .map(key => `${key}=${params[key]}`)
      .join('|');
    
    const calculatedHash = crypto.createHmac('sha256', merchantKey)
      .update(sortedParams + '|' + salt)
      .digest('hex');
    
    return receivedHash === calculatedHash;
  } catch {
    return false;
  }
};

export const paytmConfig = {
  merchantId: PAYTM_MERCHANT_ID,
  merchantKey: PAYTM_MERCHANT_KEY,
  website: PAYTM_WEBSITE,
  environment: PAYTM_ENVIRONMENT,
};
