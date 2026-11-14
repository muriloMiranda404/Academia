type SwooshProps = React.SVGProps<SVGSVGElement>;

/**
 * Traço em arco, afinando nas pontas — referência ao gesto do logotipo da
 * Suprema (a figura em movimento). Versão compacta, para a marca provisória.
 */
export function Swoosh(props: SwooshProps) {
  return (
    <svg viewBox="0 0 100 40" fill="currentColor" aria-hidden focusable="false" {...props}>
      <path d="M2 36C30 6 70 2 98 8C70 8 32 14 2 36Z" />
    </svg>
  );
}

/**
 * Versão longa do arco para o hero (viewBox 950 × 320, 100 unidades = 1 em do
 * título). Traço fino: no máximo ~0,11 em de espessura, afinando nas pontas.
 */
export function HeroSwooshPath() {
  return <path d="M0 320C260 150 560 40 950 8C570 52 270 168 0 320Z" />;
}
