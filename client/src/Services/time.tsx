export function minuteToMs(input: number | string): number {
  return Number.parseFloat(input.toString()) * 60 * 1000
}

export function msToMinutes(input: number): string {
  return Math.round(input / 60 / 1000).toFixed(2)
}
