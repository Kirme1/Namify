<template>
    <div id="box1">
    <Names></Names>
    </div>
</template>

<script>
import Names from '../components/Names.vue'

export default {
  components: { Names },
  data() {
    return {
      message: 'none'
    }
  },
  methods: {

  }
}

</script>

<style>
#box1 {
    position: absolute;
    border: 1px solid #74E3FC;
    background: linear-gradient(0deg, rgba(92, 93, 94, 0.2), rgba(92, 93, 94, 0.2)), #272727;
    bottom: 60px;
    left: 60px;
    right: 60px;
    top: 120px;
}
</style>
