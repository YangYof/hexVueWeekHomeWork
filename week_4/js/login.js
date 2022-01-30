

const app = Vue.createApp({
    data(){
        return{
            api_url:'',
            api_path:'',
            user:{
                username:'',
                password:''
            }
        }
    },
    methods: {
        login(){
            axios.get('')
                .then(res=>{
                    
                })
                .catch(err=>{

                })
        }
    },
    mounted() {
        
    },
});

app.mount('#app');