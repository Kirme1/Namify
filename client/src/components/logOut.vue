<template>
  <div>
  <p v-b-modal.modal-1>Log Out</p>

  <b-modal id="modal-1" title="Log Out"
  @ok="handleOk">
  Are you sure you want to log out?
  </b-modal>
</div>
</template>

<script>
export default {
  methods: {
    handleOk(bvModalEvent) {
      // Prevent modal from closing
      bvModalEvent.preventDefault()
      localStorage.removeItem('token')
      console.log(localStorage.getItem('token'))
      this.$emit('handleLogin', true)
      this.hasAccount = false
      this.$router.push('/')
      location.reload()
    }
  }
}
</script>
