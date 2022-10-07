<template>
    <div id="box">
        {{this.$route.params.id}}
    </div>
</template>

<script>

</script>

<style>
#box {
    box-sizing: border-box;
    position: absolute;
    height: auto;
    left: 5%;
    right: 5%;
    top: 110px;
    background: linear-gradient(0deg, rgba(92, 93, 94, 0.2), rgba(92, 93, 94, 0.2)), #272727;
    padding: 40px;
    border: 2px solid #74E3FC;
}

</style>
