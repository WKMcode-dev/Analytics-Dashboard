export const timeToSeconds = (time: string) => {
  if (!time || time === "-") return 0

  const [h, m, s] = time.split(":").map(Number)
  return h * 3600 + m * 60 + s
}