// pages/cart/cart.js
import {createStoreBindings} from 'mobx-miniprogram-bindings'
import {store} from '../../store/store' ////引入store
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ////storage中的cartData
    storageCartData:wx.getStorageSync('cartData'),
    /////位置小图标
    addressIcon:'/image/goodsdetail/address.png',
    /////组件myaddress是否显示
    myaddressShow:false,
    /////具体的那一条地址
    addressDataIndex:'',
    
  },
  //// 点击显示myAddress组件
  myAddressShow(){
    this.setData({
      myaddressShow:true
    })
    console.log(this.data.cartCount)
  },
   
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    /////请求store的数据
    this.storeBindings = createStoreBindings(this,{
      store,
      fields:['cartCount','addressArr','showAddress'],
      actions:['updateCartCount','updateShowAddress']
    })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    //请求地址
    this.updateShowAddress()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    // this.searchAddress()
    console.log(1)
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
     this.storeBindings.destroyStoreBindings()
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