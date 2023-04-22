// pages/cate/cate.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ///可用窗口的高度
    wh:1,
    /////左侧数据
    cateList:[],
    ////右侧分类数据
    cateList2:[],
    ////右侧商品数据
    cateList3:[],
    /////左侧分类栏点击后传进来的index  被选中的盒子
    lBoxIndex:0,
    ////真假判断
    Iamtrue:true,
    Iamfalse:false,
    //////左侧导航栏被选中时距离顶部的距离
    leftBoxdistancetop:0

  },
  /////发起获取页面渲染数据请求的函数
  async getCateList(){
    const {data:res} = await wx.$http.get('/api/public/v1/categories')
    if(res.meta.status!==200){
      return wx.$showMsg()
    }
    ///左侧分类栏数据
    this.setData({
      cateList:res.message
    })
    ///右侧分类栏数据
    const arrSetData2 = res.message.map(function(item){
      return item.children
    })
    this.setData({
      cateList2:arrSetData2
    })
    /////右侧货物排列
    const arrSetData3 =arrSetData2.map(function(item){
      return item.children
    })
    this.setData({
      cateList3:arrSetData3
    })
  },
  //////点击左侧分类栏时给leftBoxdistancetop赋值盒子的距离显示。更改右侧盒子
  changeStyle(e){
    this.setData({
      lBoxIndex:e.target.dataset.index,
      leftBoxdistancetop:Math.ceil(e.target.offsetTop)
    })
  },
  ////点击跳转至goods_list
  navToGoodList(e){
    wx.navigateTo({
      url: '/subpkg/goods_list/good_list'+'?'+`cid=${e.target.dataset.datapid3}`,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    //////获取屏幕的高
    this.setData({
      wh:wx.getSystemInfoSync().windowHeight
    })
    ////获取页面渲染数据
    this.getCateList()
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