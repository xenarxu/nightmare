<template>
  <div>
    <el-container>
      <el-aside class="main_aside" width="auto">
        <home-aside></home-aside>
      </el-aside>
      <el-container>
        <el-header class="main_header">
          <home-header></home-header>
        </el-header>
        <commom-tag> </commom-tag>
        <el-main class="main_body">
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import HomeAside from './components/aside.vue'
  import HomeHeader from './components/header.vue'
  import CommomTag from './components/CommonTag.vue'
  export default {
    name: 'my_main',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App',
      }

    },
    components: {
      HomeAside,
      HomeHeader,
      CommomTag,
    }

  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang ='less'>
  .main_aside {
    background-image: linear-gradient(#FFEBCD, #b2dbbf);
    height: 98vh;
  }

  .main_header {
    background-image: linear-gradient(#b2dbbf, #fff);
     height: 20vh;
  }

  .main_body {
    background: #fff;
     height: 80vh;
     overflow: auto;
  }

</style>
