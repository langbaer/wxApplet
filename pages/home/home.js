// pages/home/home.js
import {createStoreBindings} from 'mobx-miniprogram-bindings'
import {store} from '../../store/store' ////引入store
Page({

  /**
   * 页面的初始数据
   */
  data: {
    spwierList:[],
    navList:[],
    floorList:[],
    marginData:'10rpx',
    marginData2:0,
    floorNavUrl:''
  },

  /////发起轮播图数据请求的函数
  async getSpwierList(){
    const {data:res} = await wx.$http.get('/api/public/v1/home/swiperdata')
    if(res.meta.status!==200){
      return wx.$showMsg()
    }
    this.setData({
      spwierList:res.message
    })
  },

  /////发起获取分类导航栏数据请求的函数
  async getNavList(){
    const {data:res} = await wx.$http.get('/api/public/v1/home/catitems')
    if(res.meta.status!==200){
      return wx.$showMsg()
    }
    this.setData({
      navList:res.message
    })
  },

  /////发起楼层数据请求的函数
  async getFloorList(){
    const {data:res} = await wx.$http.get('/api/public/v1/home/floordata')
    if(res.meta.status!==200){return wx.$showMsg()}
    res.message.forEach(frist=>{
      frist.product_list.forEach(secound=>{
        secound.url='/subpkg/goods_list/good_list'+'?'+secound.navigator_url.split('?')[1]
        secound.navigator_url
      })
    })
    this.setData({
      floorList:res.message
    })
    console.log(this.data.floorList)
  },

  /////分类导航的点击跳转函数   bindtap
  navToPages(e){
    if(e.target.dataset.name === '分类'){
      ///点击跳转页面
      wx.switchTab({
        url: '/pages/cate/cate',
      })
      ///点击跳转tabbar
      this.updateTabbarStatus(2)
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    /////发起轮播图的数据请求
    this.getSpwierList()
    /////发起分类导航栏的数据请求
    this.getNavList()
    //////发起楼层数据请求
    this.getFloorList()
    /////请求store的数据
    this.storeBindings = createStoreBindings(this,{
      store,
      fields:[],
      actions:['updateTabbarStatus']
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