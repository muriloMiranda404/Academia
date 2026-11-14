import { cn } from "@/lib/utils";
import { site } from "@/data/site";

type PendingBadgeProps = {
  children?: React.ReactNode;
  className?: string;
  /** Explicação mostrada ao passar o mouse e lida por leitores de tela */
  title?: string;
  tone?: "escuro" | "claro";
};

/**
 * Marca um dado que ainda precisa ser confirmado com a academia.
 * Só aparece na prévia (site.isPreview).
 */
export function PendingBadge({ children = "a confirmar", className, title, tone = "escuro" }: PendingBadgeProps) {
  if (!site.isPreview) return null;
  return (
    <span
      title={title ?? "Dado encontrado em diretório público; confirmar com a academia antes da publicação"}
      className={cn(
        "inline-flex items-center gap-1 rounded-sm border border-dashed px-1.5 py-0.5 align-middle font-sans text-[0.72rem] leading-none font-semibold whitespace-nowrap not-italic normal-case",
        tone === "escuro" ? "border-[#e8b44a]/55 bg-[#e8b44a]/10 text-[#f1c86f]" : "border-[#9a6a10]/50 bg-[#fff3d6] text-[#6e4a06]",
        className,
      )}
    >
      {children}
    </span>
  );
}
