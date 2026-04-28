// src/pages/components/charts/BarChart.tsx

import ReactECharts from "echarts-for-react"
import type { ChartItem } from "../../../types/ChartItem"

type Props = {
  data: ChartItem[]
}

export default function BarChart({ data }: Props) {
  const isExecutive = data.length === 1

  const labels = data.map((d) => d.label)
  const realizado = data.map((d) => d.kmRealizado)

  const option = {
    tooltip: {
      trigger: "axis",
      formatter: (params: any) => {
        const i = params[0].dataIndex
        const item = data[i]

        const prefixo = item.meta?.prefixo || "-"

        const diff = item.kmRealizado - item.kmProgramado

        let color = "#999"
        if (diff > 0) color = "#00ff88"
        if (diff < 0) color = "#ff4d4f"

        return `
    <b>${item.label}</b><br/>
    🚍 Prefixo: ${prefixo}<br/>
    🚍 Rodado: ${item.kmRealizado.toFixed(2)} km<br/>
    📊 Programado: ${item.kmProgramado.toFixed(2)} km<br/>
    📈 Diferença: <b style="color:${color}">
      ${diff > 0 ? "+" : ""}${diff.toFixed(2)} km
    </b>
  `
      }
    },

    legend: {
      data: ["KM Rodado"],
      top: 0,
      left: "center"
    },

    grid: {
      left: 40,
      right: 20,
      top: 40,
      bottom: isExecutive ? 60 : 120
    },

    xAxis: {
      type: "category",
      data: labels,
      axisLabel: {
        rotate: isExecutive ? 0 : labels.length > 6 ? 30 : 0
      }
    },

    yAxis: {
      type: "value"
    },

    dataZoom: isExecutive
      ? []
      : [
        { type: "slider", start: 0, end: 50 },
        { type: "inside" }
      ],

    series: [
      {
        name: "KM Rodado",
        type: "bar",
        data: realizado,
        barWidth: isExecutive ? 80 : undefined
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