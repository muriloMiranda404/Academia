"use client";

import { useState } from "react";
import { MapPin, Navigation } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { business } from "@/data/business";
import { cn } from "@/lib/utils";

/**
 * O mapa do Google só carrega quando o visitante pede: a página abre mais
 * rápido e nenhum dado vai para o Google sem uma ação da pessoa.
 */
export function MapEmbed() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative h-full min-h-[22rem] overflow-hidden rounded-md bg-placa">
      {loaded ? (
        <iframe
          src={business.address.embedSrc}
          title={`Mapa: ${business.address.street}, ${business.address.district}, ${business.address.cityLine}`}
          className="absolute inset-0 size-full border-0 grayscale-[0.35]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 p-8 text-center">
          {/* quadriculado discreto, sugerindo um mapa sem fingir ser um */}
          <div
            aria-hidden
            className="absolute inset-0 opacity-60 [background-image:linear-gradient(rgb(255_255_255/0.05)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255/0.05)_1px,transparent_1px)] [background-size:44px_44px]"
          />
          <span className="relative grid size-14 place-items-center rounded-full bg-verde text-grafite shadow-[0_0_0_10px_rgb(20_168_102/0.18)]">
            <MapPin className="size-6" aria-hidden />
          </span>
          <p className="relative max-w-[18rem] text-[0.95rem] leading-relaxed text-branco/75">
            {business.address.street}, {business.address.district}
          </p>
          <div className="relative flex flex-col gap-2.5 sm:flex-row">
            <button
              type="button"
              onClick={() => setLoaded(true)}
              className={cn(buttonVariants({ size: "sm" }), "bg-branco hover:bg-white")}
            >
              Carregar mapa
            </button>
            <a
              href={business.address.mapsHref}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ variant: "contorno", size: "sm" })}
            >
              <Navigation className="size-4" aria-hidden />
              Como chegar
            </a>
          </div>
          <p className="relative text-[0.78rem] text-cinza">O mapa é fornecido pelo Google Maps.</p>
        </div>
      )}
    </div>
  );
}
