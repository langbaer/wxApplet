// subpkg/address/address.js
import {createStoreBindings} from 'mobx-miniprogram-bindings'
import {store} from '../../store/store' ////引入store
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ////获取屏幕的高
    wh:0,
    ////删除按钮的高
    deleteheight:0,
    ///选中的盒子是哪一个
    selectDetele:0
    ////
  },
  ////点击选择地址
  selectAddress(e){
    if(e.currentTarget.dataset.itemid){
      this.updateAddressArr(e.currentTarget.dataset.itemid)
    }else{return}
    this.updateShowAddress()
    console.log(e.currentTarget.dataset.itemid)
  },
  ////点击跳转至修改收获地址数据
  navToChangeAddress(e){
    let string = ''
    if(e.currentTarget.dataset.itemid){
      string = e.currentTarget.dataset.itemid
    }
    wx.navigateTo({
      url: '/subpkg/changeAddress/changeAddres?id='+e.currentTarget.dataset.itemid,
    })
  },
  ////长按显示删除按钮
  showdelete(e){
    this.setData({
      deleteheight:200
    })
    this.setData({
      selectDetele:e.currentTarget.dataset.itemid
    })
  },
  /////点击隐藏
  hideDelete(){
    this.setData({
      deleteheight:0
    })
  },
  /////点击删除storage中的数据
  deleteThisData(e){
    this.updateAddressArr3(e.currentTarget.dataset.itemid)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    ////获取屏幕的高
    this.setData({
      wh:wx.getSystemInfoSync().windowHeight
    })
    /////请求store的数据
    this.storeBindings = createStoreBindings(this,{
      store,
      fields:['addressArr'],
      actions:['updateAddressArr','updateShowAddress','updateAddressArr3']
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