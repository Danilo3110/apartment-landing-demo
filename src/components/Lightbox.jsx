import { useEffect, useRef } from 'react';
import { useIntl } from 'react-intl';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { photoSrcSet, photoUrl } from '../data/apartment.js';

/**
 * Fullscreen gallery built on the native <dialog>, so the browser handles
 * closing on Esc, trapping focus and restoring it after close.
 */
export default function Lightbox({ photos, index, onChange, onClose }) {
  const intl = useIntl();
  const dialogRef = useRef(null);
  const isOpen = index !== null;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (isOpen && !dialog.open) dialog.showModal();
    if (!isOpen && dialog.open) dialog.close();
  }, [isOpen]);

  const close = () => dialogRef.current.close();
  const go = (step) => onChange((index + step + photos.length) % photos.length);

  function handleKeyDown(event) {
    if (event.key === 'ArrowRight') go(1);
    if (event.key === 'ArrowLeft') go(-1);
  }

  const photo = isOpen ? photos[index] : null;
  const name = photo ? intl.formatMessage({ id: photo.name }) : '';

  return (
    <dialog
      ref={dialogRef}
      className="lightbox"
      aria-label={name}
      onClose={onClose}
      onKeyDown={isOpen ? handleKeyDown : undefined}
    >
      {photo && (
        <div className="lightbox__inner">
          <div className="lightbox__top">
            <p className="lightbox__caption">
              {name}
              <span className="lightbox__count">
                {index + 1} / {photos.length}
              </span>
            </p>
            <button
              type="button"
              className="lightbox__btn"
              onClick={close}
              aria-label={intl.formatMessage({ id: 'gallery.close' })}
            >
              <X size={22} aria-hidden="true" />
            </button>
          </div>

          {/* The background is the smaller version already loaded by the grid, so the photo
              shows instantly and the sharp version replaces it once it loads. */}
          <figure
            className="lightbox__figure"
            style={{ backgroundImage: `url(${photoUrl(photo.id, 800)})` }}
          >
            <img
              key={photo.id}
              src={photoUrl(photo.id, 1600)}
              srcSet={photoSrcSet(photo.id, [960, 1600, 2400])}
              sizes="100vw"
              alt={name}
            />
          </figure>

          <button
            type="button"
            className="lightbox__btn lightbox__nav lightbox__nav--prev"
            onClick={() => go(-1)}
            aria-label={intl.formatMessage({ id: 'gallery.prev' })}
          >
            <ChevronLeft size={26} aria-hidden="true" />
          </button>
          <button
            type="button"
            className="lightbox__btn lightbox__nav lightbox__nav--next"
            onClick={() => go(1)}
            aria-label={intl.formatMessage({ id: 'gallery.next' })}
          >
            <ChevronRight size={26} aria-hidden="true" />
          </button>
        </div>
      )}
    </dialog>
  );
}
