
const app = Vue.createApp({
    data(){
        return{
            api_url:'https://vue3-course-api.hexschool.io/v2',
            api_path:'yofyang',
            products:[],
            pagination:{}
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
        getProducts(){
            // https://vue3-course-api.hexschool.io/v2/api/yofyang/admin/products?page=1
            axios.get(`${this.api_url}/api/${this.api_path}/admin/products?page=1`)
                .then(res=>{
                    this.products = res.data.products;
                    this.pagination = res.data.pagination;
                })
                .catch(err=>{
                    console.log(err);
                })
        }
    },
    mounted() {
        this.loginStatus();
        this.getProducts();
    },
})

app.mount('#app')