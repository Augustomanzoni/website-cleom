import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      { title: "Contato — CLEOM Soluções Frigoríficas" },
      { name: "description", content: "Entre em contato com a CLEOM para orçamentos e atendimento técnico." },
      { property: "og:title", content: "Contato — CLEOM" },
      { property: "og:description", content: "Fale com nossa equipe de engenharia." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ContatoPage,
});

function ContatoPage() {
  const { t } = useI18n();
  const [sent, setSent] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const nome = String(formData.get("nome") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const telefone = String(formData.get("telefone") ?? "").trim();
    const empresa = String(formData.get("empresa") ?? "").trim();
    const mensagem = String(formData.get("mensagem") ?? "").trim();

    if (!nome || !email || !telefone || !mensagem) {
      return;
    }

    setSent(true);
    event.currentTarget.reset();
  };

  return (
    <>
      <PageHero
        eyebrow={t("Contato")}
        title={<>{t("VAMOS ENCONTRAR")} <br />{t("SUA SOLUÇÃO JUNTOS")}</>}
        subtitle={t("Nossa equipe está pronta para atender sua empresa!")}
      />

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12">
          <div className="bg-card p-8 rounded-3xl border border-border shadow-sm">
            <h2 className="text-2xl text-navy-deep mb-6">{t("Envie sua mensagem")}</h2>
            {sent ? (
              <div className="p-6 rounded-2xl bg-secondary text-navy-deep">
                {t("✓ Formulário registrado. O envio direto por e-mail está preparado, mas permanece desativado por enquanto.")}
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                {[
                  { label: "Nome completo", type: "text", placeholder: "Seu nome", name: "nome", required: true },
                  { label: "E-mail", type: "email", placeholder: "seu@email.com", name: "email", required: true },
                  { label: "Telefone", type: "tel", placeholder: "(00) 00000-0000", name: "telefone", required: true },
                  { label: "Empresa", type: "text", placeholder: "Razão social", name: "empresa", required: false },
                ].map((f) => (
                  <div key={f.label}>
                    <label className="block text-sm text-navy-deep mb-2">{t(f.label)}</label>
                    <input
                      name={f.name}
                      required={f.required}
                      type={f.type}
                      placeholder={t(f.placeholder)}
                      className="w-full px-4 py-3 border border-border rounded-xl bg-background focus:outline-none focus:ring-2 focus:ring-cyan-accent"
                    />
                  </div>
                ))}
                <div>
                  <label className="block text-sm text-navy-deep mb-2">{t("Mensagem")}</label>
                  <textarea name="mensagem" required rows={5} placeholder={t("Descreva sua necessidade...")}
                    className="w-full px-4 py-3 border border-border rounded-xl bg-background focus:outline-none focus:ring-2 focus:ring-cyan-accent" />
                </div>
                <button
                  type="submit"
                  className="w-full bg-navy-deep text-white py-4 rounded-xl uppercase tracking-wider text-sm font-semibold hover:bg-white hover:text-navy-deep border border-navy-deep transition-colors"
                >{t("Enviar mensagem")}</button>
                <p className="text-sm text-muted-foreground">
                  {t("O envio automático para o comercial ficará ativo assim que configurarmos a infraestrutura de envio direto.")}
                </p>
              </form>
            )}
          </div>

          <div>
            <h2 className="text-2xl text-navy-deep mb-6">{t("Informações")}</h2>
            <div className="space-y-5">
              {[
                { icon: Phone, title: "Telefone", lines: ["(00) 0000-0000"] },
                { icon: Mail, title: "E-mail", lines: ["comercial@cleom.ind.br", "financeiro@cleom.ind.br"] },
                { icon: MapPin, title: "Endereço", lines: ["Rua Camaquã, 780 - D", "Bairro Líder - Q. 4027", "Chapecó - SC - CEP 89805-250"] },
                { icon: Clock, title: "Atendimento", lines: ["Segunda a sexta: 8h às 18h", "Sábado: 8h às 12h"] },
              ].map((i) => (
                <div key={i.title} className="flex gap-4 p-5 bg-secondary rounded-2xl">
                  <div className="w-12 h-12 navy-gradient rounded-xl flex items-center justify-center flex-shrink-0">
                    <i.icon className="w-5 h-5 text-cyan-accent" />
                  </div>
                  <div>
                    <h3 className="text-navy-deep mb-1">{t(i.title)}</h3>
                    {i.lines.map((l) => <p key={l} className="text-sm text-muted-foreground">{t(l)}</p>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
