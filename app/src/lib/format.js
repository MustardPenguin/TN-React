const rupees = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});
const number = new Intl.NumberFormat('en-IN');
const upTo2dp = new Intl.NumberFormat('en-IN', { maximumFractionDigits: 2 });

const CRORE = 1e7;
const LAKH = 1e5;

/** Indian-style price: ₹1.85 Cr, ₹85 L, or ₹38,000 below a lakh. */
export function formatPrice(amount) {
  if (amount >= CRORE) return `₹${upTo2dp.format(amount / CRORE)} Cr`;
  if (amount >= LAKH) return `₹${upTo2dp.format(amount / LAKH)} L`;
  return rupees.format(amount);
}
export const formatNumber = (value) => number.format(value);

/** "url(photo), gradient" background with the gradient as a load fallback. */
export const backgroundImage = (image, fallback) =>
  `background-image:url('${image}'), ${fallback}`;
