import {createApp,toRef,onMounted,ref} from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.1.4/vue.esm-browser.min.js' 
// https://cdnjs.cloudflare.com/ajax/libs/vee-validate/4.5.8/vee-validate.js

const apiUrl = "https://vue3-course-api.hexschool.io/v2";
const apiPath = "yofyang";

export default{
    template:`
        <form class="col-6 mx-auto">
            <div class="mb-3">
                <label class="form-label" for="email">Email :</label>
                <input class="form-control" type="email" name="email" id="email" placeholder="請輸入Email">
            </div>
            <div class="mb-3">
                <label class="form-label" for="name">收件人姓名 :</label>
                <input class="form-control" type="text" name="name" id="name" placeholder="請輸入姓名">
            </div>
            <div class="mb-3">
                <label class="form-label" for="phone">收件人電話 :</label>
                <input class="form-control" type="text" name="phone" id="phone" placeholder="請輸入電話">
            </div>
            <div class="mb-3">
                <label class="form-label" for="address">收件人地址 :</label>
                <input class="form-control" type="text" name="address" id="address" placeholder="請輸入地址">
            </div>
            <div class="mb-3">
                <label class="form-label" for="message">留言 :</label>
                <textarea class="form-control" name="message" id="message" rows="3"></textarea>
            </div>
            <div class="d-grid">
                <button type="button" class="btn btn-danger">送出訂單</button>
            </div>
        </form>
    `,
}