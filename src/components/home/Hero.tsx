"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { MapPin } from "lucide-react";
import { HeroSwooshPath } from "@/components/brand/Swoosh";
import { buttonVariants } from "@/components/ui/button";
import { easeSuave } from "@/components/ui/reveal";
import { PendingBadge } from "@/components/ui/pending-badge";
import { business } from "@/data/business";
import { heroPhoto } from "@/data/photos";

const titleLines = ["Supere", "seus limites."];

/**
 * Abertura: a foto do levantamento como protagonista à direita, o título
 * grande à esquerda na área escura da própria foto, e um único momento de
 * animação (título sobe, arco verde desenha, foto assenta).
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  // movimento discreto da foto ao rolar
  const photoY = useTransform(scrollYProgress, [0, 1], ["0%", reduceMotion ? "0%" : "12%"]);

  return (
    <section
      ref={ref}
      id="inicio"
      aria-labelledby="hero-titulo"
      className="relative isolate flex min-h-[max(100svh,40rem)] flex-col overflow-hidden bg-grafite"
    >
      {/* Fotografia */}
      <motion.div
        style={{ y: photoY }}
        className="absolute inset-x-0 top-0 -z-10 h-[70svh] lg:inset-y-0 lg:left-[24%] lg:h-auto"
      >
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2.4, ease: easeSuave }}
          className="relative size-full"
        >
          <Image
            src={heroPhoto.src}
            alt={heroPhoto.alt}
            fill
            priority
            sizes="(min-width: 1024px) 76vw, 100vw"
            className="object-cover object-[50%_40%] lg:object-[40%_45%] xl:object-[0%_45%]"
          />
        </motion.div>
        {/* escurecimento para leitura do texto */}
        <div className="absolute inset-0 bg-gradient-to-t from-grafite via-grafite/35 to-grafite/10 lg:bg-gradient-to-r lg:from-grafite lg:via-grafite/10 lg:to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-grafite to-transparent" />
      </motion.div>

      <div className="mx-auto flex w-full max-w-[88rem] flex-1 flex-col justify-end px-5 pt-[46svh] pb-14 sm:px-8 sm:pb-24 lg:px-12 lg:pt-36 lg:pb-28">
        <h1
          id="hero-titulo"
          className="relative titulo-display text-[clamp(4rem,15vw,9rem)] lg:text-[clamp(4rem,10.5vw,9.25rem)]"
        >
          {/*
           * Arco verde (referência ao gesto do logotipo). Medido em em, acompanha
           * o tamanho do título: nasce atrás de "SEUS" e sobe para a direita,
           * sem nunca passar pelo subtítulo ou pelos botões.
           */}
          <motion.svg
            viewBox="0 0 950 320"
            aria-hidden
            focusable="false"
            className="pointer-events-none absolute -z-10 fill-verde"
            style={{ left: "-0.6em", bottom: "0.35em", width: "9.5em", height: "3.2em" }}
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            animate={{ clipPath: "inset(0 0% 0 0)" }}
            transition={{ duration: 1.6, ease: easeSuave, delay: 0.55 }}
          >
            <HeroSwooshPath />
          </motion.svg>
          {titleLines.map((line, index) => (
            <span key={line} className="block overflow-hidden pr-[0.12em] pb-[0.04em]">
              <motion.span
                className="block"
                initial={{ y: "105%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.95, ease: easeSuave, delay: 0.15 + index * 0.12 }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easeSuave, delay: 0.6 }}
          className="mt-6 max-w-[34rem]"
        >
          <p className="text-[1.125rem] leading-relaxed text-branco/85 sm:text-[1.25rem]">
            Seu próximo nível começa com uma decisão. Conheça a Academia Suprema, em Linhares.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#sobre"
              className={buttonVariants({ size: "lg" })}
            >
              Conhecer a academia
            </a>
            <a
              href="#contato"
              className={buttonVariants({ variant: "contorno", size: "lg" })}
            >
              Entrar em contato
            </a>
          </div>
        </motion.div>

        {/* Bloco de localização */}
        <motion.aside
          aria-label="Localização"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easeSuave, delay: 0.85 }}
          className="mt-12 max-w-sm border-l-2 border-verde bg-grafite/70 py-4 pr-5 pl-5 backdrop-blur-sm lg:absolute lg:right-12 lg:bottom-28 lg:mt-0 xl:right-[max(3rem,calc((100%-88rem)/2+3rem))]"
        >
          <p className="font-display text-[1.75rem] leading-none font-bold italic">
            Linhares <span className="text-cinza">– ES</span>
          </p>
          <address className="mt-2 text-[0.95rem] leading-snug text-branco/80 not-italic">
            {business.address.street}
            <br />
            {business.address.district}
          </address>
          <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2">
            <a
              href={business.address.mapsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[0.92rem] font-semibold text-verde-vivo underline-offset-4 hover:underline"
            >
              <MapPin className="size-4" aria-hidden />
              Ver no mapa
            </a>
            {!business.address.confirmed && <PendingBadge />}
          </div>
        </motion.aside>
      </div>

      {/* Indicador de rolagem */}
      <motion.a
        href="#sobre"
        aria-label="Rolar para a próxima seção"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.4 }}
        className="group absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[0.78rem] text-cinza sm:flex"
      >
        Role
        <span className="relative h-10 w-px overflow-hidden bg-white/20">
          <span className="absolute inset-x-0 top-0 h-1/2 animate-[descer_2s_ease-in-out_infinite] bg-verde-vivo" />
        </span>
      </motion.a>
    </section>
  );
}
