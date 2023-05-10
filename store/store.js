import {action, observable} from 'mobx-miniprogram'
export const store = observable({
  /////tabber的状态
  tabbarStatus:1,  ///1代表选中，0代表失去焦点
  /////购物车数据
   // 购物车的数组，用来存储购物车中每个商品的信息对象
    // 每个商品的信息对象，都包含如下 6 个属性：
    // { goods_id, goods_name, goods_price, goods_count, goods_small_logo, goods_state }
  cartCount:wx.getStorageSync('cartData')||[],
  ////获取storage中addressData的数据
  addressArr:wx.getStorageSync('addressData')||[],
  /////该显示哪条地址
  showAddress:{},
  ////需要结算的总价格
  totalPrice:0,
  ////是否购物车中的商品都在结算状态中 0表示不是，1表示是
  allGoodsState:0,
  ///////token密钥
  token:wx.getStorageSync('token')||'',
  /////登入后用户的状态信息
  userInfo:{},
  /////用户的登录状态：0,未登入，1登录中
  userstatus:wx.getStorageSync('userstatus')||0,
  /////屏幕高度
  wh:wx.getSystemInfoSync().windowHeight,

  /////改变tabber的状态
  updateTabbarStatus:action(function(step){
    this.tabbarStatus = step
  }),
  ////添加cartCount
  updateCartCount:action(function(obj){
    this.cartCount = obj
    this.totalAllGoodsPrice()
    this.checkoutCarCountStatus()
  }),
  ////改变addressArr中defaultValue的状态
  updateAddressArr:action(function(id){
    const newaddressArr = this.addressArr.map((item)=>{
      if(item.id===id){
        return {
          id:item.id,
          address:item.address,
          defaultValue:1,
          phone:item.phone,
          username:item.username
        }
      }
      else{
        return {
          id:item.id,
          address:item.address,
          defaultValue:0,
          phone:item.phone,
          username:item.username
        }
      }
    })
    this.addressArr = newaddressArr
    wx.setStorage({
      key:'addressData',
      data:this.addressArr
    })
    this.updateShowAddress()
  }),
  /////操作修改地址页面传递过来的地址
  updateAddressArr2:action(function(obj){
    if(obj.id){
      const newaddressArr = this.addressArr.map((item)=>{
        if(item.id===obj.id){
          return obj}
        else{
          return item
        }
      })
      this.addressArr = newaddressArr
    }
    else {
      obj.id = this.addressArr.length+1
      this.addressArr.push(obj)
    }
    if(obj.defaultValue){
      this.updateAddressArr(obj.id)
    }
    else{
      const newaddressArr = this.addressArr.map((item)=>{
        return item
      })
      this.addressArr = newaddressArr
      wx.setStorage({
        key:'addressData',
        data:this.addressArr
      })
      console.log(this.addressArr)
      this.updateShowAddress()
    }
  }),
  ////更新选中的地址
  updateShowAddress:action(function(){
    this.addressArr.forEach((item)=>{
      if(item.defaultValue===1){
        this.showAddress=item
      }
    })
  }),
  ///删除storage中的数据
  updateAddressArr3:action(function(id){
    let index1  
    this.addressArr.forEach((item,index)=>{
      if(id===item.id){
        index1 = index
      }
    })
    this.addressArr.splice(index1,1)
    const newaddressArr = this.addressArr.map((item)=>{
      return item
    })
    this.addressArr = newaddressArr
    wx.setStorage({
      key:'addressData',
      data:this.addressArr
    })
    this.updateShowAddress()
  }),
  ////修改cartCount的数据,商品的数量
  updataCartCount2:action(function(id,addOrSubtract){
    const newCartCount = this.cartCount.map((item)=>{
      if(item.goods_id===id){
        let goodsCount = 0
        if(addOrSubtract){
          goodsCount = item.goods_count+1
        }
        else {
          goodsCount = item.goods_count-1
        }
        return {
          goods_count:goodsCount,
          goods_id:item.goods_id,
          goods_name:item.goods_name,
          goods_price:item.goods_price,
          goods_small_logo:item.goods_small_logo,
          goods_state:item.goods_state
        }
      }
      return item
    })
    this.cartCount = newCartCount
    wx.setStorage({
      key:'cartData',
      data:this.cartCount
    })
    this.totalAllGoodsPrice()
  }),
  ///////跟新需要结算商品的总价钱
  totalAllGoodsPrice:action(function(){
    let totalPrice1 = 0
    this.cartCount.forEach((item)=>{
      if(item.goods_state===2){
        totalPrice1 += item.goods_price*item.goods_count
      }
    })
    this.totalPrice =totalPrice1
  }),
  ////更新结算商品数据,增加结算商品,减少结算商品
  updateCartCount3:action(function(id,status){
    let goodsstate = 2
    if(status){
      goodsstate = 2
    }
    else {
      goodsstate = 0
    }
    const newSelecGoodsettlementAdd = this.cartCount.map((item)=>{
      if(item.goods_id===id){
        return {
          goods_id:item.goods_id,
          goods_name:item.goods_name,
          goods_price:item.goods_price,
          goods_count:item.goods_count,
          goods_small_logo:item.goods_small_logo,
          goods_state:goodsstate
        }
      }
      return item
    })
    this.cartCount = newSelecGoodsettlementAdd
    wx.setStorage({
      key:'cartData',
      data:this.cartCount
    })
    this.totalAllGoodsPrice()
    this.checkoutCarCountStatus()
  }),
  /////将购物车的数据全部结算或者全部不结算
  updataCartCount4:action(function(allOrNone){
    if(allOrNone){
      for(let i = 0;i<this.cartCount.length;i++){
        this.cartCount[i].goods_state = 2
      }
      const new1 = this.cartCount.map((item)=>{
        return item
      })
      this.cartCount = new1
      wx.setStorage({
        key:'cartData',
        data:this.cartCount
      })
      this.totalAllGoodsPrice()
      return
    }
    for(let i = 0;i<this.cartCount.length;i++){
      this.cartCount[i].goods_state = 0
    }
    const new1 = this.cartCount.map((item)=>{
      return item
    })
    this.cartCount = new1
    wx.setStorage({
      key:'cartData',
      data:this.cartCount
    })
    this.totalAllGoodsPrice()
  }),
   ////检查购物车所有的商品是否都选上了
   checkoutCarCountStatus:action(function() {
     let status =  this.cartCount.find((item)=>{
      if(item.goods_state!==2){
        return item
      }
    })
    if(status){
      this.allGoodsState = 0
    }else{
      this.allGoodsState = 1
    }
  }),
  ////删除购物车中的商品
  updataCartCount5:action(function (id) {
    let new1 = 0
    this.cartCount.find((item,index)=>{
      if(item.goods_id===id){
        new1 = index
      }
    })
    this.cartCount.splice(new1,1)
    const newCartCount = this.cartCount.map((item)=>{
      return item
    })
    this.cartCount = newCartCount
    wx.setStorage({
      key:'cartData',
      data:this.cartCount
    })
    this.totalAllGoodsPrice()
    this.checkoutCarCountStatus()
  }),
  //////登入函数
  loginUser:action(function() {
    var that = this
    wx.login({ success(res){
      console.log(res.code)
      wx.request({
        url: 'http://127.0.0.1/api/login',
        method:'POST',
        data:{
          /////发送code
          code:res.code
        },
        header:{
          'content-type': 'application/x-www-form-urlencoded'
        },
        success(res1){
          if(res1.data.status){
            return wx.$showMsg('登入失败，服务器错误')
          }
          that.token = res1.data.token
          that.userstatus = 1
          wx.setStorage({
            key:'userstatus',
            data:that.userstatus
          })
          wx.setStorage({
            key:'token',
            data:that.token
          })
          wx.showToast({
            title:'登入成功',
            duration:2000,
            icon:'success'
          })
          wx.navigateBack({
            delta: 1
          })
        },
        fail(){
          return wx.$showMsg('请检查您的网络设置')
        }
      })
    }
  })
  }),
  
  ////检查是否在登入的函数
  checkLogin:action(function () {
    var that = this
    const aa = wx.request({
      url: 'http://127.0.0.1/my/status',
      method:'GET',
      header:{
        'authorization':this.token
      },
      success(res){
        console.log(res)
        if(res.data.status){
          return wx.$showMsg('您还没有登入哦！')
        }
        that.userInfo = res.data.data
        that.userstatus = 1
        wx.setStorage({
          key:'userstatus',
          data:that.userstatus
        })
        console.log(that.userInfo)
      },
      fail(){
        return wx.$showMsg('请检查您的网络设置')
      }
    })
    console.log(aa)
  }),
  ////退出登入
  outLogin:action(function () {
    console.log('点击了退出登入')
    this.userstatus = 0
    wx.setStorage({
      key:'userstatus',
      data:this.userstatus
    })
    this.token = ''
    wx.setStorage({
      key:'token',
      data:this.token
    })
  })
})

 