import { Link } from "@tanstack/react-router";
import { Menu, X, ChevronDown } from "lucide-react";
import { useState } from "react";
import logo from "@/assets/cleom-logo.png";
import { ProductSearch } from "@/components/site/ProductSearch";
import { solutions } from "@/lib/solutions";
import { useI18n } from "@/lib/i18n";
import { LanguageSelector } from "@/components/site/LanguageSelector";

type NavLink = { to: "/" | "/sobre" | "/nossas-solucoes" | "/servicos" | "/contato"; label: string; hasMenu?: boolean };
const navLinks: NavLink[] = [
  { to: "/", label: "Início" },
  { to: "/sobre", label: "Sobre" },
  { to: "/nossas-solucoes", label: "Nossas Soluções", hasMenu: true },
  { to: "/servicos", label: "Serviços" },
  { to: "/contato", label: "Contato" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const { t } = useI18n();

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-navy-deep/95 backdrop-blur-md border-b border-white/5">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between gap-4 min-h-20 py-3">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="CLEOM Soluções Frigoríficas Industriais" className="h-14 w-auto" />
          </Link>

          <div className="hidden lg:flex items-center gap-4 flex-1 justify-end">
            <ProductSearch />
            <nav className="flex items-center gap-1">
            {navLinks.map((l) => (
              <div key={l.to} className="relative group">
                <Link
                  to={l.to}
                  className="px-4 py-2 text-sm uppercase tracking-wider text-chrome/80 hover:text-cyan-accent transition-colors inline-flex items-center gap-1"
                  activeProps={{ className: "text-cyan-accent" }}
                  activeOptions={{ exact: l.to === "/" }}
                >
                  {t(l.label)}
                  {l.hasMenu && <ChevronDown className="w-3.5 h-3.5" />}
                </Link>
                {l.hasMenu && (
                  <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    <div className="bg-white rounded-2xl shadow-2xl p-2 min-w-64">
                      {solutions.map((s) => (
                        <Link
                          key={s.slug}
                          to="/nossas-solucoes/$categoria"
                          params={{ categoria: s.slug }}
                          className="block px-4 py-3 text-sm uppercase tracking-wider text-navy hover:bg-secondary rounded-lg text-center"
                        >
                          {t(s.title)}
                        </Link>
                      ))}
                      <Link
                        to="/nossas-solucoes/pecas-de-reposicao"
                        className="block px-4 py-3 text-sm uppercase tracking-wider text-navy hover:bg-secondary rounded-lg text-center"
                      >
                        {t("Peças de Reposição")}
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ))}
            <LanguageSelector />
            </nav>
          </div>

          <button onClick={() => setOpen(!open)} className="lg:hidden p-2 text-chrome">
            {open ? <X /> : <Menu />}
          </button>
        </div>

        {open && (
          <nav className="lg:hidden pb-6 pt-2 flex flex-col gap-1 border-t border-white/5">
            <ProductSearch mobile onNavigate={() => setOpen(false)} />
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="px-3 py-3 uppercase tracking-wider text-chrome/80 hover:text-cyan-accent"
              >
                {t(l.label)}
              </Link>
            ))}
            <LanguageSelector mobile />
            <div className="mt-2 pl-4 border-l border-white/10 flex flex-col">
              {solutions.map((s) => (
                <Link
                  key={s.slug}
                  to="/nossas-solucoes/$categoria"
                  params={{ categoria: s.slug }}
                  onClick={() => setOpen(false)}
                  className="px-3 py-2 text-sm text-chrome/70 hover:text-cyan-accent"
                >
                  › {t(s.title)}
                </Link>
              ))}
              <Link
                to="/nossas-solucoes/pecas-de-reposicao"
                onClick={() => setOpen(false)}
                className="px-3 py-2 text-sm text-chrome/70 hover:text-cyan-accent"
              >
                › {t("Peças de Reposição")}
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
