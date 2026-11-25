import { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Images } from 'lucide-react';
import { PHOTOS, photoSrcSet, photoUrl } from '../data/apartment.js';
import Lightbox from './Lightbox.jsx';
import SectionHead from './SectionHead.jsx';

const VISIBLE_COUNT = 5;

export default function Gallery() {
  const intl = useIntl();
  const [openIndex, setOpenIndex] = useState(null);
  const hiddenCount = PHOTOS.length - VISIBLE_COUNT;

  return (
    <section className="section section--alt" id="gallery" aria-labelledby="gallery-title">
      <div className="container">
        <SectionHead
          eyebrow="gallery.eyebrow"
          title="gallery.title"
          lead="gallery.lead"
          titleId="gallery-title"
        />

        <ul className="gallery">
          {PHOTOS.slice(0, VISIBLE_COUNT).map((photo, index) => {
            const name = intl.formatMessage({ id: photo.name });
            const showMore = index === VISIBLE_COUNT - 1 && hiddenCount > 0;
            return (
              <li className="gallery__item" key={photo.id}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(index)}
                  aria-label={intl.formatMessage({ id: 'gallery.open' }, { name })}
                >
                  <img
                    src={photoUrl(photo.id, 800)}
                    srcSet={photoSrcSet(photo.id, [480, 800, 1200])}
                    sizes={
                      index === 0
                        ? '(min-width: 900px) 50vw, 100vw'
                        : '(min-width: 900px) 25vw, 50vw'
                    }
                    alt=""
                    loading="lazy"
                  />
                  {showMore ? (
                    <span className="gallery__more">
                      <Images size={20} aria-hidden="true" />
                      <FormattedMessage id="gallery.more" values={{ count: hiddenCount }} />
                    </span>
                  ) : (
                    <span className="gallery__label">{name}</span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <Lightbox
        photos={PHOTOS}
        index={openIndex}
        onChange={setOpenIndex}
        onClose={() => setOpenIndex(null)}
      />
    </section>
  );
}
