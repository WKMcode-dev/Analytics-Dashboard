import type { ChartItem } from "../../types/ChartItem"


const parseNumber = (v: string) =>
  parseFloat(v?.replace(",", ".")) || 0

export const mapApiToChart = (data: any[]): ChartItem[] => {
  const grouped: Record<string, ChartItem> = {}

  data.forEach((item) => {
    const key = item.NumeroLinha || "Sem linha"

    if (!grouped[key]) {
      grouped[key] = {
        label: key,

        kmProgramado: 0,
        kmRealizado: 0,

        naoCumprida: 0,
        parcialmenteCumprida: 0,

        atrasado: 0,
        adiantado: 0
      }
    }

    const g = grouped[key]

    g.kmProgramado += parseNumber(item.KMProgramado)
    g.kmRealizado += parseNumber(item.KMRodado)

    g.naoCumprida += item.NaoCumprida
    g.parcialmenteCumprida += item.ParcialmenteCumprida

    g.atrasado += item.AtrasadoInicio + item.AtrasadoFim
    g.adiantado += item.AdiantadoInicio + item.AdiantadoFim
  })

  return Object.values(grouped)
}