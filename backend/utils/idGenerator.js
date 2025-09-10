import crypto from 'crypto';

/**
 * Generate a unique product ID
 * Format: PRD-{timestamp}-{random}
 */
export const generateProductId = () => {
  const timestamp = Date.now().toString(36);
  const random = crypto.randomBytes(4).toString('hex');
  return `PRD-${timestamp}-${random}`.toUpperCase();
};

/**
 * Generate a unique order ID
 * Format: ORD-{timestamp}-{random}
 */
export const generateOrderId = () => {
  const timestamp = Date.now().toString(36);
  const random = crypto.randomBytes(4).toString('hex');
  return `ORD-${timestamp}-${random}`.toUpperCase();
};

/**
 * Generate a unique cart ID
 * Format: CRT-{timestamp}-{random}
 */
export const generateCartId = () => {
  const timestamp = Date.now().toString(36);
  const random = crypto.randomBytes(4).toString('hex');
  return `CRT-${timestamp}-${random}`.toUpperCase();
};

/**
 * Generate a unique user ID
 * Format: USR-{timestamp}-{random}
 */
export const generateUserId = () => {
  const timestamp = Date.now().toString(36);
  const random = crypto.randomBytes(4).toString('hex');
  return `USR-${timestamp}-${random}`.toUpperCase();
};

/**
 * Generate a unique transaction ID
 * Format: TXN-{timestamp}-{random}
 */
export const generateTransactionId = () => {
  const timestamp = Date.now().toString(36);
  const random = crypto.randomBytes(6).toString('hex');
  return `TXN-${timestamp}-${random}`.toUpperCase();
};

/**
 * Generate a unique tracking number
 * Format: TRK-{timestamp}-{random}
 */
export const generateTrackingNumber = () => {
  const timestamp = Date.now().toString(36);
  const random = crypto.randomBytes(4).toString('hex');
  return `TRK-${timestamp}-${random}`.toUpperCase();
};

/**
 * Generate a unique invoice number
 * Format: INV-{YYYYMMDD}-{sequence}
 */
export const generateInvoiceNumber = (sequence = 1) => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const sequenceStr = String(sequence).padStart(4, '0');
  return `INV-${year}${month}${day}-${sequenceStr}`;
};

/**
 * Generate a unique SKU for products
 * Format: {CATEGORY}-{SUBCATEGORY}-{SIZE}-{COLOR}-{RANDOM}
 */
export const generateSKU = (category, subcategory, size = 'M', color = 'DEF') => {
  const cat = category.substring(0, 3).toUpperCase();
  const subcat = subcategory.substring(0, 3).toUpperCase();
  const random = crypto.randomBytes(2).toString('hex').toUpperCase();
  return `${cat}-${subcat}-${size}-${color}-${random}`;
};

/**
 * Validate ID format
 */
export const validateIdFormat = (id, type) => {
  const patterns = {
    product: /^PRD-[A-Z0-9]+-[A-Z0-9]+$/,
    order: /^ORD-[A-Z0-9]+-[A-Z0-9]+$/,
    cart: /^CRT-[A-Z0-9]+-[A-Z0-9]+$/,
    user: /^USR-[A-Z0-9]+-[A-Z0-9]+$/,
    transaction: /^TXN-[A-Z0-9]+-[A-Z0-9]+$/,
    tracking: /^TRK-[A-Z0-9]+-[A-Z0-9]+$/,
    invoice: /^INV-\d{8}-\d{4}$/
  };
  
  return patterns[type] ? patterns[type].test(id) : false;
};

/**
 * Extract timestamp from ID
 */
export const extractTimestampFromId = (id) => {
  const parts = id.split('-');
  if (parts.length >= 2) {
    return parseInt(parts[1], 36);
  }
  return null;
};

/**
 * Check if ID is expired (older than specified days)
 */
export const isIdExpired = (id, days = 30) => {
  const timestamp = extractTimestampFromId(id);
  if (!timestamp) return true;
  
  const now = Date.now();
  const expirationTime = days * 24 * 60 * 60 * 1000; // Convert days to milliseconds
  
  return (now - timestamp) > expirationTime;
};

