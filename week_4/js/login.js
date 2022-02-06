

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
                    console.log(res.data.success);
                    res.data.success ? window.location.replace('./products.html') : false ;
                })
                .catch(err=>{

                })
        }
    },
    mounted() {
        
    },
});

app.mount('#app');