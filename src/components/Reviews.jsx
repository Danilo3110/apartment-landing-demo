import { FormattedDate, FormattedMessage, useIntl } from 'react-intl';
import { Quote } from 'lucide-react';
import { RATING, REVIEWS } from '../data/apartment.js';
import { formatRating } from '../utils/format.js';
import { parseDate } from '../utils/stay.js';
import SectionHead from './SectionHead.jsx';
import Stars from './Stars.jsx';

export default function Reviews() {
  const intl = useIntl();

  return (
    <section className="section section--alt" id="reviews" aria-labelledby="reviews-title">
      <div className="container">
        <div className="reviews__head">
          <SectionHead eyebrow="reviews.eyebrow" title="reviews.title" titleId="reviews-title" />
          <div className="score">
            <strong className="score__value">{formatRating(intl, RATING.score)}</strong>
            <span className="score__meta">
              <Stars rating={RATING.score} size={18} />
              <span>
                <FormattedMessage id="reviews.basedOn" values={{ count: RATING.count }} />
              </span>
            </span>
          </div>
        </div>

        <ul className="review-list">
          {REVIEWS.map((review) => (
            <li className="review" key={review.id}>
              <Quote className="review__quote" size={28} aria-hidden="true" />
              <blockquote className="review__text">
                <p>
                  <FormattedMessage id={`review.${review.id}.text`} />
                </p>
              </blockquote>
              <div className="review__footer">
                <p className="review__author">
                  <strong>{review.author}</strong>
                  <span>
                    <FormattedMessage id={`review.${review.id}.from`} />
                    {' · '}
                    <FormattedDate value={parseDate(review.date)} month="long" year="numeric" />
                  </span>
                </p>
                <Stars rating={review.rating} size={14} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
