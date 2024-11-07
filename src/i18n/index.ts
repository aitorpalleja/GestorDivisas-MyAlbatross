import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import * as RNLocalize from 'react-native-localize';
import en from './locales/en.json';
import es from './locales/es.json';

const deviceLanguage = RNLocalize.getLocales()[0].languageTag.startsWith('es')
  ? 'es'
  : 'en';

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources: {
    en: {translation: en},
    es: {translation: es},
  },
  lng: deviceLanguage,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
