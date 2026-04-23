// src\pages\components\filter_modal\FilterModal.tsx

import { useState } from "react"
import "./FilterModal.css"

type Props = {
  isOpen: boolean
  onClose: () => void
  onApply: (filters: any) => void
  initialFilters: any
  options: {
    linhas: string[]
    prefixos: string[]
  }
}

export default function FilterModal({
  isOpen,
  onClose,
  onApply,
  initialFilters,
  options
}: Props) {
  const [form, setForm] = useState(initialFilters)

  const [showLinhaList, setShowLinhaList] = useState(false)

  if (!isOpen) return null

  const handleChange = (field: string, value: string) => {
    setForm((prev: any) => ({ ...prev, [field]: value }))
  }

  // 🔍 filtro dinâmico
  const linhasFiltradas = options.linhas.filter((l) =>
    l.toLowerCase().includes((form.linha || "").toLowerCase())
  )

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Filtros</h2>

        {/* LINHA */}
        <label>Linha</label>
        <div className="autocomplete">
          <input
            placeholder="Linha"
            value={form.linha || ""}
            onFocus={() => setShowLinhaList(true)}
            onChange={(e) => handleChange("linha", e.target.value)}
          />

          {showLinhaList && (
            <div className="autocomplete-list">
              {linhasFiltradas.map((l) => (
                <div
                  key={l}
                  className="autocomplete-item"
                  onClick={() => {
                    handleChange("linha", l)
                    setShowLinhaList(false)
                  }}
                >
                  {l}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* PREFIXO */}
        <label>Prefixo</label>
        <input
          placeholder="Prefixo"
          value={form.prefixo}
          onChange={(e) => handleChange("prefixo", e.target.value)}
        />

        {/* SENTIDO */}
        <label>Sentido</label>
        <select
          value={form.sentido}
          onChange={(e) => handleChange("sentido", e.target.value)}
        >
          <option value="">Todos</option>
          <option value="IDA">IDA</option>
          <option value="VOLTA">VOLTA</option>
        </select>

        <div className="modal-actions">
          <button onClick={onClose}>Cancelar</button>

          <button
            onClick={() => {
              onApply(form)
              onClose()
            }}
          >
            Aplicar
          </button>
        </div>
      </div>
    </div>
  )
}