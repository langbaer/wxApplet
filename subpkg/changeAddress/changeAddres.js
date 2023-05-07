// subpkg/changeAddress/changeAddres.js
import {createStoreBindings} from 'mobx-miniprogram-bindings'
import {store} from '../../store/store' ////引入store
Page({

  /**
   * 页面的初始数据
   */
  data: {
    /////storage中addressData的id
    addressDataID:0,
    /////挑选出来的数据
    selectAddress:{},
    ////默认值
    defaultValue:0,
    ////表单提交过来的数据 只包含username phone address
    formData:{}
  },
  /////挑选storage中addressData的函数
  selectAddressArr(){
    this.data.addressArr.forEach((item)=>{
      if(this.data.addressDataID===`${item.id}`){
        this.setData({
          selectAddress:item
        })
      }
    })
  },
  ////处理表单数据函数
  channgeInputData(){
    let temporaryData = this.data.formData
    temporaryData.defaultValue = this.data.defaultValue
    temporaryData.id = Number(this.data.addressDataID)
    this.setData({
      formData:temporaryData
    })
  },
  /////提交表单记录数据
  formSubmit(e) {
    ////将表单数据引入
    this.setData({
      formData:e.detail.value
    })
    this.channgeInputData()
    this.updateAddressArr2(this.data.formData)
    wx.navigateBack({
      delta:1
    })
    // console.log(this.data.addressArr)
  },
  ////改变是否为初始选中的默认值
  changeDefaultValue(e){
    if(e.detail.value){
      this.setData({
        defaultValue:1
      })
    }
    else{
      this.setData({
        defaultValue:0
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    ////将传递过来的地址留在本地
    this.setData({
      addressDataID:options.id
    })
     /////请求store的数据
     this.storeBindings = createStoreBindings(this,{
      store,
      fields:['addressArr'],
      actions:['updateAddressArr','updateAddressArr2']
    })
  },
  

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    this.selectAddressArr()
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