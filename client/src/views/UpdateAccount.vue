<template>
    <div>
    <div class="account-box">
      <h1>Edit Account</h1>
    <div>
      <div class="divider">
      <button class="account-button" @click="editName = true">Change Name</button>
      <input v-if="editName === true" name="name" v-model="account.name" :placeholder="oldName">
    </div>
    <div class="divider">
      <button class="account-button" @click="editEmail = true">Change Email</button>
      <input v-if="editEmail === true" name="email" v-model="account.email" :placeholder="oldEmail">
    </div>
    <div class="divider">
      <button class="account-button" @click="editPassword = true">Change Password</button>
        <input v-if="editPassword === true" type="password" v-model="oldPassword" placeholder="old password">
        <input v-if="editPassword === true && oldPassword !== ''" name="password" type="password" v-model="newPassword" placeholder="new password">
      </div>
</div>
    <button class="save-account" v-if="(oldPassword !== newPassword && editPassword === true) || (editName === true && account.name !== 'oldName') || (editEmail === true && account.email !== oldEmail)" v-on:click="updateAccount()">Save</button>
    <button class="delete-account" v-on:click="deleteAccount()">Delete Account</button>
    <div style="clear: both;"></div>
    </div>
    </div>
</template>
<script>
import { Api } from '@/Api'

export default {
  data() {
    return {
      editName: false,
      editEmail: false,
      editPassword: false,
      confirmDelete: false,
      oldEmail: '',
      oldName: '',
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
        Api.delete('/v1/accounts/' + this.oldEmail)
          .then(response => {
            if (response.status === 200) {
              localStorage.removeItem('token')
              this.$router.push('/')
              location.reload()
            }
          })
          .catch(err => {
            console.log(err.response)
          })
      }
    },
    getAccount() {
      Api.get('/v1/accounts', { headers: { token: localStorage.getItem('token') } })
        .then(response => {
          this.account = response.data.user.account
          this.oldEmail = response.data.user.account.email
          this.oldName = response.data.user.account.name
          this.account.name = ''
          this.account.email = ''
        })
    },
    updateAccount() {
      if (this.account.name === '') {
        this.account.name = this.oldName
      }
      if (this.account.email === '') {
        this.account.email = this.oldEmail
      }
      let checkPassword = false
      if (this.newPassword !== '') {
        this.account.password = this.newPassword
        checkPassword = true
      }
      if (checkPassword) {
        Api.get('/v1/accounts/verify', {
          headers: {
            password: this.oldPassword,
            email: this.oldEmail
          }
        })
          .then(response => {
            if (response.data.valid) {
              Api.put('/v1/accounts/' + this.oldEmail, this.account)
                .then(response => {
                  this.account = response.data
                  this.$router.push('/account')
                })
                .catch(error => {
                  console.log(error.message)
                })
            }
          })
          .catch(err => {
            console.log(err.response)
            this.boxOne = ''
            this.$bvModal.msgBoxOk('Incorect Password')
          })
      } else {
        Api.put('/v1/accounts/' + this.oldEmail, this.account)
          .then(response => {
            this.account = response.data
            this.$router.push('/account')
          })
          .catch(error => {
            console.log(error.message)
          })
      }
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
.divider {
    margin-top: 1rem;
    margin-bottom: 1rem;
    text-align: left;
    margin-left: 2rem;
    margin-right: 1rem;
}
.account-button {
    width: 25%
}
.save-account {
    float: left;
    margin-left: 2rem;
}
.delete-account {
    float: right;
    margin-right: 2rem;
}
</style>
