

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
            // axios.get('')
            //     .then(res=>{

            //     })
            //     .catch(err=>{

            //     })
        }
    },
    mounted() {
        
    },
});

app.mount('#app');