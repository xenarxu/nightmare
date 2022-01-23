<template>
<el-card shadow="hover">
  <el-row class="herb" type="flex" align="bottom">
    <el-col :span="24">
      <el-descriptions direction="vertical" :span="16" border class="header">
        <el-descriptions-item :span="1" label="名称">{{
          prescription.name
        }}</el-descriptions-item>
        <el-descriptions-item :span="3" label="配方">
          <el-tag
            v-for="(item, index) in prescription.newHerb"
            @click="searchTag(item)"
            :key="index"
            size="small"
            >{{ item }}
          </el-tag>
        </el-descriptions-item>
        <el-descriptions-item :span="3" label="用法">
          {{ prescription.usage }}
        </el-descriptions-item>
        <el-descriptions-item :span="1" label="功效">
          {{ prescription.effection }}</el-descriptions-item
        >
        <el-descriptions-item label="出处">{{
          "《" + prescription.book + "》"
        }}</el-descriptions-item>
      </el-descriptions></el-col
    >
  </el-row>
  </el-card>
</template>
<script>
import { mapMutations, mapState, mapGetters, mapActions } from "vuex";
export default {
  props: ["Prescriptions"],
  data() {
    return {
      prescription: {
        name: "酸枣仁汤",
        newHerb: [
          "酸枣仁(30克)",
          "甘草(6克)",
          "知母(6克)",
          "茯苓(6克)",
          "川穹(6克)",
        ],
        usage: "上五味，以水八升，煮酸枣仁得六升，内诸药，煮取三升，分温三服。",
        effection: "清热除烦，养血安神。",
        book: "金匮要略",
      },
    };
  },
  computed: {
    ...mapState("prescriptions", ["chooseId", , "dialogFormVisible"]),
  },
  methods: {
    searchTag(item) {
      let search = item.split("(")[0];
      this.$emit("changeSearch", search);
    },
    changeText() {
      if (this.Prescriptions.length > 0 && this.chooseId) {
        this.prescription = this.Prescriptions.filter((prescription) => {
          return prescription.id === this.chooseId;
        })[0];
      }
    },
  },
  watch: {
    chooseId() {
      this.changeText();
    },
    Prescriptions: {
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