"use client";

import { useState } from "react";
import Image from "next/image";
import { Expand } from "lucide-react";
import { WhatsAppIcon } from "@/components/brand/BrandIcons";
import { Reveal } from "@/components/ui/reveal";
import { whatsappLink } from "@/data/business";
import { photosAreIllustrative, structurePhotos, type StructurePhoto } from "@/data/photos";
import { cn } from "@/lib/utils";
import { Lightbox } from "./Lightbox";

const areaClasses: Record<StructurePhoto["area"], string> = {
  destaque: "col-span-2 row-span-2",
  alta: "row-span-2",
  larga: "col-span-2",
  pequena: "",
};

/** Mosaico (bento) dos ambientes, com visualização ampliada. */
export function Structure() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="estrutura" aria-labelledby="estrutura-titulo" className="bg-grafite">
      <div className="mx-auto max-w-[88rem] px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-7">
            <h2 id="estrutura-titulo" className="titulo-secao">
              Conheça o espaço
              <br />
              antes de chegar.
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-5 lg:pb-2">
            <p className="max-w-[30rem] texto-corrido text-branco/75">
              Musculação com pesos e aparelhos, em um salão pensado para o treino de força. Toque em qualquer foto para
              ver em tela cheia.
            </p>
            {photosAreIllustrative && (
              <p className="mt-3 text-[0.85rem] text-cinza">
                Fotos ilustrativas. Na versão final, entram fotos dos ambientes da Suprema.
              </p>
            )}
          </Reveal>
        </div>

        <Reveal delay={0.1} className="mt-12 lg:mt-16">
          <ul className="grid auto-rows-[10.5rem] grid-flow-dense grid-cols-2 gap-2.5 sm:auto-rows-[13rem] sm:gap-3 lg:auto-rows-[15rem] lg:grid-cols-4 lg:gap-4">
            {structurePhotos.map((photo, index) => (
              <li key={photo.src} className={areaClasses[photo.area]}>
                <button
                  type="button"
                  onClick={() => setOpen(index)}
                  aria-label={`Ampliar foto: ${photo.caption}`}
                  className="group relative block size-full overflow-hidden rounded-md bg-placa text-left"
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes={
                      photo.area === "destaque" || photo.area === "larga"
                        ? "(min-width: 1024px) 44rem, 100vw"
                        : "(min-width: 1024px) 22rem, 50vw"
                    }
                    className="object-cover transition-transform duration-700 ease-suave group-hover:scale-[1.04]"
                    style={{ objectPosition: photo.focus }}
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-grafite/90 via-grafite/10 to-transparent" />
                  <span className="absolute top-3 right-3 grid size-9 place-items-center rounded-full bg-grafite/70 text-branco opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                    <Expand className="size-4" aria-hidden />
                  </span>
                  <span className="absolute inset-x-0 bottom-0 p-3.5 sm:p-5">
                    <span
                      className={cn(
                        "block font-display leading-none font-bold italic",
                        photo.area === "destaque" ? "text-[1.6rem] sm:text-[2.25rem]" : "text-[1.25rem] sm:text-[1.5rem]",
                      )}
                    >
                      {photo.caption}
                    </span>
                    <span className="mt-1.5 hidden max-w-[26rem] text-[0.9rem] leading-snug text-branco/75 sm:block">
                      {photo.text}
                    </span>
                  </span>
                </button>
              </li>
            ))}

            <li>
              <a
                href={whatsappLink("Olá! Quero conhecer a estrutura da Academia Suprema.")}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex size-full flex-col justify-between rounded-md bg-verde p-4 text-grafite transition-colors hover:bg-verde-vivo sm:p-5"
              >
                <span className="font-display text-[1.45rem] leading-[0.95] font-extrabold uppercase italic sm:text-[1.9rem]">
                  Melhor ainda ao vivo.
                </span>
                <span className="flex items-center gap-2 text-[0.88rem] leading-tight font-semibold sm:text-[0.95rem]">
                  <WhatsAppIcon className="size-4 shrink-0" />
                  <span className="underline-offset-4 group-hover:underline">Combinar uma visita</span>
                </span>
              </a>
            </li>
          </ul>
        </Reveal>
      </div>

      <Lightbox photos={structurePhotos} index={open} onIndexChange={setOpen} label="Fotos da estrutura" />
    </section>
  );
}
