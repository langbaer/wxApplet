// subpkg/goods_list/good_list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    /////请求时要发起的数据
    queryObj:{
      query:'',
      cid:'',
      pagenum:1,
      pagesize: 10
    },
    ////商品列表
    goods:[],
    ////一共有多少个商品
    total:0,
    ///节流阀
    isloading: false
  },
  /////发起数据请求函数
 async getGoodlists(cb){
   this.setData({
    isloading: true
   })
  const {data:res} = await wx.$http.get('/api/public/v1/goods/search', this.data.queryObj)
  /////取得商品列表
  this.setData({
    goods:[...this.data.goods,...res.message.goods],
    'queryObj.pagenum':this.data.queryObj.pagenum+1,
    total:res.message.total
  })
  this.setData({
    isloading: false
   })
   cb&&cb()
   console.log(res)
  },
  ////点击商品跳转到goodsdetail页面
  navToGoodsdetail(e){
    console.log(e)
    wx.navigateTo({
      url: '/subpkg/goods_detail/goods_detail?goods_id='+e.currentTarget.dataset.item,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    ////将其他页面传递的数据赋值到本地data
    this.setData({
      'queryObj.query':options.query||'',
      'queryObj.cid':options.cid||''
    })
    ////发起数据请求
    this.getGoodlists()

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
  ////下拉刷新
  onPullDownRefresh(){
    this.setData({
      'queryObj.pagenum':1,
      total:0,
      goods:[],
      isloading: false
    })
    this.getGoodlists(()=>{wx.stopPullDownRefresh()})
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    ////节流措施
    if(this.data.isloading){return}
    //////判断是否数据都获取到了
    if(this.data.queryObj.pagenum*this.data.queryObj.pagesize<=this.data.total+this.data.queryObj.pagesize){
      this.getGoodlists()
    }
    ///////全部获取后显示
    else{
      return wx.showToast({
        title: '已经没有更多惹',
        icon:'none',
        duration: 2000
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})