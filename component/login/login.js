// component/login/login.js
Component({
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
    ////获取可用屏幕的高度
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

  }
})
