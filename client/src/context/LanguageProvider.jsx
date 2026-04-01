import React, { createContext, useContext, useEffect, useState } from 'react';

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('lang') || 'en';
  });

  const changeLanguage = (newLang) => {
    setLang(newLang);
    localStorage.setItem('lang', newLang);
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

// helper hook (optional)
export const useLanguage = () => useContext(LanguageContext);