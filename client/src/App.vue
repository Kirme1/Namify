<template>
  <div id="app">
    <div id="nav">
      <b-navbar toggleable="lg" type="dark" variant="info">
        <div id="logo">
          <router-link to="/">
            <b-navbar-brand href="/">Namify</b-navbar-brand>
          </router-link>
        </div>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item href="#">Shuffle</b-nav-item>
          </b-navbar-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-form>
              <b-form-input v-model="text" size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
              <router-link :to="{ path: `/name/${text}`, params: { id: text } }" tag="button">Search</router-link>
            </b-nav-form>
            <b-nav-item href="#">Account</b-nav-item>
            <AddName></AddName>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <!-- Render the content of the current page view -->
    <router-view/>
  </div>
</template>

<script>
import AddName from './components/addName.vue'
export default {
  data() {
    return {
      text: ''
    }
  },
  components: { AddName }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#logo {
  font-family: 'Audiowide';
  font-style: normal;
}
html {
    background-color: #272727;
}
</style>
