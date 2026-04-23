// src\components\Sidebar\Sidebar.tsx
import { NavLink } from "react-router-dom"
import { FaHome, FaChartBar, FaBox, FaCog } from "react-icons/fa"
import "./Sidebar.css"

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <nav className="menu">
        <NavLink to="/" end>
          <div className="item">
            <FaHome />
          </div>
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/relatorios">
          <div className="item">
            <FaChartBar />
          </div>
          <span>Relatórios</span>
        </NavLink>

        <NavLink to="/produtos">
          <div className="item">
            <FaBox />
          </div>
          <span>Produtos</span>
        </NavLink>

        <NavLink to="/configuracoes">
          <div className="item">
            <FaCog />
          </div>
          <span>Configurações</span>
        </NavLink>
      </nav>
    </aside>
  )
}