import pagination from './components/pagination.js';
import deleteproductmodal from './components/deleteproductmodal.js';
import productmodal from './components/productmodal.js';

let productModal = {};
let deleteProductModal = {};

const app = Vue.createApp({
    data(){
        return{
            api_url:'https://vue3-course-api.hexschool.io/v2',
            api_path:'yofyang',
            products:[],
            tempProduct:{
                imagesUrl:[]
            },
            pagination:{},
            modalTitle:'Modal title',
            isNew:false,
        }
    },
    components:{
        pagination,deleteproductmodal,productmodal
    },
    methods: {
        loginStatus(){
            const token = document.cookie.replace(/(?:(?:^|.*;\s*)yofyang\s*=\s*([^;]*).*$)|^.*$/, '$1');
            axios.defaults.headers.common.Authorization = `${token}`;
            axios.post(`${this.api_url}/api/user/check`)
                .then(res=>{
                    // console.log(res);
                })
                .catch(err=>{
                    !res.data.success ? window.location.replace('./login.html') : false ;
                })
        },
        getProducts(page=1){
            // https://vue3-course-api.hexschool.io/v2/api/yofyang/admin/products?page=1
            axios.get(`${this.api_url}/api/${this.api_path}/admin/products?page=${page}`)
                .then(res=>{
                    this.products = res.data.products;
                    this.pagination = res.data.pagination;
                    console.log(this.pagination);
                })
                .catch(err=>{
                    console.log(err);
                })
        },
        openModal(){
            productModal.show();
        }
    },
    mounted() {
        this.loginStatus();
        this.getProducts();
        productModal = new bootstrap.Modal(document.getElementById('productModal'), {
            keyboard: false
        });
        
    },
})

app.mount('#app')