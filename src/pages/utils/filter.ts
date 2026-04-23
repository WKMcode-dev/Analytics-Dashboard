export const filtrarDados = (data: any[], termo: string) => {
  if (!termo) return data

  const t = termo.toLowerCase().trim()

  return data.filter((item) => {
    return (
      item.NumeroLinha?.toLowerCase()?.includes(t) ||
      item.NomeLinha?.toLowerCase()?.includes(t) ||
      item.PrefixoRealizado?.toLowerCase()?.includes(t) ||
      item.PrefixoPrevisto?.toLowerCase()?.includes(t) ||
      item.Trajeto?.toLowerCase()?.includes(t) ||
      item.NomeMotorista?.toLowerCase()?.includes(t) ||
      item.NomeCobrador?.toLowerCase()?.includes(t) ||
      item.NomePI?.toLowerCase()?.includes(t) ||
      item.NomePF?.toLowerCase()?.includes(t) ||
      item.InicioPrevistoText?.includes(t) ||
      item.InicioRealizadoText?.includes(t) ||
      item.FimPrevistoText?.includes(t) ||
      item.FimRealizadoText?.includes(t) ||
      String(item.Servico)?.includes(t)
    )
  })
}