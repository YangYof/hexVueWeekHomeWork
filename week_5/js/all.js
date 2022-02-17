import modal from './components/modal.js'
import customerinfo from './components/customerinfo.js'

const { createApp, toRef, onMounted, ref } = Vue;

const { loading } = VueLoading.Component;

const apiUrl = "https://vue3-course-api.hexschool.io/v2";
const apiPath = "yofyang";

const app = createApp({
    components: {
        modal, customerinfo,loading,
    },
    setup() {
        // 取得商品列表
        const products = ref([]);
        const getProducts = () => {
            axios.get(`${apiUrl}/api/${apiPath}/products`)
                .then(res => {
                    products.value = res.data.products
                    // console.log(res.data.products, products.value);
                    isLoading.value = false
                })
                .catch(err => { console.log(err) })
        };

        // 取得購物車列表
        const carts = ref([]);
        const totalPrice = ref(0);
        const getCarts = () => {
            axios.get(`${apiUrl}/api/${apiPath}/cart`)
                .then(res => {
                    isLoading.value = false
                    carts.value = res.data.data.carts;
                    totalPrice.value = res.data.data.final_total;
                })
                .catch(err => { console.log(err) })
        };

        // 刪除購物車
        const daleteCart = (status, id) => {
            isLoadingSwitch()
            let url = `${apiUrl}/api/${apiPath}/cart/${id}`
            if (status == 'all') {
                url = `${apiUrl}/api/${apiPath}/carts`
            }
            axios.delete(url)
                .then(res => {
                    getCarts(); // 重新取得購物車列表
                    isLoadingSwitch()
                })
                .catch(err => { console.log(err) })
        }

        // 更新購物車
        const updateCart = (status, id, qty) => {
            isLoadingSwitch()
            let item = {
                product_id: id,
                qty: qty
            }
            let httpMethods = 'post'
            let url = `${apiUrl}/api/${apiPath}/cart`
            if (status === 'changeQty') {
                httpMethods = 'put';
                url = `${apiUrl}/api/${apiPath}/cart/${id}`
            }
            qty <= 0 ? daleteCart(id) : false; // 商品數量 <=0 就刪除
            axios[httpMethods](url, { data: item })
                .then(res => {
                    isLoadingSwitch()
                    getCarts(); // 重新取得購物車列表
                })
                .catch(err => { console.log(err) })
        }

        // openModal
        const tempProduct = ref({})
        const modal = ref(null)
        const openModal = (product) => {
            tempProduct.value = { ...product }
            modal.value.openModal()
        }

        // isLoading套件開關
        const isLoading = ref(true);
        const isLoadingSwitch = ()=>{
            isLoading.value = !isLoading.value
        }
        onMounted(() => {
            getProducts()  // 執行取得商品列表
            getCarts()  // 執行取得購物車列表
        })

        return {
            // 商品列表
            products, getCarts,
            // 購物車列表, 購物車總額, 刪除(單ㄧ以及全部)購物車 ,加入(更新)購物車
            carts, totalPrice, daleteCart, updateCart,
            // 開啟單一商品詳細列表
            openModal, tempProduct, modal,
            // isLoading套件開關
            isLoading,isLoadingSwitch
        }
    }
})

app.use(VueLoading.Plugin);
app.component('loading', VueLoading.Component)
app.mount('#app')