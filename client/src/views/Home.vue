<template>
  <div>
    <b-jumbotron header="DIT342 Frontend" lead="Welcome to your DIT342 Frontend Vue.js App"></b-jumbotron>
    <b-container>
        <b-row>
          <b-col>
            <router-link to="name" tag="button">Names</router-link>
          </b-col>
          <b-col>
            <router-link to="account" tag="button">Account</router-link>
          </b-col>
        </b-row>
      </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
import { Api } from '@/Api'
// import nameItem from '@/components/nameItem.vue'

export default {
  name: 'names',
  data() {
    return {
      message: 'none'
    }
  },
  methods: {
    getMessage() {
      Api.get('/names')
        .then(response => {
          this.names = response
        })
        .catch(error => {
          this.message = error
        })
    }
  }
}
</script>

<style>
.btn_message {
  margin-bottom: 1em;
}
</style>
