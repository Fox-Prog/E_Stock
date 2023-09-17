
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

    swipe: ''
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
    deleteComposant(state, composant){
      state.composants.splice(composant, 1)
    },

    addCatt(state, catt){
      state.catts.push(catt)
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
    }

  },

  actions: {
    addComposant({commit}, composant) {
      commit('addComposant', composant)
    },
    deleteComposant({commit}, composant) {
      commit('deleteComposant', composant)
    },

    addCatt({commit}, catt) {
      commit('addCatt', catt)
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
    }


  },

  modules: {
  }
})
