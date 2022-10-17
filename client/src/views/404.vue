<template>
    <div id="text">
        <h1 class="404">404</h1>
        <p class="pnf">Page Not Found</p>
    </div>
</template>

<script>

</script>

<style>
#text {
    font-size: 80px;
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
    color: #74E3FC;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
@media(max-width:768px) {
    #text {
        font-size: 20px;
        padding: 10px;
        left: 5%;
        right: 5%;
        top: 200px
    }
}
</style>
