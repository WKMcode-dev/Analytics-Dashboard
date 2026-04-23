// src/pages/hooks/useDashboardData.ts

import { useEffect, useState } from "react"
import { fetchDashboardData } from "../../services/api"
import { mapApiToChart } from "../utils/mapChartData"
import type { ChartItem } from "../../types/ChartItem"

type Filters = {
  linha: string
  prefixo: string
  sentido: "" | "IDA" | "VOLTA"
}

export function useDashboardData(date: string) {
  const [rawData, setRawData] = useState<any[]>([])
  const [data, setData] = useState<ChartItem[]>([])
  const [loading, setLoading] = useState(false)

  const [filters, setFilters] = useState<Filters>({
    linha: "",
    prefixo: "",
    sentido: ""
  })

  // 🔄 API
  useEffect(() => {
    if (!date) return

    const load = async () => {
      setLoading(true)

      try {
        const apiData = await fetchDashboardData(date)
        setRawData(apiData)

        console.log("📦 RAW DA API:", apiData.length, "registros")
      } catch (err) {
        console.error("❌ erro API:", err)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [date])

  // 🔍 FILTROS + MAP
  useEffect(() => {
    if (!rawData.length) return

    let filtered = [...rawData]

    // 🔎 filtro linha
    if (filters.linha) {
      const s = filters.linha.toLowerCase()

      filtered = filtered.filter((item) =>
        item.NomeLinha?.toLowerCase().includes(s) ||
        item.NumeroLinha?.toLowerCase().includes(s)
      )
    }

    // 🔎 filtro prefixo
    if (filters.prefixo) {
      const s = filters.prefixo.toLowerCase()

      filtered = filtered.filter((item) =>
        item.PrefixoRealizado?.toLowerCase().includes(s) ||
        item.PrefixoPrevisto?.toLowerCase().includes(s)
      )
    }

    // 🔎 filtro sentido
    if (filters.sentido) {
      filtered = filtered.filter(
        (item) => item.SentidoText === filters.sentido
      )
    }

    console.log("🧹 FILTRADO:", filtered.length, "registros")

    // 🔍 DEBUG AMOSTRAL (OK manter)
    console.log("🔍 AMOSTRA DOS DADOS (primeiros 5):")
    filtered.slice(0, 5).forEach((item, index) => {
      console.log(`[${index}]`, {
        linha: item.NumeroLinha,
        sentido: item.SentidoText,
        km: parseFloat(item.KMRodado?.replace(",", ".") || "0"),
        inicio: item.InicioRealizadoText,
        fim: item.FimRealizadoText
      })
    })

    // 🚀 MAP CORRETO (VIAGENS + LIMITE)
    const mapped = mapApiToChart(filtered, {
      limit: 80,
      debug: false
    })

    console.log("📊 VIAGENS EXIBIDAS:", mapped.length)

    setData(mapped)
  }, [rawData, filters])

  return {
    data,
    loading,
    filters,
    setFilters,
    rawData
  }
}