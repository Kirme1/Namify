<template>
    <div class="container-fluid">
      <b-row class="bruh">
        <b-col>
          <div class="box">
          <h2 class="text">Most Liked</h2>
          <div
          v-for="name in mostLiked"
          v-bind:key="name._id">
            <div @click="goName(name._id)" id="name-col" v-if="name._id !== ''" >
              <p class="text"> {{name._id}} </p>
              <!--<p> {{"Likes: " + name.likes}} </p>-->
            </div>
        </div>
        </div>
        </b-col>
        <b-col>
          <div class="box">
            <h2 class="text">Most Disliked</h2>
          <div
          v-for="name in mostDisliked"
          v-bind:key="name._id">
          <div @click="goName(name._id)" id="name-col" v-if="name._id !== ''">
            <p class="text"> {{name._id}} </p>
            <!--<p> {{"Likes: " + name.likes}} </p>-->
          </div>
          </div>
        </div>
        </b-col>
        <b-col>
          <div class="box">
            <h2 class="text">Most Controversial</h2>
          <div
          v-for="name in mostControversial"
          v-bind:key="name._id">
          <div @click="goName(name._id)" id="name-col" v-if="name._id !== ''">
            <p class="text"> {{name._id}} </p>
            <!--<p> {{"Likes: " + name.likes}} </p>-->
          </div>
        </div>
        </div>
        </b-col>
      </b-row>
    </div>
</template>

<script>
// @ is an alias to /src
import { Api } from '../Api'

export default {
  data() {
    return {
      message: 'none',
      mostLiked: [{
        comments: [],
        tags: [],
        _id: '',
        likes: 0,
        dislikes: 0,
        __v: 0
      }],
      mostDisliked: [{
        comments: [],
        tags: [],
        _id: '',
        likes: 0,
        dislikes: 0,
        __v: 0
      }],
      mostControversial: [{
        comments: [],
        tags: [],
        _id: '',
        likes: 0,
        dislikes: 0,
        __v: 0
      }]
    }
  },
  mounted() {
    this.getNamesByLikes()
    this.getNamesByDislikes()
    this.getNamesByControversial()
  },
  methods: {
    goName(name) {
      this.$router.push({ path: `/name/${name}`, params: { id: name } })
    },
    getNamesByLikes() {
      Api.get('/v1/names/sortLikes')
        .then(response => {
          for (let i = 0; i < 6; i++) {
            this.mostLiked.splice(i, 0, response.data[i][1])
          }
        })
        .catch(error => {
          this.message = error
        })
    },
    getNamesByDislikes() {
      Api.get('/v1/names/sortDislikes')
        .then(response => {
          for (let i = 0; i < 6; i++) {
            this.mostDisliked.splice(i, 0, response.data[i][1])
          }
        })
        .catch(error => {
          this.message = error
        })
    },
    getNamesByControversial() {
      Api.get('/v1/names/sortControversial')
        .then(response => {
          for (let i = 0; i < 6; i++) {
            this.mostControversial.splice(i, 0, response.data[i][1])
          }
        })
        .catch(error => {
          this.message = error
        })
    }
  }
}
</script>

<style>

#name-col {
    padding: 10px;
    display:inline-block;
    text-align: center;
    margin-top: 1rem;
    box-sizing: border-box;
    height: auto;
    width: 80%;
    top: 110px;
    background: linear-gradient(0deg, rgba(115, 116, 118, 0.2), rgba(117, 118, 119, 0.2)), #3c3c3c;
    border: 2px solid #74E3FC;
    border-radius: 25px;
    cursor: pointer;
}
#name-col:hover {
    background-color: #74E3FC;
}

.box {
    display:inline-block;
    text-align: center;
    margin-top: 2rem;
    padding-bottom: 2rem;
    padding-top: 1rem;
    box-sizing: border-box;
    height: auto;
    width: 80%;
    top: 110px;
    background: linear-gradient(0deg, rgba(92, 93, 94, 0.2), rgba(92, 93, 94, 0.2)), #272727;
}
.bruh {
    background-color: #272727;
}
.text {
    display: inline;
    color: #ffffff;
    font-size: 25px;
    vertical-align: middle;
}
@media(max-width:768px){
  .box{
    margin:auto;
    width: 300px;
    margin-top: 80px;
    box-sizing: border-box;
  }
}

</style>
