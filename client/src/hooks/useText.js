import { languages } from '../i18n';

const DEFAULT_LANG = 'vi';
const FALLBACK_LANG = 'en';
// contrary 
// const DEFAULT_LANG = 'en';
// const FALLBACK_LANG = 'vi';

export const useText = (namespace, langOverride) => {
  const lang =
    langOverride ||
    localStorage.getItem('lang') ||
    DEFAULT_LANG;

  const translations =
    languages[lang]?.[namespace] ||
    languages[FALLBACK_LANG]?.[namespace] ||
    {};

  /**
   * Hàm nội suy biến động, ví dụ:
   * format('experienceLabel', { number: 1 })
   */
  const format = (key, params = {}) => {
    let text =
      translations[key] ??
      languages[FALLBACK_LANG]?.[namespace]?.[key] ??
      key;

    Object.keys(params).forEach((param) => {
      text = text.replace(
        new RegExp(`{${param}}`, 'g'),
        params[param]
      );
    });

    return text;
  };

  return { ...translations, format, lang };
};