<template>
  <div id="app">
    <router-view/>
    <div class="suc">恭喜你~跳转成功了~开启你的全栈之旅吧（全栈QQ群：377131934）</div>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.suc{
  margin-top: 20px;
  font-size: 20px;
}
</style>
