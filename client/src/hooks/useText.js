import { languages } from '../i18n';

const DEFAULT_LANG = 'vi';

export const useText = (namespace, langOverride) => {
  const lang = langOverride || DEFAULT_LANG;

  return languages[lang]?.[namespace] || {};
};