let productModal = null;
let deleteProductModal = null;

const app = Vue.createApp({
    data(){
        return {
            apiUrl:'https://vue3-course-api.hexschool.io/v2',
            apiPath:'yofyang',
            products: [],
            isNew: false,
            tempProduct: {
                imagesUrl: [],
            },
            modalTitle:'新增產品',
            imagesSrc:'',
            tableFadeIn:false
        }
    },
    mounted() {
        this.loginStatus();
        this.getproducts();
        productModal = new bootstrap.Modal(document.getElementById('productModal'), {
            keyboard: false
        });
        deleteProductModal = new bootstrap.Modal(document.getElementById('deleteProductModal'), {
            keyboard: false
        });
        setTimeout(() => {
            this.tableFadeIn = true
        }, 800);
        
    },
    methods:{
        getproducts(){
            axios.get(`${this.apiUrl}/api/${this.apiPath}/admin/products`)
                .then(res=>{
                    // console.log(res);
                    this.products = [...res.data.products];
                })
                .catch(err=>{
                    console.log(err);
                })
        },
        isOpenModal(status, product){
            if(status === 'new'){
                this.tempProduct = {
                    imagesUrl: [],
                };
                this.isNew = true;
                productModal.show();
            }else if(status === 'edit'){
                this.tempProduct = {...product};
                !Array.isArray(this.tempProduct.imagesUrl) ? this.tempProduct.imagesUrl = [] : false ;
                this.modalTitle = this.tempProduct.title;
                this.isNew = false;
                productModal.show();
            }else if(status === 'delete'){
                this.tempProduct = { ...product };
                deleteProductModal.show();
            }
        },
        updateProduct(){
            let method = 'post';
            // /v2/api/{api_path}/admin/product/{id}
            let url = `${this.apiUrl}/api/${this.apiPath}/admin/product`;
            if(!this.isNew){
                method = 'put';
                url = `${this.apiUrl}/api/${this.apiPath}/admin/product/${this.tempProduct.id}`;
            }
            axios[method](url, {data:this.tempProduct})
                .then(res=>{
                    // console.log(res);
                    productModal.hide();
                    this.getproducts();
                })
                .catch(err=>{
                    console.log(err);
                })
        },
        deleteProduct(){
            axios.delete(`${this.apiUrl}/api/${this.apiPath}/admin/product/${this.tempProduct.id}`)
                .then(res=>{
                    console.log(res);
                    this.getproducts();
                    deleteProductModal.hide();
                })
                .catch(err=>{
                    console.log(err);
                })
        },
        loginStatus(){
            const token = document.cookie.replace(/(?:(?:^|.*;\s*)yofyang\s*=\s*([^;]*).*$)|^.*$/, '$1');
            axios.defaults.headers.common.Authorization = `${token}`;
            axios.post(`${this.apiUrl}/api/user/check`)
                .then(res=>{
                    // console.log(res);
                })
                .catch(err=>{
                    parent.window.location.replace('./login.html');
                })
        },
        addImages(src){
            // console.log(src);
            this.tempProduct.imagesUrl.push(src);
            this.imagesSrc = ''
        },
        logout(){
            axios.post(`${this.apiUrl}/logout`)
                .then(res=>{
                    this.$refs.logoutBtn.classList.remove("btn-danger");
                    this.$refs.logoutBtn.classList.add("btn-secondary");
                    this.$refs.logoutBtn.value = "登出中...";
                    // this.tableFadeIn = false;
                    setTimeout(() => {window.location.replace('./login.html')}, 800);
                })
                .catch(err=>{
                    console.log(err);
                })
        },
        // beforeEnter(el){
        //     el.style.opacity=0;
        //     el.style.transform = 'translateY(20px)'
        // },
        // enter(el,done){
        //     gsap.to(el,{
        //         opacity:1,
        //         y:0,
        //         duration:0.3,
        //         onComplete:done,
        //         delay: el.dataset.index * 0.15,
        //     })
        // },
        // leave(el,done){
        //     gsap.to(el,{
        //         opacity:0,
        //         y:20,
        //         duration:0.8,
        //         onComplete:done,
        //         delay: el.dataset.index * 0.15,
        //     })
        // }
    }
})

app.mount('#app')