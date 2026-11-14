import Image from "next/image";
import { CalendarX2, Dumbbell, UserRoundCheck, Wifi, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { PendingBadge } from "@/components/ui/pending-badge";
import { business, facts } from "@/data/business";
import { aboutPhotos } from "@/data/photos";

const factIcons: Record<(typeof facts.items)[number]["id"], LucideIcon> = {
  musculacao: Dumbbell,
  "sem-agendamento": CalendarX2,
  personal: UserRoundCheck,
  wifi: Wifi,
};

/**
 * Apresentação em superfície clara (como a placa e as paredes brancas da
 * academia), em contraste com o hero escuro.
 */
export function About() {
  const { main, detail } = aboutPhotos;

  return (
    <section id="sobre" aria-labelledby="sobre-titulo" className="superficie-clara bg-cal text-tinta">
      <div className="mx-auto grid max-w-[88rem] gap-14 px-5 py-24 sm:px-8 lg:grid-cols-12 lg:gap-12 lg:px-12 lg:py-32">
        {/* Fotos sobrepostas */}
        <div className="relative lg:col-span-6 xl:col-span-7">
          <Reveal className="relative aspect-[4/5] overflow-hidden rounded-md sm:aspect-[5/4] lg:aspect-[5/6]">
            <Image
              src={main.src}
              alt={main.alt}
              fill
              sizes="(min-width: 1280px) 52vw, (min-width: 1024px) 46vw, 100vw"
              className="object-cover"
              style={{ objectPosition: main.focus }}
            />
          </Reveal>
          <Reveal
            delay={0.15}
            className="absolute -bottom-10 -left-2 w-[38%] max-w-60 overflow-hidden rounded-md border-[6px] border-cal sm:-bottom-12 lg:-right-10 lg:left-auto lg:w-[34%]"
          >
            <div className="relative aspect-[3/4]">
              <Image
                src={detail.src}
                alt={detail.alt}
                fill
                sizes="(min-width: 1024px) 15rem, 38vw"
                className="object-cover"
                style={{ objectPosition: detail.focus }}
              />
            </div>
          </Reveal>
        </div>

        {/* Texto */}
        <div className="flex flex-col justify-center pt-6 lg:col-span-6 lg:pt-0 lg:pl-8 xl:col-span-5">
          <Reveal>
            <h2 id="sobre-titulo" className="titulo-secao">
              Um espaço
              <br />
              para evoluir.
            </h2>
          </Reveal>

          <Reveal delay={0.1} className="mt-8 max-w-[34rem] space-y-4 texto-corrido text-tinta/80">
            <p>
              A Academia Suprema fica no bairro José Rodrigues Maciel, em Linhares. O foco é a musculação: treino de
              força, feito com constância e no seu ritmo.
            </p>
            <p>
              Não é preciso agendar horário. Você chega, treina e segue o dia. Para quem quer orientação de perto, há
              acompanhamento com personal trainer.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <figure className="mt-10 max-w-[34rem] border-l-[3px] border-verde pl-5">
              <blockquote className="font-display text-[1.65rem] leading-[1.1] font-bold italic sm:text-[1.9rem]">
                “{business.bioQuote.text}”
              </blockquote>
              <figcaption className="mt-3 text-[0.9rem] text-tinta/65">
                Bio da academia no Instagram, {business.instagram.display}
              </figcaption>
            </figure>
          </Reveal>

          <Reveal delay={0.2} className="mt-12">
            <dl className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
              {facts.items.map((item) => {
                const Icon = factIcons[item.id];
                return (
                  <div key={item.id} className="flex gap-3.5">
                    <span className="mt-0.5 grid size-10 shrink-0 place-items-center rounded-md bg-tinta text-verde-vivo">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <div>
                      <dt className="font-semibold">{item.title}</dt>
                      <dd className="mt-0.5 text-[0.95rem] leading-snug text-tinta/70">{item.text}</dd>
                    </div>
                  </div>
                );
              })}
            </dl>
            <p className="mt-6 flex flex-wrap items-center gap-2 text-[0.82rem] text-tinta/60">
              Informações da página da academia no Wellhub.
              {!facts.confirmed && <PendingBadge tone="claro" />}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
