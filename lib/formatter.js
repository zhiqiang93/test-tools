import numeral from 'numeral'

export function commaNum (value, format = '0,0') {
  return numeral(value).format(format)
}

export function percent (value, format = '0.0', hasSymbol) {
  return hasSymbol ? numeral(value).format(`${format}%`) : numeral(value * 100).format(format)
}

/* 金额转换为数字加中文 */
export function wordMoney (num, digit = 3) {
  const number = Number(num)
  let result = number
  let unitIndex = 0
  let unitArr = []
  while (result >= 10000) {
    unitIndex++
    result = result / 10000
    if (unitIndex === 2) {
      unitIndex = 0
      unitArr.unshift('亿')
    }
  }
  unitIndex === 1 && unitArr.unshift('万')
  unitArr.length && (result = result.toFixed(digit))
  return result + unitArr.join('') + '元'
}

/* 数字 格式化 */
export function nFormatter (num, digits) {
  const si = [
    {value: 1E18, symbol: 'E'},
    {value: 1E15, symbol: 'P'},
    {value: 1E12, symbol: 'T'},
    {value: 1E9, symbol: 'G'},
    {value: 1E6, symbol: 'M'},
    {value: 1E3, symbol: 'k'}
  ]
  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (num / si[i].value + 0.1).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol
    }
  }
  return num.toString()
}

export function byteToWord (value) {
  return Math.round(value / 1024) + 'KB'
}

export function filterVal (value, defVal = '') {
  return (value === null || value === undefined) ? defVal : value
}
export function unitYear (value) {
  return filterVal(value) + '月'
}

export function unitMoney (value) {
  return filterVal(value) + '元'
}

export function unitRate (value) {
  return filterVal(value) + '%'
}
