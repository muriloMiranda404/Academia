# Academia Suprema — prévia de site institucional

Prévia comercial desenvolvida pela **KodexBase** para apresentar uma proposta de presença digital à
Academia Suprema (Linhares – ES). Site estático de uma página: sem banco de dados, login, agendamento,
pagamentos ou área administrativa.

## Como rodar

```bash
npm install
npm run dev          # http://localhost:3000
```

Quality gates:

```bash
npm run lint
npm run typecheck
npm run build
npm run test:e2e     # Playwright contra o build (porta 3100), desktop e celular
npm run screenshots  # com `npx next start -p 3100` rodando; gera ./screenshots
```

Stack: Next.js 16 (App Router, Turbopack, Cache Components), React 19, TypeScript, Tailwind CSS 4,
shadcn/ui (base Base UI), Lucide, Motion.

## Prévia × site oficial

`NEXT_PUBLIC_PREVIEW` controla o modo (padrão: prévia).

Na prévia:

- o site fica fora dos buscadores (`noindex` na meta tag, no cabeçalho `X-Robots-Tag` e no `robots.txt`);
- dados vindos de diretórios aparecem com o selo **a confirmar**;
- blocos de reserva (como "Outras modalidades") e o crédito da KodexBase ficam visíveis;
- os dados estruturados (JSON-LD de academia) não são publicados.

Defina `NEXT_PUBLIC_PREVIEW=false` **só depois** de confirmar com a academia os itens da lista abaixo.

## Pesquisa (14/11/2026)

| Dado | Fonte | Situação |
|---|---|---|
| WhatsApp (27) 99717-1441 | Link na bio do Instagram oficial; o mesmo número está no Wellhub | Confirmado pelo perfil oficial |
| Instagram @suprema_academia | Perfil oficial | Confirmado |
| Frase "Torne a sua saúde uma das suas prioridades…" | Bio do Instagram | Usada como citação, com crédito |
| Endereço Av. Tupinambás, 230 — José Rodrigues Maciel, CEP 29904-025 | Página da academia no Wellhub | **A confirmar** |
| Horários (seg–qui 05–11h e 14–21h30; sex 05–11h e 14–21h; sáb 08–11h; dom fechado) | Wellhub | **A confirmar** (o destaque "Horário" do Instagram não pôde ser lido) |
| Musculação, personal trainer, Wi-Fi, sem agendamento | Wellhub | **A confirmar** |
| Parceria Wellhub a partir do plano Basic | Wellhub | **A confirmar** |

**Identidade visual:** o logotipo (visto no Wellhub e na fachada) usa preto/grafite, branco e um verde
médio, amostrado em ~`#00A862`. O site troca o verde-lima provisório do briefing pelo verde da marca
(`#14A866`, com variações para contraste) e usa a palavra "Suprema" em itálico, como no logo, nos títulos.

Não foram encontrados (e por isso **não aparecem no site**): preços e tipos de plano, outras modalidades,
equipe, tempo de mercado, número de alunos, lista de equipamentos e avaliações.

## Pendências para a reunião com a academia

1. Confirmar endereço e horários (e se mudam em feriados).
2. Confirmar modalidades: só musculação ou há aulas/atividades? (bloco "Outras modalidades" reservado)
3. Planos: tipos, periodicidades, valores e formas de pagamento — hoje tudo é "sob consulta".
4. Confirmar a parceria Wellhub e o plano mínimo; perguntar sobre TotalPass ou similares.
5. Personal trainer: é da casa ou profissional externo? Como contratar?
6. Pedir autorização e arquivos: logotipo oficial em vetor e fotos reais das instalações.
7. Domínio, e-mail e quem vai atualizar os dados depois da publicação.

## Onde editar

| O quê | Arquivo |
|---|---|
| Contatos, endereço, horários, Wellhub, fatos verificados | `src/data/business.ts` |
| Título, descrição e modo prévia | `src/data/site.ts` |
| Fotos (caminho, texto alternativo, enquadramento) | `src/data/photos.ts` |
| Itens do menu | `src/data/navigation.ts` |
| Marca provisória | `src/components/brand/Wordmark.tsx` |
| Cores e tipografia | `src/app/globals.css` (`@theme`) |

Ao trocar as fotos por fotos reais da academia, mude `photosAreIllustrative` para `false` em
`src/data/photos.ts` (isso remove os avisos de "imagem ilustrativa").

## Marca e imagens

- **Logotipo:** o oficial não foi usado (sem autorização). `Wordmark.tsx` é uma marca provisória só
  tipográfica, e `src/app/icon.svg` segue a mesma linha.
- **Fotos:** nenhuma foto do Instagram ou do Wellhub da academia foi usada. Todas são ilustrativas, do
  [Unsplash](https://unsplash.com/license) (uso gratuito, inclusive comercial), e estão identificadas como
  tal na página.

Fotos usadas (página: `https://unsplash.com/photos/<id>`):

| Arquivo | ID |
|---|---|
| `hero/treino-escuro.jpg` | `9dzWZQWZMdE` |
| `sobre/agachamento.jpg` | `jO6vBWX9h9Y` |
| `sobre/pegada.jpg` | `Xb1d-N04Quc` |
| `estrutura/salao.jpg` | `iW79tgCbiMs` |
| `estrutura/gaiola.jpg` | `U2q73PfHFpM` |
| `estrutura/halteres.jpg` | `m4Jqyv5VwqY` |
| `estrutura/barra-no-rack.jpg` | `gzeTjGu3b_k` |
| `estrutura/racks.jpg` | `UpJkZIv4fM4` |
| `estrutura/barra-no-chao.jpg` | `Yuv-iwByVRQ` |
| `modalidades/musculacao.jpg` | `IYLLF511aOY` |
| `modalidades/personal.jpg` | `rD0poLlu57M` |
| `galeria/terra.jpg` | `78E-sY8mVsM` |
| `galeria/rack-costas.jpg` | `h4i9G-de7Po` |
| `galeria/halteres-caminhada.jpg` | `xrvM5LBIUdY` |
| `galeria/barra-fixa-pb.jpg` | `sHfo3WOgGTU` |
| `galeria/levantamento.jpg` | `WvDYdXDzkhs` |
| `galeria/agachamento-halter.jpg` | `HSUcA9U7bcA` |
| `galeria/anilha.jpg` | `TAZoUmDqzXk` |

## Decisões de privacidade e desempenho

- O mapa do Google só carrega quando o visitante clica em "Carregar mapa".
- Todas as fotos passam pelo `next/image` (AVIF/WebP, tamanhos responsivos); só a foto do hero tem prioridade.
- As animações respeitam "reduzir movimento" do sistema.
