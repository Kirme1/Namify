<template>
  <div>
      <div id="box">
        <b-row>
          <b-col>
            <div id="name">
                <h1>{{this.name._id}}</h1>
            </div>
          </b-col>
          <b-col>
            <span id="tags" v-for="tag in name.tags" :key="tag">
              <span style="color: #FFFFFF" v-if="tag !== ''">
                #<router-link id="whiteLink" :to="{ path: `/tag/${tag}`, params: { id: tag } }">{{tag}}</router-link><button class="delete-tag" v-on:click="deleteTag(tag)">X </button>
              </span>
            </span>
            <span>
              <button class="tags-box" v-if="name.tags.length < 4 && addTagClicked === false" v-on:click="addTagClicked = true">#tags</button>
            </span>
            <span v-if="addTagClicked === true">
              <input class="tags-input" type="text" v-model="newTag" id="tagInput" size="5" style="color:#FFFFFF;" placeholder="Add a #tag">
              <button class="add-tag" v-on:click="addTag()">Add</button>
            </span>
          </b-col>
          <b-col style="text-align: right;">
            <div id="likes">
              <p4>
                <button class="thumbs-up" v-on:click="updateLikes()"><img style="width: 48%" src="/up.png"/> {{this.name.likes}}</button>
              </p4>
              <p4>
                <button class="thumbs-down" v-on:click="updateDislikes()">{{this.name.dislikes}} <img style="width: 48%" src="/down.png"/></button>
              </p4>
            </div>
          </b-col>
        </b-row>
            <div id="top_comment">
                <p1>
                    {{this.topComment.text}}
                </p1>
            </div>
            <div v-if="hasAccount" id="addComment">
              <form inline>
                <input type="text" v-model="newComment" class="comment-input" style="color:#FFFFFF;" placeholder=" Write a comment...">
                <button v-on:click="addComment()" class="comment-button">Post</button>
              </form>
            </div>
            <div id="comment-box" v-for="comment in name.comments" :key="comment._id">
              <div id="comments">
                <div id="comment-name">@{{comment.name}}</div>
                {{comment.text}}
              </div>
              <b-row style="margin-top: 8px">
                  <button class="thumbs-up-comment" v-on:click="updateCommentLikes(comment)"> <img style="width: 48%" src="/up.png"/> {{comment.likes}}</button>
                  <button class="thumbs-down-comment" v-on:click="updateCommentDislikes(comment)"> {{comment.dislikes}} <img style="width: 48%" src="/down.png"/></button>
                <b-col style="text-align: right;">
                  <button class="delete-button" v-if="comment.name === accountName" v-on:click="deleteComment(comment)">Delete</button>
                </b-col>
              </b-row>
            </div>
            </div>
  </div>
</template>

<script>
import { Api } from '@/Api'

