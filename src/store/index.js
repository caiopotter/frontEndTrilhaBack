import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
  
  /* eslint-disable no-new */
const store = new Vuex.Store({
  state: {
    searchFilter: '',
    movieList: [],
    userLoggedIn: undefined,
    userFavoriteList: [],
    favoriteMovies: false,
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})

export default store;
