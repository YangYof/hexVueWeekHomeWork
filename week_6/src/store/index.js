import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    products: []
  },
  mutations: {
    STATE_PRODUCTS: (state, products) => {
      state.products = products
    }
  },
  actions: {
    getProdusts: ({ commit }) => {
      axios.get(`${process.env.VUE_APP_API}/v2/api/${process.env.VUE_APP_PATH}/products`)
        .then((res) => {
          commit('STATE_PRODUCTS', res.data.products)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  modules: {}
})
