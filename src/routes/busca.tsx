import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { solutions } from "@/lib/solutions";
import { PageHero } from "@/components/site/PageHero";
import { useI18n, translate } from "@/lib/i18n";

export const Route = createFileRoute("/busca")({
  validateSearch: (search: Record<string, unknown>) => ({
    q: typeof search.q === "string" ? search.q : "",
  }),
  head: () => ({
    meta: [
      { title: "Busca de produtos | CLEOM Soluções Frigoríficas" },
      {
        name: "description",
        content:
          "Pesquise equipamentos e produtos CLEOM para frigoríficos de aves, bovinos, suínos e utilidades industriais.",
      },
      { property: "og:title", content: "Busca de produtos | CLEOM" },
      {
        property: "og:description",
        content: "Encontre equipamentos frigoríficos industriais CLEOM por palavra-chave.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BuscaPage,
});

type Hit = {
  key: string;
  name: string;
  image: string;
  categoryTitles: string[];
  categoriaSlug: string;
  produtoSlug: string;
  haystack: string;
};

const allProducts: Hit[] = (() => {
  const byProduct = new Map<string, Hit>();

  for (const s of solutions) {
    for (const p of s.products) {
      const existing = byProduct.get(p.slug);
      if (existing) {
        if (!existing.categoryTitles.includes(s.title)) existing.categoryTitles.push(s.title);
        continue;
      }
      byProduct.set(p.slug, {
        key: p.slug,
        name: p.name,
        image: p.image,
        categoryTitles: [s.title],
        categoriaSlug: s.slug,
        produtoSlug: p.slug,
        haystack: [p.name, ...(p.gallery?.map((g) => g.name) ?? [])].join(" ").toLowerCase(),
      });
    }
  }

  return [...byProduct.values()];
})();

const normalize = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

function BuscaPage() {
  const { t, lang } = useI18n();
  const { q } = Route.useSearch();
  const terms = normalize(q).split(/\s+/).filter(Boolean);

  const results = terms.length
    ? allProducts.filter((p) => {
        const searchable = normalize(`${p.haystack} ${translate(p.name, lang)}`);
        return terms.every((term) => searchable.includes(term));
      })
    : [];

  const sorted = [...results].sort((a, b) =>
    translate(a.name, lang).localeCompare(translate(b.name, lang), "pt-BR"),
  );

  return (
    <>
      <PageHero
        eyebrow={t("Busca")}
        title={q ? `“${q}”` : t("Buscar produtos")}
        subtitle={
          q
            ? `${sorted.length} ${sorted.length === 1 ? t("produto encontrado") : t("produtos encontrados")}`
            : t("Digite uma palavra-chave na barra de pesquisa e pressione Enter.")
        }
        titleClassName="text-5xl md:text-7xl"
      />

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          {sorted.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {sorted.map((p) => (
                <div
                  key={p.key}
                  className="group bg-card border border-border rounded-2xl overflow-hidden flex flex-col hover:border-navy-deep transition-colors"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-secondary flex items-center justify-center p-4">
                    <img
                      src={p.image}
                      alt={t(p.name)}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <p className="text-xs uppercase tracking-[0.2em] text-cyan-accent mb-2">
                      {t(p.categoryTitle)}
                    </p>
                    <h2 className="text-lg text-navy-deep uppercase tracking-wide mb-4 flex-1">
                      {t(p.name)}
                    </h2>
                    <Link
                      to="/nossas-solucoes/$categoria/$produto"
                      params={{ categoria: p.categoriaSlug, produto: p.produtoSlug }}
                      className="inline-flex items-center gap-1 text-navy-deep hover:text-cyan-accent text-sm font-semibold uppercase tracking-wider"
                    >
                      {t("Ver mais")}{" "}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-border bg-card p-10 text-center">
              <p className="text-muted-foreground mb-6">
                {q ? t("Nenhum produto encontrado para sua busca.") : t("Nenhuma palavra pesquisada.")}
              </p>
              <Link
                to="/nossas-solucoes"
                className="inline-flex px-6 py-3 rounded-full bg-navy-deep text-white uppercase tracking-wider text-sm font-semibold"
              >
                {t("Ver todas as soluções")}
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
