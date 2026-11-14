import Image from "next/image";
import { WhatsAppIcon } from "@/components/brand/BrandIcons";
import { buttonVariants } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { PendingBadge } from "@/components/ui/pending-badge";
import { facts, whatsappLink } from "@/data/business";
import { modalityPhotos } from "@/data/photos";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

/**
 * Só o que foi verificado: musculação (modalidade) e personal trainer
 * (comodidade). Outras atividades entram depois de confirmadas.
 */
export function Modalities() {
  return (
    <section id="modalidades" aria-labelledby="modalidades-titulo" className="bg-chumbo">
      <div className="mx-auto max-w-[88rem] px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
        <Reveal className="max-w-3xl">
          <h2 id="modalidades-titulo" className="titulo-secao">
            Como você
            <br />
            vai treinar.
          </h2>
          <p className="mt-6 max-w-[34rem] texto-corrido text-branco/75">
            A Suprema é uma academia de musculação. Você treina por conta própria no seu horário ou com
            acompanhamento individual.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:mt-20 lg:grid-cols-12 lg:items-start lg:gap-8">
          {/* Musculação */}
          <Reveal className="lg:col-span-7">
            <article className="flex flex-col overflow-hidden rounded-md bg-placa shadow-[0_30px_60px_-30px_rgb(0_0_0/0.7)]">
              <div className="relative aspect-[16/10]">
                <Image
                  src={modalityPhotos.musculacao.src}
                  alt={modalityPhotos.musculacao.alt}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                  style={{ objectPosition: modalityPhotos.musculacao.focus }}
                />
              </div>
              <div className="flex flex-1 flex-col gap-4 p-6 sm:p-8">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <h3 className="font-display text-[2.6rem] leading-none font-extrabold uppercase italic sm:text-[3.25rem]">
                    Musculação
                  </h3>
                  <span className="rounded-sm bg-verde/15 px-2.5 py-1 text-[0.85rem] font-semibold text-verde-vivo">
                    Sem agendamento
                  </span>
                </div>
                <p className="max-w-[36rem] texto-corrido text-branco/75">
                  Treino de força com pesos e aparelhos, para quem está começando e para quem já treina há tempo. Você
                  chega no horário que encaixa na sua rotina, sem precisar marcar.
                </p>
              </div>
            </article>
          </Reveal>

          {/* Personal trainer */}
          <Reveal delay={0.12} className="lg:col-span-5 lg:mt-24">
            <article className="flex flex-col overflow-hidden rounded-md border border-white/10 bg-grafite">
              <div className="relative aspect-[16/10] lg:aspect-[4/3]">
                <Image
                  src={modalityPhotos.personal.src}
                  alt={modalityPhotos.personal.alt}
                  fill
                  sizes="(min-width: 1024px) 36vw, 100vw"
                  className="object-cover"
                  style={{ objectPosition: modalityPhotos.personal.focus }}
                />
              </div>
              <div className="flex flex-1 flex-col gap-4 p-6 sm:p-8">
                <h3 className="font-display text-[2.2rem] leading-none font-extrabold uppercase italic sm:text-[2.6rem]">
                  Personal trainer
                </h3>
                <p className="texto-corrido text-branco/75">
                  Para quem quer orientação de perto: acompanhamento individual durante o treino. Pergunte pela
                  disponibilidade e pelos valores.
                </p>
                <a
                  href={whatsappLink("Olá! Quero saber sobre treino com personal trainer na Academia Suprema.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(buttonVariants({ variant: "contorno" }), "mt-2 self-start")}
                >
                  <WhatsAppIcon className="size-4" />
                  Perguntar sobre personal
                </a>
              </div>
            </article>
          </Reveal>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-2 text-[0.85rem] text-cinza lg:mt-8">
          Modalidade e comodidade listadas na página da academia no Wellhub.
          {!facts.confirmed && <PendingBadge />}
        </div>

        {site.isPreview && (
          <div className="mt-8 rounded-md border border-dashed border-white/20 p-6 text-branco/70 sm:p-8">
            <p className="font-display text-[1.5rem] leading-none font-bold text-branco italic">Outras modalidades</p>
            <p className="mt-2 max-w-[44rem] text-[0.95rem] leading-relaxed">
              Espaço reservado na prévia. Se a Suprema oferecer aulas ou outras atividades, elas entram aqui depois de
              confirmadas com a academia. Este bloco não aparece no site oficial.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
