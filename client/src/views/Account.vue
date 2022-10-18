<template>
    <div class="account-box">
      <h1>Account</h1>
    <div id="details">
      <b-row>
        <b-col class="info">
          <p>Username:</p>
        </b-col>
        <b-col class="info2">
          {{this.account.name}}
        </b-col>
      </b-row>
      <b-row>
        <b-col class="info">Email:</b-col>
        <b-col class="info2">{{this.account.email}}</b-col>
      </b-row>
    </div>
    <router-link class="editName" to="/accounts/update" custom v-slot="{ navigate }">
      <span @click="navigate" @keypress.enter="navigate" role="link">Edit Account</span></router-link>
    </div>
</template>
<script>
import { Api } from '../Api'

export default {
  data() {
    return {
      message: '',
      celebrate: false,
      account: {
        name: '',
        _id: '',
        email: '',
        password: '',
        likedNames: [],
        likedComments: [],
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
    if (this.$route.params.id === 'nice') {
      this.celebrate = true
      this.$route.push({ params: { id: '' } })
    }
  },
  methods: {
    getAccount() {
      Api.get('/v1/accounts', { headers: { token: localStorage.getItem('token') } })
        .then(response => {
          this.account = response.data.user.account
        })
    }
  }

}

</script>
<style>
#box2 {
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
#details {
    margin-top: 1rem;
    margin-bottom: 2rem;
    color: white;
    text-align: left;
    font-style: normal;
    font-size: 24px;
    line-height: 25px;
}
html {
    background-color: #272727;
}
.info {
    text-align: right;
}
.account-box {
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
.editName {
  cursor: pointer;
}
@media(max-width:768px) {
    .account-box {
      margin-top: 18%;
    margin-left: 5%;
    margin-right: 5%;
    }

    .info {
      font-size: 15px;
    }
    .info2 {
      font-size: 15px;
    }
  }

</style>
