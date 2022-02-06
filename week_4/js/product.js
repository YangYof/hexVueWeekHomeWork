import deleteproduct from './deleteproduct.js';
import pagination from './pagination.js';
import productmodal from './productmodal.js';

let productModal = {};
let deleteProductModal = {};

const app = Vue.createApp({
    components:{
        pagination,productmodal,deleteproduct
    },
    data(){
        return{
            apiUrl:`https://vue3-course-api.hexschool.io/v2`,
            apiPath:'yofyang',
            products:[],
            tempProduct:{
                imagesUrl:[]
            },
            pagination:{},
            modalTitle:'新增產品',
            updateProductBtnText:'新增產品',
            isNew:false,
        }
    },
    methods: {
        getProducts(page=1){
            // https://vue3-course-api.hexschool.io/v2/api/yofyang/admin/products?page=1
            axios.get(`${this.apiUrl}/api/${this.apiPath}/admin/products?page=${page}`)
                .then(response=>{
                    this.products = [...response.data.products];
                    this.pagination = {...response.data.pagination};
                    productModal.hide();
                    deleteProductModal.hide();
                    // console.log(this.pagination );
                })
                .catch(error=>{
                    console.log(error);
                })
        },
        loginStatus(){
            const token = document.cookie.replace(/(?:(?:^|.*;\s*)yofyang\s*=\s*([^;]*).*$)|^.*$/, '$1');
            axios.defaults.headers.common.Authorization = `${token}`;
            axios.post(`${this.apiUrl}/api/user/check`)
                .then(response=>{
                    // console.log(response);
                    if(!response.data.success){
                        window.location.replace('./login.html')
                    }
                })
                .catch(error=>{
                    console.log(error);
                    window.location.replace('./login.html')
                })
        },
        // updateProduct(){
        //     let url=`${this.apiUrl}/api/${this.apiPath}/admin/product`;
        //     let httpMethods = 'post';
        //     if(this.isNew = false){
        //         url=`${this.apiUrl}/api/${this.apiPath}/admin/product/${this.tempProduct.id}`;
        //         httpMethods = 'put';
        //     }
        //     axios[httpMethods](url,{data:this.tempProduct})
        //         .then(response=>{
        //             console.log(response);
        //             this.getProducts();
        //             productModal.hide();
        //         })
        //         .catch(error=>{
        //             console.log(error);
        //         })
        // },
        // updateImage(){
        //     let photo = this.$refs.image.files[0];
        //     let formData = new FormData;
        //     formData.append('photo',)
        // },
        logout(){
            axios.post(`${this.apiUrl}/logout`)
                .then(response=>{
                    console.log(response);
                    if(response.data.success){
                        window.location.replace('./login.html')
                    }
                })
                .catch(error=>{
                    console.log(error);
                })
        },
        openModal(state, product){
            if(state=="new"){
                this.tempProduct = {
                    imagesUrl:[]
                };
                this.isNew = true;
                this.modalTitle = '新增產品';
                this.updateProductBtnText='新增產品';
                productModal.show();
            }else if(state=="edit"){
                this.tempProduct = product;
                this.tempProduct.imagesUrl = [];
                this.isNew = false;
                this.updateProductBtnText='編輯產品';
                this.modalTitle = product.title;
                productModal.show();
            }else if(state=="delete"){
                this.tempProduct = product;
                this.modalTitle = product.title;
                // this.tempProduct.imagesUrl = [];
                deleteProductModal.show();
            }
            
        }
    },
    mounted() {
        productModal = new bootstrap.Modal(document.getElementById('productModal'))
        deleteProductModal = new bootstrap.Modal(document.getElementById('deleteProductModal'))
        this.loginStatus();
        this.getProducts();
    },
})

app.mount('#app')