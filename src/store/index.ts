import { createStore } from 'vuex'

export default createStore({
  state: {
    isActive:false
  },
  mutations: {
    toggleActive(states){
      states.isActive=!states.isActive
      
    }
  },
  actions: {
  },
  modules: {
  },
  getters:{
    getIsActive(states,getters){
      return states.isActive
    }
  }
})