export default {
  data() {
    return {
      message: 'none',
      tagMessage: 'Add a #tag',
      addTagClicked: false,
      newTag: '',
      hasAccount: false,
      accountName: '',
      accountEmail: '',
      likedNames: [{
        name: '',
        liked: false,
        disliked: false
      }],
      likedComments: [{
        comment: '',
        liked: false,
        disliked: false
      }],
      name: {
        comments: [{
          _id: '',
          text: '',
          likes: 0,
          dislikes: 0,
          name: '',
          __v: 0
        }],
        tags: [],
        _id: '',
        likes: 0,
        dislikes: 0,
        __v: 0
      },
      topComment: {
        _id: '',
        text: '',
        likes: 0,
        dislikes: 0,
        name: '',
        __v: 0
      },
      newComment: ''
    }
  },
  mounted() {
    this.getName()
    if (localStorage.getItem('token') === null) {
      this.hasAccount = false
    } else {
      this.hasAccount = true
      this.getAccount()
    }
  },
  methods: {
    getName() {
      Api.get('/names/' + this.$route.params.id)
        .then(response => {
          this.name = response.data
          if (this.name.comments.length > 0) {
            this.topComment = this.name.comments[0]
            for (let i = 0; i < this.name.comments.length; i++) {
              if (this.topComment.likes < this.name.comments[i].likes) {
                this.topComment = this.name.comments[i]
              }
            }
          } else {
            this.topComment.text = 'This name is so unpopular that it does not have any comments yet.'
          }
        })
        .catch(error => {
          this.message = error
          this.$router.push('/404')
        })
    },
    updateLikes() {
      let hasName = false
      const upName = {
        likes: this.name.likes,
        dislikes: this.name.dislikes
      }
      const likedName = {
        name: this.name._id,
        liked: true,
        disliked: false
      }
      for (let i = 0; i < this.likedNames.length; i++) {
        if (this.likedNames[i].name === this.name._id) {
          hasName = true
          if (!this.likedNames[i].liked) {
            this.name.likes += 1
            upName.likes += 1
          } else {
            this.name.likes -= 1
            upName.likes -= 1
          }
          this.likedNames[i].liked = !this.likedNames[i].liked
          likedName.liked = this.likedNames[i].liked
        }
      }
      if (!hasName) {
        this.likedNames.push(likedName)
        this.name.likes += 1
      }
      Api.patch('/names/' + this.$route.params.id, upName)
        .catch(error => {
          console.log(error)
        })
      Api.patch('/accounts/' + this.accountEmail + '/likedNames', likedName)
        .catch(error => {
          console.log(error)
        })
    },
    updateDislikes() {
      let hasName = false
      const downName = {
        likes: this.name.likes,
        dislikes: this.name.dislikes
      }
      const dislikedName = {
        name: this.name._id,
        liked: false,
        disliked: true
      }
      for (let i = 0; i < this.likedNames.length; i++) {
        if (this.likedNames[i].name === this.name._id) {
          hasName = true
          if (!this.likedNames[i].disliked) {
            this.name.dislikes += 1
            downName.dislikes += 1
          } else {
            this.name.dislikes -= 1
            downName.dislikes -= 1
          }
          this.likedNames[i].disliked = !this.likedNames[i].disliked
          dislikedName.disliked = this.likedNames[i].disliked
        }
      }
      if (!hasName) {
        this.likedNames.push(dislikedName)
        this.name.dislikes += 1
      }
      Api.patch('/names/' + this.$route.params.id, downName)
        .catch(error => {
          console.log(error)
        })
      Api.patch('/accounts/' + this.accountEmail + '/likedNames', dislikedName)
        .catch(error => {
          console.log(error)
        })
    },
    updateCommentLikes(comment) {
      let hasComment = false
      const upComment = {
        likes: comment.likes,
        dislikes: comment.dislikes
      }
      const likedComment = {
        comment: comment._id,
        liked: true,
        disliked: false
      }
      for (let i = 0; i < this.likedComments.length; i++) {
        if (this.likedComments[i].comment === comment._id) {
          hasComment = true
          if (!this.likedComments[i].liked) {
            comment.likes += 1
            upComment.likes += 1
          } else {
            comment.likes -= 1
            upComment.likes -= 1
          }
          this.likedComments[i].liked = !this.likedComments[i].liked
          likedComment.liked = this.likedComments[i].liked
        }
      }
      if (!hasComment) {
        this.likedComments.push(likedComment)
        comment.likes += 1
      }
      Api.patch('/names/' + this.$route.params.id + '/comments/' + comment._id, upComment)
        .catch(error => {
          console.log(error)
        })
      Api.patch('/accounts/' + this.accountEmail + '/likedComments', likedComment)
        .catch(error => {
          console.log(error)
        })
    },
    updateCommentDislikes(comment) {
      let hasComment = false
      const downComment = {
        likes: comment.likes,
        dislikes: comment.dislikes
      }
      const dislikedComment = {
        comment: comment._id,
        liked: false,
        disliked: true
      }
      for (let i = 0; i < this.likedComments.length; i++) {
        if (this.likedComments[i].comment === comment._id) {
          hasComment = true
          if (!this.likedComments[i].disliked) {
            comment.dislikes += 1
            downComment.dislikes += 1
          } else {
            comment.dislikes -= 1
            downComment.dislikes -= 1
          }
          this.likedComments[i].disliked = !this.likedComments[i].disliked
          dislikedComment.disliked = this.likedComments[i].disliked
        }
      }
      if (!hasComment) {
        this.likedComments.push(dislikedComment)
        comment.dislikes += 1
      }
      Api.patch('/names/' + this.$route.params.id + '/comments/' + comment._id, downComment)
        .catch(error => {
          console.log(error)
        })
      Api.patch('/accounts/' + this.accountEmail + '/likedComments', dislikedComment)
        .catch(error => {
          console.log(error)
        })
    },
    getAccount() {
      Api.get('/accounts', { headers: { token: localStorage.getItem('token') } })
        .then(response => {
          this.accountName = response.data.user.account.name
          this.accountEmail = response.data.user.account.email
          this.likedNames = response.data.user.account.likedNames
          this.likedComments = response.data.user.account.likedComments
        })
    },
    addComment() {
      const newComment = {
        _id: this.name._id + String(this.name.comments.length) + String(this.newComment.length + Math.floor(Math.random() * this.name.comments.length)),
        text: this.newComment,
        likes: 0,
        dislikes: 0,
        name: this.accountName
      }
      this.name.comments.push(newComment)
      Api.post('/names/' + this.name._id + '/comments', newComment)
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        })
    },
    addTag() {
      let duplicate = false
      const addTag = this.newTag
      const postTag = {
        _id: this.newTag
      }
      if (addTag === '') {
        duplicate = true
      }
      for (let i = 0; i <= this.name.tags.length; i++) {
        if (addTag === this.name.tags[i]) {
          this.tagMessage = 'Tag exists'
          duplicate = true
        }
      }
      this.newTag = ''
      if (duplicate === false) {
        this.addTagClicked = false
        this.tagMessage = 'Add a tag'
        Api.post('/tags', postTag)
          .then(response => {
            console.log(response)
          })
          .catch(error => {
            console.log(error)
          })
        Api.patch('/names/' + this.name._id + '/tags/' + addTag)
          .then(response => {
            this.name.tags.push(addTag)
            console.log(response)
          })
          .catch(error => {
            console.log(error)
          })
      }
    },
    deleteComment(comment) {
      Api.delete('/names/' + this.name._id + '/comments/' + comment._id)
      const index = this.name.comments.indexOf(comment._id)
      this.name.comments.splice(index, 1)
    },
    deleteTag(tag) {
      console.log(tag)
      Api.delete('/names/' + this.name._id + '/tags/' + tag)
        .then(response => {
          const index = this.name.tags.indexOf(tag)
          this.name.tags.splice(index, 1)
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style>
  .tags-box{
  height: 60%;
  width: 20%;
  color:#ffffff;
  background: #737374;
  border: 1.5px solid #74E3FC;
  border-radius: 10px 10px 10px 10px;
}
.delete-tag{
  text-align:center;
  width: 6%;
  height: 45%;
  background: #7f7f7f;
  color: #ffffff;
}
.add-tag{
  height: 60%;
  width: 15%;
  color:#ffffff;
  background: #737374;
  border: 1.5px solid #74E3FC;
  border-radius: 0px 10px 10px 0px;
}
.tags-input{
  height: 60%;
  width: 25%;
  color:#ffffff;
  background: linear-gradient(0deg, rgba(254, 254, 254, 0.2), rgba(92, 93, 94, 0.2)), #2b2b2b;
  border: 1.5px solid #74E3FC;
  border-radius: 10px 0px 0px 10px;
}
#name {
    text-align: left;
    font-family: 'DM Serif Display';
    font-style: normal;
    display:inline;
    vertical-align: top;
    /* identical to box height */
    color: #74E3FC;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

#top_comment {
    margin-top: 1rem;
    left: 50px;
    right: 50px;
    top: 100px;
    word-wrap: break-word;
    text-align: left;
    font-family: 'Lexend Deca';
    font-style: normal;
    font-size: 24px;
    line-height: 25px;
    color: #FFFFFF;
}
#box {
    margin-top: 4rem;
    box-sizing: border-box;
    position: absolute;
    height: auto;
    left: 5%;
    right: 5%;
    background: linear-gradient(0deg, rgba(92, 93, 94, 0.2), rgba(92, 93, 94, 0.2)), #272727;
    padding: 40px;
    border: 2px solid #74E3FC;
}
#tags {
    display:inline;
    word-wrap: break-word;
    text-align: center;
    font-size: 20px;
}
#likes {
    color: #FFFFFF;
    font-size: 20px;
    display:inline;
    vertical-align: top;
    text-align: right;
}
#addComment {
    margin-top: 2rem;
}
#comment-box {
    margin-top: 1rem;
    box-sizing: border-box;
    height: auto;
    left: 200px;
    right: 200px;
    top: 110px;
    padding: 20px;
    padding-top: 10px;
    padding-bottom: 10px;
    border: 1px solid #74E3FC;
    background: linear-gradient(0deg, rgba(115, 116, 118, 0.2), rgba(117, 118, 119, 0.2)), #3c3c3c;
}
#comments {
    left: 10px;
    right: 110px;
    top: 100px;
    word-wrap: break-word;
    text-align: left;
    font-family: 'Lexend Deca';
    font-style: normal;
    font-size: 24px;
    line-height: 25px;
    color: #FFFFFF;
    margin-bottom: 2px;
}
#comment-name {
    font-size: 15px;
    margin-bottom: 5px;
    color: #74E3FC;
}

