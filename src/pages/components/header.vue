<template lang="">
  <header>
    <div class="l-content">
      <el-button @click="collapseMenu" plain icon="el-icon-menu" size="mini"></el-button>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }" class = "tag">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="currentMenu.path" v-if='currentMenu' class = "tag">{{currentMenu.label}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown trigger="click" size="mini">
        <span class="el-dropdown-link">
          <img :src="userImg" class="user">
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>
<script>
  import {
    mapState,mapMutations
  } from 'vuex'
  export default {
    name: "my_header",
    data() {
      return {
        userImg: require('@/assets/img/狼log.png'),
      }
    },
    methods: {
     ...mapMutations('tab',['collapseMenu'])
    },
    computed: {
      ...mapState('tab',['currentMenu']),
    }
  }

</script>
<style lang="less" scoped>
  header {
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: space-between;
  }

  .l-content {
    display: flex;
    align-items: center;

    .el-button {
      margin-right: 2vw;
    }
  }

  .r-content {


    .user {
      width: 2.5vw;
      height: 2.5vw;
      border-radius: 50%;
    }

  }

</style>
<style lang = "scss" scoped>

</style>