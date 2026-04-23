// src/services/api.ts

export async function fetchDashboardData(date: string) {
  const response = await fetch(
    `/api/Data/cumprimentoservico?dia=${date}&ExibirKMRealizado=1&ExibirKMProgramado=1`
  )

  if (!response.ok) {
    throw new Error("Erro ao buscar dados")
  }

  const data = await response.json()

  return data
}