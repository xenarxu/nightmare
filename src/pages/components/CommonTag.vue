<template lang="">
  <div class="tabt">
    <el-tag class="innertag"  type="success" :key="index" v-for="(tag,index) in dynamicTags" closable :disable-transitions="false"
      @close="handleClose(tag)" @click="changeMenu(tag)" :effect="$route.name ===tag.name?'dark' :'plain'">
      {{tag.label}}
    </el-tag>
  </div>
</template>
<script>
import { mapMutations, mapState } from "vuex";
export default {
  name: "tag",
  computed: {
    ...mapState("tab", { dynamicTags: "tabsList" }),
  },
  data() {
    return {};
  },
  methods: {
    ...mapMutations('tab',['selectMenu']),
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },
    changeMenu(item) {
      this.$router.push({
        name: item.name,
      })
      this.selectMenu(item)
    },
  },
};
</script>
<style lang="less" scoped>
.tabt {
  .innertag {
    margin-left: 1vw;
  }
}
</style>
