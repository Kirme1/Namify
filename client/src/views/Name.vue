<template>
    <div id="box">
        <p1 id="name">Hejsan</p1>
        <p id="tags">#blessed</p>
    </div>
</template>

<script>
for (let i = 0; i < 10; i++) {
  document.body.box += '<div id="comment"><p>this is comment {{i}}</p></div>'
}

</script>

<style>
#box {
    text-align: left;
    border: 1px solid #74E3FC;
    background: linear-gradient(0deg, rgba(92, 93, 94, 0.2), rgba(92, 93, 94, 0.2)), #272727;
}

#name {
    font-family: 'DM Serif Display';
    font-size: 48px;
    line-height: 66px;
    /* identical to box height */
    color: #74E3FC;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
#tags {
    font-size: 20px;
    color: #FFFFFF;
}

#comment {
    font-size: 20px;
    color: #FFFFFF;
}
</style>
