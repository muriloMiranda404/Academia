"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { InstagramIcon } from "@/components/brand/BrandIcons";
import { buttonVariants } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { business } from "@/data/business";
import { galleryPhotos, photosAreIllustrative } from "@/data/photos";
import { Lightbox } from "./Lightbox";

/**
 * Faixa horizontal de fotos que sangra até a borda direita da tela.
 * Rola com o dedo, com o trackpad ou pelos botões; cada foto abre ampliada.
 */
export function Gallery() {
  const trackRef = useRef<HTMLUListElement>(null);
  const [open, setOpen] = useState<number | null>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  const updateEdges = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setEdges({
      start: el.scrollLeft <= 4,
      end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4,
    });
  }, []);

  useEffect(() => {
    updateEdges();
    window.addEventListener("resize", updateEdges);
    return () => window.removeEventListener("resize", updateEdges);
  }, [updateEdges]);

  const scrollByPage = (direction: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <section id="galeria" aria-labelledby="galeria-titulo" className="overflow-hidden bg-grafite py-24 lg:py-32">
      <div className="mx-auto flex max-w-[88rem] flex-col gap-8 px-5 sm:px-8 lg:flex-row lg:items-end lg:justify-between lg:px-12">
        <Reveal>
          <h2 id="galeria-titulo" className="titulo-secao">
            No ritmo
            <br />
            do treino.
          </h2>
          <p className="mt-6 max-w-[32rem] texto-corrido text-branco/75">
            Um pouco do clima de quem treina pesado. Para ver o dia a dia da Suprema, acompanhe o perfil no Instagram.
          </p>
        </Reveal>

        <div className="flex items-center gap-3">
          <a
            href={business.instagram.href}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ variant: "contorno" })}
          >
            <InstagramIcon className="size-4.5" />
            {business.instagram.display}
          </a>
          <div className="hidden gap-2 sm:flex">
            <button
              type="button"
              onClick={() => scrollByPage(-1)}
              disabled={edges.start}
              aria-label="Fotos anteriores"
              className={buttonVariants({ variant: "icone", size: "icon-lg" })}
            >
              <ChevronLeft className="size-5" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => scrollByPage(1)}
              disabled={edges.end}
              aria-label="Próximas fotos"
              className={buttonVariants({ variant: "icone", size: "icon-lg" })}
            >
              <ChevronRight className="size-5" aria-hidden />
            </button>
          </div>
        </div>
      </div>

      <Reveal delay={0.1} className="mt-12 lg:mt-16">
        <ul
          ref={trackRef}
          onScroll={updateEdges}
          aria-label="Fotos de treino"
          className="flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto px-5 pb-4 [scrollbar-width:thin] sm:scroll-px-8 sm:gap-4 sm:px-8 lg:scroll-px-[max(3rem,calc((100%-88rem)/2+3rem))] lg:px-[max(3rem,calc((100%-88rem)/2+3rem))]"
        >
          {galleryPhotos.map((photo, index) => {
            const landscape = photo.width > photo.height;
            return (
              <li key={photo.src} className="shrink-0 snap-start">
                <button
                  type="button"
                  onClick={() => setOpen(index)}
                  aria-label={`Ampliar foto: ${photo.caption}`}
                  className="group relative block h-[22rem] max-w-[85vw] overflow-hidden rounded-md bg-placa sm:h-[28rem] lg:h-[32rem]"
                  style={{ aspectRatio: landscape ? "4 / 3" : "2 / 3" }}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes={landscape ? "(min-width: 1024px) 43rem, 85vw" : "(min-width: 1024px) 22rem, 65vw"}
                    className="object-cover transition-transform duration-700 ease-suave group-hover:scale-[1.04]"
                    style={{ objectPosition: photo.focus }}
                  />
                  <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-grafite/85 to-transparent p-4 pt-16 text-left font-display text-[1.35rem] leading-none font-bold italic">
                    {photo.caption}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </Reveal>

      {photosAreIllustrative && (
        <p className="mx-auto mt-4 max-w-[88rem] px-5 text-[0.85rem] text-cinza sm:px-8 lg:px-12">
          Imagens ilustrativas, usadas nesta prévia até a academia enviar fotos próprias.
        </p>
      )}

      <Lightbox photos={galleryPhotos} index={open} onIndexChange={setOpen} label="Fotos de treino" />
    </section>
  );
}
