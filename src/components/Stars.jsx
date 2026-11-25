import { useIntl } from 'react-intl';
import { Star } from 'lucide-react';
import { formatRating } from '../utils/format.js';

export default function Stars({ rating, size = 16 }) {
  const intl = useIntl();
  const label = intl.formatMessage({ id: 'stars.label' }, { rating: formatRating(intl, rating) });

  return (
    <span className="stars" role="img" aria-label={label}>
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          size={size}
          aria-hidden="true"
          className={index < Math.round(rating) ? 'stars__on' : 'stars__off'}
        />
      ))}
    </span>
  );
}
