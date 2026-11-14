import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Botões da Suprema (base shadcn/ui). Use `buttonVariants` direto em links
 * (<a className={buttonVariants(...)}>), que são a maioria das ações do site.
 */
const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-md font-semibold whitespace-nowrap transition-colors select-none disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        /** Ação principal: verde da marca com texto grafite (contraste 6:1) */
        verde: "bg-verde text-grafite hover:bg-verde-vivo",
        /** Secundária sobre fundo escuro */
        contorno: "border border-white/25 text-branco hover:border-white/55 hover:bg-white/5",
        /** Secundária sobre fundo claro */
        "contorno-claro": "border border-tinta/20 text-tinta hover:border-tinta/50 hover:bg-tinta/[0.03]",
        /** Ícone sobre fundo escuro (menu, setas) */
        icone: "border border-white/15 text-branco hover:bg-white/8",
      },
      size: {
        sm: "h-11 px-4 text-[0.95rem]",
        default: "h-12 px-5",
        lg: "h-13 px-7",
        xl: "h-14 px-7 text-[1.05rem]",
        icon: "size-11",
        "icon-lg": "size-12",
      },
    },
    defaultVariants: {
      variant: "verde",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return <ButtonPrimitive data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}

export { Button, buttonVariants };
