<template>
        <div id="box">
            <div id="name">
                <h1>{{this.name._id}}</h1>
            </div>
            <div id="top_comment">
                <p1>
                    {{this.topComment.text}}
                </p1>
            </div>
            <div id="comment_name">
                <p2>
                    @{{this.topComment.name}}
                </p2>
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
            <div id="likes">
                <p4>
                    likes: {{this.name.likes}}
                </p4>
                <p4>
                    dislikes: {{this.name.dislikes}}
                </p4>
            </div>
        </div>
</template>

<script>
import { Api } from '@/Api'

export default {
  data() {
    return {
      message: 'none',
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
      }
    }
  },
  mounted() {
    this.getName('Julia')
  },
  methods: {
    getName(name) {
      Api.get('/names/' + name)
        .then(response => {
          this.name = response.data
          if (this.name.comments.length > 0) {
            this.topComment = this.name.comments[0]
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
        })
    }
  }
}
</script>

<style>
#name {
    position: absolute;
    width: 129px;
    height: 66px;
    left: 50px;
    top: 33px;
    text-align: left;
    font-family: 'DM Serif Display';
    font-style: normal;
    font-weight: 400;
    font-size: 48px;
    line-height: 66px;
    /* identical to box height */
    color: #74E3FC;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
#top_comment {
    position: absolute;
    height: 154px;
    left: 50px;
    right: 50px;
    top: 100px;
    word-wrap: break-word;
    text-align: left;
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 25px;
    color: #FFFFFF;
}
#box {
    box-sizing: border-box;
    position: absolute;
    height: 342px;
    left: 129px;
    right: 129px;
    top: 181px;
    background: linear-gradient(0deg, rgba(92, 93, 94, 0.2), rgba(92, 93, 94, 0.2)), #272727;
    border: 1px solid #74E3FC;
}
#comment_name{
    position: absolute;
    left: 10px;
    top: 110px;
    vertical-align: middle;
    writing-mode: vertical-lr;
    -webkit-transform: rotate(-180deg);
    -moz-transform: rotate(-180deg);
    color: #FFFFFF;
}
#tags {
    position: absolute;
    left: 70px;
    bottom: 50px;
    word-wrap: break-word;
    text-align: left;
    font-size: 20px;
    color: #FFFFFF;
}
#likes {
    position: absolute;
    color: #FFFFFF;
    right: 70px;
    text-align: right;
    bottom: 50px;
    font-size: 20px;
}
html {
    background-color: #272727;
}
</style>
