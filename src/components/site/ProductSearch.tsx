import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { solutions } from "@/lib/solutions";

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
    searchText: [solution.title, solution.tagline, solution.description].join(" ").toLowerCase(),
    route: { to: "/nossas-solucoes/$categoria", params: { categoria: solution.slug } },
  };

  const productEntries: SearchEntry[] = solution.products.map((product) => ({
    id: `${solution.slug}-${product.slug}`,
    label: product.name,
    subtitle: solution.title,
    searchText: [
      product.name,
      product.description,
      product.longDescription ?? "",
      ...(product.applications ?? []),
      solution.title,
      solution.tagline,
      solution.description,
    ]
      .join(" ")
      .toLowerCase(),
    route: {
      to: "/nossas-solucoes/$categoria/$produto",
      params: { categoria: solution.slug, produto: product.slug },
    },
  }));

  return [categoryEntry, ...productEntries];
});

export function ProductSearch({ mobile = false, onNavigate }: ProductSearchProps) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    if (!normalized) {
      return searchEntries.slice(0, 8);
    }

    return searchEntries
      .filter((entry) => entry.searchText.includes(normalized))
      .slice(0, 10);
  }, [query]);

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
          placeholder="Buscar produtos, categorias ou palavras-chave"
          className="placeholder:text-chrome/45"
        />
        {(query.trim().length > 0 || mobile) && (
          <CommandList className="mt-1 max-h-72 rounded-2xl bg-card text-card-foreground shadow-2xl">
            <CommandEmpty className="text-muted-foreground">Nenhum resultado encontrado.</CommandEmpty>
            <CommandGroup heading="Resultados" className="text-card-foreground [&_[cmdk-group-heading]]:text-muted-foreground">
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
                    <p className="truncate text-sm uppercase tracking-wide">{entry.label}</p>
                    <p className="truncate text-xs text-muted-foreground">{entry.subtitle}</p>
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