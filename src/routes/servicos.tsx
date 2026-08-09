import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Cog, DraftingCompass, Settings2, Wrench } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { useI18n } from "@/lib/i18n";

const services = [
  {
    icon: DraftingCompass,
    title: "Projetos sob medida",
    description: "Desenvolvimento de soluções conforme o layout, a capacidade produtiva e a rotina operacional da sua planta.",
  },
  {
    icon: Cog,
    title: "Fabricação industrial",
    description: "Produção de equipamentos, linhas e componentes com padrão sanitário, robustez estrutural e foco em durabilidade.",
  },
  {
    icon: Settings2,
    title: "Instalação e integração",
    description: "Montagem em campo, ajustes finos e integração dos equipamentos com o restante da operação industrial.",
  },
  {
    icon: Wrench,
    title: "Assistência técnica",
    description: "Apoio técnico, manutenção preventiva e suporte para manter a produtividade com segurança e estabilidade.",
  },
];

export const Route = createFileRoute("/servicos")({
  head: () => ({
    meta: [
      { title: "Serviços — CLEOM" },
      { name: "description", content: "Projetos, fabricação, instalação e assistência técnica para linhas frigoríficas industriais." },
      { property: "og:title", content: "Serviços — CLEOM" },
      { property: "og:description", content: "Conheça os serviços industriais da CLEOM para sua planta frigorífica." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ServicosPage,
});

function ServicosPage() {
  const { t } = useI18n();
  return (
    <>
      <PageHero
        eyebrow={t("Serviços")}
        title={<>{t("Engenharia, fabricação e suporte para sua operação")}</>}
        subtitle={t("A CLEOM atua do projeto à entrega técnica, com soluções alinhadas à realidade produtiva de cada planta.")}
        image="https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&w=1920&q=80"
      />

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mb-12">
            <p className="text-cyan-accent uppercase tracking-[0.3em] text-sm mb-3">{t("Atuação")}</p>
            <h1 className="text-4xl md:text-5xl text-navy-deep mb-4">{t("Serviços que acompanham o ritmo da sua indústria")}</h1>
            <p className="text-lg text-muted-foreground">
              {t("Estruturamos projetos industriais com foco em produtividade, higiene, integração de linha e facilidade de operação.")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {services.map((service) => (
              <article key={service.title} className="rounded-2xl border border-border bg-card p-8">
                <div className="w-14 h-14 rounded-2xl navy-gradient flex items-center justify-center mb-5">
                  <service.icon className="w-7 h-7 text-cyan-accent" />
                </div>
                <h2 className="text-2xl text-navy-deep mb-3">{t(service.title)}</h2>
                <p className="text-muted-foreground">{t(service.description)}</p>
              </article>
            ))}
          </div>

          <div className="mt-12">
            <Link
              to="/contato"
              className="inline-flex items-center gap-2 bg-navy-deep text-white px-7 py-4 rounded-full uppercase tracking-wider text-sm font-semibold hover:bg-white hover:text-navy-deep border border-navy-deep transition-colors"
            >
              {t("Solicitar atendimento")} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}