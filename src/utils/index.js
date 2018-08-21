// 本地存储
var localStorage = window.localStorage
function get (name) {
  var value = localStorage.getItem(name)
  if (/^\{.*\}$/.test(value)) {
    value = JSON.parse(value)
  }
  return value
}
function set (name, value) {
  if (typeof value === typeof {}) {
    value = JSON.stringify(value)
  }
  return localStorage.setItem(name, value)
}
function remove (name) {
  return localStorage.removeItem(name)
}

// 获取链接参数
function getparam (name, url) {
  var m
  var tmp
  url = (url || window.location.href).split('#')
  if (name.indexOf('#') !== -1) {
    tmp = url.length < 2 ? '' : url[1]
  } else {
    tmp = url[0]
  }
  m = tmp.match(new RegExp('(|[?&#])' + name.replace('#', '') + '=([^#&?]*)(\\s||$)', 'gi'))
  if (m) {
    return decodeURIComponent(m[0].split('=')[1])
  } else {
    return ''
  }
}
// 获取当前时间
function getNowDate () {
  var date = new Date()
  var month = date.getMonth() + 1
  var strDate = date.getDate()
  if (month >= 1 && month <= 9) {
    month = '0' + month
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = '0' + strDate
  }
  var currentdate = date.getFullYear() + '年' + month + '月' + strDate + '日'
  return currentdate
}
export default {
  get,
  set,
  remove,
  getparam,
  getNowDate
}
