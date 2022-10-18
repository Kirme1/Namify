<template>
    <div>
      <input v-model="searchQuery">
      <router-link :to="{ name: 'name', params: { id: searchQuery } }">
      <!--<div v-for="name of resultQuery" :key="name._id">{{name._id}}</div> -->
    </router-link>
  </div>
</template>
<script>
import { Api } from '@/Api'
export default {
  data() {
    return {
      searchQuery: null,
      names: {
        names: {}
      },
      value: null
    }
  },
  computed: {
    resultQuery() {
      if (this.searchQuery) {
        return this.names.names.filter(item => {
          return this.searchQuery
            .toLowerCase()
            .split(' ')
            .every(v => item.toLowerCase().includes(v))
        })
      } else {
        return this.names.names
      }
    }
  },
  mounted() {
    console.log('Page is loaded!')
    Api.get('/v1/names')
      .then((response) => {
        console.log(response)
        this.names = response.data
      })
      .catch((error) => {
        this.names = []
        console.log(error)
      })
  }
}
</script>
<style>
.names h2 {
  background: #f4f4f4;
  padding: 20px;
  border-radius: 10px;
  margin: 10px 0;
  max-width: 600px;
  cursor: pointer;
  color: #444;
 }
.names h2:hover {
  background: #ddd;
 }
.names a {
  text-decoration: none;
 }
.names {
  max-width: 75vh;
  font-size: 1.5em;
  text-align: center;
}
.card-names {
  box-shadow: 0 1px 1px 0 rgba(255, 255, 255, 0.178);
  padding: 4%;
  border: 2px solid rgb(140, 231, 245);
  color: black;
  margin: 20px;
  background-color: rgba(1, 1, 1, 0.15);
}
.card-body-list {
  color: white;
  margin-left: 20%;
  text-align: left;
}
</style>
