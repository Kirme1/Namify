<template>
  <div id="app">
    <div id="nav">
      <b-navbar >
        <a class="navbar-brand" href="#">
      </a>
        <div class="logo">
          <router-link to="/">
            <img style="width: 130px" src="../public/Namify.png"/>
          </router-link>
        </div>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <div class="shuffle">
          <b-navbar-nav>
            <div @mouseover="Shuffle()"><a :href="$router.resolve({ path: `/name/${shuffleText}`, params: { id: shuffleText } }).href"><img src="../public/shuffle.png"/></a></div>
          </b-navbar-nav>
        </div>
          <b-navbar-nav class="ml-auto">
            <div class="wrap">
   <div class="search">
      <input v-model="text" type="text" class="searchTerm" placeholder="Search for a name">
      <button @click="search()" type="submit" class="searchButton">
        <i class="fa-search"></i>
        <a :href="$router.resolve({ path: `/name/${text}`, params: { id: text } }).href"><img class="image" src="../public/search.png"/></a>
     </button>
   </div>
</div>
            <b-nav-item style="height: 20px"><AddName class="addName" v-if="hasAccount"></AddName></b-nav-item>
            <b-dropdown id="dropdown" text="Profile" class="m-md-2">
            <b-dropdown-item v-if="hasAccount === false" href="/login">Log In</b-dropdown-item>
            <b-dropdown-item v-if="hasAccount === true" href="/account">Account</b-dropdown-item>
            <b-dropdown-divider v-if="hasAccount === true"></b-dropdown-divider>
            <b-dropdown-item v-if="hasAccount === true"><LogOut class="logOut"></LogOut></b-dropdown-item>
            </b-dropdown>
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
import { Api } from './Api'
import LogOut from './components/logOut.vue'

export default {
  data() {
    return {
      text: '',
      shuffleText: '',
      hasAccount: false
    }
  },
  components: { AddName, LogOut },
  mounted() {
    this.checkLogedIn()
    window.addEventListener('load', this.checkLogedIn)
  },
  methods: {
    Shuffle() {
      Api.get('v1/names/shuffle')
        .then((response) => {
          console.log(response.data)
          this.shuffleText = response.data.name._id
        })
        .catch((error) => {
          console.log(error)
        })
    },
    onWindowLoad() {
      this.checkLogedIn()
    },
    checkLogedIn() {
      if (localStorage.getItem('token') === null) {
        this.hasAccount = false
      } else {
        this.hasAccount = true
      }
    }
  }
}
</script>

<style>
  @import url(https://fonts.googleapis.com/css?family=Open+Sans);
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #74E3FC;
  background: #272727;
}

.logo {
  width: 150px;
  margin-left: 0px;
}
#nav {
  box-sizing: border-box;
  position: relative;
  background: linear-gradient(0deg, rgba(92, 93, 94, 0.2), rgba(92, 93, 94, 0.2)), #272727;
  border-bottom: 1px solid #74E3FC;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

body{
  background: #f2f2f2;
  font-family: 'Open Sans', sans-serif;
}

.search {
  width: 100%;
  position: relative;
  display: flex;
}

.searchTerm {
  width: 100%;
  border: 1px solid #00B4CC;
  border-right: none;
  padding: 20px;
  height: 20px;
  border-radius: 10px 0px 0px 10px;
  outline: none;
  color: #9DBFAF;
}
.image{
  width: 30px;
}
.addName {
  position: relative;

}
.searchTerm:focus{
  color: #00B4CC;
}

.searchButton {
  width: 40px;
  height: 42px;
  border: 1px solid #00B4CC;
  background: #00B4CC;
  text-align: center;
  color: #fff;
  border-radius: 0px 10px 10px 0px;
  cursor: pointer;
  font-size: 20px;
}

.wrap{
  width: 30%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.shuffle img {
  margin-top: -25px;
  margin-left: -100px;
position: absolute;
width: 50px;
height: 50px;
}
.shuffle {
    margin-left: 20%;
}
html {
    background-color: #272727;
}
.button {
  -webkit-appearance: button;
  -moz-appearance: button;
  appearance: button;
  text-decoration: none;
  color: #ffffff;
}
@media(max-width:768px){
  #nav {
    width: 100%;
    height: 80px;
    border: 1px solid #74E3FC;
  }
  .search{
    width: 250x;
    height: 30px;
    margin-left: -100px;
  }
  .searchTerm{
  padding: 5px;
  width: 250px;
  padding-left:5px;
  height: 35px;
  margin-top: 70px;
  }
  .searchButton{
  width: 20px;
  height: 35px;
  font-size: 10px;
  margin-top:70px;
  }
  .image{
    width: 20px;
    margin-left: -5px;
  }
  .shuffle img {
margin-top: -19px;
margin-left: 38px;
position: absolute;
width: 37px;
height: 37px;
}
.addName{
  width: 50px;
  height: 5px;
  padding: 0px;
  margin-top: 65px;
  margin-bottom: 30px;
  font-size: 5px;
  text-align: center;
}
.m-md-2{
  margin-left: -80px;
  font-size: small;
}
.logo{
  margin-left: -38px;
}
}
</style>
