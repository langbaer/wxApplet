import {action, observable} from 'mobx-miniprogram'
export const store = observable({
  /////tabber的状态
  tabbarStatus:1,  ///1代表选中，0代表失去焦点
  /////购物车数据
   // 购物车的数组，用来存储购物车中每个商品的信息对象
    // 每个商品的信息对象，都包含如下 6 个属性：
    // { goods_id, goods_name, goods_price, goods_count, goods_small_logo, goods_state }
  cartCount:wx.getStorageSync('cartData'),

  /////改变tabber的状态
  updateTabbarStatus:action(function(step){
    this.tabbarStatus = step
  }),
  ////添加cartCount
  updateCartCount:action(function(obj){
    this.cartCount = obj
  })
})