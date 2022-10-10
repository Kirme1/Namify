<template>
  <div>
      <b-row>
        <b-col>
          <router-link to="name/likes" tag="button">Most Liked</router-link>
          <p>{{this.mostLiked[1]._id}}</p>
          <div
          v-for="name in mostLiked"
          v-bind:key="name._id">
            <h1> {{name._id}} </h1>
            <p> {{"Likes: " + name.likes}} </p>
        </div>
        </b-col>
        <b-col>
          <router-link to="name/dislikes" tag="button">Most Disliked</router-link>
          <div
          v-for="name in mostLiked"
          v-bind:key="name._id">
            <h1> {{name._id}} </h1>
            <p> {{"Likes: " + name.likes}} </p>
          </div>
        </b-col>
        <b-col>
          <router-link to="name/controversial" tag="button">Controversial</router-link>
          <div
          v-for="name in mostLiked"
          v-bind:key="name._id">
            <h1> {{name._id}} </h1>
            <p> {{"Likes: " + name.likes}} </p>
          </div>
        </b-col>
      </b-row>
  </div>
</template>

<script>
// @ is an alias to /src
import { Api } from '../Api'
// import nameItem from '@/components/nameItem.vue'

export default {
  data() {
    return {
      message: 'none',
      mostLiked: [{
        name: {
          comments: [],
          tags: [],
          _id: '',
          likes: 0,
          dislikes: 0,
          __v: 0
        }
      }],
      mostDisliked: [{
        nameAndLikes: [{ sortingLikes: 0 },
          {
            comments: [],
            tags: [],
            _id: '',
            likes: 0,
            dislikes: 0,
            __v: 0

          }]
      }],
      mostControversial: [{
        nameAndLikes: [{ sortingLikes: 0 },
          {
            name:
              {
                __v: 0,
                _id: '',
                comments: [],
                dislikes: 0,
                likes: 0,
                tags: []
              }
          }]
      }]
    }
  },
  mounted() {
    this.getNamesByLikes()
  },
  methods: {
    getNamesByLikes() {
      Api.get('/names/sortLikes')
        .then(response => {
          for (let i = 0; i < 5; i++) {
            this.mostLiked.splice(i, 0, response.data[i][1])
            console.log(this.mostLiked[i]._id)
          }
          console.log(response.data)
        })
        .catch(error => {
          this.message = error
        })
    },
    getNamesByDislikes() {
      Api.get('/names/sortDislikes')
        .then(response => {
          for (let i = 0; i < 5; i++) {
            this.mostDisliked[i].name = response.data[i]
          }
          console.log(this.mostDisliked)
        })
        .catch(error => {
          this.message = error
        })
    },
    getNamesByControversial() {
      Api.get('/names/sortControversial')
        .then(response => {
          for (let i = 0; i < 5; i++) {
            this.mostControversial[i] = response.data[i]
          }
          console.log(this.mostControversial)
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
