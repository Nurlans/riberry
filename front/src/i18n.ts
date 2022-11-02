import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import translationAz from './locale/az/translation.json'
import translationEn from './locale/en/translation.json'
import translationRu from './locale/ru/translation.json'

i18n
	.use(initReactI18next) // passes i18n down to react-i18next
	.init({
		resources: {
			en: {
				translation: translationEn
			},
			az: {
				translation: translationAz
			},
			ru: {
				translation: translationRu
			}
		},
		lng: 'en',
		fallbackLng: 'en',
		nsSeparator: ':::',
		keySeparator: '::',
		interpolation: {
			escapeValue: false
		}
	})
