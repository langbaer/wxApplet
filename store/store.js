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

  /////改变tabber的状态
  updateTabbarStatus:action(function(step){
    this.tabbarStatus = step
  }),
  ////添加cartCount
  updateCartCount:action(function(obj){
    this.cartCount = obj
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
  })
})