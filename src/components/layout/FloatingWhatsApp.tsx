"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { WhatsAppIcon } from "@/components/brand/BrandIcons";
import { business } from "@/data/business";

/**
 * Atalho para o WhatsApp que aparece depois do hero e some na seção de
 * contato (onde os botões já estão à vista).
 */
export function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const contact = document.getElementById("contato");
      const pastHero = window.scrollY > window.innerHeight * 0.85;
      const atContact = contact ? contact.getBoundingClientRect().top < window.innerHeight * 0.7 : false;
      setVisible(pastHero && !atContact);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href={business.whatsapp.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Falar com a Academia Suprema no WhatsApp"
          initial={{ opacity: 0, scale: 0.8, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 12 }}
          transition={{ duration: 0.3 }}
          className="fixed right-4 bottom-4 z-40 grid size-14 place-items-center rounded-full bg-verde text-grafite shadow-[0_12px_30px_-8px_rgb(0_0_0/0.6)] transition-colors hover:bg-verde-vivo sm:right-6 sm:bottom-6"
        >
          <WhatsAppIcon className="size-7" />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
