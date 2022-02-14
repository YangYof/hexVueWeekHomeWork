
import pagination from './components/pagination.js';
import deleteproductmodal from './components/deleteproductmodal.js';
import productmodal from './components/productmodal.js';

const app = Vue.createApp({
    components:{
        pagination,deleteproductmodal,productmodal
    },
    data(){
        return{
            api_url:'https://vue3-course-api.hexschool.io/v2',
            api_path:'yofyang',
            products:[],
            tempProduct:{
                imagesUrl:[]
            },
            pagination:{},
            modalTitle:'新增產品',
            isNew:false,
            productModal:null,
        }
    },
    methods: {
        loginStatus(){
            const token = document.cookie.replace(/(?:(?:^|.*;\s*)yofyang\s*=\s*([^;]*).*$)|^.*$/, '$1');
            axios.defaults.headers.common.Authorization = `${token}`;
            axios.post(`${this.api_url}/api/user/check`)
                .then(res=>{
                    !res.data.success ? window.location.replace('./login.html') : false ;
                })
                .catch(err=>{
                    alert('驗證錯誤，請重新輸入帳號密碼')
                    window.location.replace('./login.html')
                })
        },
        getProducts(page=1){
            // https://vue3-course-api.hexschool.io/v2/api/yofyang/admin/products?page=1
            axios.get(`${this.api_url}/api/${this.api_path}/admin/products?page=${page}`)
                .then(res=>{
                    this.products = res.data.products;
                    this.pagination = res.data.pagination;
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
                this.modalTitle = '新增產品';
                this.isNew = true;
                this.$refs.productModal.showModal()
            }else if(status == 'edit'){
                this.tempProduct = {...product};
                this.tempProduct.imagesUrl = [];
                this.modalTitle = this.tempProduct.title
                this.isNew = false;
                this.$refs.productModal.showModal()
            }else if(status == 'delete'){
                this.tempProduct = {...product};
                this.$refs.deleteProductModal.showModal();
            }
            
        },
        logout(){
            this.$refs.loginOutBtn.value = "登出中..."
            this.$refs.loginOutBtn.classList.remove('btn-danger');
            this.$refs.loginOutBtn.classList.add('btn-secondary');
            axios.post(`${this.api_url}/logout`)
                .then(res=>{
                    window.location.replace('./login.html')
                })
                .catch(err=>{
                    console.log(err);
                })
        }
    },
    mounted() {
        this.loginStatus();
        this.getProducts();        
    }
})

app.mount('#app')