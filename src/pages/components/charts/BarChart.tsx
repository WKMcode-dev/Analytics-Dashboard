// src/components/charts/BarChart.tsx
import ReactECharts from "echarts-for-react"

type Props = {
  labels: string[]
  prefixo?: string
  programado: number[]
  realizado: number[]
  diferencaKM: number[]
  viagensProgramado: number[]
  viagensRealizado: number[]
  viagensDiferenca: number[]

  inicioProgramado: number[]
  inicioRealizado: number[]
  fimProgramado: number[]
  fimRealizado: number[]
}

export default function BarChart({
  labels,
  prefixo,
  programado,
  realizado,
  diferencaKM,
  viagensProgramado,
  viagensRealizado,
  viagensDiferenca,
}: Props) {

  // 🎨 cores padrão (centralizadas)
  const COLOR_PROGRAMADO = "#5470C6"
  const COLOR_REALIZADO = "#91CC75"
  const COLOR_POSITIVO = "#00ff88"
  const COLOR_NEGATIVO = "#ff4d4f"

  // const formatTime = (seconds: number) => {
  //   if (!seconds || isNaN(seconds)) return "--:--:--"

  //   const h = Math.floor(seconds / 3600)
  //   const m = Math.floor((seconds % 3600) / 60)
  //   const s = Math.floor(seconds % 60)

  //   return `${h.toString().padStart(2, "0")}:${m
  //     .toString()
  //     .padStart(2, "0")}:${s.toString().padStart(2, "0")}`
  // }

  const option = {

    // 🔥 garante cores iguais na legenda
    color: [
      COLOR_PROGRAMADO,
      COLOR_REALIZADO,
      COLOR_POSITIVO
    ],

    tooltip: {
      trigger: "axis",
      backgroundColor: "#111",
      borderColor: "#333",
      textStyle: { color: "#fff" },

      formatter: (params: any) => {
        try {
          const i = params?.[0]?.dataIndex ?? 0

          const safe = (v: any) =>
            typeof v === "number" && !isNaN(v) ? v : 0

          const kmP = safe(programado[i])
          const kmR = safe(realizado[i])
          const kmD = safe(diferencaKM[i])

          const vP = safe(viagensProgramado?.[i])
          const vR = safe(viagensRealizado?.[i])
          const vD = safe(viagensDiferenca?.[i])

          const diffColor =
            kmD >= 0 ? COLOR_POSITIVO : COLOR_NEGATIVO

          const diffColorViagem =
            vD >= 0 ? COLOR_POSITIVO : COLOR_NEGATIVO

          const prefixoInfo = prefixo
            ? `<span style="color:${COLOR_REALIZADO}">🚍 ${prefixo}</span><br/><br/>`
            : ""

          return `
      <b>${labels[i] ?? "-"}</b><br/>
      ${prefixoInfo}

      📊 <b>KM</b><br/>
      Programado: <span style="color:${COLOR_PROGRAMADO}">
        ${kmP.toFixed(2)}
      </span><br/>

      Realizado: <span style="color:${COLOR_REALIZADO}">
        ${kmR.toFixed(2)}
      </span><br/>

      Diferença: <b style="color:${diffColor}">
        ${kmD.toFixed(2)}
      </b><br/><br/>

      🚍 <b>Viagens</b><br/>
      Programado: <span style="color:${COLOR_PROGRAMADO}">
        ${vP}
      </span><br/>

      Realizado: <span style="color:${COLOR_REALIZADO}">
        ${vR}
      </span><br/>

      Diferença: <b style="color:${diffColorViagem}">
        ${vD}
      </b><br/><br/>
    `
        } catch (err) {
          console.error("Erro na tooltip:", err)
          return "Erro ao carregar tooltip"
        }
      }
    },

    grid: {
      left: 40,
      right: 20,
      bottom: 90,
      top: 60
    },

    legend: {
      data: ["Programado", "Realizado", "Diferença"],
      top: 10,
      left: "center",
      itemWidth: 14,
      itemHeight: 10,
      textStyle: {
        fontSize: 12
      }
    },

    dataZoom: [
      {
        type: "slider",
        height: 25,
        bottom: 15
      },
      {
        type: "inside"
      }
    ],

    xAxis: {
      type: "category",
      data: labels,
      axisLabel: {
        rotate: labels.length > 8 ? 30 : 0
      }
    },

    yAxis: {
      type: "value",
    },

    series: [
      {
        name: "Programado",
        type: "bar",
        data: programado,
        itemStyle: {
          color: COLOR_PROGRAMADO
        },
        barMaxWidth: 40
      },
      {
        name: "Realizado",
        type: "bar",
        data: realizado,
        itemStyle: {
          color: COLOR_REALIZADO
        },
        barMaxWidth: 40
      },
      {
        name: "Diferença",
        type: "bar",

        // 👇 cor base da legenda
        itemStyle: {
          color: COLOR_NEGATIVO
        },

        data: diferencaKM.map((v) => ({
          value: v,
          itemStyle: {
            color: v >= 0 ? COLOR_POSITIVO : COLOR_NEGATIVO
          }
        })),

        barMaxWidth: 40
      }
    ]
  }

  return (
    <ReactECharts
      option={option}
      style={{ height: 450, width: "100%" }}
    />
  )
}