// src/pages/utils/mapExecutiveData.ts
import type { ChartItem } from "../../types/ChartItem"

export const mapExecutiveData = (data: ChartItem[]): ChartItem[] => {
  if (!data.length) return []

  let totalProgramado = 0
  let totalRealizado = 0

  data.forEach((item) => {
    totalProgramado += item.kmProgramado
    totalRealizado += item.kmRealizado
  })

  return [
    {
      label: "TOTAL DO DIA",

      kmProgramado: totalProgramado,
      kmRealizado: totalRealizado,

      // 🔥 executivo NÃO precisa disso agora
      naoCumprida: 0,
      parcialmenteCumprida: 0,
      atrasado: 0,
      adiantado: 0,

      meta: {
        linha: "TOTAL",
        sentido: "GERAL"
      }
    }
  ]
}