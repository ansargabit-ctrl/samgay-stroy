import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { translations, type Lang } from '@/data/translations';

const STORAGE_KEY = 'ssg-lang';

interface LangCtx {
  lang: Lang;
  t: (typeof translations)[Lang];
  setLang: (l: Lang) => void;
  splashDone: boolean;
  confirmSplash: () => void;
}

const LangContext = createContext<LangCtx | null>(null);

function readSaved(): Lang | null {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    return v && v in translations ? (v as Lang) : null;
  } catch {
    return null;
  }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  // The intro with the language choice shows only until a language has been saved once.
  const saved = typeof window !== 'undefined' ? readSaved() : null;

  const [lang, setLangState] = useState<Lang>(saved ?? 'en');
  const [splashDone, setSplashDone] = useState(saved !== null);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    try { localStorage.setItem(STORAGE_KEY, l); } catch { /* storage unavailable */ }
  };

  const confirmSplash = () => setSplashDone(true);

  const t = translations[lang];

  return (
    <LangContext.Provider value={{ lang, t, setLang, splashDone, confirmSplash }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang must be used inside LanguageProvider');
  return ctx;
}
