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

export default function Dashboard() {
  const [date, setDate] = useState(getToday())
  const [openModal, setOpenModal] = useState(false)

  const { data, loading, filters, setFilters, rawData } =
    useDashboardData(date)

  // 🔥 extrair opções únicas da API
  const linhas = useMemo(() => {
    return [
      ...new Set(
        rawData.map((item: any) => item.NumeroLinha).filter(Boolean)
      )
    ]
  }, [rawData])

  const prefixos = useMemo(() => {
    return [
      ...new Set(
        rawData.map((item: any) => item.PrefixoRealizado).filter(Boolean)
      )
    ]
  }, [rawData])

  return (
    <div className="dashboard-page">
      <h1>Dashboard</h1>

      {/* 🔍 FILTROS */}
      <div className="filters">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="date-filter"
        />

        <button
          className="btn-clear"
          onClick={() => setOpenModal(true)}
        >
          🔎 Filtrar
        </button>
      </div>

      {/* 📊 CARD */}
      <div className="card card-main">
        {data.length > 0 && !loading && (
          <BarChart data={data} />
        )}

        {!loading && data.length === 0 && (
          <p>Nenhum dado encontrado</p>
        )}
      </div>

      {/* ⏳ LOADING */}
      {loading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
          <span>Carregando...</span>
        </div>
      )}

      {/* 🧠 MODAL */}
      <FilterModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        onApply={setFilters}
        initialFilters={filters}
        options={{
          linhas,
          prefixos
        }}
      />
    </div>
  )
}