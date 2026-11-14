import { Navigation, Phone } from "lucide-react";
import { InstagramIcon, WhatsAppIcon } from "@/components/brand/BrandIcons";
import { buttonVariants } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { PendingBadge } from "@/components/ui/pending-badge";
import { business } from "@/data/business";
import { HoursTable } from "./HoursTable";
import { MapEmbed } from "./MapEmbed";

export function Contact() {
  const { address, hours, whatsapp, instagram } = business;

  return (
    <section id="contato" aria-labelledby="contato-titulo" className="relative isolate overflow-hidden bg-chumbo">
      <div className="mx-auto grid max-w-[88rem] gap-12 px-5 py-24 sm:px-8 lg:grid-cols-12 lg:gap-12 lg:px-12 lg:py-32">
        <div className="lg:col-span-7">
          <Reveal>
            <h2 id="contato-titulo" className="titulo-secao">
              Vem treinar
              <br />
              na Suprema.
            </h2>
            <p className="mt-6 max-w-[32rem] texto-corrido text-branco/75">
              Tire dúvidas, pergunte valores ou combine sua primeira visita. O atendimento é pelo WhatsApp.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href={whatsapp.href}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ size: "xl" })}
            >
              <WhatsAppIcon className="size-5" />
              Chamar no WhatsApp
            </a>
            <a
              href={whatsapp.tel}
              className={buttonVariants({ variant: "contorno", size: "xl" })}
            >
              <Phone className="size-4.5" aria-hidden />
              {whatsapp.display}
            </a>
            <a
              href={instagram.href}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ variant: "contorno", size: "xl" })}
            >
              <InstagramIcon className="size-4.5" />
              {instagram.display}
            </a>
          </Reveal>

          <Reveal delay={0.15} className="mt-14 grid gap-10 sm:grid-cols-2 sm:gap-8">
            <div>
              <h3 className="flex flex-wrap items-center gap-2 font-display text-[1.6rem] leading-none font-bold italic">
                Endereço
                {!address.confirmed && <PendingBadge />}
              </h3>
              <address className="mt-4 leading-relaxed text-branco/80 not-italic">
                {address.street}
                <br />
                {address.district}
                <br />
                {address.cityLine}, {address.cep}
              </address>
              <a
                href={address.mapsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 font-semibold text-verde-vivo underline-offset-4 hover:underline"
              >
                <Navigation className="size-4" aria-hidden />
                Como chegar
              </a>
            </div>

            <div>
              <h3 className="flex flex-wrap items-center gap-2 font-display text-[1.6rem] leading-none font-bold italic">
                Horários
                {!hours.confirmed && <PendingBadge />}
              </h3>
              <div className="mt-2">
                <HoursTable />
              </div>
              <p className="mt-3 text-[0.85rem] text-cinza">Em feriados o horário pode mudar.</p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="lg:col-span-5">
          <MapEmbed />
        </Reveal>
      </div>
    </section>
  );
}
