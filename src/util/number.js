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
  if (number < 1024) {
    return number + 'b'
  }
  if (show == undefined) {
    show = 0
  }
  return show
}

export function ConvertTime(time) {
  return time / 1000000 + 'ms'
}
