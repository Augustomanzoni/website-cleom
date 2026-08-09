import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { SolutionsGrid } from "@/components/site/SolutionsGrid";
import { CatalogDownloadSection } from "@/components/site/CatalogDownloadSection";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/nossas-solucoes/")({
  head: () => ({
    meta: [
      { title: "Nossas Soluções — CLEOM" },
      { name: "description", content: "Linhas completas para aves, suínos e industrializados, evisceração e higienização." },
      { property: "og:title", content: "Nossas Soluções — CLEOM" },
      { property: "og:description", content: "Tecnologia industrial para equipamentos de alta performance." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SolucoesPage,
});

function SolucoesPage() {
  const { t } = useI18n();
  return (
    <>
      <PageHero
        eyebrow={t("Nossas Soluções")}
        title={<>{t("Tecnologia industrial para alta performance")}</>}
        subtitle={t("Conheça as linhas de atuação e os produtos CLEOM para cada etapa do processo frigorífico.")}
        image="https://images.unsplash.com/photo-1574739782594-db4ead022697?auto=format&fit=crop&w=1920&q=80"
      />
      <SolutionsGrid heading={false} />
      <CatalogDownloadSection />
    </>
  );
}
