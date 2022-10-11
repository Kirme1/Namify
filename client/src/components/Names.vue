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
                #<router-link id="whiteLink" :to="{ path: `/tag/${tag}`, params: { id: tag } }">{{tag}}</router-link><button v-on:click="deleteTag(tag)"></button>
              </span>
            </span>
            <span>
              <button v-if="name.tags.length < 4 && addTagClicked === false" v-on:click="addTagClicked = true">+</button>
            </span>
            <span v-if="addTagClicked === true">
              <input  type="text" v-model="newTag" id="tagInput" size="5" :placeholder="tagMessage">
              <button v-on:click="addTag()">Add</button>
            </span>
          </b-col>
          <b-col style="text-align: right;">
            <div id="likes">
              <p4>
                <button v-on:click="updateLikes()">likes: {{this.name.likes}}</button>
              </p4>
              <p4>
                <button v-on:click="updateDislikes()">dislikes: {{this.name.dislikes}}</button>
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
                <input type="text" v-model="newComment" style="width: 90%" placeholder="Add a comment">
                <button v-on:click="addComment()" style="width: 10%">Comment</button>
              </form>
            </div>
            <div id="comment-box" v-for="comment in name.comments" :key="comment._id">
              <div id="comments">
                <div id="comment-name">@{{comment.name}}</div>
                {{comment.text}}
              </div>
              <b-row style="margin-top: 8px">
                <b-col style="text-align: left;">
                  <button v-on:click="updateCommentLikes(comment)">likes: {{comment.likes}}</button>
                  <button v-on:click="updateCommentDislikes(comment)">dislikes: {{comment.dislikes}}</button>
                </b-col>
                <b-col style="text-align: right;">
                  <button v-if="comment.name === accountName" v-on:click="deleteComment(comment)">Delete</button>
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
      tagMessage: 'Add a tag',
      addTagClicked: false,
      newTag: '',
      hasAccount: false,
      accountName: '',
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
      const upName = {
        likes: this.name.likes + 1,
        dislikes: this.name.dislikes
      }
      this.name.likes = this.name.likes + 1
      Api.patch('/names/' + this.$route.params.id, upName)
        .catch(error => {
          console.log(error)
        })
    },
    updateDislikes() {
      const downName = {
        likes: this.name.likes,
        dislikes: this.name.dislikes + 1
      }
      this.name.dislikes = this.name.dislikes + 1
      Api.patch('/names/' + this.$route.params.id, downName)
        .catch(error => {
          console.log(error)
        })
    },
    updateCommentLikes(comment) {
      const upComment = {
        likes: comment.likes + 1,
        dislikes: comment.dislikes
      }
      comment.likes = comment.likes + 1
      Api.patch('/names/' + this.$route.params.id + '/comments/' + comment._id, upComment)
        .catch(error => {
          console.log(error)
        })
    },
    updateCommentDislikes(comment) {
      const upComment = {
        likes: comment.likes,
        dislikes: comment.dislikes + 1
      }
      comment.dislikes = comment.dislikes + 1
      Api.patch('/names/' + this.$route.params.id + '/comments/' + comment._id, upComment)
        .catch(error => {
          console.log(error)
        })
    },
    getAccount() {
      Api.get('/accounts', { headers: { token: localStorage.getItem('token') } })
        .then(response => {
          this.accountName = response.data.user.account.name
        })
    },
    addComment() {
      const newComment = {
        _id: this.name._id + String(this.name.comments.length) + String(this.newComment.length * Math.floor(Math.random() * this.name.comments.length)),
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
</style>
