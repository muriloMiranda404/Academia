export const navigation = [
  { id: "inicio", label: "Início" },
  { id: "sobre", label: "Sobre" },
  { id: "estrutura", label: "Estrutura" },
  { id: "modalidades", label: "Modalidades" },
  { id: "planos", label: "Planos" },
  { id: "galeria", label: "Galeria" },
  { id: "contato", label: "Contato" },
] as const;

export type SectionId = (typeof navigation)[number]["id"];
