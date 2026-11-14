import { cn } from "@/lib/utils";
import { Swoosh } from "./Swoosh";

type WordmarkProps = {
  className?: string;
  /** Tamanho base; o resto da marca acompanha em em */
  size?: "sm" | "md" | "lg";
};

/**
 * Marca PROVISÓRIA, só tipográfica. O logotipo oficial da academia não foi
 * usado por falta de autorização; troque este componente pelo arquivo oficial
 * quando a Suprema enviar.
 */
export function Wordmark({ className, size = "md" }: WordmarkProps) {
  return (
    <span
      className={cn(
        "inline-grid leading-none select-none",
        size === "sm" && "text-[1.5rem]",
        size === "md" && "text-[1.85rem]",
        size === "lg" && "text-[2.6rem]",
        className,
      )}
    >
      <span className="font-display text-[1em] font-extrabold tracking-[0.005em] italic">Suprema</span>
      {/* arco sublinhando o nome, subindo para a direita */}
      <Swoosh preserveAspectRatio="none" className="-mt-[0.02em] h-[0.2em] w-full text-verde" />
      <span className="mt-[0.06em] justify-self-end font-display text-[0.32em] font-bold tracking-[0.24em] text-cinza italic">
        ACADEMIA
      </span>
    </span>
  );
}
