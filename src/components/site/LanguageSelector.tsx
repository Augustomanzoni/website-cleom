import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, Globe } from "lucide-react";
import { LANGUAGES, useI18n } from "@/lib/i18n";

export function LanguageSelector({ mobile = false }: { mobile?: boolean }) {
  const { lang, setLang, t } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const current = LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0];

  return (
    <div ref={ref} className={`relative ${mobile ? "px-3 py-2" : ""}`}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={t("Idioma")}
        aria-expanded={open}
        className="inline-flex items-center gap-1.5 px-3 py-2 text-sm uppercase tracking-wider text-chrome/80 hover:text-cyan-accent transition-colors"
      >
        <Globe className="w-4 h-4" />
        {current.short}
        <ChevronDown className="w-3.5 h-3.5" />
      </button>

      {open && (
        <div className={`absolute ${mobile ? "left-3" : "right-0"} top-full mt-2 z-50 min-w-44 rounded-2xl bg-white shadow-2xl p-2`}>
          {LANGUAGES.map((l) => (
            <button
              key={l.code}
              type="button"
              onClick={() => {
                setLang(l.code);
                setOpen(false);
              }}
              className="w-full flex items-center justify-between gap-3 px-3 py-2.5 text-sm text-navy hover:bg-secondary rounded-lg"
            >
              <span className="flex items-center gap-2">
                <span aria-hidden>{l.flag}</span>
                {t(l.label)}
              </span>
              {l.code === lang && <Check className="w-4 h-4 text-cyan-accent" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
