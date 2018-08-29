import request from './request.js'
import store from '@/store'
let path = process.env.NODE_ENV === 'production' ? '' : '/webview/api/'
export const setH5Log = (param) => {
  if (store.state.brower.isApp) {
    console.log('APP内部不需要埋点')
  } else {
    return request.post(path + 'h5/log', Object.assign({}, store.state.operateData, param))
  }
}
