
import { createStore } from 'vuex'

export default createStore({
  state: {
    composants: [],
    catts: [],
    preCatt: null,
    showImg: false,
    showComposant: false,
    showCategory: true,
    selectedCatt: null,
    searchValue: null,

    swipe: '',

    componentToSet: null,
    categoryToSet: null,

    searchIcons: "",
    colorIcons: "",
    shapeIcons: "",
    trigger: false
  },
  
  getters: {
    getCattColor: (state) => (cattId) => {
      const foundCatt = state.catts.find(catt => catt.id === cattId)
      return foundCatt ? foundCatt.color : null
    },
    getCattName: (state) => (cattId) => {
      const foundCatt = state.catts.find(catt => catt.id === cattId)
      return foundCatt ? foundCatt.name : null
    }
  },

  mutations: {
    addComposant(state, composant){
      state.composants.push(composant)
    },
    setComponent(state, playload){
      const index = state.composants.findIndex(c => c.id === playload.id)
      if(index !== -1){
        state.composants[index] = playload
      }
    },
    deleteComposant(state, composant){
      state.composants.splice(composant, 1)
    },

    addCatt(state, catt){
      state.catts.push(catt)
    },
    setCategory(state, playload){
      const index = state.catts.findIndex(c => c.id === playload.id)
      if(index !== -1){
        state.catts[index] = playload
      }
    },
    deleteCatt(state, catt){
      state.catts.splice(catt, 1)
    },

    setPreCatt(state, name){
      state.preCatt = name
    },

    setShowImg(state, bool){
      state.showImg = bool
    },
    setShowComposant(state, bool){
      state.showComposant = bool
    },
    setShowCategory(state, bool){
      state.showCategory = bool
    },
    setSelectedCategory(state, bool){
      state.selectedCatt = bool
    },

    setSwipe(state, value){
      state.swipe = value
    },

    setSearchValue(state, value){
      state.searchValue = value
    },

    setComponentToSet(state, value){
      state.componentToSet = value
    },
    setCategoryToSet(state, value){
      state.categoryToSet = value
    },

    callIcons(state, values){
      state.searchIcons = values.search
      state.colorIcons = values.color
      state.shapeIcons = values.shape
    },
    setTrigger(state, value){
      state.trigger = value
    }

  },

  actions: {
    addComposant({commit}, composant) {
      commit('addComposant', composant)
    },
    setComponent({commit}, playload){
      commit('setComponent', playload)
    },
    deleteComposant({commit}, composant) {
      commit('deleteComposant', composant)
    },

    addCatt({commit}, catt) {
      commit('addCatt', catt)
    },
    setCategory({commit}, playload){
      commit('setCategory', playload)
    },
    deleteCatt({commit}, catt){
      commit('deleteCatt', catt)
    },

    setPreCatt({commit}, name) {
      commit('setPreCatt', name)
    },

    setShowImg({commit}, bool){
      commit('setShowImg', bool)
    },
    setShowComposant({commit}, bool){
      commit('setShowComposant', bool)
    },
    setShowCategory({commit}, bool){
      commit('setShowCategory', bool)
    },
    setSelectedCategory({commit}, bool){
      commit('setSelectedCategory', bool)
    },

    setSwipe({commit}, value){
      commit('setSwipe', value)
    },

    setSearchValue({commit}, value){
      commit('setSearchValue', value)
    },

    setComponentToSet({commit}, value){
      commit('setComponentToSet', value)
    },
    setCategoryToSet({commit}, value){
      commit('setCategoryToSet', value)
    },

    callIcons({commit}, values){
      commit('callIcons', values)
    },
    setTrigger({commit}, value){
      commit('setTrigger', value)
    }
    
    
        

  },

  modules: {
  }
})
