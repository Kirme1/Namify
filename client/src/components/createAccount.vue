<template>
    <div>
      <form @submit.prevent="handleSubmit">
        <div class="head">
          <h1>Create Account</h1>
        </div>

        <div class="form-group">
          <input
            type="text"
            class="form-control"
            v-model="id"
            placeholder="Name"
          />
        </div>
        <div class="form-group">
          <input
            type="email"
            class="form-control"
            v-model="email"
            placeholder="Email"
          />
        </div>
        <div class="form-group">
          <input
            type="password"
            class="form-control"
            v-model="password"
            placeholder="Password"
          />
        </div>

        <button class="btn btn-primary btn-block">Submit</button>
      </form>
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
    handleSubmit() {
      const newAccount = {
        name: this.id,
        email: this.email,
        password: this.password
      }
      Api.post('/accounts', newAccount).then(
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
  }
}
</script>
  <style scoped>
  .head h1 {
    margin-top: 50px;
  }
  </style>
