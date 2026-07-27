import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Snowflake, Zap, Shield, Headphones } from "lucide-react";
import { SolutionsGrid } from "@/components/site/SolutionsGrid";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CLEOM — Soluções Frigoríficas Industriais" },
      { name: "description", content: "Equipamentos frigoríficos industriais de alta performance: aves, suínos, evisceração e higienização." },
      { property: "og:title", content: "CLEOM — Soluções Frigoríficas Industriais" },
      { property: "og:description", content: "Equipamentos frigoríficos industriais de alta performance: aves, suínos, evisceração e higienização." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[88vh] flex items-center navy-gradient text-white overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <img
            src="https://images.unsplash.com/photo-1565017225399-58c1b80e63bd?auto=format&fit=crop&w=1920&q=80"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-deep via-navy-deep/85 to-navy-deep/40" />
        </div>
        <div className="relative container mx-auto px-4 py-20">
          <p className="text-cyan-accent uppercase tracking-[0.35em] mb-5 text-base">ENTREGAMOS&nbsp;</p>
          <h1 className="text-4xl md:text-6xl uppercase chrome-text leading-[1.2] pb-2 max-w-4xl">
            SOLUÇÕES FRIGORÍFICAS INDUSTRIAIS DE ALTA PERFORMANCE
          </h1>
          <p className="mt-6 text-lg md:text-xl text-chrome/80 max-w-2xl">
            Projetamos, fabricamos e instalamos equipamentos industriais para frigoríficos com foco em
            produtividade, eficiência e segurança!
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to="/nossas-solucoes"
              className="group bg-white text-navy-deep px-7 py-4 rounded-full uppercase tracking-wider text-sm font-semibold inline-flex items-center gap-2 hover:bg-chrome hover:text-navy-deep transition-colors"
            >
              Nossas Soluções
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/contato"
              className="border border-chrome/40 text-chrome px-7 py-4 rounded-full uppercase tracking-wider text-sm font-semibold hover:bg-white hover:text-navy-deep transition-colors"
            >
              Solicitar orçamento
            </Link>
          </div>
        </div>
      </section>

      {/* Stats / Benefits */}
      <section className="bg-navy text-white py-16">
        <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { v: "20+", l: "Anos de mercado" },
            { v: "500+", l: "Projetos entregues" },
            { v: "40%", l: "Economia energética" },
            { v: "24h", l: "Suporte técnico" },
          ].map((s) => (
            <div key={s.l}>
              <div className="text-4xl md:text-5xl chrome-text font-bold">{s.v}</div>
              <div className="text-chrome/70 uppercase tracking-wider text-xs mt-2">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      <SolutionsGrid />

      {/* Benefits */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mb-12">
            <p className="text-cyan-accent uppercase tracking-[0.3em] text-sm mb-3">Diferenciais</p>
            <h2 className="text-4xl md:text-5xl text-navy-deep">Por que escolher a CLEOM</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Snowflake, title: "Tecnologia Frigorífica", desc: "Sistemas modernos com controle preciso de temperatura." },
              { icon: Zap, title: "Eficiência Energética", desc: "Equipamentos que reduzem o consumo em até 40%." },
              { icon: Shield, title: "Padrão Sanitário", desc: "Aço inox 304/316 e conformidade com normas do MAPA." },
              { icon: Headphones, title: "Suporte 24h", desc: "Assistência técnica especializada quando você precisar." },
            ].map((b) => (
              <div key={b.title} className="bg-card p-6 rounded-2xl border border-border hover:border-cyan-accent transition-colors">
                <div className="w-12 h-12 rounded-xl navy-gradient flex items-center justify-center mb-4">
                  <b.icon className="w-6 h-6 text-cyan-accent" />
                </div>
                <h3 className="text-xl mb-2 text-navy-deep">{b.title}</h3>
                <p className="text-sm text-muted-foreground">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="navy-gradient text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl uppercase chrome-text mb-4">PRONTO PARA ENCONTRAR SUA SOLUÇÃO?</h2>
          <p className="text-chrome/80 max-w-2xl mx-auto mb-8">
            Nossa equipe de engenharia desenvolve projetos sob medida para sua operação.
          </p>
          <Link
            to="/contato"
            className="inline-flex items-center gap-2 bg-white text-navy-deep px-8 py-4 rounded-full uppercase tracking-wider text-sm font-semibold hover:bg-chrome hover:text-navy-deep transition-colors"
          >
            Fale com um especialista <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
