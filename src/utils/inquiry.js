import { MIN_NIGHTS } from '../data/apartment.js';
import { nightsBetween, parseDate } from './stay.js';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Fields in form order, so focus can move to the first invalid one.
export const FIELD_ORDER = ['name', 'email', 'arrival', 'departure'];

/** Returns { fieldName: errorMessageKey } for invalid fields; an empty object means valid. */
export function validateInquiry(values, today) {
  const errors = {};
  if (values.name.trim().length < 2) errors.name = 'error.name';
  if (!EMAIL_PATTERN.test(values.email.trim())) errors.email = 'error.email';

  const arrival = parseDate(values.arrival);
  const departure = parseDate(values.departure);
  if (!arrival || arrival < today) errors.arrival = 'error.arrival';

  if (!departure || (arrival && departure <= arrival)) {
    errors.departure = 'error.departure';
  } else if (arrival && nightsBetween(arrival, departure) < MIN_NIGHTS) {
    errors.departure = 'error.minNights';
  }
  return errors;
}

const USE_NETLIFY_FORMS = import.meta.env.VITE_NETLIFY_FORMS === 'true';

/**
 * On Netlify, submits the inquiry through Netlify Forms, which emails it to the owner.
 * Locally and on GitHub Pages it runs in demo mode and only simulates sending.
 */
export async function sendInquiry(fields) {
  if (!USE_NETLIFY_FORMS) {
    await new Promise((resolve) => setTimeout(resolve, 800));
    return;
  }

  const response = await fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ 'form-name': 'inquiry', ...fields }).toString(),
  });
  if (!response.ok) throw new Error(`Failed to send inquiry (${response.status})`);
}
