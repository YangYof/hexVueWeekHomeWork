<template>
  <v-form class="col-6 mx-auto" v-slot="{ errors }" @submit="sendOrder">
    <div class="mb-3">
      <label class="form-label" for="email">Email :</label>
      <v-field
        type="email"
        name="Email"
        id="email"
        class="form-control"
        placeholder="請輸入 Email"
        :class="{ 'is-invalid': errors['Email'] }"
        rules="email|required"
        v-model="user.email"
      ></v-field>
      <ErrorMessage name="Email" class="invalid-feedback"></ErrorMessage>
    </div>
    <div class="mb-3">
      <label class="form-label" for="name">收件人姓名 :</label>
      <v-field
        type="text"
        name="姓名"
        id="name"
        class="form-control"
        placeholder="請輸入 姓名"
        :class="{ 'is-invalid': errors['姓名'] }"
        rules="required"
        v-model="user.name"
      ></v-field>
      <ErrorMessage name="姓名" class="invalid-feedback"></ErrorMessage>
    </div>
    <div class="mb-3">
      <label class="form-label" for="name">收件人電話 :</label>
      <v-field
        type="text"
        name="電話"
        id="name"
        class="form-control"
        placeholder="請輸入 電話"
        :class="{ 'is-invalid': errors['電話'] }"
        :rules="isPhone"
        v-model="user.tel"
      ></v-field>
      <ErrorMessage name="電話" class="invalid-feedback"></ErrorMessage>
    </div>
    <div class="mb-3">
      <label class="form-label" for="name">收件人地址 :</label>
      <v-field
        type="text"
        name="地址"
        id="name"
        class="form-control"
        placeholder="請輸入 地址"
        :class="{ 'is-invalid': errors['地址'] }"
        rules="required"
        v-model="user.address"
      ></v-field>
      <ErrorMessage name="地址" class="invalid-feedback"></ErrorMessage>
    </div>
    <div class="mb-3">
      <label class="form-label" for="message">留言 :</label>
      <textarea
        class="form-control"
        name="message"
        v-model="message"
        id="message"
        rows="3"
      ></textarea>
    </div>
    <div class="d-grid">
      <button type="submit" class="btn btn-danger">送出訂單</button>
    </div>
  </v-form>
</template>

<script>
import { defineRule, Form, Field, ErrorMessage, configure } from 'vee-validate'
import { required, email, min, max } from '@vee-validate/rules'
import { localize, loadLocaleFromURL } from '@vee-validate/i18n'

defineRule('required', required)
defineRule('email', email)
defineRule('min', min)
defineRule('max', max)

loadLocaleFromURL(
  'https://unpkg.com/@vee-validate/i18n@4.1.0/dist/locale/zh_TW.json'
)

configure({
  // 用來做一些設定
  generateMessage: localize('zh_TW') // 啟用 locale
})

export default {
  components: {
    VForm: Form,
    VField: Field,
    ErrorMessage: ErrorMessage
  },
  data () {
    return {
      user: {},
      message: ''
    }
  },
  methods: {
    sendOrder () {
      const user = this.user
      const message = this.message
      this.$http
        .post(
          `${process.env.VUE_APP_API}/v2/api/${process.env.VUE_APP_PATH}/order`,
          { data: { user }, message }
        )
        .then((res) => {
          this.$store.dispatch('getCart')
        })
        .catch((err) => {
          console.log(err)
        })
    },
    isPhone (value) {
      const phoneNumber = /^(09)[0-9]{8}$/
      return phoneNumber.test(value) ? true : '需要正確的電話號碼'
    }
  }
}
</script>
