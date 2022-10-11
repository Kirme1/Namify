<template>
    <div>
    <div id="account">
        <h1>Account</h1>
    </div>
    <div id="box">
    <div id="input">
        <form id="editAccount" action="">
            <div class="tab">Account info:
  <p>Username: {{this.account.name}} </p>
  <p>Email: {{this.account.email}}</p>
  </div>
    <router-link to="/accounts/update" tag="button">Edit account</router-link>
    </form>
    </div>
    </div>
    </div>
</template>
<script>
import { Api } from '../Api'

export default {
  data() {
    return {
      message: '',
      account: {
        name: '',
        _id: '',
        email: '',
        password: '',
        __v: 0
      }
    }
  },
  created() {
    if (localStorage.getItem('token') === null) {
      this.$router.push('/Login')
    }
  },
  mounted() {
    this.getAccount()
  },
  methods: {
    getAccount() {
      Api.get('/accounts', { headers: { token: localStorage.getItem('token') } })
        .then(response => {
          this.account = response.data.user.account
        })
    }
  }

}

</script>
<style>
#box {
    box-sizing: border-box;
    position: absolute;
    height: 463px;
    top: 180px;
    right: 227px;
    bottom: 200px;
    left: 227px;
    background: linear-gradient(0deg, rgba(14, 109, 204, 0.2), rgba(92, 93, 94, 0.2)), #272727;
    border: 1px solid #74E3FC;
}
#input {
    color: white;
}
#account {
    background-color: #272727;
    color: #74E3FC;
}
html {
    background-color: #272727;
}

</style>
