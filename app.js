// app.js
//////引入@escook/request-miniprogram第三方包发起https请求
import { $http } from '@escook/request-miniprogram'
wx.$http = $http
// 配置请求根路径
$http.baseUrl = 'https://www.uinav.com'
/////请求开始之前做一些事情
$http.beforeRequest = function (options) {
  wx.showLoading({
    title: '数据加载中...',
  })
},
// 请求完成之后做一些事情
$http.afterRequest = function () {
  wx.hideLoading()
}

/////挂载异步promise
import {promisifyAll} from 'miniprogram-api-promise'
const wxp = wx.p ={}
promisifyAll(wx,wxp)
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    
    // 登录
    wx.login({
    success(res){
      ////检查是否授权过登入
      const status = wx.getStorageSync('userstatus')
      if(!status){
      return wx.navigateTo({
        url: '/pages/authorization/authorization',
      })
      }
      wx.request({
        url: 'http://127.0.0.1/api/login',
        method:'POST',
        data:{
          /////发送code
          code:res.code
        },
        header:{
          'content-type': 'application/x-www-form-urlencoded'
        },
        success(res1){
          if(res1.data.status){
            return wx.showToast({
              title:'登入失败，服务器错误',
              duration:2000,
              icon:'error'
            })
          }
          wx.setStorage({
            key:'userstatus',
            data:1
          })
          wx.setStorage({
            key:'token',
            data:res1.data.token
          })
        }
      })
    }
    }),
    

    //请求数据失败的函数
    wx.$showMsg = function (title = '请检查你的网络设置！', duration = 2000) {
      wx.showToast({
        title,
        duration,
        icon:'error'
      })
    }
    
  },
  globalData: {
    userInfo: null
  },
})
