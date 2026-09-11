import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { findSolution, solutions, type Product } from "@/lib/solutions";
import { PageHero } from "@/components/site/PageHero";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/nossas-solucoes/$categoria/")({
  loader: ({ params }) => {
    const sol = findSolution(params.categoria);
    if (!sol) throw notFound();
    return { sol };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.sol.title} — Nossas Soluções | CLEOM` },
          { name: "description", content: loaderData.sol.tagline },
          { property: "og:title", content: `${loaderData.sol.title} — CLEOM` },
          { property: "og:description", content: loaderData.sol.tagline },
          { property: "og:type", content: "website" },
          { name: "twitter:card", content: "summary_large_image" },
          { property: "og:image", content: loaderData.sol.image },
        ]
      : [],
  }),
  component: CategoriaPage,
  notFoundComponent: () => <CategoriaNotFound />,
});

function CategoriaNotFound() {
  const { t } = useI18n();
  return (
    <div className="container mx-auto px-4 py-32 text-center">
      <h1 className="text-3xl text-navy-deep mb-4">{t("Categoria não encontrada")}</h1>
      <Link to="/nossas-solucoes" className="text-cyan-accent uppercase tracking-wider">{t("Ver todas as soluções")}</Link>
    </div>
  );
}

function CategoriaPage() {
  const { t } = useI18n();
  const { sol } = Route.useLoaderData();
  const others = solutions.filter((s) => s.slug !== sol.slug);
  const orderedOthers = [...others].sort((a, b) => {
    if (a.slug === "industria") return 1;
    if (b.slug === "industria") return -1;
    return 0;
  });

  return (
    <>
      {/* Hero grande com título da categoria */}
      <PageHero
        eyebrow={t("Nossa Linha")}
        title={t(sol.title)}
        subtitle={t(sol.description)}
        image={sol.image}
        titleClassName="text-6xl md:text-8xl lg:text-9xl"
      >
        <Link
          to="/nossas-solucoes"
          className="inline-flex items-center gap-2 mt-6 text-chrome/70 hover:text-cyan-accent text-sm uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4" /> {t("Voltar para Nossas Soluções")}
        </Link>
      </PageHero>

      {/* Grid de produtos 3 colunas sem rolagem */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <p className="text-cyan-accent uppercase tracking-[0.3em] text-sm mb-3">{t("Produtos")}</p>
          <h2 className="text-3xl text-navy-deep mb-8">{t("Conheça toda a linha")}</h2>

          {sol.products.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[...sol.products].sort((a, b) => a.name.localeCompare(b.name, "pt-BR")).map((p: Product) => (
                <div
                  key={p.slug}
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
                    <h3 className="text-lg text-navy-deep uppercase tracking-wide mb-4 flex-1">
                      {t(p.name)}
                    </h3>
                    <Link
                      to="/nossas-solucoes/$categoria/$produto"
                      params={{ categoria: sol.slug, produto: p.slug }}
                      className="inline-flex items-center gap-1 text-navy-deep hover:text-cyan-accent text-sm font-semibold uppercase tracking-wider"
                    >
                      {t("Ver mais")} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-border bg-card p-8 text-center text-muted-foreground">
              Produtos desta categoria em atualização.
            </div>
          )}

          {/* Linha única ao final da lista */}
          <div className="mt-12 flex flex-wrap justify-center items-center gap-3">
            {orderedOthers.map((o) => (
              <Link
                key={o.slug}
                to="/nossas-solucoes/$categoria"
                params={{ categoria: o.slug }}
                className="px-5 py-3 rounded-full bg-secondary hover:bg-navy-deep hover:text-white text-navy-deep uppercase tracking-wider text-sm transition-colors"
              >
                {t(o.title)}
              </Link>
            ))}
            <Link
              to="/contato"
              className="px-6 py-3 rounded-full bg-navy-deep text-white uppercase tracking-wider text-sm font-semibold hover:bg-white hover:text-navy-deep border border-navy-deep transition-colors"
            >
              {t("Solicitar orçamento")}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
