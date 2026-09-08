import { createFileRoute } from "@tanstack/react-router";
import { Award, Users, Wrench, TrendingUp, Quote } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre a CLEOM — Soluções Frigoríficas Industriais" },
      { name: "description", content: "Quem somos, missão, visão, valores e propósito da CLEOM Soluções Frigoríficas." },
      { property: "og:title", content: "Sobre a CLEOM" },
      { property: "og:description", content: "Conheça a história, os valores e o propósito da CLEOM." },
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

const quemSomos = [
  "A CLEOM Soluções Frigoríficas atua no desenvolvimento e fornecimento de soluções para o setor frigorífico e para a indústria de alimentos, oferecendo alternativas que aliam qualidade, tecnologia, eficiência e conhecimento técnico.",
  "Com uma visão voltada às necessidades de cada operação, desenvolvemos soluções personalizadas para diferentes desafios da indústria, buscando contribuir para a produtividade, segurança, eficiência e evolução dos processos de nossos clientes.",
  "Nossa atuação é construída a partir da experiência, do aprimoramento contínuo e da proximidade com o mercado. Mais do que oferecer produtos e soluções, buscamos compreender a realidade de cada cliente para entregar aquilo que realmente faz sentido para sua operação.",
  "Na CLEOM, acreditamos que cada indústria possui necessidades únicas. Por isso, trabalhamos para transformar desafios em soluções inteligentes, estabelecendo relações de confiança e parcerias duradouras.",
];

const valores = [
  { title: "Compromisso", desc: "Assumimos cada desafio com responsabilidade e dedicação, buscando entregar soluções que gerem resultados." },
  { title: "Qualidade", desc: "Buscamos excelência em tudo o que fazemos, desde a escolha das soluções até o atendimento ao cliente." },
  { title: "Transparência", desc: "Construímos relações baseadas em clareza, ética, respeito e confiança." },
  { title: "Inovação", desc: "Buscamos novas tecnologias, ideias e formas de solucionar os desafios da indústria." },
  { title: "Excelência", desc: "Estamos em constante evolução para aprimorar nossos conhecimentos, processos e soluções." },
  { title: "Confiabilidade", desc: "Valorizamos relações sólidas e duradouras, construídas através de resultados e credibilidade." },
  { title: "Foco no cliente", desc: "Entendemos as necessidades de cada operação para oferecer soluções adequadas, eficientes e personalizadas." },
  { title: "Segurança Operacional", desc: "Priorizamos soluções que protejam pessoas, processos e produtos em todas as etapas da operação." },
  { title: "Parceria", desc: "Caminhamos junto do cliente antes, durante e depois da entrega, sustentando resultados de longo prazo." },
];

const depoimentos = [
  {
    title: "Conhecimento técnico e compromisso",
    quote:
      "A experiência com a CLEOM foi muito positiva. O que mais nos chamou atenção foi a capacidade da equipe de compreender as particularidades da nossa operação e apresentar soluções adequadas às nossas necessidades. O conhecimento técnico, a agilidade e o compromisso em cada etapa fazem da CLEOM uma empresa que podemos recomendar com confiança.",
    author: "Eng. Marcelo Ferreira",
    role: "Engenheiro de Produção",
    place: "Paraná – PR",
  },
  {
    title: "Soluções que realmente fazem a diferença",
    quote:
      "Trabalhar com a CLEOM é contar com uma equipe que entende os desafios da indústria frigorífica. A empresa demonstra profissionalismo, conhecimento e atenção aos detalhes, sempre buscando soluções eficientes e de qualidade. É uma parceria que agrega valor à operação e transmite segurança na tomada de decisões.",
    author: "Eng. Camilla Rodrigues",
    role: "Engenheira Mecânica",
    place: "Minas Gerais – MG",
  },
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
            <p className="text-cyan-accent uppercase tracking-[0.3em] text-sm mb-3">{t("Quem somos")}</p>
            <h2 className="text-4xl text-navy-deep mb-6">{t("Engenharia que move a indústria frigorífica")}</h2>
            {quemSomos.map((p) => (
              <p key={p} className="text-muted-foreground mb-4">{t(p)}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 navy-gradient text-white">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
            <p className="text-cyan-accent uppercase tracking-[0.3em] text-sm mb-3">{t("Missão")}</p>
            <p className="text-chrome/85 text-lg">
              {t("Desenvolver e oferecer soluções para o setor frigorífico que unam qualidade, tecnologia e eficiência, contribuindo para a evolução dos processos, a produtividade e os resultados de nossos clientes.")}
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
            <p className="text-cyan-accent uppercase tracking-[0.3em] text-sm mb-3">{t("Visão")}</p>
            <p className="text-chrome/85 text-lg">
              {t("Ser reconhecida como referência em soluções para o setor frigorífico, destacando-se pela qualidade, inovação, excelência e capacidade de compreender e atender às necessidades de cada cliente.")}
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mb-12">
            <p className="text-cyan-accent uppercase tracking-[0.3em] text-sm mb-3">{t("Valores")}</p>
            <h2 className="text-4xl text-navy-deep">{t("O que nos guia")}</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {valores.map((v) => (
              <div key={v.title} className="bg-card p-6 rounded-2xl border border-border">
                <h3 className="text-xl text-navy-deep mb-2 uppercase tracking-wide">{t(v.title)}</h3>
                <p className="text-sm text-muted-foreground">{t(v.desc)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <p className="text-cyan-accent uppercase tracking-[0.3em] text-sm mb-3">{t("Nosso propósito")}</p>
          <p className="text-2xl md:text-3xl text-navy-deep leading-snug">
            {t("Criar soluções que impulsionem a indústria frigorífica, transformando necessidades e desafios em eficiência, qualidade e resultados.")}
          </p>
        </div>
      </section>

      <section className="py-20 bg-background">
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

      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-4xl text-navy-deep">{t("O que os clientes estão falando?")}</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {depoimentos.map((d) => (
              <div key={d.author} className="bg-card p-8 rounded-3xl border border-border flex flex-col">
                <Quote className="w-8 h-8 text-cyan-accent mb-4" />
                <h3 className="text-xl text-navy-deep mb-3">{t(d.title)}</h3>
                <p className="text-muted-foreground italic flex-1">“{t(d.quote)}”</p>
                <div className="mt-6">
                  <p className="text-navy-deep font-semibold">{d.author}</p>
                  <p className="text-sm text-muted-foreground">{t(d.role)} — {d.place}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
