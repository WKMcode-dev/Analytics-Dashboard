export const parseNumber = (value: string) => {
  if (!value || value === "-") return 0
  return parseFloat(value.replace(",", "."))
}