<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <ul>
      <li v-for="(item) in this.$store.state.products" :key="item.id">
        {{item.title}}
        <img :src="item.imageUrl" alt="">
        {{item.unit}}
      </li>
    </ul>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

// import { mapActions } from 'vuex'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  methods: {
    // ...mapActions(['getProdusts']),
    getProducts () {
      this.$http
        .get(
          `${process.env.VUE_APP_API}/v2/api/${process.env.VUE_APP_PATH}/products`
        )
        .then((res) => {
          console.log(res.data.products)
        })
    }
  },
  mounted () {
    // console.log(process.env.VUE_APP_API, process.env.VUE_APP_PATH)
    this.$store.dispatch('getProdusts')
    // this.getProducts()
  }
}
</script>
