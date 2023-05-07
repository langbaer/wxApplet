import { values } from "mobx-miniprogram";
import {storeBindingsBehavior} from 'mobx-miniprogram-bindings'
import {store} from '../../store/store' ////引入内存
// component/myAddress/myAddress.js
Component({
  ////引入内存
  behaviors:[storeBindingsBehavior],
  storeBindings:{
    store,
    fields:{
      addressArr:'addressArr'
    },
    actions:{
      updateAddressArr:'updateAddressArr',
      updateShowAddress:'updateShowAddress'
    }
  },
  /**
   * 组件的属性列表
   */
  properties: {
    show:{
      type:Boolean,
      value:false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    ////page-container的显示
    overlay:true,
    /////获取屏幕的高
    wh:0,

  },

  /**
   * 组件的方法列表
   */
  methods: {
    ////退出改组件的时候触发
    onAfterLeave(){
      this.getTabBar().setData({
        tabbarShow:true
      })
      
    },
    ////进入改组件的时候触发
    onEnter(){
      this.getTabBar().setData({
        tabbarShow:false
      })
      this.setData({
        wh:wx.getSystemInfoSync().windowHeight
      })

    },
    ////点击选中
    select(e){
      console.log(e)
      if(e.currentTarget.dataset.thisid){
          this.updateAddressArr(e.currentTarget.dataset.thisid)
          this.updateShowAddress()
      }
      else{
        return
      }
    },
    ////点击返回到页面关闭假页面
    closeMyAddress(){
      this.setData({
        show:false
      })
    },
    /////点击导航到
    navToAddress(){
      wx.navigateTo({
        url: '/subpkg/address/address',
      })
    }
  }
})
