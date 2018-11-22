import { mergeWith } from 'lodash'
export * from './keyValueMap'
export * from './formatter'
export {default as md5} from 'md5'

// 住宅状况

export function parseTime (time, cFormat) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return timeStr
}
export function parseTimeH (time) {
  if (isNaN(time)) return '--'
  let h = parseInt(time / (60 * 60))
  let h1 = time % (60 * 60)
  let i = parseInt(h1 / 60)
  let s = h1 % 60
  let arr = [h, i, s]
  for (let i = 0; i < arr.length; i++) {
    arr[i] = arr[i] < 10 ? '0' + arr[i] : arr[i]
  }
  return arr.join(':')
}

export function emptyCell (value) {
  return (value || value === 0) ? value : '--'
}

export function formatTime (time, option) {
  time = +time * 1000
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) { // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
  }
}

function pluralize (time, label) {
  if (time === 1) {
    return time + label
  }
  return time + label + 's'
}

export function timeAgo (time) {
  const between = Date.now() / 1000 - Number(time)
  if (between < 3600) {
    return pluralize(~~(between / 60), ' minute')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour')
  } else {
    return pluralize(~~(between / 86400), ' day')
  }
}

/* 秒数转换为时分秒 */
const unitMap = {
  zh: ['秒', '分钟', '小时', '天'],
  en: ['second', 'minute', 'hour', 'day']
}
export function secToWord (seconds, level = 0, lang = 'zh') {
  const units = unitMap[lang] || unitMap['en']
  const roundFn = (lvl, num) => (lvl === level ? Math.round(num) : Math.floor(num))
  let countArr = [seconds % 60]
  seconds >= 60 && countArr.push(roundFn(1, seconds % 3600 / 60))
  seconds >= 3600 && countArr.push(roundFn(2, seconds % 86400 / 3600))
  seconds >= 86400 && countArr.push(roundFn(3, seconds / 86400))
  let result = countArr.map((item, index) => {
    return level <= index ? ((item > 0 || countArr.length === 1) ? `${item}${units[index]}` : '') : ''
  }).reverse()
  return result.join('')
}

/* url请求参数解析 */
export function getQueryObject (url) {
  url = url === null ? window.location.href : url
  const search = url.substring(url.lastIndexOf('?') + 1)
  const obj = {}
  const reg = /([^?&=]+)=([^?&=]*)/g
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1)
    let val = decodeURIComponent($2)
    val = String(val)
    obj[name] = val
    return rs
  })
  return obj
}

/**
 *get getByteLen
 * @param {Sting} val input value
 * @returns {number} output value
 */
export function getByteLen (val) {
  let len = 0
  for (let i = 0; i < val.length; i++) {
    if (val[i].match(/[^\x00-\xff]/ig) != null) {
      len += 1
    } else {
      len += 0.5
    }
  }
  return Math.floor(len)
}
/* 滚动条平滑滚动 */
export function scrollTo (element, to, duration) {
  if (duration <= 0) return
  const difference = to - element.scrollTop
  const perTick = difference / duration * 10
  setTimeout(() => {
    element.scrollTop = element.scrollTop + perTick
    if (element.scrollTop === to) return
    scrollTo(element, to, duration - 10)
  }, 10)
}

/* 使用安全方式克隆plain object */
export function cloneJsonObj (source) {
  try {
    return JSON.parse(JSON.stringify(source))
  } catch (e) {
  }
}

/* 对象键值重命名 */
export function objKeysRename (obj, map) {
  let result = Object.create(null)
  if (!obj || typeof obj !== 'object' || !map || typeof map !== 'object') return
  for (let i in obj) {
    map[i] && (result[map[i]] = obj[i])
  }
  return result
}

/**
 * Camelize a hyphen-delimited string.
 * 短横线转驼峰
 */
const camelizeRE = /-(\w)/g

export function camelize (string) {
  return string.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : '')
}

/**
 * Hyphenate a camelCase string.
 * 驼峰转短横线
 */
const hyphenateRE = /\B([A-Z])/g

export function hyphenate (string) {
  return string.replace(hyphenateRE, '-$1').toLowerCase()
}

/* 动态加载远程js脚本 */
export function loadjs (url, callback, error) {
  if (!url) return
  let script = document.createElement('script')
  script.src = url
  document.body.appendChild(script)
  script.onload = typeof callback === 'function' ? callback : () => {}
  script.onerror = typeof error === 'function' ? error : () => {}
}
export function openNewUrl (url) {
  const wi = window.open(url)
  if (!wi.location) {
  }
  // 表单方式
  // const form = document.createElement("form")
  // document.body.appendChild(form)
  // form.action = url
  // form.submit()
}
/* 合并对象 */
export function mergeObj (...args) {
  return mergeWith(...args, (objValue, srcValue) => {
    if (Array.isArray(objValue)) {
      return objValue.concat(srcValue)
    }
  })
}

// 关于浮点数运算方法已移除，需要可安装bignumber.js库
