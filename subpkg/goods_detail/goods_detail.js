// subpkg/goods_detail/goods_detail.js
import {createStoreBindings} from 'mobx-miniprogram-bindings'
import {store} from '../../store/store' ////引入store
let cartData1 = []  ///{ goods_id, goods_name, goods_price, goods_count, goods_small_logo, goods_state }///需要记录在购物车的记录
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
    tabbarStatus:3,
    /////获取屏幕的高
    wh:0,
    /////点击加入购物车时是否显示
    addToCartbacShow:false,
    ////商品的数量
    goodcount:1,
    ////点击的加入购物车(1)或者立即购买购买(2)
    cartOrBuy:0,
  },
  //////发起数据请求函数
  async getGoodsinfo(){
    const {data:res} = await wx.$http.get('/api/public/v1/goods/detail?goods_id='+this.data.goods_id)
    this.setData({
      goods_pics:res.message.pics,
      goods_info:res.message,
      goods_introduce:res.message.goods_introduce.replace(/<img /g,'<img style="display:block;"').replace(/webp/g, 'jpg'),
    })
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
  ///点击关闭购物车状态
  closeCart(){
    this.setData({
      addToCartbacShow:false
    })
  },
  ////点击打开购物车假页面
  addCartBoxTap(e){
    this.setData({
      addToCartbacShow:true
    })
    if(e.target.dataset.cartorbuy==='1'){
      this.setData({
        cartOrBuy:1
      })
    }
    else{
      this.setData({
        cartOrBuy:2
      })
    }
  },
  ////点击减1商品数量
  minusOne(){
    if(this.data.goodcount<=1){
      return
    }
    this.setData({
      goodcount:this.data.goodcount-1
    })
  },
  /////点击商品数量+1
  addOne(){
    this.setData({
      goodcount:this.data.goodcount+1
    })
  },
  /////把商品数据写入内存中的购物车数组的函数
  addStorageCart(){
    this.updateCartCount(cartData1) ////更新store.js中的cartCount
    wx.setStorage({
      key:"cartData",
      data:cartData1,
      success(){
        wx.showToast({
          title: '加入购物车成功',
          icon: 'success',
          duration: 2000
        })
      }
    })
    this.setData({
      addToCartbacShow:false
    })
  },
  /////点击在store和本地储存存储cart
  storeCartAddGoods(){
    let obj = {
      goods_id:this.data.goods_info.goods_id,
      goods_name:this.data.goods_info.goods_name,
      goods_price:this.data.goods_info.goods_price,
      goods_count:this.data.goodcount,
      goods_small_logo:this.data.goods_info.goods_small_logo,
      goods_state:this.data.goods_info.goods_state
    }
    ////请求数据库
    cartData1 = wx.getStorageSync('cartData')||[]
    for(let i = 0;i<cartData1.length;i++){
       if(cartData1[i].goods_id === this.data.goods_info.goods_id){
        cartData1[i].goods_count += this.data.goodcount
        this.addStorageCart()
        return
       }
    }
    cartData1.push(obj)
    this.addStorageCart()
  },
   ////寻找默认地址
   searchAddress(){
    this.data.addressArr.forEach((item)=>{
      if(item.defaultValue===1){
        this.setData({
          addressDataIndex:item
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    //////向服务器请求数据
    this.setData({
      goods_id:Number(options.goods_id),
      ////屏幕的尺寸
      wh:wx.getSystemInfoSync().windowHeight
    })
    this.getGoodsinfo()
     /////请求store的数据
     this.storeBindings = createStoreBindings(this,{
      store,
      fields:['addressArr','showAddress'],
      actions:['updateTabbarStatus','updateCartCount','updateShowAddress']
    })
  },
  ///点击跳转到adress页面
  navToAddress(){
    wx.navigateTo({
      url: '/subpkg/address/address',
    })
    console.log(this.data.showAddress)
  },
  

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    this.updateShowAddress()
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