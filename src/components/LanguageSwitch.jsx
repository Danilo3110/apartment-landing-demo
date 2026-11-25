import { useIntl } from 'react-intl';
import { LANGUAGES, useLanguage } from '../i18n/LanguageProvider.jsx';

export default function LanguageSwitch() {
  const intl = useIntl();
  const { language, setLanguage } = useLanguage();

  return (
    <div className="lang" role="group" aria-label={intl.formatMessage({ id: 'nav.language' })}>
      {Object.entries(LANGUAGES).map(([code, { label, name }]) => (
        <button
          key={code}
          type="button"
          aria-label={name}
          aria-pressed={language === code}
          onClick={() => setLanguage(code)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
