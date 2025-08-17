import { defineRouting } from 'next-intl/routing';
import {
  DEFAULT_LANGUAGE,
  SUPPORTED_LANGUAGES,
} from '@/constants/configCommon';

export const routing = defineRouting({
  locales: SUPPORTED_LANGUAGES,
  defaultLocale: DEFAULT_LANGUAGE,
});
