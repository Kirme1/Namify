<template>
    <div>
    <div id="account">
        <h1>Account</h1>
    </div>
    <div id="box">
    <div id="input">
        <form id="editAccount" action="">
            <div class="tab">Account info:
  <p>Username: </p>
  <p>Email: julia@lkasdjf</p>
  <p>adfsssad</p>
  </div>
    <router-link to="/account/update" tag="button">Edit account</router-link>
    </form>
    </div>
    </div>
    </div>
</template>
<script>

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
