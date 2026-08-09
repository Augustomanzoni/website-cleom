import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { findProduct, type GalleryItem, type Product } from "@/lib/solutions";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/nossas-solucoes/$categoria/$produto")({
  loader: ({ params }) => {
    const result = findProduct(params.categoria, params.produto);
    if (!result) throw notFound();
    return result;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} — ${loaderData.solution.title} | CLEOM` },
          { name: "description", content: loaderData.product.description },
          { property: "og:title", content: `${loaderData.product.name} — CLEOM` },
          { property: "og:description", content: loaderData.product.description },
          { property: "og:type", content: "website" },
          { name: "twitter:card", content: "summary_large_image" },
          { property: "og:image", content: loaderData.product.image },
        ]
      : [],
  }),
  component: ProdutoPage,
  notFoundComponent: () => <ProdutoNotFound />,
});

function ProdutoNotFound() {
  const { t } = useI18n();
  return (
    <div className="container mx-auto px-4 py-32 text-center">
      <h1 className="text-3xl text-navy-deep mb-4">{t("Produto não encontrado")}</h1>
      <Link to="/nossas-solucoes" className="text-cyan-accent uppercase tracking-wider">{t("Ver todas as soluções")}</Link>
    </div>
  );
}

function ProdutoPage() {
  const { t } = useI18n();
  const { solution, product } = Route.useLoaderData();
  const others = solution.products.filter((p: Product) => p.slug !== product.slug).slice(0, 3);

  const slides = [
    {
      name: product.name,
      image: product.image,
      description: product.description,
      longDescription: product.longDescription,
      applications: product.applications,
    },
    ...(product.gallery ?? []).map((g: GalleryItem) => ({
      name: g.name,
      image: g.image,
      description: g.description,
      longDescription: g.description,
      applications: g.applications,
    })),
  ];

  const [index, setIndex] = useState(0);
  const active = slides[index] ?? slides[0];
  const hasGallery = slides.length > 1;
  const go = (dir: number) => setIndex((i) => (i + dir + slides.length) % slides.length);

  return (
    <section className="bg-background pt-12 pb-20">
      <div className="container mx-auto px-4">
        <Link
          to="/nossas-solucoes/$categoria"
          params={{ categoria: solution.slug }}
          className="inline-flex items-center gap-2 mb-8 text-navy-deep/70 hover:text-cyan-accent text-sm uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4" /> {t("Voltar para")} {t(solution.title)}
        </Link>

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Imagem grande */}
          <div className="lg:col-span-3">
            <div className="relative bg-secondary rounded-3xl p-8 flex items-center justify-center aspect-square lg:aspect-[4/3] overflow-hidden">
              <img
                src={active.image}
                alt={t(active.name)}
                className="w-full h-full object-contain"
              />
              {hasGallery && (
                <>
                  <button
                    type="button"
                    aria-label={t("Imagem anterior")}
                    onClick={() => go(-1)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-navy-deep text-white flex items-center justify-center hover:bg-cyan-accent transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    aria-label={t("Próxima imagem")}
                    onClick={() => go(1)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-navy-deep text-white flex items-center justify-center hover:bg-cyan-accent transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                  <span className="absolute bottom-4 right-6 text-xs uppercase tracking-wider text-navy-deep/60">
                    {index + 1} / {slides.length}
                  </span>
                </>
              )}
            </div>

            {hasGallery && (
              <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
                {slides.map((s, i) => (
                  <button
                    key={s.name + i}
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-label={t(s.name)}
                    className={`flex-shrink-0 w-20 h-20 rounded-xl bg-secondary p-2 border transition-colors ${
                      i === index ? "border-cyan-accent" : "border-transparent hover:border-navy-deep/30"
                    }`}
                  >
                    <img src={s.image} alt={t(s.name)} className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info principal */}
          <div className="lg:col-span-2 space-y-6">
            <p className="text-cyan-accent uppercase tracking-[0.3em] text-xs">
              {index === 0 ? t(solution.title) : `${t("Conjunto")} · ${t(product.name)}`}
            </p>
            <h1 className="text-4xl md:text-5xl text-navy-deep uppercase leading-tight">
              {t(active.name)}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t(active.description)}
            </p>

            <Link
              to="/contato"
              className="inline-flex bg-navy-deep text-white px-6 py-4 rounded-full uppercase tracking-wider text-sm font-semibold hover:bg-white hover:text-navy-deep border border-navy-deep transition-colors"
            >
              {t("Solicitar orçamento")}
            </Link>
          </div>
        </div>

        {/* Espaço para mais informações */}
        <div className="mt-20 grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            {active.longDescription && (
              <div>
                <p className="text-cyan-accent uppercase tracking-[0.3em] text-xs mb-3">
                  {t("Sobre o equipamento")}
                </p>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
                  {t(active.longDescription)}
                </p>
              </div>
            )}

            {active.applications && active.applications.length > 0 && (
              <div>
                <h3 className="text-xl text-navy-deep uppercase mb-4">
                  {t("Aplicações")}
                </h3>
                <ul className="space-y-3">
                  {active.applications.map((app: string) => (
                    <li key={app} className="flex gap-3 text-muted-foreground">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-cyan-accent flex-shrink-0" />
                      <span>{t(app)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <aside className="space-y-6">
            {others.length > 0 && (
              <div>
                <p className="text-cyan-accent uppercase tracking-[0.3em] text-xs mb-3">
                  {t("Outros produtos")} {t(solution.title)}
                </p>
                <div className="space-y-3">
                  {others.map((o: Product) => (
                    <Link
                      key={o.slug}
                      to="/nossas-solucoes/$categoria/$produto"
                      params={{ categoria: solution.slug, produto: o.slug }}
                      className="group flex gap-3 p-3 rounded-xl bg-secondary hover:bg-navy-deep hover:text-white transition-colors"
                    >
                      <img
                        src={o.image}
                        alt={t(o.name)}
                        className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm uppercase tracking-wide text-navy-deep group-hover:text-white truncate">
                          {t(o.name)}
                        </p>
                        <span className="inline-flex items-center gap-1 text-xs text-cyan-accent mt-1">
                          {t("Ver mais")} <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
                <Link
                  to="/nossas-solucoes/$categoria"
                  params={{ categoria: solution.slug }}
                  className="mt-4 inline-flex items-center gap-2 text-navy-deep hover:text-cyan-accent text-sm font-semibold uppercase tracking-wider"
                >
                  {t("Ver mais produtos")} <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </aside>
        </div>
      </div>
    </section>
  );
}
