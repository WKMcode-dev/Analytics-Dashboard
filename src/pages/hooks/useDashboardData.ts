// src/pages/hooks/useDashboardData.ts

import { useEffect, useState } from "react"
import { fetchDashboardData } from "../../services/api"
import { mapApiToChart } from "../utils/mapChartData"
import { mapExecutiveData } from "../utils/mapExecutiveData"
import type { ChartItem } from "../../types/ChartItem"

type Mode = "operacional" | "executivo"

type Filters = {
  linha: string
  prefixo: string
  sentido: "" | "IDA" | "VOLTA"
}

// 🔥 helper de data (ESSENCIAL)
const extractDate = (value: string) => {
  if (!value) return ""

  try {
    const [date] = value.split(" ")
    const [day, month, year] = date.split("/")

    return `${year}-${month}-${day}`
  } catch {
    return ""
  }
}

export function useDashboardData(date: string) {
  const [rawData, setRawData] = useState<any[]>([])
  const [data, setData] = useState<ChartItem[]>([])
  const [loading, setLoading] = useState(false)

  const [mode, setMode] = useState<Mode>("operacional")

  const [filters, setFilters] = useState<Filters>({
    linha: "",
    prefixo: "",
    sentido: ""
  })

  // 🔄 API + FILTRO REAL POR DATA
  useEffect(() => {
    if (!date) return

    const load = async () => {
      setLoading(true)

      try {
        const apiData = await fetchDashboardData(date)

        console.log("📦 RAW DA API:", apiData.length)

        // 🔥 FILTRO REAL (RESOLVE O BUG)
        const filteredByDate = apiData.filter((item: any) => {
          const rawDate =
            item.InicioRealizado || item.InicioPrevisto

          if (!rawDate) return false

          const itemDate = extractDate(rawDate)

          if (itemDate !== date) return false

          const km = parseFloat(item.KMRodado?.replace(",", ".") || "0")

          if (km <= 0) return false

          return true
        })

        console.log(
          "📅 APÓS FILTRO DE DATA:",
          filteredByDate.length
        )

        setRawData(filteredByDate)
      } catch (err) {
        console.error("❌ erro API:", err)
        setRawData([])
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [date])

  // 🔍 FILTROS + PROCESSAMENTO
  useEffect(() => {
    if (!rawData.length) {
      setData([])
      return
    }

    let filtered = [...rawData]

    // 🔎 linha
    if (filters.linha) {
      filtered = filtered.filter(
        (item) => item.NumeroLinha === filters.linha
      )
    }

    // 🔎 prefixo
    if (filters.prefixo) {
      filtered = filtered.filter(
        (item) =>
          item.PrefixoRealizado === filters.prefixo ||
          item.PrefixoPrevisto === filters.prefixo
      )
    }

    // 🔎 sentido
    if (filters.sentido) {
      filtered = filtered.filter(
        (item) => item.SentidoText === filters.sentido
      )
    }

    console.log("🧹 FILTRADO FINAL:", filtered.length)

    // 🔵 operacional (limitado)
    const operational = mapApiToChart(filtered, {
      limit: 80
    })

    // 🟣 executivo (SEM LIMITAÇÃO)
    const fullData = mapApiToChart(filtered, {
      limit: 9999
    })

    const executive = mapExecutiveData(fullData)

    const finalData =
      mode === "operacional" ? operational : executive

    console.log(
      `📊 MODO: ${mode} | ITENS:`,
      finalData.length
    )

    setData(finalData)
  }, [rawData, filters, mode])

  return {
    data,
    loading,
    filters,
    setFilters,
    rawData,
    processedData: data,
    mode,
    setMode
  }
}