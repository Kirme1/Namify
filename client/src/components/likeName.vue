<template>
    <div>
        <div>
        <button class="thumbs-up" v-on:click="updateLikes()">
            <img style="width: 30%" src="/up.png"/> {{this.name.likes}}
        </button>
        <button class="thumbs-down" v-on:click="updateDislikes()">
            {{this.name.dislikes}} <img style="width: 30%" src="/down.png"/>
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
      likedNames: [{
        name: '',
        liked: false,
        disliked: false
      }]
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
    updateLikes() {
      if (this.hasAccount) {
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
        Api.patch('/v1/names/' + this.$route.params.id, upName)
          .catch(error => {
            console.log(error)
          })
        Api.patch('/v1/accounts/' + this.accountEmail + '/likedNames', likedName)
          .catch(error => {
            console.log(error)
          })
      }
    },
    updateDislikes() {
      if (this.hasAccount) {
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
        Api.patch('/v1/names/' + this.$route.params.id, downName)
          .catch(error => {
            console.log(error)
          })
        Api.patch('/v1/accounts/' + this.accountEmail + '/likedNames', dislikedName)
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
@media(max-width:768px){
  #box {
    padding: 20px;
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
}
</style>
