// src\App.tsx
import { useEffect } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./components/Layout/Layout"

import Dashboard from "./pages/Dashboard/Dashboard"
import Relatorios from "./pages/Relatorios"
import Produtos from "./pages/Produtos"
import Configuracoes from "./pages/Configuracoes/Configuracoes"
import "./styles/global.css"
import "./components/Card/Card.css"

function App() {
  useEffect(() => {
    const body = document.body
    const root = document.documentElement

    // 🌙 Tema
    const savedTheme = localStorage.getItem("theme")

    body.classList.remove("dark")

    if (savedTheme === "dark") {
      body.classList.add("dark")
    }

    // 🎨 Cores personalizadas
    const primary = localStorage.getItem("primaryColor") || "#FF7A00"
    const secondary = localStorage.getItem("secondaryColor") || "#FFC300"

    root.style.setProperty("--color-primary", primary)
    root.style.setProperty("--color-secondary", secondary)
  }, [])

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/relatorios" element={<Relatorios />} />
          <Route path="/produtos" element={<Produtos />} />
          <Route path="/configuracoes" element={<Configuracoes />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App