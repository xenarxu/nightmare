<template>
<el-card shadow="hover">
  <el-row class="herb" type="flex" align="bottom">
    <el-col :span="4">
      <el-card :body-style="{ padding: '3px' }" shadow="hover">
        <div class="cardD">
          <img
            :src="herb.picturelink"
            class="image"
            height="100%"
            width="80%"
          />
        </div>

        <div style="padding: 4px">
          <span>图片展示</span>
        </div>
      </el-card></el-col
    >
    <el-col :span="19" :offset="1">
      <el-descriptions direction="vertical" :span="16" border class="header">
        <el-descriptions-item :span="1" label="名称">{{
          herb.name
        }}</el-descriptions-item>
        <el-descriptions-item :span="1" label="性味">
          <el-tag
            v-for="(item, index) in herb.properties"
            @click="searchTag(item)"
            :key="index"
            size="small"
            >{{ item }}</el-tag
          >
          <el-tag
            v-for="(item, index) in herb.flavours"
            :key="index + '-only'"
            @click="searchTag(item)"
            size="small"
            type="success"
            >{{ item }}</el-tag
          >
        </el-descriptions-item>
        <el-descriptions-item :span="2" label="归经">
          <el-tag
            v-for="(item, index) in herb.meridians"
            :key="index"
            @click="searchTag(item)"
            size="small"
            >{{ item }}</el-tag
          >
        </el-descriptions-item>
        <el-descriptions-item label="分类">
          <el-tag
            v-for="(item, index) in herb.type"
            :key="index"
            size="small"
            @click="searchTag(item)"
            >{{ item }}</el-tag
          ></el-descriptions-item
        >
        <el-descriptions-item label="详细描述">{{
          herb.description
        }}</el-descriptions-item>
      </el-descriptions></el-col
    >
  </el-row>
</el-card>
</template>

<script>
import { mapMutations, mapState, mapGetters, mapActions } from "vuex";
export default {
  props: ["Herbs"],
  data() {
    return {
      herb: {
        name: "酸枣仁",
        meridians: ["心", "肝", "胆"],
        properties: ["平"],
        type: ["安神药", "养心安神药"],
        flavours: ["甘", "酸"],
        description: "养心补肝，宁心安神，敛汗，生津。",
        picturelink:
          "http://www.zhongyoo.com/uploads/allimg/130529/1-13052910491K17.jpg",
      },
    };
  },
  computed: {
    ...mapState("herbs", ["dialogFormVisible", "chooseId"]),
  },
  methods: {
    searchTag(item) {
      this.$emit("changeSearch", item);
    },
    changeText() {
      if (this.chooseId)
        this.herb = this.Herbs.filter((herb) => {
          return herb.id === this.chooseId;
        })[0];
    },
  },
  watch: {
    chooseId() {
      this.changeText();
    },
    Herbs: {
      deep: true,
      handler() {
        this.changeText();
      },
    },
  },
};
</script>

<style lang="less" scoped>
.el-card {
  text-align: center;
  .cardD {
    height: 70%;
    width: 100%;
  }
}
</style>