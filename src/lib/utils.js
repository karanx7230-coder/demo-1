import { site } from '@/config/site';

/** Join conditional class names without pulling in another dependency. */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

/** Format a price using the currency settings in site.js. */
export function formatCurrency(amount, options = {}) {
  const { symbol, locale, position, maximumFractionDigits } = site.currency;
  const value = Number(amount);

  if (!Number.isFinite(value)) return `${symbol}0`;

  const formatted = new Intl.NumberFormat(locale, {
    maximumFractionDigits,
    minimumFractionDigits: 0,
    ...options,
  }).format(value);

  return position === 'after' ? `${formatted} ${symbol}` : `${symbol}${formatted}`;
}

/** Format dates consistently across package cards, blog posts and itineraries. */
export function formatDate(date, options = {}) {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return '';

  return parsed.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    ...options,
  });
}

export function getInitials(name = '') {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();
}

export function whatsappUrl(message = site.contact.whatsappMessage) {
  return `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(message)}`;
}
