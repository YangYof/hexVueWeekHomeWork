import {createApp} from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.26/vue.esm-browser.prod.min.js';
    const app = createApp({
        data(){
            return{
                apiUrl:'https://vue3-course-api.hexschool.io',
                apiPath:'yofyang',
                user:{
                    username:'',
                    password:''
                },
                hintAlert:'',
            }
        },
        methods: {
            login(){
                axios.post(`${this.apiUrl}/v2/admin/signin`,this.user)
                .then(response=>{
                    console.log(response.data);
                    if(response.data.success){
                        this.hintAlert = '0';
                        const {token, expired} = response.data;
                        document.cookie = `yofyang=${token}; expires=${new Date(expired)};`;
                        parent.window.location.replace('./index.html');
                    }
                })
                .catch(error=>{
                    this.hintAlert = '1';
                })
            }
        }
    })
    app.mount('#app');