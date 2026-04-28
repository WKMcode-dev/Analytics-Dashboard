// src/pages/utils/mapChartData.ts

import type { ChartItem } from "../../types/ChartItem"

const parseNumber = (v: string) =>
  parseFloat(v?.replace(",", ".")) || 0

type MapOptions = {
  limit?: number
  debug?: boolean
}

export const mapApiToChart = (
  data: any[],
  options: MapOptions = {}
): ChartItem[] => {
  const { limit = 80, debug = false } = options

  const cleaned = data.filter((item) => {
    const inicioOk =
      item.InicioRealizadoText && item.InicioRealizadoText !== "-"
    const fimOk =
      item.FimRealizadoText && item.FimRealizadoText !== "-"

    if (!inicioOk || !fimOk) return false

    const kmReal = parseNumber(item.KMRodado)
    return kmReal > 0
  })

  if (debug) {
    console.log("🧹 VIAGENS VÁLIDAS:", cleaned.length)
  }

  const sliced = cleaned.slice(-limit)

  return sliced.map((item) => {
    const kmReal = parseNumber(item.KMRodado)

    return {
      label: `${item.NumeroLinha} (${item.SentidoText})`,

      // 🔥 principal
      kmRealizado: kmReal,

      // ⚠️ mantém compatibilidade com o tipo
      kmProgramado: parseNumber(item.KMProgramado),
      naoCumprida: item.NaoCumprida || 0,
      parcialmenteCumprida: item.ParcialmenteCumprida || 0,
      atrasado: (item.AtrasadoInicio || 0) + (item.AtrasadoFim || 0),
      adiantado: (item.AdiantadoInicio || 0) + (item.AdiantadoFim || 0),

      // 🔥 meta com prefixo
      meta: {
        linha: item.NumeroLinha,
        sentido: item.SentidoText,
        prefixo: item.PrefixoRealizado || "-",
        inicio: item.InicioRealizadoText,
        fim: item.FimRealizadoText,
        kmBruto: item.KMRodado
      }
    }
  })
}