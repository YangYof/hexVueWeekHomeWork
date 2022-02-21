<template>
  <div class="home">
    <h5 class="mt-5 mb-3">這是前台頁面</h5>
    <div id="nav" class="m-3 fs-4">
      <router-link to="/">首頁</router-link> |
      <router-link to="/productsview"> 前台產品列表</router-link> |
      <router-link to="/cart"> 前台購物車 </router-link> |
      <router-link to="/admin"> 後台頁面 </router-link>
    </div>
    <h4>首頁</h4>
    <router-view />
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <!-- <ul>
      <li v-for="(item) in this.$store.state.products" :key="item.id">
        {{item.title}}
        <img :src="item.imageUrl" alt="">
        {{item.unit}}
      </li>
    </ul> -->
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

// import { mapActions } from 'vuex'

export default {
  name: 'Home',
  components: {
    // HelloWorld
  },
  methods: {
    // ...mapActions(['getProdusts']),
  },
  mounted () {
    // console.log(process.env.VUE_APP_API, process.env.VUE_APP_PATH)
    this.$store.dispatch('getProdusts')
    // this.getProducts()
  }
}
</script>
