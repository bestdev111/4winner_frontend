import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
    fallbackLng: 'en_US',
    lng: 'en_US',
    resources: {
        en_US: {
            translations: require('./locales/en_trans.json')
        },
        tr_TR: {
            translations: require('./locales/tr_trans.json')
        },
    },
    ns: ['translations'],
    defaultNS: 'translations'
});

i18n.languages = ['en_US', 'tr_TR'];

export default i18n;