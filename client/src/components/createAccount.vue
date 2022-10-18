<template>
    <div>
      <div class="log-in-box">
      <form @submit.prevent="handleSubmit">
          <h1>Sign Up</h1>
        <div class="text_box">
          <input
            type="text"
            class="form-control"
            v-model="id"
            placeholder="Name"
          />
        </div>
        <div class="text_box">
          <input
            type="email"
            class="form-control"
            v-model="email"
            placeholder="Email"
          />
        </div>
        <div class="text_box">
          <input
            type="password"
            class="form-control"
            v-model="password"
            placeholder="Password"
          />
        </div>
        <button class="submit-button">Submit</button>
      </form>
      <p>Already have an account? <button @click="logIn()">Log In</button></p>
    </div>
    </div>
  </template>

<script>
import { Api } from '@/Api'
export default {
  name: 'createAccount',
  data() {
    return {
      id: '',
      email: '',
      password: '',
      error: ''
    }
  },
  methods: {
    logIn() {
      this.$emit('logIn')
    },
    handleSubmit() {
      const newAccount = {
        name: this.id,
        email: this.email,
        password: this.password,
        likedNames: [],
        likedComments: []
      }
      if (this.validateForm()) {
        console.log('hello')
        Api.post('/v1/accounts', newAccount).then(
          (res) => {
            console.log(res)
            this.$bvModal.msgBoxOk('SignUp Successful', this.$router.go(0))
          },
          (err) => {
            console.log(err)
            this.boxOne = ''
            this.error = err.response.data.error
            this.$bvModal.msgBoxOk(this.error)
          }
        )
      }
    },
    validateForm() {
      const name = this.name
      const password = this.password
      if (name === '' || password === '') {
        alert('Name and password cannot be empty')
        return false
      }
      return true
    }
  }
}
</script>
  <style scoped>
  .head h1 {
    margin-top: 50px;
  }
  </style>
