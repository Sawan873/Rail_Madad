import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en/translation.json';
import hi from './locales/hi/translation.json';
import ur from './locales/ur/translation.json';
import gu from './locales/gu/translation.json';
import mr from './locales/mr/translation.json';

const resources = {
  en: { translation: en },
  hi: { translation: hi },
  ur: { translation: ur },
  gu: { translation: gu },
  mr: { translation: mr }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // React already escapes by default
    }
  });

i18n.on('languageChanged', (lng) => {
  if (lng === 'ur') {
    document.documentElement.dir = 'rtl';
    document.documentElement.lang = 'ur';
    document.body.style.fontFamily = "'Noto Nastaliq Urdu', serif";
  } else {
    document.documentElement.dir = 'ltr';
    document.documentElement.lang = lng;
    document.body.style.fontFamily = "'Noto Sans', sans-serif";
  }
});

export default i18n;
