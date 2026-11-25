import { FormattedMessage, useIntl } from 'react-intl';
import { BedDouble, Footprints, MapPin, Maximize, Star, Users } from 'lucide-react';
import { HERO_PHOTO, RATING, photoSrcSet, photoUrl } from '../data/apartment.js';
import { formatRating } from '../utils/format.js';

const FACTS = [
  { icon: Maximize, value: '45 m²', label: 'facts.size' },
  { icon: Users, value: '2–4', label: 'facts.guests' },
  { icon: BedDouble, value: '1', label: 'facts.bedroom' },
  { icon: Footprints, value: '5 min', label: 'facts.center' },
];

export default function Hero() {
  const intl = useIntl();

  return (
    <>
      <section className="hero" id="top">
        <div className="hero__media">
          <img
            src={photoUrl(HERO_PHOTO, 1600)}
            srcSet={photoSrcSet(HERO_PHOTO)}
            sizes="100vw"
            alt={intl.formatMessage({ id: 'hero.photoAlt' })}
            fetchPriority="high"
          />
        </div>

        <div className="container hero__content">
          <p className="hero__eyebrow">
            <MapPin size={16} aria-hidden="true" />
            <FormattedMessage id="hero.eyebrow" />
          </p>
          <h1 className="hero__title">
            <FormattedMessage id="hero.title" />
          </h1>
          <p className="hero__text">
            <FormattedMessage id="hero.text" />
          </p>
          <div className="hero__actions">
            <a className="btn btn--accent" href="#inquiry">
              <FormattedMessage id="hero.cta" />
            </a>
            <a className="btn btn--outline-light" href="#gallery">
              <FormattedMessage id="hero.gallery" />
            </a>
          </div>
          <p className="hero__rating">
            <Star size={16} aria-hidden="true" className="stars__on" />
            <FormattedMessage
              id="hero.rating"
              values={{ rating: formatRating(intl, RATING.score), count: RATING.count }}
            />
          </p>
        </div>
      </section>

      <div className="container facts">
        <ul className="facts__list">
          {FACTS.map(({ icon: Icon, value, label }) => (
            <li key={label}>
              <span className="facts__icon">
                <Icon size={20} aria-hidden="true" />
              </span>
              <span>
                <strong className="facts__value">{value}</strong>
                <span className="facts__label">
                  <FormattedMessage id={label} />
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
