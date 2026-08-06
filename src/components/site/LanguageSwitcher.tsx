import { useEffect, useState } from "react";
import { Globe, ChevronDown } from "lucide-react";

type Lang = { code: string; label: string; short: string };

const LANGS: Lang[] = [
  { code: "pt", label: "Português", short: "PT" },
  { code: "en", label: "English", short: "ENG" },
  { code: "es", label: "Español", short: "ESP" },
];

const SOURCE = "pt";

function readCookieLang(): string {
  if (typeof document === "undefined") return SOURCE;
  const match = document.cookie.match(/(?:^|;\s*)googtrans=([^;]+)/);
  if (!match) return SOURCE;
  const parts = decodeURIComponent(match[1]).split("/");
  return parts[2] || SOURCE;
}

function setCookieLang(lang: string) {
  const value = `/${SOURCE}/${lang}`;
  const host = window.location.hostname;
  const expires = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toUTCString();
  // clear previous variants
  document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
  document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=.${host}`;
  if (lang !== SOURCE) {
    document.cookie = `googtrans=${value}; expires=${expires}; path=/`;
    document.cookie = `googtrans=${value}; expires=${expires}; path=/; domain=.${host}`;
  }
}

export function LanguageSwitcher({ mobile = false }: { mobile?: boolean }) {
  const [current, setCurrent] = useState(SOURCE);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setCurrent(readCookieLang());

    const w = window as unknown as Record<string, unknown>;
    if (!document.getElementById("google-translate-script")) {
      w["googleTranslateElementInit"] = () => {
        const g = (window as any).google;
        if (g?.translate?.TranslateElement) {
          new g.translate.TranslateElement(
            { pageLanguage: SOURCE, includedLanguages: "pt,en,es", autoDisplay: false },
            "google_translate_element",
          );
        }
      };
      const s = document.createElement("script");
      s.id = "google-translate-script";
      s.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      s.async = true;
      document.body.appendChild(s);
    }
  }, []);

  const change = (code: string) => {
    setOpen(false);
    if (code === current) return;
    setCookieLang(code);
    window.location.reload();
  };

  const active = LANGS.find((l) => l.code === current) ?? LANGS[0];

  return (
    <div className={mobile ? "px-3 py-2" : "relative"}>
      <div id="google_translate_element" className="hidden" />
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Selecionar idioma"
        className="notranslate inline-flex items-center gap-1.5 px-3 py-2 text-sm uppercase tracking-wider text-chrome/80 hover:text-cyan-accent transition-colors"
      >
        <Globe className="w-4 h-4" />
        {active.short}
        <ChevronDown className="w-3.5 h-3.5" />
      </button>
      {open && (
        <div
          className={
            mobile
              ? "mt-1 flex flex-col rounded-lg bg-white p-1"
              : "absolute right-0 top-full mt-1 z-50 min-w-36 rounded-xl bg-white p-1 shadow-2xl"
          }
        >
          {LANGS.map((l) => (
            <button
              key={l.code}
              type="button"
              onClick={() => change(l.code)}
              className={`notranslate block w-full rounded-lg px-3 py-2 text-left text-sm uppercase tracking-wider text-navy hover:bg-secondary ${
                l.code === current ? "text-cyan-accent" : ""
              }`}
            >
              {l.short} — {l.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
