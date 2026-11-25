import { FormattedMessage, useIntl } from 'react-intl';
import { MapPin } from 'lucide-react';
import { MAP_LINK, NEARBY, mapEmbedUrl } from '../data/apartment.js';
import { useLanguage } from '../i18n/LanguageProvider.jsx';
import SectionHead from './SectionHead.jsx';

export default function Location() {
  const intl = useIntl();
  const { language } = useLanguage();

  return (
    <section className="section" id="location" aria-labelledby="location-title">
      <div className="container">
        <SectionHead
          eyebrow="location.eyebrow"
          title="location.title"
          lead="location.lead"
          titleId="location-title"
        />

        <div className="location">
          <div className="map">
            <iframe
              src={mapEmbedUrl(language)}
              title={intl.formatMessage({ id: 'location.mapTitle' })}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>

          <div className="location__side">
            <ul className="nearby">
              {NEARBY.map(({ id, icon: Icon, minutes, mode }) => (
                <li key={id}>
                  <span className="nearby__icon">
                    <Icon size={20} aria-hidden="true" />
                  </span>
                  <span className="nearby__name">
                    <FormattedMessage id={id} />
                  </span>
                  <span className="nearby__time">
                    <FormattedMessage id={`location.${mode}`} values={{ minutes }} />
                  </span>
                </li>
              ))}
            </ul>
            <a className="btn btn--primary" href={MAP_LINK} target="_blank" rel="noreferrer">
              <MapPin size={18} aria-hidden="true" />
              <FormattedMessage id="location.openMaps" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
