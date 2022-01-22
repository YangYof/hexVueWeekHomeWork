const app = Vue.createApp({
    data(){
        return {
            apiUrl:'https://vue3-course-api.hexschool.io/v2',
            apiPath:'yofyang',
            user:{
                username:'',
                password:''
            },
            loginError:false
        }
    },
    methods:{
        login(){
            axios.post(`${this.apiUrl}/admin/signin`,this.user)
                .then(res=>{
                    if(res.data.success){
                        const {token , expired} = res.data;
                        document.cookie = `yofyang=${token}; expired = ${new Date(expired)};`;
                        this.logBtn();
                        setTimeout(() => {
                            window.location.replace('./products.html')
                        }, 800);
                    }
                })
                .catch(err=>{
                    this.loginError = true;
                    setTimeout(() => {
                        this.loginError = false;
                    }, 3000);
                })
        },
        logBtn(){
            this.$refs.loginBtn.classList.remove("btn-primary");
            this.$refs.loginBtn.classList.add("btn-secondary");
            this.$refs.loginBtn.value = "登入中...";
        }
    }
})
app.mount('#app')