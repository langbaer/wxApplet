// subpkg/goods_detail/goods_detail.js
import {createStoreBindings} from 'mobx-miniprogram-bindings'
import {store} from '../../store/store' ////引入store
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ////发起请求需要的id
    goods_id:0,
    ///  图片
    goods_pics:[],
    ////商品信息
    goods_info:{},
    ////收藏图片的地址
    collcetionPic1:'/image/goodsdetail/colloction.png',
    collcetionPic2:'/image/goodsdetail/colloctionselect.png',
    ////判断用户有没有收藏该商品

    ////商品详情图片
    goods_introduce:'',
    ////tabber的序号，购物车跳转时使用
    tabbarStatus:3
  },
  //////发起数据请求函数
  async getGoodsinfo(){
    const {data:res} = await wx.$http.get('/api/public/v1/goods/detail?goods_id='+this.data.goods_id)
    this.setData({
      goods_pics:res.message.pics,
      goods_info:res.message,
      goods_introduce:res.message.goods_introduce.replace(/<img /g,'<img style="display:block;"').replace(/webp/g, 'jpg'),
    })
    console.log(res)
  }, 
  //////点击图片放大
  preview(){
    wx.previewImage({
      urls: this.data.goods_pics.map((item)=>{return item.pics_big}),
    })
  },
  /////点击收藏  未实现收藏功能
  collectionGood(){
  },
  /////点击购物车跳转至购物车
  navToCart(){
    wx.switchTab({
      url: '/pages/cart/cart',
    })
    /////更改store的状态
    this.updateTabbarStatus(this.data.tabbarStatus)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    //////向服务器请求数据
    this.setData({
      goods_id:Number(options.goods_id) 
    })
    this.getGoodsinfo()
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