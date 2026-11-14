"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { easeSuave } from "@/components/ui/reveal";
import { photosAreIllustrative, type Photo } from "@/data/photos";

type LightboxProps = {
  photos: Photo[];
  /** índice aberto; null = fechado */
  index: number | null;
  onIndexChange: (index: number | null) => void;
  /** Nome do conjunto, lido por leitores de tela */
  label: string;
};

/**
 * Visualização ampliada. Setas do teclado navegam, Esc fecha, o foco fica
 * preso no diálogo e volta ao card de origem ao fechar (Base UI Dialog).
 */
export function Lightbox({ photos, index, onIndexChange, label }: LightboxProps) {
  const [direction, setDirection] = useState(0);
  // mantém a última foto durante a animação de saída
  const [shown, setShown] = useState(index ?? 0);
  if (index !== null && index !== shown) setShown(index);

  const open = index !== null;
  const photo = photos[shown];

  const go = useCallback(
    (step: number) => {
      if (index === null) return;
      setDirection(step);
      onIndexChange((index + step + photos.length) % photos.length);
    },
    [index, onIndexChange, photos.length],
  );

  return (
    <DialogPrimitive.Root open={open} onOpenChange={(next) => !next && onIndexChange(null)}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Backdrop className="fixed inset-0 z-[90] bg-black/92 backdrop-blur-sm transition-opacity duration-300 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0" />
        <DialogPrimitive.Popup
          aria-label={label}
          // as setas ficam no próprio popup: o Base UI interrompe a propagação delas
          onKeyDown={(event) => {
            if (event.key === "ArrowRight") go(1);
            else if (event.key === "ArrowLeft") go(-1);
          }}
          className="fixed inset-0 z-[100] flex flex-col text-branco transition-[opacity,scale] duration-300 ease-suave outline-none data-[ending-style]:scale-[0.98] data-[ending-style]:opacity-0 data-[starting-style]:scale-[0.98] data-[starting-style]:opacity-0"
        >
          <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
            {/* o nome do diálogo vem de aria-label; o contador é anunciado ao trocar de foto */}
            <p className="text-[0.95rem] text-branco/75" aria-live="polite">
              <span className="font-semibold text-branco tabular-nums">
                {shown + 1} de {photos.length}
              </span>{" "}
              <span className="ml-2">{photo?.caption}</span>
            </p>
            <DialogPrimitive.Close
              className="grid size-11 place-items-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
              aria-label="Fechar"
            >
              <X className="size-5" aria-hidden />
            </DialogPrimitive.Close>
          </div>

          <div
            className="relative flex flex-1 items-center justify-center px-2 pb-24 sm:px-20 sm:pb-6"
            onClick={(event) => {
              if (event.target === event.currentTarget) onIndexChange(null);
            }}
          >
            <AnimatePresence mode="popLayout" initial={false} custom={direction}>
              {photo && (
                <motion.figure
                  key={photo.src}
                  custom={direction}
                  variants={{
                    enter: (dir: number) => ({ opacity: 0, x: dir * 56 }),
                    center: { opacity: 1, x: 0 },
                    exit: (dir: number) => ({ opacity: 0, x: dir * -56 }),
                  }}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4, ease: easeSuave }}
                  className="pointer-events-none relative h-full max-h-[78dvh] w-full max-w-6xl"
                >
                  <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 1280px) 72rem, 96vw" className="object-contain" />
                </motion.figure>
              )}
            </AnimatePresence>

            <button
              type="button"
              onClick={() => go(-1)}
              className="absolute bottom-6 left-4 grid size-12 place-items-center rounded-full bg-white/12 transition-colors hover:bg-white/25 sm:top-1/2 sm:bottom-auto sm:left-5 sm:-translate-y-1/2"
              aria-label="Foto anterior"
            >
              <ChevronLeft className="size-6" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              className="absolute right-4 bottom-6 grid size-12 place-items-center rounded-full bg-white/12 transition-colors hover:bg-white/25 sm:top-1/2 sm:right-5 sm:bottom-auto sm:-translate-y-1/2"
              aria-label="Próxima foto"
            >
              <ChevronRight className="size-6" aria-hidden />
            </button>
          </div>
          {photosAreIllustrative && (
            <p className="pointer-events-none absolute inset-x-0 bottom-9 text-center text-[0.78rem] text-branco/50 sm:static sm:pb-4">
              Imagem ilustrativa
            </p>
          )}
        </DialogPrimitive.Popup>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
