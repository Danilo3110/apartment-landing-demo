import { FormattedMessage, useIntl } from 'react-intl';
import { Check } from 'lucide-react';
import { MIN_NIGHTS, SEASONS } from '../data/apartment.js';
import { formatEuro } from '../utils/format.js';
import { seasonOf } from '../utils/stay.js';
import SectionHead from './SectionHead.jsx';

const NOTES = [
  'prices.note.minNights',
  'prices.note.checkin',
  'prices.note.included',
  'prices.note.pets',
];

export default function Prices() {
  const intl = useIntl();
  const currentSeasonId = seasonOf(new Date()).id;

  return (
    <section className="section" id="prices" aria-labelledby="prices-title">
      <div className="container">
        <SectionHead
          eyebrow="prices.eyebrow"
          title="prices.title"
          lead="prices.lead"
          titleId="prices-title"
        />

        <ul className="seasons">
          {SEASONS.map((season) => {
            const isCurrent = season.id === currentSeasonId;
            return (
              <li key={season.id} className={`season${isCurrent ? ' is-current' : ''}`}>
                {isCurrent && (
                  <span className="season__badge">
                    <FormattedMessage id="prices.current" />
                  </span>
                )}
                <h3 className="season__name">
                  <FormattedMessage id={`season.${season.id}`} />
                </h3>
                <p className="season__months">
                  <FormattedMessage id={`season.${season.id}.months`} />
                </p>
                <p className="season__price">
                  {formatEuro(intl, season.price)}
                  <span>
                    <FormattedMessage id="prices.perNight" />
                  </span>
                </p>
              </li>
            );
          })}
        </ul>

        <ul className="price-notes">
          {NOTES.map((note) => (
            <li key={note}>
              <Check size={18} aria-hidden="true" />
              <FormattedMessage id={note} values={{ nights: MIN_NIGHTS }} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
