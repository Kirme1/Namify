<template>
    <div>
      <div class="main">
        <button class="button-1" v-on:click="handleToggle(true)">Log In</button>
        <button class="button-2" v-on:click="handleToggle(false)">Sign Up</button>
        <div v-if="logIn">
          <logIn @handleLogin="handleLogin()" :v-bind="logIn" />
        </div>
        <div v-else>
          <CreateAccount />
        </div>
      </div>
    </div>
  </template>

<script>
import logIn from '../components/logIn.vue'
import CreateAccount from '../components/createAccount.vue'

export default {
  components: { logIn, CreateAccount },
  data() {
    return {
      logIn: true
    }
  },
  methods: {
    handleToggle(value) {
      this.logIn = value
    },
    handleLogin() {
      this.$emit('handleLogin', true)
    }
  }
}
</script>
