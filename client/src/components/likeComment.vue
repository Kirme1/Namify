<template>
    <div>
        <div>
            <button class="thumbs-up-comment" v-on:click="updateCommentLikes(passedComment.comment)">
                 <img style="width: 48%" src="/up.png"/> {{ passedComment.comment.likes }}
            </button>
            <button class="thumbs-down-comment" v-on:click="updateCommentDislikes(passedComment.comment)">
                 {{ passedComment.comment.dislikes }} <img style="width: 48%" src="/down.png"/>
            </button>
      </div>
    </div>
</template>

<script>
import { Api } from '@/Api'

export default {
  data() {
    return {
      hasAccount: false,
      accountEmail: '',
      commentLikes: 0,
      commentDislikes: 0,
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
      likedComments: [{
        comment: '',
        liked: false,
        disliked: false
      }]
    }
  },
  props: {
    passedComment: {
      _id: String,
      text: String,
      likes: Number,
      dislikes: Number,
      name: String,
      __v: Number
    }
  },
  mounted() {
    this.getAccount()
    this.getName()
  },
  methods: {
    getAccount() {
      Api.get('/v1/accounts', { headers: { token: localStorage.getItem('token') } })
        .then(response => {
          this.hasAccount = true
          this.accountEmail = response.data.user.account.email
          this.likedNames = response.data.user.account.likedNames
          this.likedComments = response.data.user.account.likedComments
        })
        .catch(err => {
          console.log(err.message + ', user is not logged in to an account')
          this.hasAccount = false
        })
    },
    getName() {
      Api.get('/v1/names/' + this.$route.params.id)
        .then(response => {
          this.name = response.data
        })
    },
    updateCommentLikes(comment) {
      if (this.hasAccount) {
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
        Api.patch('/v1/names/' + this.$route.params.id + '/comments/' + comment._id, upComment)
          .catch(error => {
            console.log(error)
          })
        Api.patch('/v1/accounts/' + this.accountEmail + '/likedComments', likedComment)
          .catch(error => {
            console.log(error)
          })
      }
    },
    updateCommentDislikes(comment) {
      if (this.hasAccount) {
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
        Api.patch('/v1/names/' + this.$route.params.id + '/comments/' + comment._id, downComment)
          .catch(error => {
            console.log(error)
          })
        Api.patch('/v1/accounts/' + this.accountEmail + '/likedComments', dislikedComment)
          .catch(error => {
            console.log(error)
          })
      }
    }
  }
}
</script>

<style>

#likes {
    color: #FFFFFF;
    font-size: 20px;
    display:inline;
    vertical-align: top;
    text-align: right;
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
@media(max-width:768px){
  #box {
    padding: 20px;
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
}

</style>
