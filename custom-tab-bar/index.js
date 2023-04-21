// custom-tab-bar/index.js

import {storeBindingsBehavior} from 'mobx-miniprogram-bindings'
import {store} from '../store/store'

Component({
  behaviors:[storeBindingsBehavior],
  storeBindings:{
    store,
    fields:{
      tabbarStatus:'tabbarStatus',
      
    },
    actions:{
      updateTabbarStatus:'updateTabbarStatus'
    }
  },



  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    unselectTextColor:"#7A7E83",
    selectTextColor:"#3cc51f",
    list:[{
      id:1,
      text:"首页",
      pagesPath:'/pages/home/home',
      unselectPic:'../image/tabbar/home.png',
      selectPic:'../image/tabbar/home1.png',
      dataStore:0
    },{
      id:2,
      text:"分类",
      pagesPath:'/pages/cate/cate',
      unselectPic:'../image/tabbar/classify.png',
      selectPic:'../image/tabbar/classify1.png',
      dataStore:0
    },{
      id:3,
      text:"购物车",
      pagesPath:'/pages/cart/cart',
      unselectPic:'../image/tabbar/ShoppingCart.png',
      selectPic:'../image/tabbar/ShoppingCart1.png',
      dataStore:0
    },{
      id:4,
      text:"我的",
      pagesPath:'/pages/my/my',
      unselectPic:'../image/tabbar/userpic.png',
      selectPic:'../image/tabbar/userpic1.png',
      dataStore:0
    },]
  },

  /**
   * 组件的方法列表
   */
  methods: {

    /////点击导航到
    navPages(e){
      wx.switchTab({
        url: e.target.dataset.src,
      })
      this.updateTabbarStatus(e.target.dataset.thisid)
    }
  }
})
