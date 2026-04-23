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

  const cleaned = data
    // 🔥 FILTRO DE VIAGENS VÁLIDAS
    .filter((item) => {
      const inicioOk = item.InicioRealizadoText && item.InicioRealizadoText !== "-"
      const fimOk = item.FimRealizadoText && item.FimRealizadoText !== "-"

      if (!inicioOk || !fimOk) return false

      const kmReal = parseNumber(item.KMRodado)
      return kmReal > 0
    })

  if (debug) {
    console.log("🧹 VIAGENS VÁLIDAS:", cleaned.length)

    console.log("🔍 AMOSTRA (primeiras 5 viagens):")
    cleaned.slice(0, 5).forEach((item, i) => {
      console.log(`[${i}]`, {
        linha: item.NumeroLinha,
        sentido: item.SentidoText,
        km: parseNumber(item.KMRodado),
        inicio: item.InicioRealizadoText,
        fim: item.FimRealizadoText
      })
    })
  }

  // 🔥 LIMITA VISUALIZAÇÃO (evita gráfico lotado)
  const sliced = cleaned.slice(-limit)

  if (debug) {
    console.log(`📊 EXIBINDO ÚLTIMAS ${limit} VIAGENS`)
  }

  return sliced.map((item, index) => {
    const kmReal = parseNumber(item.KMRodado)

    return {
      // 🔥 IDENTIFICAÇÃO CLARA DA VIAGEM
      label: `${item.NumeroLinha} (${item.SentidoText}) #${index + 1}`,

      // 📊 MÉTRICAS PRINCIPAIS
      kmProgramado: parseNumber(item.KMProgramado),
      kmRealizado: kmReal,

      // 📌 INDICADORES OPERACIONAIS
      naoCumprida: item.NaoCumprida || 0,
      parcialmenteCumprida: item.ParcialmenteCumprida || 0,

      atrasado: (item.AtrasadoInicio || 0) + (item.AtrasadoFim || 0),
      adiantado: (item.AdiantadoInicio || 0) + (item.AdiantadoFim || 0),

      // 🧠 METADADOS (IMPORTANTE PARA DEBUG E FUTURO)
      meta: {
        linha: item.NumeroLinha,
        sentido: item.SentidoText,
        inicio: item.InicioRealizadoText,
        fim: item.FimRealizadoText,
        kmBruto: item.KMRodado
      }
    }
  })
}