<template>
  <!-- Modal -->
  <div
    class="modal fade"
    id="productModal"
    tabindex="-1"
    aria-labelledby="productModalLabel"
    aria-hidden="true"
    ref="modal"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="productModalLabel">
            {{ this.$store.state.tempProduct.title }}
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-6">
              <img
                class="img-fluid"
                :src="this.$store.state.tempProduct.imageUrl"
                :alt="this.$store.state.tempProduct.title"
              />
            </div>
            <div class="col-6">
                <span class="badge bg-primary">{{
                  this.$store.state.tempProduct.category
                }}</span>
                <p>商品描述：{{ this.$store.state.tempProduct.content }}</p>
                <p>商品內容：{{ this.$store.state.tempProduct.description }}</p>
                <h5 style="text-decoration: line-through">
                  原價 {{ this.$store.state.tempProduct.origin_price }} 元
                </h5>
                <h4>現在只要 {{ this.$store.state.tempProduct.price }} 元</h4>
                <div class="input-group mb-3">
                  <input
                    type="number"
                    v-model.number="productNum"
                    class="form-control"
                    placeholder="請輸入購買數量"
                    aria-label="Recipient's username"
                    aria-describedby="button-addon2"
                  />
                  <button
                    class="btn btn-outline-primary"
                    type="button"
                    @click="addToCart(this.$store.state.tempProduct.id)"
                    id="button-addon2"
                  >
                    確認加入購物車
                  </button>
                </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from 'bootstrap'
export default {
  data () {
    return {
      modal: null,
      productNum: 0
    }
  },
  methods: {
    openModal () {
      this.modal.show()
    },
    addToCart (id) {
      const item = {
        product_id: id,
        qty: this.productNum
      }
      this.$http
        .post(
          `${process.env.VUE_APP_API}/v2/api/${process.env.VUE_APP_PATH}/cart`,
          { data: item }
        )
        .then((res) => {
          console.log(res)
          this.modal.hide()
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  mounted () {
    this.modal = new Modal(this.$refs.modal)
  }
}
</script>
