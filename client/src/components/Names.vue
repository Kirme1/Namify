<template>
  <div>
      <div id="box">
            <div id="name">
                <h1>{{this.name._id}}
                  <div id="likes">
                    <p4>
                      <button v-on:click="updateLikes()">likes: {{this.name.likes}}</button>
                    </p4>
                    <p4>
                      <button v-on:click="updateDislikes()">dislikes: {{this.name.dislikes}}</button>
                    </p4>
                  </div>
                  <div id="tags">
                <p3>
                    {{this.name.tags[0]}}
                </p3>
                <p3>
                    {{this.name.tags[1]}}
                </p3>
                <p3>
                    {{this.name.tags[2]}}
                </p3>
            </div>
                </h1>
            </div>
            <div id="top_comment">
                <p1>
                    {{this.topComment.text}}
                </p1>
            </div>
            <div id="comment_name">
                <p2>
                    {{this.topComment.name}}
                </p2>
            </div>
            <div v-if="hasAccount" id="addComment">
              <b-form-input v-model="newComment" size="sm" class="mr-sm-2" placeholder="Add a comment"></b-form-input>
              <button v-on:click="addComment()">Comment</button>
            </div>
            <div id="comment-box" v-for="comment in name.comments" :key="comment._id">
              {{comment.text}}
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
    }
  },
  methods: {
    getName() {
      Api.get('/names/' + this.$route.params.id)
        .then(response => {
          this.name = response.data
          if (this.name.comments.length > 0) {
            this.topComment = this.name.comments[0]
            this.topComment.name = '@' + this.topComment.name
          } else {
            this.topComment.text = 'This name is so unpopular that it does not have any comments yet.'
          }
          for (let i = 0; i < 3; i++) {
            if (typeof this.name.tags[i] !== 'undefined') {
              this.name.tags[i] = '#' + this.name.tags[i]
            }
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
    getAccount() {
      Api.get('/accounts', { headers: { token: localStorage.getItem('token') } })
        .then(response => {
          this.accountName = response.data.user.account._id
        })
    },
    addComment() {
      this.getAccount()
      const newComment = {
        _id: String(this.name.comments.length),
        text: this.newComment,
        likes: 0,
        dislikes: 0,
        name: this.accountName
      }
      this.name.comments.push(newComment)
      Api.post('/names/' + this.name._id + '/comments', newComment)
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
    box-sizing: border-box;
    position: absolute;
    height: auto;
    left: 160px;
    right: 160px;
    top: 110px;
    background: linear-gradient(0deg, rgba(92, 93, 94, 0.2), rgba(92, 93, 94, 0.2)), #272727;
    padding: 40px;
    padding-left: 60px;
    border: 2px solid #74E3FC;
}
#comment_name{
    position: absolute;
    left: 10px;
    top: 100px;
    writing-mode: vertical-lr;
    -webkit-transform: rotate(-180deg);
    -moz-transform: rotate(-180deg);
    color: #FFFFFF;
}
#tags {
    margin-top: 0.5rem;
    left: 70px;
    bottom: 50px;
    word-wrap: break-word;
    text-align: left;
    font-size: 20px;
    color: #FFFFFF;
}
#likes {
    margin-top: 0.5rem;
    color: #FFFFFF;
    font-size: 20px;
}
#addComment {
    margin-top: 2rem;
}
#comment-box {
    /* box-sizing: border-box;
    height: auto;
    left: 200px;
    right: 200px;
    top: 110px;
    padding: 40px;
    padding-left: 60px;
    border: 2px solid #74E3FC; */
}
#comments {
    /* left: 50px;
    right: 50px;
    top: 100px;
    word-wrap: break-word;
    text-align: left;
    font-family: 'Lexend Deca';
    font-style: normal;
    font-size: 24px;
    line-height: 25px;
    color: #FFFFFF; */
}
</style>
