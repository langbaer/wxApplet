import {action, observable} from 'mobx-miniprogram'
export const store = observable({
  tabbarStatus:1,

  updateTabbarStatus:action(function(step){
    this.tabbarStatus = step
  })
})