<template>
  <div>
      <b-row>
        <b-col>
          <router-link to="name/likes" tag="button">Most Liked</router-link>
          <div
          v-for="name in mostLiked"
          v-bind:key="name[1]._id">
            <h1> {{name[1]._id}} </h1>
            <p> {{"Likes: " + name[1].likes}} </p>
          </div>
        </b-col>
        <b-col>
          <router-link to="name/dislikes" tag="button">Most Disliked</router-link>
          <div
          v-for="name in mostDisliked"
          v-bind:key="name[1]._id">
            <h1> {{name[1]._id}} </h1>
            <p> {{"Dislikes: " + name[1].dislikes}} </p>
          </div>
        </b-col>
        <b-col>
          <router-link to="name/controversial" tag="button">Controversial</router-link>
          <div
          v-for="name in mostDisliked"
          v-bind:key="name[1]._id">
            <h1> {{name[1]._id}} </h1>
            <p> {{"Likes: " + name[1].likes}} </p>
            <p> {{"Dislikes: " + name[1].dislikes}} </p>
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
      mostLiked: {
        nameAndLikes: [{ sortingLikes: 0 },
          {
            name:
              {
                comments: [],
                tags: [],
                _id: '',
                likes: 0,
                dislikes: 0,
                __v: 0
              }
          }]
      },
      mostDisliked: {
        nameAndLikes: [{ sortingLikes: 0 },
          {
            name:
              {
                comments: [],
                tags: [],
                _id: '',
                likes: 0,
                dislikes: 0,
                __v: 0
              }
          }]
      },
      mostControversial: {
        nameAndLikes: [{ sortingLikes: 0 },
          {
            name:
              {
                comments: [],
                tags: [],
                _id: '',
                likes: 0,
                dislikes: 0,
                __v: 0
              }
          }]
      }
    }
  },
  mounted() {
    this.getNamesByLikes()
    this.getNamesByDislikes()
    this.getNamesByControversial()
  },
  methods: {
    getNamesByLikes() {
      Api.get('/names/sortLikes')
        .then(response => {
          for (let i = 0; i < 5; i++) {
            this.mostLiked[i] = response.data[i]
          }
          console.log(this.mostLiked)
        })
        .catch(error => {
          this.message = error
        })
    },
    getNamesByDislikes() {
      Api.get('/names/sortDislikes')
        .then(response => {
          for (let i = 0; i < 5; i++) {
            this.mostDisliked[i] = response.data[i]
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
