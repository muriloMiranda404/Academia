/**
 * Fotografias ILUSTRATIVAS (Unsplash, licença de uso livre).
 *
 * As fotos do Instagram e do Wellhub da academia não foram usadas por falta
 * de autorização. Quando a Suprema enviar fotos próprias, basta trocar os
 * arquivos em /public/images e ajustar `width`/`height`/`alt` aqui.
 * Os IDs do Unsplash de cada arquivo estão listados no README.
 */

/** true enquanto as fotos forem ilustrativas; mude para false ao usar fotos reais da academia */
export const photosAreIllustrative = true;

export type Photo = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Legenda curta mostrada no card e na visualização ampliada (sem afirmar equipamentos específicos) */
  caption: string;
  /** Enquadramento (object-position) quando a foto é recortada */
  focus?: string;
};

export const heroPhoto: Photo = {
  src: "/images/hero/treino-escuro.jpg",
  alt: "Homem se preparando para levantar uma barra com anilhas em uma academia escura, iluminado por uma luz lateral",
  width: 2400,
  height: 1600,
  caption: "Levantamento terra",
};

export const aboutPhotos = {
  main: {
    src: "/images/sobre/agachamento.jpg",
    alt: "Mulher de costas posicionando a barra nos ombros para um agachamento, em preto e branco",
    width: 1600,
    height: 1068,
    caption: "Agachamento livre",
    focus: "45% 40%",
  },
  detail: {
    src: "/images/sobre/pegada.jpg",
    alt: "Close das mãos segurando a barra apoiada no ombro durante o treino",
    width: 1400,
    height: 2099,
    caption: "Pegada firme",
    focus: "50% 35%",
  },
} satisfies Record<string, Photo>;

/** Mosaico da seção Estrutura — `area` posiciona cada foto no grid */
export type StructurePhoto = Photo & {
  area: "destaque" | "alta" | "pequena" | "larga";
  text: string;
};

export const structurePhotos: StructurePhoto[] = [
  {
    src: "/images/estrutura/salao.jpg",
    alt: "Salão de academia com aparelhos de musculação enfileirados sob luz baixa",
    width: 2000,
    height: 1333,
    caption: "Salão de treino",
    text: "Onde a rotina de treino acontece.",
    area: "destaque",
  },
  {
    src: "/images/estrutura/gaiola.jpg",
    alt: "Rack de agachamento com barra em uma academia de janelas amplas, em preto e branco",
    width: 1400,
    height: 1897,
    caption: "Área de força",
    text: "Treinos com barra e carga livre.",
    area: "alta",
    focus: "50% 40%",
  },
  {
    src: "/images/estrutura/halteres.jpg",
    alt: "Fileira de halteres pretos em um suporte, com luz fria",
    width: 1800,
    height: 1165,
    caption: "Pesos livres",
    text: "Carga na mão para treinar do seu jeito.",
    area: "pequena",
  },
  {
    src: "/images/estrutura/barra-no-rack.jpg",
    alt: "Barra olímpica apoiada no suporte, iluminada pela luz do sol que entra pela janela",
    width: 1800,
    height: 1200,
    caption: "Barras e anilhas",
    text: "Monte a carga do seu treino.",
    area: "pequena",
  },
  {
    src: "/images/estrutura/racks.jpg",
    alt: "Área de treino com racks, aparelhos de cabo e piso emborrachado",
    width: 1800,
    height: 1202,
    caption: "Aparelhos",
    text: "Máquinas para o treino de musculação.",
    area: "larga",
  },
  {
    src: "/images/estrutura/barra-no-chao.jpg",
    alt: "Barra com anilhas apoiada no piso emborrachado, em preto e branco",
    width: 1400,
    height: 933,
    caption: "Treino com barra",
    text: "Força construída repetição por repetição.",
    area: "pequena",
  },
];

export const modalityPhotos = {
  musculacao: {
    src: "/images/modalidades/musculacao.jpg",
    alt: "Mulher fazendo agachamento com barra nas costas em uma academia iluminada",
    width: 1600,
    height: 1067,
    caption: "Musculação",
    focus: "60% 40%",
  },
  personal: {
    src: "/images/modalidades/personal.jpg",
    alt: "Personal trainer acompanhando uma aluna que se prepara para levantar a barra",
    width: 1600,
    height: 900,
    caption: "Personal trainer",
    focus: "40% 50%",
  },
} satisfies Record<string, Photo>;

export const galleryPhotos: Photo[] = [
  {
    src: "/images/galeria/terra.jpg",
    alt: "Mulher agachada segurando a barra antes de um levantamento terra",
    width: 1400,
    height: 2100,
    caption: "Antes da puxada",
    focus: "50% 70%",
  },
  {
    src: "/images/galeria/rack-costas.jpg",
    alt: "Mulher de costas segurando a barra atrás da cabeça, dentro de um rack diante de uma parede de tijolos",
    width: 1400,
    height: 935,
    caption: "Barra no rack",
  },
  {
    src: "/images/galeria/halteres-caminhada.jpg",
    alt: "Mulher de boné em pé na academia, segurando um halter em cada mão",
    width: 1400,
    height: 2100,
    caption: "Carga na mão",
    focus: "50% 55%",
  },
  {
    src: "/images/galeria/barra-fixa-pb.jpg",
    alt: "Homem de costas suspenso na barra fixa, em preto e branco",
    width: 1400,
    height: 2100,
    caption: "Costas em ação",
  },
  {
    src: "/images/galeria/levantamento.jpg",
    alt: "Pernas de um homem posicionado para levantar uma barra com anilhas no piso emborrachado",
    width: 2400,
    height: 1600,
    caption: "Posição de saída",
  },
  {
    src: "/images/galeria/agachamento-halter.jpg",
    alt: "Homem fazendo agachamento segurando halteres na altura dos ombros",
    width: 1400,
    height: 2100,
    caption: "Agachamento com halteres",
    focus: "50% 40%",
  },
  {
    src: "/images/galeria/anilha.jpg",
    alt: "Homem de regata branca caminhando pela academia com uma anilha na mão",
    width: 1400,
    height: 2099,
    caption: "Anilha",
    focus: "50% 45%",
  },
];
