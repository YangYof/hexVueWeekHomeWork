const app = Vue.createApp({
    data(){
        return{
            apiUrl:`https://vue3-course-api.hexschool.io/v2`,
            apiPath:'yofyang',
            user:{
                username:'',
                password:''
            },
            loginBtnText:'登入',
            loginBtnStatus:false,
        }
    },
    methods: {
        login(){
            // console.log(this.$refs.loginBtn.value);
            this.loginBtnText = '登入中...';
            this.$refs.loginBtn.classList.remove('btn-primary');
            this.$refs.loginBtn.classList.add('btn-secondary');
            axios.post(`${this.apiUrl}/admin/signin`, this.user)
                .then(res=>{
                    let {token,expired} = res.data
                    console.log(token,expired);
                    document.cookie = `yofyang=${token};expired=${new Date(expired)}`;
                    this.loginBtnText = '登入成功';
                    this.loginBtnStatus = true;
                    this.$refs.loginBtn.classList.remove('btn-secondary');
                    this.$refs.loginBtn.classList.add('btn-success');
                    res.data.success ? window.location.replace('./products.html') : false ;
                })
                .catch(err=>{
                    this.loginBtnText = '請重新輸入帳號密碼';
                    this.$refs.loginBtn.classList.remove('btn-secondary');
                    this.$refs.loginBtn.classList.add('btn-danger');
                    setTimeout(()=>{
                        this.loginBtnText = '登入';
                        this.$refs.loginBtn.classList.remove('btn-danger');
                        this.$refs.loginBtn.classList.add('btn-primary');
                    },2000)
                })
        }
    }
});

app.mount('#app');