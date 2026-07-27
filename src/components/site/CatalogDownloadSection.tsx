import { useMemo, useState, type FormEvent } from "react";
import { Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { solutions } from "@/lib/solutions";

export function CatalogDownloadSection() {
  const [selectedCatalog, setSelectedCatalog] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const activeSolution = useMemo(
    () => solutions.find((solution) => solution.slug === selectedCatalog) ?? null,
    [selectedCatalog],
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatusMessage(
      "O envio e o download automático de catálogos ainda estão desativados. Assim que você me enviar os PDFs e ativarmos o envio direto, essa etapa passa a funcionar sem abrir o app de e-mail.",
    );
  };

  return (
    <>
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mb-10">
            <p className="text-cyan-accent uppercase tracking-[0.3em] text-sm mb-3">Catálogos</p>
            <h2 className="text-4xl md:text-5xl text-navy-deep mb-4">Solicite o catálogo da linha que deseja analisar</h2>
            <p className="text-muted-foreground text-lg">
              Escolha uma categoria para deixar seus dados prontos. O download automático será ativado quando os catálogos finais forem enviados.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {solutions.map((solution) => (
              <article
                key={solution.slug}
                className="flex items-center justify-between gap-4 rounded-2xl border border-border bg-card p-5"
              >
                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-[0.3em] text-cyan-accent mb-2">Catálogo</p>
                  <h3 className="text-2xl text-navy-deep uppercase leading-none mb-2">{solution.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{solution.tagline}</p>
                </div>
                <Button
                  type="button"
                  onClick={() => {
                    setSelectedCatalog(solution.slug);
                    setStatusMessage(null);
                  }}
                  className="h-11 min-w-11 rounded-full px-4"
                >
                  <Download />
                </Button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Dialog open={Boolean(selectedCatalog)} onOpenChange={(open) => !open && setSelectedCatalog(null)}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>Solicitar catálogo {activeSolution?.title}</DialogTitle>
            <DialogDescription>
              Preencha seus dados para liberar este material quando o catálogo final estiver disponível.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="catalogo-nome" className="block text-sm text-navy-deep mb-2">Nome completo</label>
              <input
                id="catalogo-nome"
                name="nome"
                required
                placeholder="Seu nome"
                className="w-full rounded-xl border border-border bg-background px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-accent"
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="catalogo-email" className="block text-sm text-navy-deep mb-2">E-mail</label>
                <input
                  id="catalogo-email"
                  name="email"
                  type="email"
                  required
                  placeholder="seu@email.com"
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-accent"
                />
              </div>
              <div>
                <label htmlFor="catalogo-telefone" className="block text-sm text-navy-deep mb-2">Telefone</label>
                <input
                  id="catalogo-telefone"
                  name="telefone"
                  type="tel"
                  required
                  placeholder="(00) 00000-0000"
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-accent"
                />
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-secondary p-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2 text-navy-deep mb-2">
                <FileText className="w-4 h-4 text-cyan-accent" />
                <span className="font-medium">Catálogo selecionado</span>
              </div>
              {activeSolution?.title ?? "Catálogo CLEOM"}
            </div>

            {statusMessage && (
              <div className="rounded-2xl border border-border bg-secondary p-4 text-sm text-muted-foreground">
                {statusMessage}
              </div>
            )}

            <Button type="submit" className="w-full h-12 rounded-xl uppercase tracking-wider">
              Solicitar catálogo
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}