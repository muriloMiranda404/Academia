/**
 * Configuração geral do site.
 *
 * `isPreview` mantém o site fora dos buscadores (meta noindex + cabeçalho
 * X-Robots-Tag) e exibe os selos "a confirmar" enquanto ele for uma prévia
 * comercial não oficial. Para publicar oficialmente, defina
 * NEXT_PUBLIC_PREVIEW=false — somente depois de conferir com a academia todos
 * os dados marcados com `confirmed: false` em business.ts.
 */
export const site = {
  isPreview: process.env.NEXT_PUBLIC_PREVIEW !== "false",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  name: "Academia Suprema",
  title: "Academia Suprema | Musculação em Linhares – ES",
  description:
    "Academia de musculação no bairro José Rodrigues Maciel, em Linhares – ES. Treino sem agendamento, acompanhamento com personal trainer e atendimento pelo WhatsApp.",
  keywords: [
    "Academia Suprema",
    "academia Linhares",
    "musculação Linhares",
    "academia José Rodrigues Maciel",
    "personal trainer Linhares",
    "academia Wellhub Linhares",
  ],
  credit: "Prévia conceitual desenvolvida pela KodexBase. Projeto demonstrativo não oficial.",
  photoCredit: "Fotografias ilustrativas do Unsplash, usadas apenas nesta prévia.",
} as const;
