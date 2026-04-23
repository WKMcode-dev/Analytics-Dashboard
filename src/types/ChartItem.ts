// src\types\ChartItem.ts

export type ChartItem = {
  label: string

  kmProgramado: number
  kmRealizado: number

  naoCumprida: number
  parcialmenteCumprida: number

  atrasado: number
  adiantado: number
}