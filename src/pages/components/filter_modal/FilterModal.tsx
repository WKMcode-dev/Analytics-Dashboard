// src/pages/components/filter_modal/FilterModal.tsx

import { useState, useEffect, useRef } from "react"
import "./FilterModal.css"

type Props = {
  isOpen: boolean
  onClose: () => void

  onApply: (filters: any, date: string) => void

  // 🔥 NOVO
  onDateChange: (date: string) => void

  initialFilters: any
  initialDate: string

  options: {
    linhas: string[]
    prefixos: string[]
  }
}

export default function FilterModal({
  isOpen,
  onClose,
  onApply,
  onDateChange, // 🔥 NOVO
  initialFilters,
  initialDate,
  options
}: Props) {
  const [form, setForm] = useState(initialFilters)
  const [localDate, setLocalDate] = useState(initialDate)

  const [showLinhaList, setShowLinhaList] = useState(false)
  const [showPrefixoList, setShowPrefixoList] = useState(false)

  const linhaRef = useRef<HTMLDivElement | null>(null)
  const prefixoRef = useRef<HTMLDivElement | null>(null)

  // 🔥 sincroniza ao abrir
  useEffect(() => {
    if (isOpen) {
      setForm(initialFilters)
      setLocalDate(initialDate)
    }
  }, [isOpen, initialFilters, initialDate])

  // 🔥 FECHAR AO CLICAR FORA
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        linhaRef.current &&
        !linhaRef.current.contains(event.target as Node)
      ) {
        setShowLinhaList(false)
      }

      if (
        prefixoRef.current &&
        !prefixoRef.current.contains(event.target as Node)
      ) {
        setShowPrefixoList(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  if (!isOpen) return null

  const handleChange = (field: string, value: string) => {
    setForm((prev: any) => ({ ...prev, [field]: value }))
  }

  // 🔍 filtros dinâmicos
  const linhasFiltradas = options.linhas.filter((l) =>
    l.toLowerCase().includes((form.linha || "").toLowerCase())
  )

  const prefixosFiltrados = options.prefixos.filter((p) =>
    p.toLowerCase().includes((form.prefixo || "").toLowerCase())
  )

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Filtros</h2>

        {/* 📅 DATA */}
        <label>Data</label>
        <input
          type="date"
          value={localDate}
          onChange={(e) => {
            const value = e.target.value
            setLocalDate(value)

            // 🔥 AQUI FAZ ATUALIZAR O DASHBOARD EM TEMPO REAL
            onDateChange(value)
          }}
        />

        {/* 🔥 LINHA */}
        <label>Linha</label>
        <div className="autocomplete" ref={linhaRef}>
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

        {/* 🔥 PREFIXO */}
        <label>Prefixo</label>
        <div className="autocomplete" ref={prefixoRef}>
          <input
            placeholder="Prefixo"
            value={form.prefixo || ""}
            onFocus={() => setShowPrefixoList(true)}
            onChange={(e) => handleChange("prefixo", e.target.value)}
          />

          {showPrefixoList && (
            <div className="autocomplete-list">
              {prefixosFiltrados.map((p) => (
                <div
                  key={p}
                  className="autocomplete-item"
                  onClick={() => {
                    handleChange("prefixo", p)
                    setShowPrefixoList(false)
                  }}
                >
                  {p}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* SENTIDO */}
        <label>Sentido</label>
        <select
          value={form.sentido || ""}
          onChange={(e) => handleChange("sentido", e.target.value)}
        >
          <option value="">Todos</option>
          <option value="IDA">IDA</option>
          <option value="VOLTA">VOLTA</option>
        </select>

        {/* AÇÕES */}
        <div className="modal-actions">
          <button onClick={onClose}>Cancelar</button>

          <button
            onClick={() => {
              onApply(form, localDate)
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