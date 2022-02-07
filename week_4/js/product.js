let productModal = {};
let deleteProductModal = {};

import pagination from './components/pagination.js';
import deleteproductmodal from './components/deleteproductmodal.js';
import productmodal from './components/productmodal.js';

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
                    // console.log(this.pagination);
                    deleteProductModal.hide();
                    productModal.hide();
                })
                .catch(err=>{
                    console.log(err);
                })
        },
        openModal(status, product){
            if(status == 'new'){
                this.tempProduct = {
                    imagesUrl:[],
                };
                this.isNew = true;
                productModal.show();
            }else if(status == 'edit'){
                this.tempProduct = {...product};
                this.tempProduct.imagesUrl = [];
                this.isNew = false;
                productModal.show();
            }else if(status == 'delete'){
                this.tempProduct = {...product};
                deleteProductModal.show();
            }
            
        }
    },
    mounted() {
        this.loginStatus();
        this.getProducts();
        productModal = new bootstrap.Modal(document.getElementById('productModal'));
        deleteProductModal = new bootstrap.Modal(document.getElementById('deleteProductModal'));
    },
    components:{
        pagination,deleteproductmodal,productmodal
    },
})

app.mount('#app')