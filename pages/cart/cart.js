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
    ///可用屏幕的高
    wh:0,
    ///商品数量加减盒子
    addGoodCountHeigh:0,
    ////点击的是那个商品
    selectGood:0,
    ////选出结算商品
    selecGoodsettlement:{},
    ////deleteBox是否显示
    showdeleteBoxData:false,
    
  },
  //// 点击显示myAddress组件
  myAddressShow(){
    this.setData({
      myaddressShow:true
    })
  },
  //////点击显示AddGoodCount按钮
  showAddGoodCount(e){
    this.setData({
      addGoodCountHeigh:250,
      selectGood:e.currentTarget.dataset.goodid
    })
  },
  //////点击购物车商品
  hideAddGoodCount(){
    this.setData({
      addGoodCountHeigh:0,
    })
  },
    ///点击商品的数量＋1
    addOne(){
      ////1在store的updataCartCount2函数中表示加法
      this.updataCartCount2(this.data.selectGood,1)
    },
    ///点击商品的数量减一
    subtractOne(){
      ////1在store的updataCartCount2函数中表示减法
      this.updataCartCount2(this.data.selectGood,0)
    },
    ////选出需要结算的商品
    selecGoods(e){
      if(e.detail.value){
        /////1代表需要结算
        this.updateCartCount3(e.currentTarget.dataset.goods_id,1)
        return
      }
      ///////0代表不需要结算
      this.updateCartCount3(e.currentTarget.dataset.goods_id,0)
    },
    ////选中全部的函数
    selectAll(e){
      this.updataCartCount4(e.detail.value)
    },
    ////点击显示盒子
    showDeleteBox(){
      this.setData({
        showdeleteBoxData:!this.data.showdeleteBoxData
      })
    },
    ///点击删除这个数据
    deleteCartGood(e){
      this.updataCartCount5(e.currentTarget.dataset.goodid)
    },
   
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    /////请求store的数据
    this.storeBindings = createStoreBindings(this,{
      store,
      fields:['cartCount','addressArr','showAddress','totalPrice','allGoodsState','wh'],
      actions:['updateCartCount','updateShowAddress','updataCartCount2','updateCartCount3','totalAllGoodsPrice','updataCartCount4','checkoutCarCountStatus','updataCartCount5','checkLogin']
    })
 
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    //请求地址
    this.updateShowAddress()
    //请求需要结算商品的总价格
    this.totalAllGoodsPrice()
    //检查购物车所有的商品是否都选上了
    this.checkoutCarCountStatus()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.checkLogin()
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