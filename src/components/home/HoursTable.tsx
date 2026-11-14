"use client";

import { useSyncExternalStore } from "react";
import { business } from "@/data/business";
import { cn } from "@/lib/utils";

// dia da semana no fuso de Linhares (America/Sao_Paulo), calculado só no navegador
const weekdayIndex: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

function getToday() {
  const name = new Intl.DateTimeFormat("en-US", { weekday: "short", timeZone: "America/Sao_Paulo" }).format(new Date());
  return weekdayIndex[name] ?? -1;
}

const subscribe = () => () => {};

/** Tabela de horários com a linha de hoje destacada. */
export function HoursTable() {
  // no servidor nenhum dia é destacado; no navegador, o dia atual
  const today = useSyncExternalStore(subscribe, getToday, () => -1);

  return (
    <table className="w-full text-[0.98rem]">
      <caption className="sr-only">Horário de funcionamento</caption>
      <tbody>
        {business.hours.rows.map((row) => {
          const isToday = (row.days as readonly number[]).includes(today);
          return (
            <tr
              key={row.label}
              className={cn("border-b border-white/8 last:border-0", isToday && "text-branco")}
              aria-current={isToday ? "date" : undefined}
            >
              <th scope="row" className="py-3 pr-4 text-left align-top font-medium">
                <span className={cn(isToday ? "text-branco" : "text-branco/75")}>{row.label}</span>
                {isToday && (
                  <span className="ml-2 rounded-sm bg-verde px-1.5 py-0.5 align-middle text-[0.72rem] font-bold text-grafite">
                    hoje
                  </span>
                )}
              </th>
              <td className={cn("py-3 text-right tabular-nums", isToday ? "text-branco" : "text-branco/75")}>
                {row.periods.length ? (
                  row.periods.map((period) => (
                    <span key={period} className="block">
                      {period}
                    </span>
                  ))
                ) : (
                  <span className="text-cinza">Fechado</span>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
