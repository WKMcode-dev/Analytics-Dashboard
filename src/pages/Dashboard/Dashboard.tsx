// src/pages/Dashboard/Dashboard.tsx

import { useState, useMemo } from "react"
import { useDashboardData } from "../hooks/useDashboardData"
import BarChart from "../components/charts/BarChart"
import FilterModal from "../components/filter_modal/FilterModal"

import "./Dashboard.css"

const getToday = () => {
  const today = new Date()
  const offset = today.getTimezoneOffset()
  const localDate = new Date(today.getTime() - offset * 60 * 1000)

  return localDate.toISOString().split("T")[0]
}

const formatDateBR = (date: string) => {
  if (!date) return ""
  const [year, month, day] = date.split("-")
  return `${day}/${month}/${year}`
}

export default function Dashboard() {
  const [date, setDate] = useState(getToday())
  const [tempDate, setTempDate] = useState(getToday()) // 🔥 NOVO

  const [openModal, setOpenModal] = useState(false)

  const {
    data,
    loading,
    filters,
    setFilters,
    rawData,
    mode,
    setMode
  } = useDashboardData(tempDate) // 🔥 USA tempDate

  const base = rawData

  // 🔥 LINHAS DINÂMICAS
  const linhas = useMemo(() => {
    let filtered = base

    if (filters.prefixo) {
      filtered = filtered.filter(
        (item: any) =>
          item.PrefixoRealizado === filters.prefixo ||
          item.PrefixoPrevisto === filters.prefixo
      )
    }

    return [
      ...new Set(
        filtered.map((item: any) => item.NumeroLinha).filter(Boolean)
      )
    ].sort()
  }, [base, filters.prefixo])

  // 🔥 PREFIXOS DINÂMICOS
  const prefixos = useMemo(() => {
    let filtered = base

    if (filters.linha) {
      filtered = filtered.filter(
        (item: any) => item.NumeroLinha === filters.linha
      )
    }

    return [
      ...new Set(
        filtered
          .map((item: any) => item.PrefixoRealizado)
          .filter(Boolean)
      )
    ].sort()
  }, [base, filters.linha])

  return (
    <div className="dashboard-page">
      <h1>Dashboard</h1>

      <div className="filters">
        <button
          className="btn-clear"
          onClick={() => {
            setTempDate(date) 
            setOpenModal(true)
          }}
        >
          🔎 Filtrar • {formatDateBR(date)}
        </button>

        <div className="mode-toggle">
          <button
            className={`btn-clear ${
              mode === "operacional" ? "active" : ""
            }`}
            onClick={() => setMode("operacional")}
          >
            Operacional
          </button>

          <button
            className={`btn-clear ${
              mode === "executivo" ? "active" : ""
            }`}
            onClick={() => setMode("executivo")}
          >
            Executivo
          </button>
        </div>
      </div>

      <div className="card card-main">
        {data.length > 0 && !loading && (
          <BarChart data={data} />
        )}

        {!loading && data.length === 0 && (
          <p>Nenhum dado encontrado</p>
        )}
      </div>

      {loading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
          <span>Carregando...</span>
        </div>
      )}

      <FilterModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}

        // 🔥 AGORA TEM LIVE UPDATE
        onDateChange={setTempDate}

        onApply={(newFilters: any, newDate: string) => {
          setFilters(newFilters)
          setDate(newDate)
          setTempDate(newDate) // 🔥 mantém sincronizado
        }}

        initialFilters={filters}
        initialDate={tempDate} // 🔥 usa tempDate

        options={{
          linhas,
          prefixos
        }}
      />
    </div>
  )
}