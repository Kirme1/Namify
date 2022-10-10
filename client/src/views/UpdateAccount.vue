<template>
    <div>
    <div id="updateAccount">
        <h1>Account</h1>
    </div>
    <div id="box1">
    <div id="input">
        <form id="editAccount" action="">
            <div class="tab">Account info:
  <p><input placeholder="Username" oninput="this.className = ''"></p>
  <p><input placeholder="Email address" oninput="this.className = ''"></p>
  <p><input placeholder="New password" oninput="this.className = ''"></p>
  <p><input placeholder="Update password" oninput="this.className = ''"></p>
  </div>
    <router-link to="/account" tag="button">Save</router-link>
    <router-link to="/account" tag="button">Exit</router-link>
    <button v-on:click="myFunction()">Delete account</button>
</form>
</div>
    </div>
    </div>
</template>
<script>

export default {
  data() {
    return {
      confirmDelete: false
    }
  },
  mounted() {
    this.myFunction()
  },
  methods: {
    myFunction() {
      this.confirmDelete = confirm('Are you sure you want to delete the account?')
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
