// src\pages\components\charts\BarChart.tsx

import ReactECharts from "echarts-for-react"
import type { ChartItem } from "../../../types/ChartItem"

type Props = {
  data: ChartItem[]
}

export default function BarChart({ data }: Props) {
  const COLOR_PROGRAMADO = "#5470C6"
  const COLOR_REALIZADO = "#91CC75"
  const COLOR_POSITIVO = "#00ff88"
  const COLOR_NEGATIVO = "#ff4d4f"
  const COLOR_NEUTRO = "#999"

  // 🔥 regra única (fonte da verdade)
  const isNaoRealizado = (item: ChartItem) =>
    (item.kmRealizado === 0 && item.kmProgramado > 0)

  const labels = data.map((d) => d.label)

  const programado = data.map((d) => d.kmProgramado)
  const realizado = data.map((d) => d.kmRealizado)

  const diferenca = data.map((d) => {
    if (isNaoRealizado(d)) return 0
    return d.kmRealizado - d.kmProgramado
  })

  const option = {
    color: [COLOR_PROGRAMADO, COLOR_REALIZADO],

    tooltip: {
      trigger: "axis",
      formatter: (params: any) => {
        const i = params[0].dataIndex
        const item = data[i]

        const naoRodou = isNaoRealizado(item)
        const diff = naoRodou ? 0 : item.kmRealizado - item.kmProgramado

        const color = naoRodou
          ? COLOR_NEUTRO
          : diff >= 0
            ? COLOR_POSITIVO
            : COLOR_NEGATIVO

        return `
          <b>${item.label}</b><br/>
          Programado: ${item.kmProgramado.toFixed(2)}<br/>
          Realizado: ${item.kmRealizado.toFixed(2)}<br/>
          Diferença: <b style="color:${color}">
            ${naoRodou ? "Não realizado" : diff.toFixed(2)}
          </b>
        `
      }
    },

    legend: {
      data: ["Programado", "Realizado", "Diferença"]
    },

    xAxis: {
      type: "category",
      data: labels,
      axisLabel: {
        rotate: labels.length > 6 ? 30 : 0
      }
    },

    yAxis: {
      type: "value"
    },

    series: [
      {
        name: "Programado",
        type: "bar",
        data: programado
      },
      {
        name: "Realizado",
        type: "bar",
        data: realizado
      },
      {
        name: "Diferença",
        type: "bar",
        data: diferenca.map((v, i) => {
          const item = data[i]
          const naoRodou = isNaoRealizado(item)

          return {
            value: v,
            itemStyle: {
              color: naoRodou
                ? COLOR_NEUTRO
                : v >= 0
                  ? COLOR_POSITIVO
                  : COLOR_NEGATIVO
            }
          }
        })
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