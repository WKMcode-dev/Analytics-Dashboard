import { useEffect, useState } from "react"
import ConfigCard from "../components/ConfigCard"
import ToggleSwitch from "../components/ToggleSwitch"

export default function TemaSection() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark"
  })

  // 🔥 aplica no body
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.body.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }, [darkMode])

  return (
    <ConfigCard title="Tema">
      <ToggleSwitch
        label="Modo escuro"
        checked={darkMode}
        onChange={() => setDarkMode(!darkMode)}
      />
    </ConfigCard>
  )
}