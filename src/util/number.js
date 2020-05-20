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

export function ConvertNanoTime(time) {
  let second = time / (1000 * 1000 * 1000)
  let minute = second / 60
  second -= Math.floor(minute) * second
  if (minute < 1) {
    return second + '秒'
  } else {
    return minute + '分钟' + minute + '秒'
  }
}
