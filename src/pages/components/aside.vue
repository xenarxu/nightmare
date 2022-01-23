<template lang="">
  <el-menu :collapse="isCollapse" class="el-menu-vertical-demo aside" background-color="#FAF0E6" text-color="#000"
    active-text-color="#247ba0">
    <h3 v-show="!isCollapse" class="ht">失眠中药探究</h3>
    <h3 v-show="isCollapse" class="ht">失眠</h3>
    <el-menu-item :index="item.path" v-for="item in noChildren" :key="item.path" @click="clickMenu(item)">
      <i :class="'el-icon-'+item.icon"></i>
      <span slot="title">{{item.label}}</span>
    </el-menu-item>
    <el-submenu :index="item.label" v-for="item in hasChildren" :key="item.path">
      <template slot="title">
        <i :class="'el-icon-'+item.icon"></i>
        <span>{{item.label}}</span>
      </template>
      <el-menu-item-group>
        <el-menu-item :index="subItem.path" v-for="(subItem,subIndex) in item.children" :key="subIndex"
          @click="clickMenu(subItem)">
          <i :class="'el-icon-' +subItem.icon"></i>
          <span>{{subItem.label}}</span>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>
<script>
import { mapMutations, mapState, mapGetters, mapActions } from "vuex";
export default {
  name: "my_aside",
  data() {
    return {
      menu: [
        {
          path: "/",
          name: "home",
          label: "首页",
          icon: "s-home",
          url: "home/home",
        },
        {
          label: "药剂管理",
          name: "medician",
          icon: "first-aid-kit",
          children: [
            {
              path: "/prescription",
              name: "prescription",
              label: "方剂管理",
              icon: "suitcase-1",
              url: "prescription/priscripion",
            },
            {
              path: "/herb",
              name: "herb",
              label: "药材管理",
              icon: "cherry",
              url: "UserManage/UserManage",
            },
          ],
        },
        {
          name: "analysis",
          label: "数据分析",
          icon: "data-analysis",
          children: [
            {
              path: "/herbAnalysis",
              name: "herbAnalysis",
              label: "全局药材分析",
              icon: "s-data",
            },
                {
              path: "/prescriptionAnalysis",
              name: "prescriptionAnalysis",
              label: "方剂成分分析",
              icon: "pie-chart",
            },
          ],
        },
        {
          label: "其他",
          icon: "location",
          children: [
            {
              path: "/page1",
              name: "page1",
              label: "页面1",
              icon: "setting",
              url: "Other/PageOne",
            },
            {
              path: "/page2",
              name: "page2",
              label: "页面2",
              icon: "setting",
              url: "Other/PageTwo",
            },
          ],
        },
      ],
    };
  },
  methods: {
    ...mapMutations("tab", ["collapseMenu", "selectMenu"]),
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    clickMenu(item) {
      this.$router.push({
        name: item.name,
      });
      this.selectMenu(item);
    },
  },
  computed: {
    ...mapState("tab", ["isCollapse"]),
    noChildren() {
      return this.menu.filter((item) => !item.children);
    },
    hasChildren() {
      return this.menu.filter((item) => item.children);
    },
  },
};
</script>
<style lang="less" scoped>
.aside {
  .ht {
    text-align: center;
  }
}
</style>>

