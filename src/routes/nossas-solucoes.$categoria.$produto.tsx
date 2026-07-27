import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { findProduct, type Product } from "@/lib/solutions";

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
  notFoundComponent: () => (
    <div className="container mx-auto px-4 py-32 text-center">
      <h1 className="text-3xl text-navy-deep mb-4">Produto não encontrado</h1>
      <Link to="/nossas-solucoes" className="text-cyan-accent uppercase tracking-wider">Ver todas as soluções</Link>
    </div>
  ),
});

function ProdutoPage() {
  const { solution, product } = Route.useLoaderData();
  const others = solution.products.filter((p: Product) => p.slug !== product.slug).slice(0, 3);

  return (
    <section className="bg-background pt-12 pb-20">
      <div className="container mx-auto px-4">
        <Link
          to="/nossas-solucoes/$categoria"
          params={{ categoria: solution.slug }}
          className="inline-flex items-center gap-2 mb-8 text-navy-deep/70 hover:text-cyan-accent text-sm uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4" /> Voltar para {solution.title}
        </Link>

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Imagem grande */}
          <div className="lg:col-span-3">
            <div className="bg-secondary rounded-3xl p-8 flex items-center justify-center aspect-square lg:aspect-[4/3] overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Info principal */}
          <div className="lg:col-span-2 space-y-6">
            <p className="text-cyan-accent uppercase tracking-[0.3em] text-xs">
              {solution.title}
            </p>
            <h1 className="text-4xl md:text-5xl text-navy-deep uppercase leading-tight">
              {product.name}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {product.description}
            </p>

            <Link
              to="/contato"
              className="inline-flex bg-navy-deep text-white px-6 py-4 rounded-full uppercase tracking-wider text-sm font-semibold hover:bg-white hover:text-navy-deep border border-navy-deep transition-colors"
            >
              Solicitar orçamento
            </Link>
          </div>
        </div>

        {/* Espaço para mais informações */}
        <div className="mt-20 grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            {product.longDescription && (
              <div>
                <p className="text-cyan-accent uppercase tracking-[0.3em] text-xs mb-3">
                  Sobre o equipamento
                </p>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
                  {product.longDescription}
                </p>
              </div>
            )}

            {product.applications && product.applications.length > 0 && (
              <div>
                <h3 className="text-xl text-navy-deep uppercase mb-4">
                  Aplicações
                </h3>
                <ul className="space-y-3">
                  {product.applications.map((app: string) => (
                    <li key={app} className="flex gap-3 text-muted-foreground">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-cyan-accent flex-shrink-0" />
                      <span>{app}</span>
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
                  Outros produtos {solution.title}
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
                        alt={o.name}
                        className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm uppercase tracking-wide text-navy-deep group-hover:text-white truncate">
                          {o.name}
                        </p>
                        <span className="inline-flex items-center gap-1 text-xs text-cyan-accent mt-1">
                          Ver mais <ArrowRight className="w-3 h-3" />
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
                  Ver mais produtos <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </aside>
        </div>
      </div>
    </section>
  );
}
