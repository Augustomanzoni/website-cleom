import { createFileRoute } from "@tanstack/react-router";
import { Award, Users, Wrench, TrendingUp } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre a CLEOM — Soluções Frigoríficas Industriais" },
      { name: "description", content: "Há mais de 20 anos fornecendo soluções frigoríficas industriais de alta qualidade." },
      { property: "og:title", content: "Sobre a CLEOM" },
      { property: "og:description", content: "Conheça a história e a missão da CLEOM." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SobrePage,
});

const features = [
  { icon: Award, title: "Qualidade Certificada", desc: "Equipamentos com certificações internacionais e garantia estendida." },
  { icon: Users, title: "Equipe Especializada", desc: "Técnicos certificados em soluções frigoríficas." },
  { icon: Wrench, title: "Manutenção Completa", desc: "Assistência técnica e contratos preventivos." },
  { icon: TrendingUp, title: "Eficiência", desc: "Soluções que auxiliam o dia a dia da sua planta frigorífica." },
];

function SobrePage() {
  const { t } = useI18n();
  return (
    <>
      <PageHero
        eyebrow={t("A CLEOM")}
        title={<>{t("ESPECIALIZAÇÃO EM")}<br />{t("ENGENHARIA FRIGORÍFICA")}</>}
        subtitle={t("Projetando soluções para frigoríficos, indústrias alimentícias e centros de distribuição com excelência a mais de três anos.")}
        image="https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1920&q=80"
      />

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <img
            src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1200&q=80"
            alt={t("Fábrica CLEOM")}
            className="rounded-3xl shadow-xl"
          />
          <div>
            <p className="text-cyan-accent uppercase tracking-[0.3em] text-sm mb-3">{t("Nossa missão")}</p>
            <h2 className="text-4xl text-navy-deep mb-6">{t("Engenharia que move a indústria frigorífica")}</h2>
            <p className="text-muted-foreground mb-4">
              {t("Fornecer soluções frigoríficas industriais que garantam a preservação dos produtos, reduzam custos operacionais e elevem a eficiência das nossas indústrias parceiras.")}
            </p>
            <p className="text-muted-foreground mb-4">
              {t("Trabalhamos com equipamentos de última geração e mantemos parcerias com os principais fabricantes mundiais de sistemas de refrigeração industrial.")}
            </p>
            <p className="text-muted-foreground">
              {t("\n")}
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-4xl text-navy-deep">{t("Diferenciais CLEOM")}</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <div key={f.title} className="bg-card p-6 rounded-2xl border border-border">
                <div className="w-14 h-14 navy-gradient rounded-2xl flex items-center justify-center mb-4">
                  <f.icon className="w-7 h-7 text-cyan-accent" />
                </div>
                <h3 className="text-xl text-navy-deep mb-2">{t(f.title)}</h3>
                <p className="text-sm text-muted-foreground">{t(f.desc)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
