<template>
  <!-- <router-link to="/products/product">Product</router-link> -->
  <!-- <router-view /> -->
  <table class="table align-middle">
    <thead>
      <tr>
        <td width="200">圖片</td>
        <td>商品名稱</td>
        <td>價格</td>
        <td width="300"></td>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in this.$store.state.products" :key="item.id">
        <td>
          <img class="img-fluid" :src="item.imageUrl" :alt="item.title" />
        </td>
        <td>
          {{ item.title }}
        </td>
        <td>
          {{ item.price }}
        </td>
        <td>
          <button
            type="button"
            class="btn btn-outline-primary"
            @click="openModal(item)"
          >
            查看更多
          </button>
          <button
            type="button"
            class="btn btn-outline-danger"
            @click="addToCart(item.id, qty)"
          >
            加到購物車
          </button>
        </td>
      </tr>
    </tbody>
  </table>
  <productModal ref="productModal" />
</template>

<script>
import productModal from '../components/productModal.vue'
export default {
  components: {
    productModal
  },
  data () {
    return {}
  },
  methods: {
    openModal (product) {
      this.$store.dispatch('ProductModal', product)
      this.$refs.productModal.openModal()
    },
    addToCart (id, qty = 1) {
      const item = {
        product_id: id,
        qty: qty
      }
      this.$http
        .post(
          `${process.env.VUE_APP_API}/v2/api/${process.env.VUE_APP_PATH}/cart`,
          { data: item }
        )
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>
