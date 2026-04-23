// src/pages/utils/groupData.ts
import { parseNumber } from "./parse"
import { timeToSeconds } from "./time"

export const agruparDados = (data: any[]) => {
  const grupos: any = {}

  data.forEach((item) => {
    const chave = item.NumeroLinha

    if (!grupos[chave]) {
      grupos[chave] = {
        programado: 0,
        realizado: 0,
        diferencaKM: 0,

        // 🚍 NOVO MODELO DE VIAGENS
        viagensProgramado: 0,
        viagensRealizado: 0,

        inicioProgramado: 0,
        inicioRealizado: 0,
        fimProgramado: 0,
        fimRealizado: 0
      }
    }

    const kmP = parseNumber(item.KMProgramado)
    const kmR = parseNumber(item.KMRodado)

    grupos[chave].programado += kmP
    grupos[chave].realizado += kmR
    grupos[chave].diferencaKM += kmR - kmP

    // 📊 TODA LINHA = VIAGEM PROGRAMADA
    grupos[chave].viagensProgramado += 1

    // ✅ REGRA DE VIAGEM REALIZADA
    const realizada =
      item.StatusInicio === 1 &&
      item.StatusFim === 1 &&
      !item.NaoCumprida

    if (realizada) {
      grupos[chave].viagensRealizado += 1
    }

    // ⏱ TEMPOS
    grupos[chave].inicioProgramado += timeToSeconds(item.InicioPrevistoText)
    grupos[chave].inicioRealizado += timeToSeconds(item.InicioRealizadoText)

    grupos[chave].fimProgramado += timeToSeconds(item.FimPrevistoText)
    grupos[chave].fimRealizado += timeToSeconds(item.FimRealizadoText)
  })

  const labels = Object.keys(grupos).sort(
    (a, b) => grupos[b].realizado - grupos[a].realizado
  )

  return {
    labels,

    // 📊 KM
    programado: labels.map((l) => grupos[l].programado),
    realizado: labels.map((l) => grupos[l].realizado),
    diferencaKM: labels.map((l) => grupos[l].diferencaKM),

    // 🚍 VIAGENS (NOVO)
    viagensProgramado: labels.map((l) => grupos[l].viagensProgramado),
    viagensRealizado: labels.map((l) => grupos[l].viagensRealizado),
    viagensDiferenca: labels.map(
      (l) => grupos[l].viagensRealizado - grupos[l].viagensProgramado
    ),

    // ⏱ MÉDIAS DE TEMPO
    inicioProgramado: labels.map((l) =>
      grupos[l].viagensProgramado
        ? grupos[l].inicioProgramado / grupos[l].viagensProgramado
        : 0
    ),
    inicioRealizado: labels.map((l) =>
      grupos[l].viagensProgramado
        ? grupos[l].inicioRealizado / grupos[l].viagensProgramado
        : 0
    ),
    fimProgramado: labels.map((l) =>
      grupos[l].viagensProgramado
        ? grupos[l].fimProgramado / grupos[l].viagensProgramado
        : 0
    ),
    fimRealizado: labels.map((l) =>
      grupos[l].viagensProgramado
        ? grupos[l].fimRealizado / grupos[l].viagensProgramado
        : 0
    )
  }
}