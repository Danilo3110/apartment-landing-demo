import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { IntlProvider } from 'react-intl';
import sr from './sr.js';
import en from './en.js';

export const LANGUAGES = {
  sr: { messages: sr, intlLocale: 'sr-Latn-RS', label: 'SR', name: 'Srpski' },
  en: { messages: en, intlLocale: 'en-GB', label: 'EN', name: 'English' },
};

const STORAGE_KEY = 'apartman-breza:language';
// Visitors whose browser uses a regional language get Serbian, everyone else gets English.
const REGIONAL_LANGUAGES = ['sr', 'hr', 'bs', 'sh', 'cnr'];

function detectLanguage() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && saved in LANGUAGES) return saved;
  } catch {
    // localStorage may be blocked (e.g. private mode); fall back to the browser language.
  }
  const browserLanguage = (navigator.language || '').toLowerCase().split('-')[0];
  return REGIONAL_LANGUAGES.includes(browserLanguage) ? 'sr' : 'en';
}

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(detectLanguage);
  const { messages, intlLocale } = LANGUAGES[language];

  useEffect(() => {
    document.documentElement.lang = intlLocale;
    document.title = messages['meta.title'];
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', messages['meta.description']);
    try {
      localStorage.setItem(STORAGE_KEY, language);
    } catch {
      // The choice just won't be remembered; the site still works.
    }
  }, [language, intlLocale, messages]);

  const value = useMemo(() => ({ language, setLanguage }), [language]);

  return (
    <LanguageContext.Provider value={value}>
      <IntlProvider locale={intlLocale} defaultLocale="sr-Latn-RS" messages={messages}>
        {children}
      </IntlProvider>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within <LanguageProvider>');
  return context;
}
