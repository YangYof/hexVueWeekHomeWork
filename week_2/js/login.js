import {createApp} from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.26/vue.esm-browser.prod.min.js';
    const app = createApp({
        data(){
            return{
                apiUrl:'https://vue3-course-api.hexschool.io',
                apiPath:'yofyang',
                user:{
                    username:'',
                    password:''
                }
            }
        },
        methods: {
            login(){
                axios.post(`${this.apiUrl}/v2/admin/signin`,this.user)
                .then(response=>{
                    console.log(response.data);
                    if(response.data.success){
                        const {token, expired} = response.data;
                        parent.window.location.replace('./index.html');
                        document.cookie = `yofyang=${token}; expires=${new Date(expired)};`;
                        alert('登入成功');
                    }
                })
                .catch(error=>{
                    console.log(error.message);
                    alert('帳號或密碼輸入錯誤');
                })
            }
        }
    })
    app.mount('#app');