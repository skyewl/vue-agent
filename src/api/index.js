// 引用axios
import axios from 'axios'
import qs from 'qs'

// 引用弹出层layer
import layer from '../../static/js/layer'

// 自定义判断元素类型JS
function toType (obj) {
  return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}

// 参数过滤函数
function filterNull (o) {
  for (var key in o) {
    if (o[key] === null) {
      delete o[key]
    }
    if (toType(o[key]) === 'string') {
      o[key] = o[key].trim()
    } else if (toType(o[key]) === 'object') {
      o[key] = filterNull(o[key])
    } else if (toType(o[key]) === 'array') {
      o[key] = filterNull(o[key])
    }
  }
  return o
}

// 配置API接口地址
// var root = 'http://www.agent.com/index.php/CrmApi'
var root = '/index.php/CrmApi'

/*
  接口处理函数
  需要根据接口的参数进行调整
*/
function apiAxios (method, url, params, success, failure) {
  if (params) {
    params = filterNull(params)
  }
  axios({
    method: method,
    url: url,
    data: method === 'POST' || method === 'PUT' ? qs.stringify(params) : null,
    params: method === 'GET' || method === 'DELETE' ? params : null,
    baseURL: root,
    withCredentials: false
  }).then(function (res) {
    if (res.data.error === 0) {
      if (success) {
        success(res.data)
      }
    } else {
      if (failure) {
        failure(res.data)
      } else {
        layer.open({
          content: 'error: ' + JSON.stringify(res.data),
          skin: 'msg',
          time: 2
        })
      }
    }
  }).catch(function (err) {
    let res = err.response
    if (err) {
      if (res.status === 500) {
        layer.open({
          content: '服务器繁忙，请稍后重试',
          skin: 'msg',
          time: 2
        })
      } else {
        layer.open({
          content: 'api error, HTTP CODE: ' + res.status,
          skin: 'msg',
          time: 2
        })
      }
    }
  })
}

// 返回在vue模板中的调用接口
export default {
  get: function (url, params, success, failure) {
    return apiAxios('GET', url, params, success, failure)
  },
  post: function (url, params, success, failure) {
    return apiAxios('POST', url, params, success, failure)
  },
  put: function (url, params, success, failure) {
    return apiAxios('PUT', url, params, success, failure)
  },
  delete: function (url, params, success, failure) {
    return apiAxios('DELETE', url, params, success, failure)
  }
}
