import "./Configuracoes.css"

import TemaSection from "./sections/TemaSection"
import CoresSection from "./sections/CoresSection"
import DashboardSection from "./sections/DashboardSection"
import SistemaSection from "./sections/SistemaSection"

export default function Configuracoes() {
  return (
    <div className="config-page">
      <h1>Configurações</h1>

      <div className="config-grid">
        <TemaSection />
        <CoresSection/>
        <DashboardSection />
        <SistemaSection />
      </div>
    </div>
  )
}