#whiteLink {
    color: #ffffff;
}
.comment-input{
  width: 90%;
}
.comment-button{
  height: 38px;
  width: 10%;
  color:#ffffff;
  background: #737374;
  border: 1.5px solid #74E3FC;
  border-radius: 0px 10px 10px 0px;
}
.thumbs-up{
  width: 36%;
  border: 1px solid #74E3FC;
  border-radius: 30px 0px 0px 30px;
  background: linear-gradient(0deg, rgba(92, 93, 94, 0.2), rgba(92, 93, 94, 0.2)), #272727;
  color:#ffffff
}
.thumbs-down{
  width: 36%;
  border: 1px solid #74E3FC;
  border-radius: 0px 30px 30px 0px;
  background: linear-gradient(0deg, rgba(92, 93, 94, 0.2), rgba(92, 93, 94, 0.2)), #272727;
  color:#ffffff
}
.thumbs-up-comment{
  width: 8%;
  height: 8%;
  border: 1px solid #74E3FC;
  border-radius: 30px 0px 0px 30px;
  background: linear-gradient(0deg, rgba(92, 93, 94, 0.2), rgba(92, 93, 94, 0.2)), #272727;
  color:#ffffff
}
.thumbs-down-comment{
  width: 8%;
  height: 8%;
  border: 1px solid #74E3FC;
  border-radius: 0px 30px 30px 0px;
  background: linear-gradient(0deg, rgba(92, 93, 94, 0.2), rgba(92, 93, 94, 0.2)), #272727;
  color:#ffffff
}
.delete-button{
  background: #232323;
  color: #ffffff;
}
.comment-input{
  height: 38px;
  color:#ffffff;
  border: 1px solid #74E3FC;
  border-radius: 10px 0px 0px 10px;
  background: linear-gradient(0deg, rgba(254, 254, 254, 0.2), rgba(92, 93, 94, 0.2)), #2b2b2b;
}

