<template>
    <div id="logIn-signUp">
        <div v-if="logIn">
          <logIn @handleLogin="handleLogin()" :v-bind="logIn" @signUp="logIn = false"/>
        </div>
        <div v-else>
          <CreateAccount @logIn="logIn = true"/>
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

<style>

</style>
