import { Check, ExternalLink } from "lucide-react";
import { WhatsAppIcon } from "@/components/brand/BrandIcons";
import { buttonVariants } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { PendingBadge } from "@/components/ui/pending-badge";
import { business, whatsappLink } from "@/data/business";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

/**
 * Nenhum preço é exibido: a academia não publica valores. Os cartões mostram
 * as formas de começar que foram encontradas (matrícula direta, Wellhub e
 * personal) e levam ao WhatsApp para consulta.
 */
const options = [
  {
    id: "matricula",
    name: "Matrícula na academia",
    text: "Mensalidade direto com a Suprema para treinar musculação no horário de funcionamento.",
    includes: ["Musculação", "Treino sem agendamento", "Wi-Fi"],
    price: "Valores sob consulta",
    cta: { label: "Consultar valores", href: whatsappLink("Olá! Quero saber os valores dos planos da Academia Suprema.") },
    featured: true,
    pending: "planos a confirmar",
  },
  {
    id: "wellhub",
    name: "Wellhub",
    text: `Tem Wellhub pela empresa? A Suprema aparece como parceira a partir do plano ${business.wellhub.minimumPlan}.`,
    includes: ["Check-in pelo app do Wellhub", "Musculação no horário de funcionamento"],
    price: `A partir do plano ${business.wellhub.minimumPlan}`,
    cta: { label: "Ver a Suprema no Wellhub", href: business.wellhub.href, external: true },
    featured: false,
    pending: business.wellhub.confirmed ? null : "a confirmar",
  },
  {
    id: "personal",
    name: "Com personal trainer",
    text: "Acompanhamento individual durante o treino, para quem quer orientação de perto.",
    includes: ["Orientação na execução", "Treino ajustado ao seu objetivo"],
    price: "Valores sob consulta",
    cta: {
      label: "Perguntar sobre personal",
      href: whatsappLink("Olá! Quero saber sobre treino com personal trainer na Academia Suprema."),
    },
    featured: false,
    pending: "valores a confirmar",
  },
];

export function Plans() {
  return (
    <section id="planos" aria-labelledby="planos-titulo" className="superficie-clara bg-cal text-tinta">
      <div className="mx-auto max-w-[88rem] px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-7">
            <h2 id="planos-titulo" className="titulo-secao">
              Escolha como
              <br />
              começar.
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-5 lg:pb-2">
            <p className="max-w-[30rem] texto-corrido text-tinta/75">
              Valores e condições mudam, então a equipe passa tudo atualizado pelo WhatsApp. Escolha o caminho e
              chame.
            </p>
          </Reveal>
        </div>

        <ul className="mt-14 grid gap-5 lg:mt-20 lg:grid-cols-3 lg:items-stretch lg:gap-6">
          {options.map((option, index) => (
            <li key={option.id} className={cn(option.featured && "lg:-mt-6 lg:mb-6")}>
              <Reveal
                delay={index * 0.08}
                className={cn(
                  "flex h-full flex-col rounded-md p-7 sm:p-8",
                  option.featured
                    ? "bg-grafite text-branco shadow-[0_40px_70px_-35px_rgb(16_18_20/0.75)]"
                    : "border border-tinta/12 bg-white",
                )}
              >
                <h3 className="font-display text-[2rem] leading-none font-extrabold uppercase italic">{option.name}</h3>
                {option.pending && (
                  <PendingBadge tone={option.featured ? "escuro" : "claro"} className="mt-3 self-start">
                    {option.pending}
                  </PendingBadge>
                )}
                <p className={cn("mt-4 leading-relaxed", option.featured ? "text-branco/75" : "text-tinta/75")}>
                  {option.text}
                </p>

                <p
                  className={cn(
                    "mt-7 border-t pt-6 font-display text-[1.6rem] leading-none font-bold italic",
                    option.featured ? "border-white/12 text-verde-vivo" : "border-tinta/10 text-verde-fundo",
                  )}
                >
                  {option.price}
                </p>

                <ul className="mt-6 mb-9 space-y-2.5">
                  {option.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-[0.98rem]">
                      <Check
                        className={cn("mt-0.5 size-4.5 shrink-0", option.featured ? "text-verde-vivo" : "text-verde-fundo")}
                        aria-hidden
                      />
                      {item}
                    </li>
                  ))}
                </ul>

                <a
                  href={option.cta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(buttonVariants({ variant: option.featured ? "verde" : "contorno-claro" }), "mt-auto")}
                >
                  {"external" in option.cta ? (
                    <ExternalLink className="size-4" aria-hidden />
                  ) : (
                    <WhatsAppIcon className="size-4" />
                  )}
                  {option.cta.label}
                  {"external" in option.cta && <span className="sr-only">(abre o site do Wellhub)</span>}
                </a>
              </Reveal>
            </li>
          ))}
        </ul>

        {site.isPreview && (
          <p className="mt-10 max-w-[48rem] text-[0.88rem] leading-relaxed text-tinta/60">
            Estrutura demonstrativa: tipos de plano, periodicidades e preços serão publicados só depois de confirmados
            com a academia.
          </p>
        )}
      </div>
    </section>
  );
}
