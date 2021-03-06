const { onMounted, ref } = Vue;

const apiUrl = "https://vue3-course-api.hexschool.io/v2";
const apiPath = "yofyang";

export default {
    props: ['tempProduct'],
    template: `
        <div class="modal fade" ref="productModal" id="productModal" tabindex="-1" aria-labelledby="productModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="productModalLabel">{{tempProduct.title}}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    
                    <div class="row">
                        <div class="col-6">
                            <img class="img-fluid" :src="tempProduct.imageUrl"/>
                        </div>
                        <div class="col-6">
                            <span class="badge bg-primary">{{tempProduct.category}}</span>
                            <p>商品描述：{{tempProduct.content}}</p>
                            <p>商品內容：{{tempProduct.description}}</p>
                            <h5 style="text-decoration:line-through;">原價 {{tempProduct.origin_price}} 元</h5>
                            <h4>現在只要 {{tempProduct.price}} 元</h4>
                            <div class="input-group mb-3">
                                <input type="number" v-model.number="productNum" class="form-control" placeholder="請輸入購買數量" aria-label="Recipient's username" aria-describedby="button-addon2">
                                <button class="btn btn-outline-primary" type="button" @click="sendOrder(tempProduct.id)" id="button-addon2">確認加入購物車</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" @click="sendOrder(tempProduct.id)">確認</button>
                </div>
                </div>
            </div>
        </div>
    `,
    setup(props, { emit }) {
        // bootstrap Modal開關
        let productModal = ref(null);
        const openModal = () => { // bootstrap Modal開
            productModal.show()
        }
        const hideModal = () => { // bootstrap Modal關
            productModal.hide()
        }
        onMounted(() => {
            productModal = new bootstrap.Modal(productModal.value)
        })

        // 送出訂單
        const productNum = ref('');
        const sendOrder = (id) => {
            if (productNum.value <= 0) {
                return alert('數字不可以小於等於0')
            }
            let item = {
                product_id: id,
                qty: productNum.value
            }
            axios.post(`${apiUrl}/api/${apiPath}/cart`, { data: item })
                .then(res => {
                    console.log(res);
                    emit('get-cart');
                    productNum.value = ''
                    hideModal()
                })
                .catch(err => {
                    console.log(err);
                })
        }

        return {
            // bootstrapModal 功能
            productModal, openModal, hideModal,

            // 送出訂單
            sendOrder, productNum
        }
    }
}