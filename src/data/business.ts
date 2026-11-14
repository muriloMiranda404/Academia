/**
 * Dados comerciais da Academia Suprema.
 *
 * Pesquisa feita em 14/11/2026 em duas fontes públicas:
 * - Instagram oficial @suprema_academia (bio e link de WhatsApp);
 * - página da academia no Wellhub (endereço, horários, modalidade e comodidades).
 *
 * `confirmed: true` = publicado pela própria academia no perfil oficial.
 * `confirmed: false` = encontrado em diretório de terceiros; conferir com a
 * academia antes da publicação oficial (o site mostra o selo "a confirmar").
 */

export type Sourced<T> = T & {
  /** Onde o dado foi encontrado */
  source: string;
  /** false = conferir com a academia antes de publicar */
  confirmed: boolean;
};

const WHATSAPP_NUMBER = "5527997171441";

/** Monta um link de WhatsApp com mensagem pronta. */
export function whatsappLink(message = "Olá! Vim pelo site e quero saber mais sobre a Academia Suprema.") {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

const ADDRESS_QUERY = "Av. Tupinambás, 230 - José Rodrigues Maciel, Linhares - ES, 29904-025";

export const business = {
  name: "Academia Suprema",
  city: "Linhares",
  state: "ES",

  /** Frase da bio do Instagram oficial — linguagem da própria academia */
  bioQuote: {
    text: "Torne a sua saúde uma das suas prioridades do seu dia a dia e da sua vida!",
    source: "Bio do Instagram @suprema_academia",
    confirmed: true,
  },

  whatsapp: {
    display: "(27) 99717-1441",
    number: WHATSAPP_NUMBER,
    href: whatsappLink(),
    tel: `tel:+${WHATSAPP_NUMBER}`,
    source: "Link de WhatsApp na bio do Instagram oficial; o mesmo número aparece no Wellhub",
    confirmed: true,
  },

  instagram: {
    display: "@suprema_academia",
    href: "https://www.instagram.com/suprema_academia/",
    source: "Perfil oficial",
    confirmed: true,
  },

  address: {
    street: "Av. Tupinambás, 230",
    district: "José Rodrigues Maciel",
    cityLine: "Linhares – ES",
    cep: "29904-025",
    mapsHref: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS_QUERY)}`,
    embedSrc: `https://maps.google.com/maps?q=${encodeURIComponent(ADDRESS_QUERY)}&z=16&output=embed`,
    source: "Página da academia no Wellhub",
    confirmed: false,
  },

  /**
   * Horário publicado no Wellhub. O Instagram tem um destaque "Horário",
   * mas o conteúdo não pôde ser lido — conferir com a academia.
   * `day` segue Date.getDay(): 0 = domingo.
   */
  hours: {
    source: "Página da academia no Wellhub (sujeito a mudança em feriados)",
    confirmed: false,
    rows: [
      { days: [1, 2, 3, 4], label: "Segunda a quinta", periods: ["05:00 – 11:00", "14:00 – 21:30"] },
      { days: [5], label: "Sexta", periods: ["05:00 – 11:00", "14:00 – 21:00"] },
      { days: [6], label: "Sábado", periods: ["08:00 – 11:00"] },
      { days: [0], label: "Domingo", periods: [] as string[] },
    ],
  },

  wellhub: {
    href: "https://wellhub.com/pt-br/search/partners/academia-suprema-jose-rodrigues-maciel/",
    minimumPlan: "Basic",
    source: "Página da academia no Wellhub",
    confirmed: false,
  },
} as const;

/**
 * O que a academia oferece segundo o Wellhub (modalidade, comodidades e regra
 * de acesso). Nada além disso é afirmado no site.
 */
export const facts = {
  source: "Página da academia no Wellhub",
  confirmed: false,
  items: [
    { id: "musculacao", title: "Musculação", text: "Treino de força com pesos e aparelhos." },
    { id: "sem-agendamento", title: "Sem agendamento", text: "Chegue no seu horário e treine, sem marcar antes." },
    { id: "personal", title: "Personal trainer", text: "Acompanhamento individual para quem quer orientação de perto." },
    { id: "wifi", title: "Wi-Fi", text: "Conexão disponível para alunos durante o treino." },
  ],
} as const;
