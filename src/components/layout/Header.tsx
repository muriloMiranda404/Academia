"use client";

import { useEffect, useState } from "react";
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { Wordmark } from "@/components/brand/Wordmark";
import { InstagramIcon, WhatsAppIcon } from "@/components/brand/BrandIcons";
import { buttonVariants } from "@/components/ui/button";
import { easeSuave } from "@/components/ui/reveal";
import { business } from "@/data/business";
import { navigation, type SectionId } from "@/data/navigation";
import { useActiveSection, useScrolled } from "@/lib/hooks";
import { cn } from "@/lib/utils";

const sectionIds = navigation.map((item) => item.id);

export function Header() {
  const scrolled = useScrolled(24);
  const active = useActiveSection(sectionIds);
  const [menuOpen, setMenuOpen] = useState(false);

  // fecha o menu se a tela crescer para o layout de desktop
  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)");
    const onChange = () => query.matches && setMenuOpen(false);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-500 ease-suave",
        scrolled
          ? "bg-grafite/75 shadow-[0_1px_0_rgb(255_255_255/0.07)] backdrop-blur-md"
          : "bg-gradient-to-b from-grafite/95 to-grafite/70",
      )}
    >
      <div
        className={cn(
          "mx-auto flex max-w-[88rem] items-center justify-between gap-6 px-5 transition-[height] duration-500 ease-suave sm:px-8 lg:px-12",
          scrolled ? "h-15" : "h-18",
        )}
      >
        <a href="#inicio" className="rounded-sm" aria-label="Academia Suprema, voltar ao início">
          <Wordmark size={scrolled ? "sm" : "md"} className="transition-[font-size] duration-500 ease-suave" />
        </a>

        <nav aria-label="Seções" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navigation.map((item) => (
              <li key={item.id}>
                <NavLink id={item.id} label={item.label} active={active === item.id} />
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={business.whatsapp.href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ size: "sm" }), "hidden sm:inline-flex")}
          >
            <WhatsAppIcon className="size-4" />
            Fale conosco
          </a>

          <DialogPrimitive.Root open={menuOpen} onOpenChange={setMenuOpen}>
            <DialogPrimitive.Trigger
              className={cn(buttonVariants({ variant: "icone", size: "icon" }), "lg:hidden")}
              aria-label="Abrir menu"
            >
              <Menu className="size-5" aria-hidden />
            </DialogPrimitive.Trigger>
            <MobileMenu active={active} onNavigate={() => setMenuOpen(false)} />
          </DialogPrimitive.Root>
        </div>
      </div>
    </header>
  );
}

function NavLink({ id, label, active }: { id: SectionId; label: string; active: boolean }) {
  return (
    <a
      href={`#${id}`}
      aria-current={active ? "location" : undefined}
      className={cn(
        "relative block rounded-sm px-3 py-2 text-[0.92rem] font-medium transition-colors",
        active ? "text-branco" : "text-cinza hover:text-branco",
      )}
    >
      {label}
      {active && (
        <motion.span
          layoutId="nav-ativo"
          className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-verde-vivo"
          transition={{ duration: 0.45, ease: easeSuave }}
        />
      )}
    </a>
  );
}

function MobileMenu({ active, onNavigate }: { active: SectionId | null; onNavigate: () => void }) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Backdrop className="fixed inset-0 z-[60] bg-black/60 transition-opacity duration-300 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0" />
      <DialogPrimitive.Popup
        className="fixed inset-x-0 top-0 z-[70] flex max-h-[100dvh] flex-col overflow-y-auto bg-grafite pb-8 shadow-2xl transition-[opacity,translate] duration-400 ease-suave outline-none data-[ending-style]:-translate-y-6 data-[ending-style]:opacity-0 data-[starting-style]:-translate-y-6 data-[starting-style]:opacity-0"
      >
        <div className="flex h-18 items-center justify-between px-5 sm:px-8">
          <Wordmark />
          <DialogPrimitive.Close
            className={buttonVariants({ variant: "icone", size: "icon" })}
            aria-label="Fechar menu"
          >
            <X className="size-5" aria-hidden />
          </DialogPrimitive.Close>
        </div>
        <DialogPrimitive.Title className="sr-only">Menu</DialogPrimitive.Title>

        <nav aria-label="Seções" className="px-5 pt-4 sm:px-8">
          <ul>
            {navigation.map((item, index) => (
              <motion.li
                key={item.id}
                initial={{ opacity: 0, x: -18 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.45, ease: easeSuave, delay: 0.05 + index * 0.045 }}
                className="border-b border-white/8"
              >
                <a
                  href={`#${item.id}`}
                  onClick={onNavigate}
                  aria-current={active === item.id ? "location" : undefined}
                  className={cn(
                    "flex items-center justify-between py-3 font-display text-[2.4rem] leading-none font-extrabold uppercase italic transition-colors",
                    active === item.id ? "text-verde-vivo" : "text-branco hover:text-verde-vivo",
                  )}
                >
                  {item.label}
                </a>
              </motion.li>
            ))}
          </ul>
        </nav>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 flex flex-col gap-3 px-5 sm:flex-row sm:px-8"
        >
          <a
            href={business.whatsapp.href}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants()}
          >
            <WhatsAppIcon className="size-5" />
            Fale conosco
          </a>
          <a
            href={business.instagram.href}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ variant: "contorno" })}
          >
            <InstagramIcon className="size-5" />
            {business.instagram.display}
          </a>
        </motion.div>
      </DialogPrimitive.Popup>
    </DialogPrimitive.Portal>
  );
}
