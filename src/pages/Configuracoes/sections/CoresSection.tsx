// src/pages/Configuracoes/sections/CoresSection.tsx
import { useEffect, useState } from "react"
import ConfigCard from "../components/ConfigCard"

export default function CoresSection() {
    const [primaryColor, setPrimaryColor] = useState(() => {
        return localStorage.getItem("primaryColor") || "#FF7A00"
    })

    const [secondaryColor, setSecondaryColor] = useState(() => {
        return localStorage.getItem("secondaryColor") || "#FFC300"
    })


    function hexToRgb(hex: string) {
        const bigint = parseInt(hex.replace("#", ""), 16)
        return `${(bigint >> 16) & 255}, ${(bigint >> 8) & 255}, ${bigint & 255}`
    }

    useEffect(() => {
        const root = document.documentElement

        const primaryRGB = hexToRgb(primaryColor)
        const secondaryRGB = hexToRgb(secondaryColor)

        root.style.setProperty("--color-primary", primaryColor)
        root.style.setProperty("--color-secondary", secondaryColor)

        root.style.setProperty("--color-primary-rgb", primaryRGB)
        root.style.setProperty("--color-secondary-rgb", secondaryRGB)

        root.style.setProperty("--color-primary-soft", `rgba(${primaryRGB}, 0.1)`)

        root.style.setProperty("--color-border", primaryColor)
        root.style.setProperty("--color-shadow", `rgba(${primaryRGB}, 0.6)`)
        root.style.setProperty("--color-glow", `rgba(${secondaryRGB}, 0.6)`)

        // 🔥 persistência correta
        localStorage.setItem("primaryColor", primaryColor)
        localStorage.setItem("secondaryColor", secondaryColor)

    }, [primaryColor, secondaryColor])

    // 🎨 presets rápidos (UX melhor)
    const presets = [
        { primary: "#FF7A00", secondary: "#FFC300" }, // padrão
        { primary: "#3B82F6", secondary: "#60A5FA" }, // azul
        { primary: "#10B981", secondary: "#34D399" }, // verde
        { primary: "#EF4444", secondary: "#F87171" }, // vermelho
        { primary: "#8B5CF6", secondary: "#A78BFA" }  // roxo
    ]

    return (
        <ConfigCard title="🎨 Personalizar cores">
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

                {/* 🔍 PREVIEW */}
                <div style={{
                    display: "flex",
                    gap: "10px",
                    alignItems: "center"
                }}>
                    <div style={{
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        background: primaryColor,
                        border: "2px solid var(--color-muted)"
                    }} />

                    <div style={{
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        background: secondaryColor,
                        border: "2px solid var(--color-muted)"
                    }} />

                    <span style={{ fontSize: "14px", color: "var(--color-muted)" }}>
                        Preview das cores
                    </span>
                </div>

                {/* 🎯 COLOR PICKERS */}
                <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>

                    <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                        <label style={{ fontSize: "13px" }}>Cor principal</label>
                        <input
                            type="color"
                            value={primaryColor}
                            onChange={(e) => setPrimaryColor(e.target.value)}
                            style={{
                                width: "60px",
                                height: "40px",
                                border: "none",
                                cursor: "pointer",
                                background: "none"
                            }}
                        />
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                        <label style={{ fontSize: "13px" }}>Cor secundária</label>
                        <input
                            type="color"
                            value={secondaryColor}
                            onChange={(e) => setSecondaryColor(e.target.value)}
                            style={{
                                width: "60px",
                                height: "40px",
                                border: "none",
                                cursor: "pointer",
                                background: "none"
                            }}
                        />
                    </div>

                </div>

                {/* ⚡ PRESETS */}
                <div>
                    <span style={{ fontSize: "13px", color: "var(--color-muted)" }}>
                        Sugestões rápidas:
                    </span>

                    <div style={{
                        display: "flex",
                        gap: "10px",
                        marginTop: "8px",
                        flexWrap: "wrap"
                    }}>
                        {presets.map((p, index) => (
                            <div
                                key={index}
                                onClick={() => {
                                    setPrimaryColor(p.primary)
                                    setSecondaryColor(p.secondary)
                                }}
                                style={{
                                    display: "flex",
                                    cursor: "pointer",
                                    borderRadius: "20px",
                                    overflow: "hidden",
                                    border: "1px solid var(--color-muted)"
                                }}
                            >
                                <div style={{
                                    width: 25,
                                    height: 25,
                                    background: p.primary
                                }} />
                                <div style={{
                                    width: 25,
                                    height: 25,
                                    background: p.secondary
                                }} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* 🔄 RESET */}
                <button
                    onClick={() => {
                        setPrimaryColor("#FF7A00")
                        setSecondaryColor("#FFC300")
                    }}
                    style={{
                        marginTop: "10px",
                        padding: "8px 12px",
                        borderRadius: "var(--radius)",
                        border: "none",
                        background: "var(--color-primary-soft)",
                        color: "var(--color-text)",
                        textShadow: "0 1px 2px rgba(0,0,0,0.3)",
                        cursor: "pointer",
                        transition: "var(--transition)"
                    }}
                >
                    Resetar padrão
                </button>

            </div>
        </ConfigCard>
    )
}