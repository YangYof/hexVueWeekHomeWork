const { onMounted, ref, reactive } = Vue;

//  --------------------------------- VeeValidate ---------------------------------

const { defineRule, Form, Field, ErrorMessage, configure } = VeeValidate;
const { required, email, min, max } = VeeValidateRules;
const { localize, loadLocaleFromURL } = VeeValidateI18n;

defineRule('required', required);
defineRule('email', email);
defineRule('min', min);
defineRule('max', max);

loadLocaleFromURL('https://unpkg.com/@vee-validate/i18n@4.1.0/dist/locale/zh_TW.json');

configure({ // 用來做一些設定
    generateMessage: localize('zh_TW'), //啟用 locale 
});
//  ------------------------------------------------------------------------------

const apiUrl = "https://vue3-course-api.hexschool.io/v2";
const apiPath = "yofyang";

export default {
    components: {
        VForm: Form,
        VField: Field,
        ErrorMessage: ErrorMessage,
    },
    template: `
        <v-form class="col-6 mx-auto" v-slot="{ errors }" @submit="sendOrder">
            <div class="mb-3">
                <label class="form-label" for="email">Email :</label>
                <v-field type="email" name="Email" id="email" class="form-control" placeholder="請輸入 Email" 
                    :class="{ 'is-invalid': errors['Email'] }"
                    rules="email|required"
                    v-model="user.email"
                ></v-field>
                <error-message name="Email" class="invalid-feedback"></error-message>
            </div>
            <div class="mb-3">
                <label class="form-label" for="name">收件人姓名 :</label>
                <v-field type="text" name="姓名" id="name"  class="form-control" placeholder="請輸入 姓名" 
                    :class="{ 'is-invalid': errors['姓名'] }"
                    rules="required"
                    v-model="user.name"
                ></v-field>
                <error-message name="姓名" class="invalid-feedback"></error-message>
            </div>
            <div class="mb-3">
                <label class="form-label" for="name">收件人電話 :</label>
                <v-field type="text" name="電話" id="name"  class="form-control" placeholder="請輸入 電話" 
                    :class="{ 'is-invalid': errors['電話'] }"
                    :rules="isPhone"
                    v-model="user.tel"
                ></v-field>
                <error-message name="電話" class="invalid-feedback"></error-message>
            </div>
            <div class="mb-3">
                <label class="form-label" for="name">收件人地址 :</label>
                <v-field type="text" name="地址" id="name"  class="form-control" placeholder="請輸入 地址" 
                    :class="{ 'is-invalid': errors['地址'] }"
                    rules="required"
                    v-model="user.address"
                ></v-field>
                <error-message name="地址" class="invalid-feedback"></error-message>
            </div>
            <div class="mb-3">
                <label class="form-label" for="message">留言 :</label>
                <textarea class="form-control" name="message" v-model="message" id="message" rows="3"></textarea>
            </div>
            <div class="d-grid">
                <button type="submit" class="btn btn-danger">送出訂單</button>
            </div>
        </v-form>
    `,
    setup(props, { emit }) {
        const user = reactive({})
        const message = ref('')

        const sendOrder = () => {
            emit('isLoadingSwitch');
            let customerContent = message.value;
            axios.post(`${apiUrl}/api/${apiPath}/order`, { data: { user }, customerContent })
                .then(res => {
                    reset();
                    emit('get-cart');
                })
                .catch(err => {
                    console.log(err);
                    emit('isLoadingSwitch');
                })
        }

        const isPhone = (value) => {
            const phoneNumber = /^(09)[0-9]{8}$/
            return phoneNumber.test(value) ? true : '需要正確的電話號碼'
        }

        const reset = () => {
            user.email = '';
            user.name = '';
            user.tel = '';
            user.address = '';
            user.message = '';
        }

        return {
            sendOrder, user, message, isPhone, reset
        }
    }
}