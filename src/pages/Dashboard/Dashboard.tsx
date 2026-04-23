import BarChart from "../components/charts/BarChart"
import { useDashboardData } from "../hooks/useDashboardData"

import "./Dashboard.css"

export default function Dashboard() {
  const {
    loading,
    chartData,
    selectedDate,
    setSelectedDate,
    search,
    setSearch,
    prefixo,
    setPrefixo,
    prefixosDisponiveis
  } = useDashboardData()

  return (
    <div className="dashboard-page">
      <h1>Dashboard</h1>

      {/* 🔍 FILTROS */}
      <div className="filters">
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="date-filter"
        />

        {selectedDate && (
          <button
            className="btn-clear"
            onClick={() => setSelectedDate("")}
          >
            Limpar
          </button>
        )}

        <input
          type="text"
          placeholder="🔍 Buscar linha, prefixo, motorista..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-filter"
        />
        <select
          value={prefixo}
          onChange={(e) => setPrefixo(e.target.value)}
          className="prefix-filter"
        >
          <option value="">🚍 Todos os veículos</option>

          {prefixosDisponiveis.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>

      {/* 📊 CARDS */}
      <div className="cards">
        {/* 📊 GRÁFICO PRINCIPAL */}
        <div className="card card-main">
          {chartData ? (
            <BarChart {...chartData} prefixo={prefixo} />
          ) : (
            <p className="empty-state">Nenhum dado encontrado</p>
          )}
        </div>

        {/* 📦 CARDS FUTUROS */}
        <div className="card">
          <h3>Mais gráficos</h3>
          <p>Em breve...</p>
        </div>

        <div className="card">
          <h3>Indicadores</h3>
          <p>Em breve...</p>
        </div>
      </div>

      {/* ⏳ LOADING */}
      {loading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
          <span>Carregando dados...</span>
        </div>
      )}
    </div>
  )
}