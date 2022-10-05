<template>
    <div>
    <div id="updateAccount">
        <h1>Account</h1>
    </div>
    <div id="box">
    <div id="input">
        <form id="editAccount">
            <div class="tab">Account info:
  <h1>Name:</h1>
  <p><input v-model="account._id" ></p>
  <h1>Email:</h1>
  <p><input v-model="account.email"></p>
  <p><input placeholder="New password"></p>
  <p><input placeholder="Update password"></p>
  </div>
    <button v-on:click="myFunction()">Delete account</button>
</form>
</div>
    </div>
    <button v-on:click="updateAccount()">Save</button>
    </div>
</template>
<script>
import { Api } from '../Api'

export default {
  data() {
    return {
      confirmDelete: false,
      oldId: '',
      account: {
        _id: '',
        email: '',
        password: '',
        __v: 0
      }
    }
  },
  mounted() {
    this.getAccount()
  },
  methods: {
    myFunction() {
      this.confirmDelete = confirm('Are you sure you want to delete the account?')
    },
    getAccount() {
      Api.get('/accounts', { headers: { token: localStorage.getItem('token') } })
        .then(response => {
          this.account = response.data.user.account
          this.oldId = response.data.user.account._id
        })
    },
    updateAccount() {
      Api.put('/accounts/' + this.oldId, this.account)
        .then(response => {
          console.log(response.data)
          this.account = response.data
        })
        .catch(error => {
          console.log(error.message)
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

</style>
