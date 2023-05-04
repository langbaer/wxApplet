import {action, observable} from 'mobx-miniprogram'
export const store = observable({
  /////tabber的状态
  tabbarStatus:1,  ///1代表选中，0代表失去焦点

  /////改变tabber的状态
  updateTabbarStatus:action(function(step){
    this.tabbarStatus = step
  }),


})