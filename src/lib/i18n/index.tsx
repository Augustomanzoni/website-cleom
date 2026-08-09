import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { uiDictionary } from "./ui";
import catalogEn from "./catalog.en.json";
import catalogEs from "./catalog.es.json";

export type Lang = "pt" | "en" | "es";

export const LANGUAGES: { code: Lang; label: string; short: string; flag: string }[] = [
  { code: "pt", label: "Português", short: "PT", flag: "🇧🇷" },
  { code: "en", label: "Inglês", short: "EN", flag: "🇺🇸" },
  { code: "es", label: "Espanhol", short: "ES", flag: "🇪🇸" },
];

const catalogs: Record<Exclude<Lang, "pt">, Record<string, string>> = {
  en: catalogEn as Record<string, string>,
  es: catalogEs as Record<string, string>,
};

const STORAGE_KEY = "cleom-lang";

export function translate(text: string, lang: Lang): string {
  if (lang === "pt" || !text) return text;
  const ui = uiDictionary[text];
  if (ui) return ui[lang];
  return catalogs[lang][text] ?? text;
}

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (text: string) => string };

const LanguageContext = createContext<Ctx>({ lang: "pt", setLang: () => {}, t: (s) => s });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("pt");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) as Lang | null;
    if (stored && ["pt", "en", "es"].includes(stored)) setLangState(stored);
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    window.localStorage.setItem(STORAGE_KEY, l);
    document.documentElement.lang = l === "pt" ? "pt-BR" : l;
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang === "pt" ? "pt-BR" : lang;
  }, [lang]);

  const t = useCallback((text: string) => translate(text, lang), [lang]);

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useI18n() {
  return useContext(LanguageContext);
}
