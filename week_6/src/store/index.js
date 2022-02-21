import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    products: [],
    tempProduct: {},
    cart: [],
    final_total: {}
  },
  mutations: {
    STATE_PRODUCTS: (state, products) => {
      state.products = products
    },
    STATE_CART: (state, cart) => {
      state.cart = cart
    },
    TEMP_PRODUCT: (state, product) => {
      state.tempProduct = product
    },
    FINAL_TOTAL: (state, total) => {
      state.final_total = total
    }
  },
  actions: {
    getProdusts: ({ commit }) => {
      axios
        .get(
          `${process.env.VUE_APP_API}/v2/api/${process.env.VUE_APP_PATH}/products`
        )
        .then((res) => {
          commit('STATE_PRODUCTS', res.data.products)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getCart: ({ commit }) => {
      axios
        .get(
          `${process.env.VUE_APP_API}/v2/api/${process.env.VUE_APP_PATH}/cart`
        )
        .then((res) => {
          commit('STATE_CART', res.data.data.carts)
          commit('FINAL_TOTAL', res.data.data.final_total)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    ProductModal: ({ commit }, item) => {
      commit('TEMP_PRODUCT', item)
    }
    // addToCart: (item.id,qty = 1) => {

    // }
  },
  modules: {}
})
