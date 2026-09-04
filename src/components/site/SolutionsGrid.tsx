import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { solutions } from "@/lib/solutions";
import { useI18n } from "@/lib/i18n";

export function SolutionsGrid({ heading = true }: { heading?: boolean }) {
  const { t } = useI18n();
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {heading && (
          <div className="mb-12 max-w-3xl">
            <p className="text-cyan-accent uppercase tracking-[0.3em] text-sm mb-3">{t("Nossas Soluções")}</p>
            <h2 className="text-4xl md:text-5xl text-navy-deep mb-4">
              {t("Tecnologia industrial para")} <span className="text-cyan-accent">{t("equipamentos de alta performance")}</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              {t("Conheça as linhas de atuação e nossos produtos desenvolvidos para a indústria frigorífica!")}
            </p>
          </div>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {solutions.map((s) => (
            <Link
              key={s.slug}
              to="/nossas-solucoes/$categoria"
              params={{ categoria: s.slug }}
              className="group relative overflow-hidden rounded-3xl aspect-[3/4] block"
            >
              <img
                src={s.image}
                alt={t(s.title)}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/70 to-navy-deep/20 group-hover:from-navy-deep group-hover:via-navy-deep/40 transition-colors" />
              <div className="relative h-full flex flex-col justify-end p-6 text-white">
                <h3 className="text-2xl uppercase tracking-wide mb-1">{t(s.title)}</h3>
                <p className="text-chrome/80 text-sm mb-3 line-clamp-2">{t(s.tagline)}</p>
                <span className="inline-flex items-center gap-1 text-cyan-accent text-sm font-medium uppercase tracking-wider">
                  {t("Ver linha")} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          ))}
          <Link
            to="/nossas-solucoes/pecas-de-reposicao"
            className="group relative overflow-hidden rounded-3xl aspect-[3/4] block"
          >
            <img
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80"
              alt={t("Peças de Reposição")}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/70 to-navy-deep/20 group-hover:from-navy-deep group-hover:via-navy-deep/40 transition-colors" />
            <div className="relative h-full flex flex-col justify-end p-6 text-white">
              <h3 className="text-2xl uppercase tracking-wide mb-1">{t("Peças de Reposição")}</h3>
              <p className="text-chrome/80 text-sm mb-3 line-clamp-2">
                {t("Componentes originais e sob medida para manter sua linha em operação.")}
              </p>
              <span className="inline-flex items-center gap-1 text-cyan-accent text-sm font-medium uppercase tracking-wider">
                {t("Ver linha")} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