@media(max-width:768px){
  #box {
    padding: 20px;
  }
  .comment-button{
  width: 20%;
  }
.thumbs-up{
  width: 80px;
  font-size: 15px;
  height: 40px;
  border-radius: 30px 0px 0px 30px;
  background: linear-gradient(0deg, rgba(92, 93, 94, 0.2), rgba(92, 93, 94, 0.2)), #272727;
}
.thumbs-down{
  font-size: 15px;
  width: 80px;
  height: 40px;
  border-radius: 0px 30px 30px 0px;
  background: linear-gradient(0deg, rgba(92, 93, 94, 0.2), rgba(92, 93, 94, 0.2)), #272727;
}
#likes{
  margin-right: 4.6em;
}
#likes-comment{
  margin-right: 4em;
}
.thumbs-up-comment{
  width: 50px;
  height: 30px;
}
.thumbs-down-comment{
  width: 50px;
  height: 30px;
}
.comment-input{
  width: 80%;
  color:#ffffff;
  border: 1.5px solid #74E3FC;
  background: linear-gradient(0deg, rgba(254, 254, 254, 0.2), rgba(92, 93, 94, 0.2)), #2b2b2b;
}
.comment-button{
  margin-top: .5em;
}
.tags-box{
  height: 60%;
  width: 40%;
  color:#ffffff;
  background: #737374;
  border: 1.5px solid #74E3FC;
  border-radius: 10px 10px 10px 10px;
}
.add-tag{
  height: 60%;
  width: 31%;
  color:#ffffff;
  background: #737374;
  border: 1.5px solid #74E3FC;
  border-radius: 0px 10px 10px 0px;
}
.tags-input{
  height: 60%;
  width: 69%;
  color:#ffffff;
  background: linear-gradient(0deg, rgba(254, 254, 254, 0.2), rgba(92, 93, 94, 0.2)), #2b2b2b;
  border: 1.5px solid #74E3FC;
  border-radius: 10px 0px 0px 10px;
}
}
</style>
