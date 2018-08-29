import request from './request.js'
let path = process.env.NODE_ENV === 'production' ? '' : '/webview/api/'

// 微信签名算法
export const getWXConfig = (url) => request.get(path + '/wechat/signature', {
  params: {url: url}
})

// 获取token
export function getToken () {
  return request.get(path + '/qn/token')
}
// 七牛图片上传
export const uploadImg = (img, dataObj) => request.post('https://upload.qiniup.com/putb64/-1', img.replace(/^.*?,/, ''), {
  headers: {'content-type': 'application/octet-stream', 'Authorization': `UpToken ${dataObj.token}`}
})
