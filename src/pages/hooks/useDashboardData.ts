// src\pages\hooks\useDashboardData.ts

import { useEffect, useState } from "react"
import { fetchDashboardData } from "../../services/api"
import { filtrarDados } from "../utils/filter"
import { agruparDados } from "../utils/groupData"

export function useDashboardData() {
  const [loading, setLoading] = useState(false)
  const [chartData, setChartData] = useState<any>(null)
  const [selectedDate, setSelectedDate] = useState("")
  const [search, setSearch] = useState("")
  const [rawData, setRawData] = useState<any[]>([])
  const [prefixo, setPrefixo] = useState("")

  // 📅 data padrão
  useEffect(() => {
    const hoje = new Date().toISOString().split("T")[0]
    setSelectedDate(hoje)
  }, [])

  // 🔄 busca API
  useEffect(() => {
    if (!selectedDate) return

    setLoading(true)

    fetchDashboardData(selectedDate)
      .then(setRawData)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [selectedDate])

  // 🔽 lista de prefixos disponíveis
  const prefixosDisponiveis = Array.from(
    new Set(
      rawData
        .map(item => item.PrefixoRealizado)
        .filter(p => p && String(p).startsWith("44"))
    )
  ).sort()

  // 📊 processamento dos dados
  useEffect(() => {
    if (!rawData.length) {
      setChartData(null)
      return
    }

    let filtrado = filtrarDados(rawData, search)

    // 🚍 filtro por prefixo
    if (prefixo) {
      filtrado = filtrado.filter(
        item =>
          item.PrefixoRealizado === prefixo ||
          item.PrefixoPrevisto === prefixo
      )
    }

    const dados = agruparDados(filtrado)

    setChartData(dados)
  }, [rawData, search, prefixo]) // 👈 IMPORTANTE

  return {
    loading,
    chartData,
    selectedDate,
    setSelectedDate,
    search,
    setSearch,
    prefixo,
    setPrefixo,
    prefixosDisponiveis
  }
}