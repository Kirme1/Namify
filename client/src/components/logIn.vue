<template>
  <div class="log_in">
  <div class="log-in-box">
    <form @submit.prevent="handleSubmit">
      <h1>Log In</h1>
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
    <p>Don't have an account? <button @click="signUp()">Sign Up</button></p>
  </div>
  </div>
</template>
<script>
import { Api } from '@/Api'
export default {
  name: 'logIn',
  data() {
    return {
      email: '',
      password: '',
      error: ''
    }
  },
  methods: {
    signUp() {
      this.$emit('signUp')
    },
    handleSubmit() {
      const user = {
        email: this.email,
        password: this.password
      }
      Api.post('/v1/accounts/login', user).then(
        (res) => {
          // if successfull
          if (res.status === 200) {
            localStorage.setItem('token', res.data.token)
            this.$emit('handleLogin', true)
            this.$router.push('/')
            location.reload()
          }
        },
        (err) => {
          console.log(err.response)
          this.error = err.response.data.error
          this.boxOne = ''
          this.$bvModal.msgBoxOk('Invalid Credentials')
        }
      )
    }
  }
}
</script>
  <style>
  .head h1 {
    color: white;
    margin-top: 50px;
  }
  .login {
    color: white;
    margin: 10px;
  }
  .label {
    color: white;
  }
  .text_box {
    margin-left: 10%;
    margin-right: 10%;
    margin-top: 20px;
    margin-bottom: 15px;
  }
  .log_in {
    background-color: #272727;
  }
  .log-in-box {
    border: 2px solid #74E3FC;
    text-align: center;
    padding-bottom: 1rem;
    padding-top: 1rem;
    height: auto;
    margin-top: 8%;
    margin-left: 25%;
    margin-right: 25%;
    background: linear-gradient(0deg, rgba(92, 93, 94, 0.2), rgba(92, 93, 94, 0.2)), #272727;
  }
  .submit-button {
    margin-bottom: 2rem;
  }
  @media(max-width:768px) {
    .log-in-box {
      margin-top: 18%;
    margin-left: 5%;
    margin-right: 5%;
    }
  }
  </style>
