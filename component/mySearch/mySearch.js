// component/mySearch/mySearch.js
import { observe } from 'mobx-miniprogram'
import {storeBindingsBehavior} from 'mobx-miniprogram-bindings'
import {store} from '../../store/store' ////引入内存
let delayFuncStatusTime   ///声明一个防抖变量
let searchHistoryarr = []  ////为搜索历史定义一个数组
Component({
  behaviors:[storeBindingsBehavior],
  storeBindings:{
    store,
    fields:{
      searchHistory:''
    },
    actions:{
      updateSearchHistory:''
    }
  },
  /**
   * 组件的属性列表
   */
  properties: {
    ////背景默认颜色
    backColor:{
      type:String,
      value:'#3cc51f'
    },
    radius:{
      type:Number,
      value:60
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    ////真假赋值
    jugeValue:false,
    /////ture和false判断
    IamTrue:true,
    IamFalse:false,
    /////搜索的结果
    serchResult:[],
    /////表单的值
    searchInputValue:'',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    ////防抖函数
    delayFunc(e){
      if(delayFuncStatusTime){
        clearTimeout(delayFuncStatusTime)
      }
      delayFuncStatusTime = setTimeout(()=>{
        this.sentSearchRequest(e)
      },500)
    },
    /////获取数据请求的方法
    async sentSearchRequest(e){
      if(e.detail.value===''){
        ///////判断inputbalue是否是空，是空不显示icon
        this.setData({
          jugeValue:false,
          serchResult:[],
        })
        ////搜索历史的状态   显示搜索历史
        this.triggerEvent('Send',{value:true})
        return}
      ////搜索历史的状态  不显示搜索历史
      this.triggerEvent('Send',{value:false})
      this.setData({
        ////不是空显示icon
        jugeValue:true,
        ////赋值给thisdata
        searchInputValue:e.detail.value
      })
      ////将数据传递给父页面
      const {data:res} = await wx.$http.get('/api/public/v1/goods/qsearch',{query:this.data.searchInputValue})
      if(res.meta.status===404){return wx.showToast({
        title: '请检查网络设置',
        icon: 'error',
        duration:2000
      })}
      if(res.meta.status!==200){
        return wx.showToast({
          title: `${res.meta.msg}`,
          icon: 'error',
          duration:2000
        })
      }
      this.setData({
        serchResult:res.message
      })
    },

    ///bindinput函数
    getSearchList(e){
      this.delayFunc(e)
    },

    /////点击跳转页面
    navToGoods(e){
      wx.navigateTo({
        url: '/subpkg/goods_detail/goods_detail?goods_id='+e.target.dataset.goodid,
      })
    },
    ////点击清除inputvalue
    moveValue(){
      this.setData({
        searchInputValue:'',
        serchResult:[],
      })
      this.triggerEvent('Send',{value:true})
    },
    /////搜索按钮点击跳转
    navToGoodslist(){
      if(this.data.searchInputValue===''){
        return}
      //////将搜索记录记录至本地库
      searchHistoryarr = wx.getStorageSync('searchHistory')||[]
      searchHistoryarr.push(this.data.searchInputValue)
      wx.setStorage({
        key:"searchHistory",
        data:searchHistoryarr
      })
      ////跳转函数
      wx.navigateTo({
        url: '/subpkg/goods_list/good_list?query='+this.data.searchInputValue,
      })
    }


   
  },
  pageLifetimes:{
    
  },

  observers:{
    ////监听搜索框的内容
    'searchInputValue':function(searchInputValue){
      if(searchInputValue===''){
        this.setData({
          jugeValue:false,
        })
        
      }
      else{
        this.setData({
          jugeValue:true,
        })

      }
    },
  }
})
