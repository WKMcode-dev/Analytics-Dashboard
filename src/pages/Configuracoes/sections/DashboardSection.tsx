import { useState } from "react"
import ConfigCard from "../components/ConfigCard"
import ToggleSwitch from "../components/ToggleSwitch"

export default function DashboardSection() {
  const [showAnimations, setShowAnimations] = useState(true)

  return (
    <ConfigCard title="Dashboard">
      <ToggleSwitch
        label="Animações"
        checked={showAnimations}
        onChange={() => setShowAnimations(!showAnimations)}
      />
    </ConfigCard>
  )
}