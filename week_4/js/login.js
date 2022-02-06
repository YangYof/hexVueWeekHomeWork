

const app = Vue.createApp({
    data(){
        return{
            api_url:'https://vue3-course-api.hexschool.io/v2',
            api_path:'yofyang',
            user:{
                username:'',
                password:''
            }
        }
    },
    methods: {
        login(){
            console.log(this.user);
            axios.post(`${this.api_url}/admin/signin`, this.user)
                .then(res=>{
                    let {token,expired} = res.data
                    document.cookie = `yofyang=${token};expired=${new Date(expired)}`;
                    res.data.success ? window.location.replace('./products.html') : false ;
                })
                .catch(err=>{
                    console.log(err);
                })
        }
    }
});

app.mount('#app');