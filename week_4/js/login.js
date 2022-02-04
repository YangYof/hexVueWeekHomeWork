

const app = Vue.createApp({
    data(){
        return{
            apiUrl:`https://vue3-course-api.hexschool.io/`,
            apiPath:'yofyang',
            user:{
                username:'',
                password:''
            }
        }
    },
    methods: {
        login(){
            // /v2/admin/signin
            axios.post(`${this.apiUrl}/v2/admin/signin`, this.user)
                .then(response=>{
                    console.log(response.data);
                    if(response.data.success){
                        let {expired, token} = response.data;
                        document.cookie =`yofyang=${token}; expired=${new Date(expired)};`;
                        window.location.replace('./products.html')
                    }
                })
                .catch(error=>{
                    console.log(error);
                })
        }
    },
    mounted() {
        
    },
});

app.mount('#app');