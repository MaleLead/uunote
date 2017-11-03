<template>
  <div id="app">
    <h1 @click="goto">Hello，MaleH5~  点击跳转其他模块...</h1>
  </div>
</template>
<script>
export default {
  name: 'app',
  data (){
    return {
      img: ''
    }
  },
  methods:{
    goto(){
      location.href = '/detail/detail.html#'
    }
  }

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
.box {
  width: 500px;
  height: 200px;
}
</style>
