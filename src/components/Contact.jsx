import { useRef, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { CircleCheck, Clock, LoaderCircle, Mail, Phone, Send } from 'lucide-react';
import { CONTACT, MAX_GUESTS, MIN_NIGHTS } from '../data/apartment.js';
import { formatEuro } from '../utils/format.js';
import { FIELD_ORDER, sendInquiry, validateInquiry } from '../utils/inquiry.js';
import { addDays, estimateStay, parseDate, startOfToday, toInputDate } from '../utils/stay.js';
import SectionHead from './SectionHead.jsx';

const EMPTY_FORM = {
  name: '',
  email: '',
  phone: '',
  arrival: '',
  departure: '',
  guests: '2',
  message: '',
  'bot-field': '', // honeypot for spam bots, hidden from real users
};

/** Picking an arrival prefills the minimum stay when departure is empty or not after it. */
function applyChange(previous, name, value) {
  const next = { ...previous, [name]: value };
  if (name === 'arrival') {
    const arrival = parseDate(value);
    const departure = parseDate(previous.departure);
    if (arrival && (!departure || departure <= arrival)) {
      next.departure = toInputDate(addDays(arrival, MIN_NIGHTS));
    }
  }
  return next;
}

export default function Contact() {
  return (
    <section className="section contact" id="inquiry" aria-labelledby="inquiry-title">
      <div className="container contact__layout">
        <div className="contact__intro">
          <SectionHead
            eyebrow="contact.eyebrow"
            title="contact.title"
            lead="contact.lead"
            titleId="inquiry-title"
          />
          <ul className="contact-details">
            <li>
              <span className="contact-details__icon">
                <Phone size={20} aria-hidden="true" />
              </span>
              <span>
                <small>
                  <FormattedMessage id="contact.phone" />
                </small>
                <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
              </span>
            </li>
            <li>
              <span className="contact-details__icon">
                <Mail size={20} aria-hidden="true" />
              </span>
              <span>
                <small>
                  <FormattedMessage id="contact.email" />
                </small>
                <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
              </span>
            </li>
            <li>
              <span className="contact-details__icon">
                <Clock size={20} aria-hidden="true" />
              </span>
              <span>
                <small>
                  <FormattedMessage id="contact.response" />
                </small>
                <strong>
                  <FormattedMessage id="contact.responseValue" />
                </strong>
              </span>
            </li>
          </ul>
        </div>

        <InquiryForm />
      </div>
    </section>
  );
}

function InquiryForm() {
  const intl = useIntl();
  const formRef = useRef(null);
  const [values, setValues] = useState(EMPTY_FORM);
  const [attempted, setAttempted] = useState(false);
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  const today = startOfToday();
  // Errors appear only after the first submit attempt, then update live as the guest types.
  const errors = attempted ? validateInquiry(values, today) : {};
  const estimate = estimateStay(values.arrival, values.departure);
  const arrivalDate = parseDate(values.arrival) ?? today;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((previous) => applyChange(previous, name, value));
  };

  const fieldProps = (name) => ({
    id: `field-${name}`,
    name,
    value: values[name],
    onChange: handleChange,
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? `error-${name}` : undefined,
  });

  async function handleSubmit(event) {
    event.preventDefault();
    setAttempted(true);

    const found = validateInquiry(values, today);
    const firstInvalid = FIELD_ORDER.find((field) => found[field]);
    if (firstInvalid) {
      formRef.current.elements.namedItem(firstInvalid)?.focus();
      return;
    }

    setStatus('sending');
    try {
      await sendInquiry({ ...values, total: estimate ? formatEuro(intl, estimate.total) : '' });
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  }

  function reset() {
    setValues(EMPTY_FORM);
    setAttempted(false);
    setStatus('idle');
  }

  if (status === 'sent') {
    return (
      <div className="form-card success" role="status">
        <CircleCheck className="success__icon" size={52} aria-hidden="true" />
        <h3>
          <FormattedMessage
            id="success.title"
            values={{ name: values.name.trim().split(/\s+/)[0] }}
          />
        </h3>
        <p>
          <FormattedMessage
            id="success.text"
            values={{ email: <strong>{values.email.trim()}</strong> }}
          />
        </p>
        <button type="button" className="btn btn--primary" onClick={reset}>
          <FormattedMessage id="success.again" />
        </button>
      </div>
    );
  }

  return (
    <form ref={formRef} className="form-card" onSubmit={handleSubmit} noValidate>
      <div className="form-grid">
        <Field name="name" label="form.name" error={errors.name} full>
          <input {...fieldProps('name')} type="text" autoComplete="name" required />
        </Field>
        <Field name="email" label="form.email" error={errors.email}>
          <input {...fieldProps('email')} type="email" autoComplete="email" required />
        </Field>
        <Field name="phone" label="form.phone">
          <input {...fieldProps('phone')} type="tel" autoComplete="tel" />
        </Field>
        <Field name="arrival" label="form.arrival" error={errors.arrival}>
          <input {...fieldProps('arrival')} type="date" min={toInputDate(today)} required />
        </Field>
        <Field name="departure" label="form.departure" error={errors.departure}>
          <input
            {...fieldProps('departure')}
            type="date"
            min={toInputDate(addDays(arrivalDate, MIN_NIGHTS))}
            required
          />
        </Field>
        <Field name="guests" label="form.guests" full>
          <select {...fieldProps('guests')}>
            {Array.from({ length: MAX_GUESTS }, (_, index) => index + 1).map((count) => (
              <option key={count} value={count}>
                {intl.formatMessage({ id: 'form.guestsOption' }, { count })}
              </option>
            ))}
          </select>
        </Field>
        <Field name="message" label="form.message" full>
          <textarea
            {...fieldProps('message')}
            rows={4}
            placeholder={intl.formatMessage({ id: 'form.messagePlaceholder' })}
          />
        </Field>

        <div className="honeypot" aria-hidden="true">
          <label>
            <FormattedMessage id="form.honeypot" />
            <input {...fieldProps('bot-field')} tabIndex={-1} autoComplete="off" />
          </label>
        </div>

        <Estimate estimate={estimate} />

        {status === 'error' && (
          <p className="form-alert field--full" role="alert">
            <FormattedMessage id="error.send" />
          </p>
        )}

        <button
          type="submit"
          className="btn btn--accent btn--block field--full"
          disabled={status === 'sending'}
        >
          {status === 'sending' ? (
            <>
              <LoaderCircle className="spin" size={18} aria-hidden="true" />
              <FormattedMessage id="form.sending" />
            </>
          ) : (
            <>
              <Send size={18} aria-hidden="true" />
              <FormattedMessage id="form.submit" />
            </>
          )}
        </button>
        <p className="form-hint field--full">
          <FormattedMessage id="form.hint" />
        </p>
      </div>
    </form>
  );
}

function Field({ name, label, error, full = false, children }) {
  return (
    <div className={`field${full ? ' field--full' : ''}${error ? ' has-error' : ''}`}>
      <label htmlFor={`field-${name}`}>
        <FormattedMessage id={label} />
      </label>
      {children}
      {error && (
        <p className="field__error" id={`error-${name}`}>
          <FormattedMessage id={error} values={{ nights: MIN_NIGHTS }} />
        </p>
      )}
    </div>
  );
}

function Estimate({ estimate }) {
  const intl = useIntl();

  return (
    <div className="estimate field--full" aria-live="polite">
      <p className="estimate__title">
        <FormattedMessage id="estimate.title" />
      </p>
      {estimate ? (
        <>
          <ul className="estimate__lines">
            {estimate.lines.map(({ season, nights }) => (
              <li key={season.id}>
                <span>
                  <FormattedMessage id={`season.${season.id}`} />
                  {' · '}
                  <FormattedMessage id="estimate.nights" values={{ nights }} />
                  {' × '}
                  {formatEuro(intl, season.price)}
                </span>
                <span>{formatEuro(intl, nights * season.price)}</span>
              </li>
            ))}
          </ul>
          <p className="estimate__total">
            <span>
              <FormattedMessage id="estimate.total" values={{ nights: estimate.nights }} />
            </span>
            <strong>{formatEuro(intl, estimate.total)}</strong>
          </p>
          <p className="estimate__note">
            <FormattedMessage id="estimate.note" />
          </p>
        </>
      ) : (
        <p className="estimate__empty">
          <FormattedMessage id="estimate.empty" />
        </p>
      )}
    </div>
  );
}
