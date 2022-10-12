<template>
    <div>
    <div id="updateAccount">
        <h1>Account</h1>
    </div>
    <div id="box1">
    <div id="input">
        <form id="editAccount" name="account">
            <div class="tab">Account info:
  <h1>Name:</h1>
  <p><input name="name" v-model="account.name" ></p>
  <h1>Email:</h1>
  <p><input name="email" v-model="account.email"></p>
  <h1>Password:</h1>
  <p><input type="password" v-model="oldPassword" placeholder="old password"></p>
  <p><input name="password" type="password" v-model="newPassword" placeholder="new password"></p>
  </div>
</form>
</div>
    </div>
    <button v-on:click="updateAccount()">Save</button>
    <button v-on:click="deleteAccount()">Delete account</button>
    </div>
</template>
<script>
import { Api } from '@/Api'

export default {
  data() {
    return {
      confirmDelete: false,
      oldEmail: '',
      account: {
        _id: '',
        name: '',
        email: '',
        password: '',
        __v: 0,
        likedNames: [],
        likedComments: []
      },
      oldPassword: '',
      newPassword: ''
    }
  },
  mounted() {
    this.getAccount()
  },
  methods: {
    deleteAccount() {
      this.confirmDelete = confirm('Are you sure you want to delete the account?')
      if (this.confirmDelete) {
        console.log('hello')
        Api.delete('/accounts/' + this.account._id)
          .then(response => {
            this.$bvModal.msgBoxOk(response.data.message)
            if (response.status === 200) {
              localStorage.removeItem('token')
              location.reload()
              this.$router.push('/')
            }
          })
          .catch(err => {
            console.log(err.response)
            this.$bvModal.msgBoxOk('Invalid Credentials')
          })
      }
    },
    getAccount() {
      Api.get('/accounts', { headers: { token: localStorage.getItem('token') } })
        .then(response => {
          this.account = response.data.user.account
          this.oldEmail = response.data.user.account.email
        })
    },
    updateAccount() {
      let checkPassword = false
      if (this.newPassword !== '') {
        this.account.password = this.newPassword
        checkPassword = true
      }
      if (checkPassword) {
        Api.get('/accounts/verify', {
          headers: {
            password: this.oldPassword,
            email: this.oldEmail
          }
        })
          .then(response => {
            if (response.data.valid) {
              if (this.validateForm()) {
                Api.put('/accounts/' + this.oldEmail, this.account)
                  .then(response => {
                    this.account = response.data
                  })
                  .catch(error => {
                    console.log(error.message)
                  })
              }
            } else {
              console.log(response.data.error)
              alert('Name, Email  cannot be empty')
            }
          })
      } else {
        if (this.validateForm()) {
          Api.put('/accounts/' + this.oldEmail, this.account)
            .then(response => {
              this.account = response.data
            })
            .catch(error => {
              console.log(error.message)
            })
        }
      }
    },
    validateForm() {
      const name = document.forms.account.name.value
      const email = document.forms.account.email.value
      if (name === '' || email === '') {
        alert('Name, Email  cannot be empty')
        return false
      }
      return true
    }
  }
}
</script>
<style>
#box1 {
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
