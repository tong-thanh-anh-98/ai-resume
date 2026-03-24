import { APP_TEXT } from "../constants/appText";

const DEFAULT_LANG = "vi";

export const useText = (section) => {

  const lang = DEFAULT_LANG;

  return section ? APP_TEXT[lang][section] : APP_TEXT[lang];
};