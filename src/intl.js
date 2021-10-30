import { createIntl } from 'react-intl'

import messages_en from 'languages/en'
import messages_sk from 'languages/sk'

export const DEFAULT_LANGUAGE = 'en'
export const messages = { sk: messages_sk, en: messages_en }

const createTranslator = (locale, localeMessages) => {
	const intl = createIntl({ locale, messages: localeMessages })

	return intl
}

export const enTranslator = createTranslator('en', messages_en)
