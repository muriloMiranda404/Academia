import { About } from "@/components/home/About";
import { Contact } from "@/components/home/Contact";
import { Gallery } from "@/components/home/Gallery";
import { Hero } from "@/components/home/Hero";
import { Modalities } from "@/components/home/Modalities";
import { Plans } from "@/components/home/Plans";
import { Structure } from "@/components/home/Structure";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { business } from "@/data/business";
import { site } from "@/data/site";

// Dados estruturados (academia local). Só entram dados já encontrados em fontes públicas.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ExerciseGym",
  name: business.name,
  url: site.url,
  telephone: `+${business.whatsapp.number}`,
  sameAs: [business.instagram.href],
  address: {
    "@type": "PostalAddress",
    streetAddress: business.address.street,
    addressLocality: business.city,
    addressRegion: business.state,
    postalCode: business.address.cep,
    addressCountry: "BR",
  },
};

export default function Home() {
  return (
    <>
      <Header />
      <main id="conteudo">
        <Hero />
        <About />
        <Structure />
        <Modalities />
        <Plans />
        <Gallery />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
      {!site.isPreview && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      )}
    </>
  );
}
