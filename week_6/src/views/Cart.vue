<template>
  <table class="table">
    <thead>
      <tr>
        <td></td>
        <td>
          品名
        </td>
        <td>
          數量
        </td>
        <td>
          單價
        </td>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item) in this.$store.state.cart" :key="item.id">
        <td>
          <button type="button" class="btn btn-outline-danger">刪除</button>
        </td>
        <td>
          {{item.product.title}}
        </td>
        <td>
          {{item.qty}} / {{item.product.unit}}
        </td>
        <td>
          {{item.product.price}}
        </td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <td></td>
        <td></td>
        <td>總計</td>
        <td>{{this.$store.state.final_total}}</td>
      </tr>
    </tfoot>
  </table>
  <OrderInfo />
</template>

<script>
import OrderInfo from '../components/OrderInfo.vue'
export default {
  components: {
    OrderInfo
  },
  mounted () {
    this.$store.dispatch('getCart')
  }
}
</script>
