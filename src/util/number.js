export function ConvertNumberToLabel(number) {
  let show
  if (number == 0) {
    return 0
  }
  if (number >= 1024 * 1024 * 1024) {
    return Math.round(number / (1024 * 1024 * 1024)) + 'G'
  }
  if (number >= 1024 * 1024) {
    return Math.round(number / (1024 * 1024)) + 'M'
  }
  if (number >= 1024) {
    return Math.round(number / 1024) + 'K'
  }
  if (show == undefined) {
    show = 0
  }
  return show
}
