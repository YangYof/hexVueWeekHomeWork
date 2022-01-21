import {createApp} from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.26/vue.esm-browser.prod.min.js';
    const app = createApp({
        data(){
            return{
                apiUrl:'https://vue3-course-api.hexschool.io',
                apiPath:'yofyang',
                products:[],
                temp:{},
                logoutBtn:true,
            }
        },
        methods: {
            getproducts(){
                axios.get(`${this.apiUrl}/v2/api/${this.apiPath}/products/all`)
                    .then(response=>{
                        // console.log(response.data);
                        this.products = [...response.data.products];
                    })
                    .catch(error=>{
                        console.log(error.data.message);
                    })
            },
            logout(){
                this.logoutBtn = false
                axios.post(`${this.apiUrl}/v2/logout`)
                    .then(response=>{
                        if(response.data.success){
                            parent.window.location.replace('./login.html');
                        }
                    })
                    .catch(error=>{
                        console.log(error);
                    })
            },
            checkLoginStatus(){
                const token = document.cookie.replace(/(?:(?:^|.*;\s*)yofyang\s*=\s*([^;]*).*$)|^.*$/, '$1');
                axios.defaults.headers.common.Authorization = `${token}`;

                axios.post(`${this.apiUrl}/v2/api/user/check`)
                .then(response=>{
                    if(response.data.success == false){
                        parent.window.location.replace('./login.html');
                        alert(response.data.message);
                    }
                })
                .catch(error=>{
                    // console.log(error);
                    parent.window.location.replace('./login.html');
                    alert('請重新登入');
                })
            }
        },
        mounted() {
            this.getproducts();
        },
        created() {
            this.checkLoginStatus();
        },
    })
    app.config.devtools = true;
    app.mount('#app');