import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/nossas-solucoes/pecas-de-reposicao")({
  head: () => ({
    meta: [
      { title: "Peças de Reposição — CLEOM" },
      { name: "description", content: "Peças de reposição originais e sob medida para equipamentos frigoríficos, com pronta entrega e suporte técnico." },
      { property: "og:title", content: "Peças de Reposição — CLEOM" },
      { property: "og:description", content: "Peças originais, componentes sanitários e suporte técnico para manter sua linha em operação." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PecasReposicaoPage,
});

const paragraphs = [
  "A CLEOM fornece peças de reposição para equipamentos e linhas de processamento frigorífico, garantindo a continuidade da operação, a segurança dos processos e a preservação do padrão sanitário da sua planta.",
  "Trabalhamos com componentes originais e também com peças fabricadas sob medida a partir de desenho, amostra ou levantamento técnico realizado em campo, atendendo equipamentos CLEOM e de outros fabricantes.",
  "Todas as peças são produzidas em materiais adequados ao contato com alimentos, como aço inox AISI 304 e 316, polímeros técnicos de grau alimentício e componentes de marcas reconhecidas no mercado industrial.",
];

const itens = [
  "Ganchos, carretilhas, roldanas e componentes de nória",
  "Trilhos, curvas, chaves desviadoras e acessórios de trilhagem",
  "Correntes, esteiras modulares, taliscas e guias",
  "Dedos de depenadeira, discos, lâminas e facas industriais",
  "Motorredutores, mancais, rolamentos e conjuntos de tração",
  "Bicos aspersores, bombas, válvulas, tubulações e conexões sanitárias",
  "Componentes pneumáticos, elétricos e de automação",
  "Peças especiais usinadas sob desenho ou amostra",
];

const beneficios = [
  { title: "Compatibilidade garantida", desc: "Identificação técnica da peça correta para o seu equipamento, evitando erros de aplicação e retrabalho." },
  { title: "Padrão sanitário", desc: "Materiais e acabamentos adequados às normas de higiene da indústria de alimentos." },
  { title: "Agilidade no atendimento", desc: "Itens de maior giro com pronta entrega e prazos reduzidos para peças sob medida." },
  { title: "Suporte técnico", desc: "Nossa equipe auxilia na identificação, na substituição e no plano de manutenção preventiva." },
];

function PecasReposicaoPage() {
  const { t } = useI18n();

  return (
    <>
      <PageHero
        eyebrow={t("Nossa Linha")}
        title={t("Peças de Reposição")}
        subtitle={t("Componentes originais e sob medida para manter sua linha de produção em pleno funcionamento.")}
        image={pecasReposicao}
        titleClassName="text-5xl md:text-7xl"
      >
        <Link
          to="/nossas-solucoes"
          className="inline-flex items-center gap-2 mt-6 text-chrome/70 hover:text-cyan-accent text-sm uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4" /> {t("Voltar para Nossas Soluções")}
        </Link>
      </PageHero>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="flex-1 max-w-3xl">
              {paragraphs.map((p) => (
                <p key={p} className="text-muted-foreground text-lg mb-5">{t(p)}</p>
              ))}

              <h2 className="text-3xl text-navy-deep mt-12 mb-6">{t("O que fornecemos")}</h2>
              <ul className="space-y-3">
                {itens.map((i) => (
                  <li key={i} className="flex gap-3 text-muted-foreground">
                    <CheckCircle2 className="w-5 h-5 text-cyan-accent shrink-0 mt-0.5" />
                    <span>{t(i)}</span>
                  </li>
                ))}
              </ul>

              <h2 className="text-3xl text-navy-deep mt-12 mb-6">{t("Por que comprar com a CLEOM")}</h2>
              <div className="grid sm:grid-cols-2 gap-5">
                {beneficios.map((b) => (
                  <div key={b.title} className="bg-card border border-border rounded-2xl p-6">
                    <h3 className="text-lg text-navy-deep uppercase tracking-wide mb-2">{t(b.title)}</h3>
                    <p className="text-sm text-muted-foreground">{t(b.desc)}</p>
                  </div>
                ))}
              </div>

              <h2 className="text-3xl text-navy-deep mt-12 mb-4">{t("Como solicitar")}</h2>
              <p className="text-muted-foreground text-lg">
                {t("Envie o modelo do equipamento, o código ou uma foto da peça desejada. Nossa equipe técnica identifica o item, confirma a compatibilidade e envia o orçamento com prazo de entrega.")}
              </p>
            </div>

            <aside className="lg:w-80 space-y-4 lg:pt-2">
              <Link
                to="/contato"
                className="inline-flex justify-center w-full bg-navy-deep text-white px-6 py-4 rounded-full uppercase tracking-wider text-sm font-semibold hover:bg-white hover:text-navy-deep border border-navy-deep transition-colors"
              >
                {t("Solicitar orçamento")}
              </Link>
              <div className="rounded-2xl bg-secondary p-6">
                <p className="text-cyan-accent uppercase tracking-[0.3em] text-xs mb-3">{t("Atendimento")}</p>
                <p className="text-sm text-muted-foreground">
                  {t("Atendemos frigoríficos de aves, bovinos e suínos em todo o Brasil, com suporte técnico especializado para manutenção preventiva e corretiva.")}
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
