// pages/my/my.js
import {createStoreBindings} from 'mobx-miniprogram-bindings'
import {store} from '../../store/store' ////引入store
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  //////本地服务器登录
  login(){
    this.loginUser()
  },
  checklogin(){
    this.checkLogin()
  },
  ///点击跳转到授权页面
  navToAuthorization(){
    wx.navigateTo({
      url: '/pages/authorization/authorization',
    })
  },
  ///点击就下线
  outLogin1(){
    var that =this
    wx.showModal({
      title: '提示',
      content: '确定要退出登入吗？',
      success (res) {
        if (res.confirm) {
          that.outLogin()
        }
      }
    })
  },
  ////点击跳转到收货地址
  navToAddress(){
    wx.navigateTo({
      url: '/subpkg/address/address',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.storeBindings = createStoreBindings(this,{
      store,
      fields:['userstatus','wh'],
      actions:['checkLogin','loginUser','outLogin']
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
 ////卸载store的数据
 this.storeBindings.desroyStoreBindings()
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})