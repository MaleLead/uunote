<template>
  <div id="app" class="pages">
    <section class="main">
      <h1>Hello，MaleH5~</h1>
      <p>UUCLI,帮你更快搞定全栈开发;欢迎加入全栈开发QQ群：377131934</p>
      <p><el-button @click="goto">多模块跳转</el-button></p>
    </section>
  </div>
</template>
<script>
  export default {
    name: "app",
    data() {
      return {
        img: ""
      };
    },
    methods: {
      goto() {
        location.href = "/detail/detail.html#";
      }
    }
  };
</script>

<style lang="less">
  .pages {
    position: absolute;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    background-color: #282828;
    background: url("../../assets/images/login-bg.jpg") no-repeat;
    -moz-background-size: cover;
    background-size: cover;
    .main{
      position: relative;
      top:30%;
      h1{
        color: #fff;
        font-size: 50px;
      }
      p{
        color:#fff;
        font-size: 24px;
      }
    }
  }
  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  .box {
    width: 500px;
    height: 200px;
  }
</style>
