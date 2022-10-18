<template>
    <div id="tag-box">
        <h class="tag">#{{this.$route.params.id}}</h>
        <div>
            <div class="name-box" v-for="name in list" :key="name._id">
                <h class="name">
                  <router-link id="whiteLink" :to="{ path: `/name/${name._id}`, params: { id: name._id } }">{{name._id}}</router-link></h>
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
      list: []
    }
  },
  mounted() {
    this.getTagNames()
  },
  methods: {
    getTagNames() {
      Api.get('/v1/tags/' + this.$route.params.id + '/names')
        .then(response => {
          for (let i = 0; i < response.data.length; i++) {
            console.log(response.data[i])
            this.list.splice(i, 0, response.data[i])
            console.log(this.list[i]._id)
          }
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}

</script>

<style>
#tag-box {
    margin-top: 4rem;
    box-sizing: border-box;
    position: absolute;
    height: auto;
    left: 240px;
    right: 240px;
    text-align: center;
    background: linear-gradient(0deg, rgba(92, 93, 94, 0.2), rgba(92, 93, 94, 0.2)), #272727;
    padding: 15px;
    padding-bottom: 35px;
    border: 2px solid #74E3FC;
}

.tag {
    font-family: 'DM Serif Display';
    font-style: normal;
    display:inline;
    font-size: 40px;
    /* identical to box height */
    color: #74E3FC;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.name-box {
    display:inline-block;
    text-align: center;
    margin-right: 2rem;
    margin-left: 2rem;
    margin-top: 1rem;
    box-sizing: border-box;
    height: auto;
    width: 40%;
    top: 110px;
    padding: 20px;
    padding-top: 10px;
    padding-bottom: 10px;
    border: 1px solid #74E3FC;
    background: linear-gradient(0deg, rgba(115, 116, 118, 0.2), rgba(117, 118, 119, 0.2)), #3c3c3c;
}

.name {
    font-family: 'Lexend Deca';
    font-style: normal;
    font-size: 35px;
    color: #FFFFFF;
}
@media(max-width:768px){
  #tag-box {
    left: 10px;
    right: 10px;
    padding: 10px;
  }
  .name-box {
    width: 80%
  }
  .name {
    font-size: 30px;
  }
}

</style>
