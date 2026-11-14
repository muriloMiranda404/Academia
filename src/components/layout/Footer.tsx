import { Wordmark } from "@/components/brand/Wordmark";
import { InstagramIcon, WhatsAppIcon } from "@/components/brand/BrandIcons";
import { business } from "@/data/business";
import { navigation } from "@/data/navigation";
import { photosAreIllustrative } from "@/data/photos";
import { site } from "@/data/site";

export function Footer() {
  return (
    <footer className="border-t border-white/8 bg-grafite">
      <div className="mx-auto grid max-w-[88rem] gap-12 px-5 py-16 sm:px-8 md:grid-cols-12 lg:px-12">
        <div className="md:col-span-5">
          <Wordmark size="lg" />
          <p className="mt-5 max-w-[22rem] leading-relaxed text-cinza">
            Musculação no bairro José Rodrigues Maciel, em Linhares – ES.
          </p>
        </div>

        <nav aria-label="Rodapé" className="md:col-span-3">
          <p className="font-display text-[1.25rem] font-bold italic">Navegue</p>
          <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5 md:grid-cols-1">
            {navigation.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} className="text-cinza transition-colors hover:text-branco">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-4">
          <p className="font-display text-[1.25rem] font-bold italic">Contato</p>
          <ul className="mt-4 space-y-3">
            <li>
              <a
                href={business.whatsapp.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 text-cinza transition-colors hover:text-branco"
              >
                <WhatsAppIcon className="size-4 text-verde-vivo" />
                {business.whatsapp.display}
              </a>
            </li>
            <li>
              <a
                href={business.instagram.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 text-cinza transition-colors hover:text-branco"
              >
                <InstagramIcon className="size-4 text-verde-vivo" />
                {business.instagram.display}
              </a>
            </li>
            <li className="text-cinza">
              {business.address.street}, {business.address.district}
              <br />
              {business.address.cityLine}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/8">
        <div className="mx-auto flex max-w-[88rem] flex-col gap-2 px-5 py-6 text-[0.82rem] text-cinza/80 sm:px-8 md:flex-row md:justify-between lg:px-12">
          <p>© Academia Suprema</p>
          {site.isPreview && (
            <p className="md:text-right">
              {site.credit}
              {photosAreIllustrative && <> {site.photoCredit}</>}
            </p>
          )}
        </div>
      </div>
    </footer>
  );
}
