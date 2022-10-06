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
            <b-nav-item href="#"><img src="../public/shuffle.png"/></b-nav-item>
          </b-navbar-nav>
        </div>
          <b-navbar-nav class="ml-auto">
            <div class="wrap">
   <div class="search">
      <input type="text" class="searchTerm" placeholder="Search for a name">
      <button type="submit" class="searchButton">
        <i class="fa fa-search"></i>
        <img style="width: 30px" src="../public/search.png"/>
     </button>
   </div>
</div>
            <b-dropdown id="dropdown" text="Profile" class="m-md-2">
            <b-dropdown-item href="login">Account</b-dropdown-item>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item>Logout</b-dropdown-item>
            </b-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <!-- Render the content of the current page view -->
    <router-view/>
  </div>
</template>

<style>
  @import url(https://fonts.googleapis.com/css?family=Open+Sans);
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #6ed42f;
  background: linear-gradient(0deg, rgba(92, 93, 94, 0.2), rgba(92, 93, 94, 0.2)), #272727;
}

.logo {
  width: 10px;
  margin-left: 0px;
}
#nav {
  box-sizing: border-box;
  position: relative;
  background: linear-gradient(0deg, rgba(92, 93, 94, 0.2), rgba(92, 93, 94, 0.2)), #272727;
  border: 1px solid #74E3FC;
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
float: min-width;
margin-left: 900px;
width: 50px;
height: 50px;
}
</style>
