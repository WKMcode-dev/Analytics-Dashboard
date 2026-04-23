// src\pages\hooks\useDashboardData.ts

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
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        load()
    }, [date])

    // 🔍 FILTROS
    useEffect(() => {
        if (!rawData.length) return

        let filtered = [...rawData]

        if (filters.linha) {
            const s = filters.linha.toLowerCase()

            filtered = filtered.filter((item) =>
                item.NomeLinha?.toLowerCase().includes(s) ||
                item.NumeroLinha?.toLowerCase().includes(s)
            )
        }

        if (filters.prefixo) {
            const s = filters.prefixo.toLowerCase()

            filtered = filtered.filter((item) =>
                item.PrefixoRealizado?.toLowerCase().includes(s) ||
                item.PrefixoPrevisto?.toLowerCase().includes(s)
            )
        }

        if (filters.sentido) {
            filtered = filtered.filter(
                (item) => item.SentidoText === filters.sentido
            )
        }

        setData(mapApiToChart(filtered))
    }, [rawData, filters])

    return {
        data,
        loading,

        filters,
        setFilters,

        rawData
    }
}