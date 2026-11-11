import PeriodicTable from "@/components/PeriodicTable";
import SobreAutor from "@/components/SobreAutor";
import IntroPortada from "@/components/IntroPortada";
import JsonLd from "@/components/JsonLd";
import { personaJsonLd } from "@/lib/autor";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

export default function HomePage() {
  return (
    <div className="max-w-[88rem] mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <PeriodicTable />
      <SobreAutor />
      <IntroPortada />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: SITE_NAME,
          url: SITE_URL,
          description: SITE_DESCRIPTION,
          inLanguage: "es",
          author: personaJsonLd(),
        }}
      />
    </div>
  );
}
