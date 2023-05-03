// subpkg/search/search.js
import {createStoreBindings} from 'mobx-miniprogram-bindings'
import {store} from '../../store/store' ////引入store
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ///组件传过来的搜索列表
    searchValue:'',
    ////状态
    listStatus:true,
    ////搜索历史
    searchHistoy:[],
  },
  /////点击跳转的函数
  navToGoodslist(e){
    wx.navigateTo({
      url: '/subpkg/goods_list/good_list?query='+e.target.dataset.itemhistory,
    })
  },
  //////控制搜索历史是否显示的函数
  mySearchData(e){ 
      this.setData({
        listStatus:e.detail.value
      })
  },
  ////清除搜索历史记录
  deleteStoreSearchHistory(){
    wx.setStorage({
      key:"searchHistory",
      data:[],
    })
    this.askStorage()
  },
 
 /////请求本地数据库
 askStorage(){
  this.setData({
    searchHistoy:wx.getStorageSync('searchHistory')
  })
 },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.askStorage()
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
    this.askStorage()
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