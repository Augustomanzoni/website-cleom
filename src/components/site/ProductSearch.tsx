import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { solutions } from "@/lib/solutions";
import { useI18n, translate } from "@/lib/i18n";

type ProductSearchProps = {
  mobile?: boolean;
  onNavigate?: () => void;
};

type SearchEntry = {
  id: string;
  label: string;
  subtitle: string;
  searchText: string;
  route:
    | { to: "/nossas-solucoes/$categoria"; params: { categoria: string } }
    | { to: "/nossas-solucoes/$categoria/$produto"; params: { categoria: string; produto: string } };
};

const searchEntries: SearchEntry[] = solutions.flatMap((solution) => {
  const categoryEntry: SearchEntry = {
    id: `category-${solution.slug}`,
    label: solution.title,
    subtitle: `Categoria • ${solution.tagline}`,
    searchText: solution.title.toLowerCase(),
    route: { to: "/nossas-solucoes/$categoria", params: { categoria: solution.slug } },
  };

  const productEntries: SearchEntry[] = solution.products.map((product) => ({
    id: `${solution.slug}-${product.slug}`,
    label: product.name,
    subtitle: solution.title,
    searchText: product.name.toLowerCase(),
    route: {
      to: "/nossas-solucoes/$categoria/$produto",
      params: { categoria: solution.slug, produto: product.slug },
    },
  }));

  return [categoryEntry, ...productEntries];
});

function translateSubtitle(subtitle: string, t: (s: string) => string) {
  if (subtitle.startsWith("Categoria • ")) {
    return `${t("Categoria")} • ${t(subtitle.replace("Categoria • ", ""))}`;
  }
  return t(subtitle);
}

export function ProductSearch({ mobile = false, onNavigate }: ProductSearchProps) {
  const { t, lang } = useI18n();
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    setQuery("");
  }, [pathname]);


  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    if (!normalized) {
      return searchEntries.slice(0, 8);
    }

    return searchEntries
      .filter(
        (entry) =>
          entry.searchText.includes(normalized) ||
          translate(entry.label, lang).toLowerCase().includes(normalized),
      )
      .slice(0, 10);
  }, [query, lang]);

  const wrapperClass = mobile
    ? "w-full rounded-xl border border-white/10 bg-white/5"
    : "hidden xl:block w-[320px] rounded-full border border-white/10 bg-white/5 backdrop-blur-sm";

  return (
    <div className={wrapperClass}>
      <Command
        shouldFilter={false}
        className="bg-transparent text-chrome [&_[cmdk-input-wrapper]]:border-b-0 [&_[cmdk-input-wrapper]]:focus-within:outline-none [&_[cmdk-input-wrapper]]:focus-within:ring-0 [&_[cmdk-input]]:focus-visible:outline-none [&_[cmdk-input]]:focus-visible:ring-0"
      >
        <CommandInput
          value={query}
          onValueChange={setQuery}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              const term = query.trim();
              if (!term) return;
              event.preventDefault();
              event.stopPropagation();
              onNavigate?.();
              setQuery("");
              navigate({ to: "/busca", search: { q: term } });
            }
          }}
          placeholder={t("Buscar produtos, categorias ou palavras-chave")}
          className="placeholder:text-chrome/45"
        />
        {(query.trim().length > 0 || mobile) && (
          <CommandList className="max-h-72 rounded-2xl bg-card text-card-foreground shadow-2xl">
            <CommandEmpty className="text-muted-foreground">{t("Nenhum resultado encontrado.")}</CommandEmpty>
            {query.trim().length > 0 && (
              <CommandGroup className="text-card-foreground">
                <CommandItem
                  value="__see-all__"
                  onSelect={() => {
                    const term = query.trim();
                    onNavigate?.();
                    setQuery("");
                    navigate({ to: "/busca", search: { q: term } });
                  }}
                  className="cursor-pointer text-card-foreground data-[selected=true]:bg-secondary data-[selected=true]:text-card-foreground"
                >
                  <Search className="text-cyan-accent" />
                  <span className="truncate text-sm uppercase tracking-wide">
                    {t("Ver todos os resultados para")} “{query.trim()}”
                  </span>
                </CommandItem>
              </CommandGroup>
            )}
            <CommandGroup heading={t("Resultados")} className="text-card-foreground [&_[cmdk-group-heading]]:text-muted-foreground">
              {results.map((entry) => (
                <CommandItem
                  key={entry.id}
                  value={entry.id}
                  onSelect={() => {
                    onNavigate?.();
                    setQuery("");
                    navigate({ ...entry.route });
                  }}
                  className="cursor-pointer text-card-foreground data-[selected=true]:bg-secondary data-[selected=true]:text-card-foreground"
                >
                  <Search className="text-cyan-accent" />
                  <div className="min-w-0">
                    <p className="truncate text-sm uppercase tracking-wide">{t(entry.label)}</p>
                    <p className="truncate text-xs text-muted-foreground">{translateSubtitle(entry.subtitle, t)}</p>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        )}
      </Command>
    </div>
  );
}