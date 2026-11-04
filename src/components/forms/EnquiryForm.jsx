import { useState } from 'react';
import { ArrowRight, CheckCircle2, Loader2, Send } from 'lucide-react';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/utils';

/**
 * FORMSPREE / EMAILJS SETUP
 * 1. Create a form at https://formspree.io (or an EmailJS service).
 * 2. Paste the full endpoint below, e.g. 'https://formspree.io/f/xxxxxxxx'.
 * 3. Leave it blank to use the built-in demo success state.
 */
const FORM_ENDPOINT = '';

const initialValues = {
  name: '',
  email: '',
  phone: '',
  travelDate: '',
  travellers: '2 Adults',
  trip: '',
  message: '',
};

export default function EnquiryForm({ defaultTrip = '', className, title = 'Start planning' }) {
  const [values, setValues] = useState({ ...initialValues, trip: defaultTrip });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');

  function update(field, value) {
    setValues((current) => ({ ...current, [field]: value }));
    if (errors[field]) setErrors((current) => ({ ...current, [field]: '' }));
  }

  function validate() {
    const next = {};
    if (values.name.trim().length < 2) next.name = 'Please tell us your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) next.email = 'Enter a valid email address.';
    if (!/^[0-9+\-\s()]{8,15}$/.test(values.phone)) next.phone = 'Enter a valid phone number.';
    if (values.message.trim().length < 10) next.message = 'A little more detail helps us plan better.';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!validate()) return;

    setStatus('submitting');
    try {
      if (FORM_ENDPOINT) {
        const response = await fetch(FORM_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(values),
        });
        if (!response.ok) throw new Error('Submission failed');
      } else {
        await new Promise((resolve) => window.setTimeout(resolve, 700));
      }
      setStatus('success');
      setValues({ ...initialValues, trip: defaultTrip });
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className={cn('flex min-h-80 flex-col items-center justify-center rounded-2xl border border-teal/20 bg-teal-50 p-8 text-center', className)}>
        <span className="flex size-14 items-center justify-center rounded-full bg-teal text-white">
          <CheckCircle2 size={26} />
        </span>
        <h3 className="mt-5 font-display text-3xl text-navy">Your note is with us.</h3>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-navy-500">
          A trip designer will reply within one working day. If your dates are close, call us on the number below and we’ll pick up.
        </p>
        <Button href="tel:+919876543210" variant="dark" className="mt-6" size="sm">
          Call the team
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={cn('space-y-4', className)} noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="enquiry-name" className="mb-1.5 block text-xs font-semibold text-navy">
            Full name *
          </label>
          <input
            id="enquiry-name"
            value={values.name}
            onChange={(event) => update('name', event.target.value)}
            placeholder="Your name"
            autoComplete="name"
            className={cn(
              'min-h-11 w-full rounded-xl border bg-white px-4 text-sm text-navy placeholder:text-navy-300 focus:outline-none',
              errors.name ? 'border-red-400' : 'border-navy/10 focus:border-gold',
            )}
            aria-invalid={Boolean(errors.name)}
          />
          {errors.name ? <p className="mt-1 text-[0.68rem] text-red-600">{errors.name}</p> : null}
        </div>
        <div>
          <label htmlFor="enquiry-phone" className="mb-1.5 block text-xs font-semibold text-navy">
            Phone / WhatsApp *
          </label>
          <input
            id="enquiry-phone"
            type="tel"
            value={values.phone}
            onChange={(event) => update('phone', event.target.value)}
            placeholder="+91 98765 43210"
            autoComplete="tel"
            className={cn(
              'min-h-11 w-full rounded-xl border bg-white px-4 text-sm text-navy placeholder:text-navy-300 focus:outline-none',
              errors.phone ? 'border-red-400' : 'border-navy/10 focus:border-gold',
            )}
            aria-invalid={Boolean(errors.phone)}
          />
          {errors.phone ? <p className="mt-1 text-[0.68rem] text-red-600">{errors.phone}</p> : null}
        </div>
      </div>

      <div>
        <label htmlFor="enquiry-email" className="mb-1.5 block text-xs font-semibold text-navy">
          Email address *
        </label>
        <input
          id="enquiry-email"
          type="email"
          value={values.email}
          onChange={(event) => update('email', event.target.value)}
          placeholder="you@example.com"
          autoComplete="email"
          className={cn(
            'min-h-11 w-full rounded-xl border bg-white px-4 text-sm text-navy placeholder:text-navy-300 focus:outline-none',
            errors.email ? 'border-red-400' : 'border-navy/10 focus:border-gold',
          )}
          aria-invalid={Boolean(errors.email)}
        />
        {errors.email ? <p className="mt-1 text-[0.68rem] text-red-600">{errors.email}</p> : null}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="enquiry-date" className="mb-1.5 block text-xs font-semibold text-navy">
            Approximate travel date
          </label>
          <input
            id="enquiry-date"
            type="date"
            value={values.travelDate}
            onChange={(event) => update('travelDate', event.target.value)}
            className="min-h-11 w-full rounded-xl border border-navy/10 bg-white px-4 text-sm text-navy focus:border-gold focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="enquiry-travellers" className="mb-1.5 block text-xs font-semibold text-navy">
            Travellers
          </label>
          <select
            id="enquiry-travellers"
            value={values.travellers}
            onChange={(event) => update('travellers', event.target.value)}
            className="min-h-11 w-full rounded-xl border border-navy/10 bg-white px-4 text-sm text-navy focus:border-gold focus:outline-none"
          >
            <option>1 Adult</option>
            <option>2 Adults</option>
            <option>2 Adults, 1 Child</option>
            <option>Family (4–6)</option>
            <option>Group (7+)</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="enquiry-trip" className="mb-1.5 block text-xs font-semibold text-navy">
          Trip or destination
        </label>
        <input
          id="enquiry-trip"
          value={values.trip}
          onChange={(event) => update('trip', event.target.value)}
          placeholder="e.g. Kashmir honeymoon, 6 nights"
          className="min-h-11 w-full rounded-xl border border-navy/10 bg-white px-4 text-sm text-navy placeholder:text-navy-300 focus:border-gold focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="enquiry-message" className="mb-1.5 block text-xs font-semibold text-navy">
          Tell us a little about the trip *
        </label>
        <textarea
          id="enquiry-message"
          rows={4}
          value={values.message}
          onChange={(event) => update('message', event.target.value)}
          placeholder="Dates, budget, who’s travelling, anything you already know…"
          className={cn(
            'w-full resize-none rounded-xl border bg-white px-4 py-3 text-sm text-navy placeholder:text-navy-300 focus:outline-none',
            errors.message ? 'border-red-400' : 'border-navy/10 focus:border-gold',
          )}
          aria-invalid={Boolean(errors.message)}
        />
        {errors.message ? <p className="mt-1 text-[0.68rem] text-red-600">{errors.message}</p> : null}
      </div>

      {status === 'error' ? (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-xs text-red-700">
          Something went wrong. Please try again or WhatsApp us directly.
        </p>
      ) : null}

      <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[0.68rem] text-navy-400">We reply within one working day. No spam, ever.</p>
        <Button type="submit" disabled={status === 'submitting'} className="w-full sm:w-auto">
          {status === 'submitting' ? (
            <>
              <Loader2 size={16} className="animate-spin" /> Sending
            </>
          ) : (
            <>
              Send enquiry <Send size={15} />
            </>
          )}
        </Button>
      </div>
      {!FORM_ENDPOINT ? (
        <p className="flex items-center gap-1.5 text-[0.62rem] text-navy-300">
          <ArrowRight size={11} /> Demo mode: add your Formspree endpoint in EnquiryForm.jsx to receive live enquiries.
        </p>
      ) : null}
    </form>
  );
}
