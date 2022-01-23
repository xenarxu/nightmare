
<template lang="">
    <transition
    name="animate__animated animate__bounce"
    appear
    enter-active-class="animate__bounceInLeft"
    leave-active-class="animate__bounceOutRight"
  >
<el-container >
  <el-header height='auto'>
      <info @changeSearch = 'changeSearch' :Herbs='tableData' />
      <edit  :isAdd='isAdd' :Herbs='tableData' />
  </el-header>
  <el-main>  
    <el-card shadow="hover">
    <el-button @click = 'handleAdd' type='success' class='add'>Add</el-button>
    <el-pagination align='center' 
    @current-change="handleCurrentChange"
    :current-page="currentPage" 
    :page-size="pageSize" 
    layout="total, prev, pager, next, jumper" 
    :total="total">
    </el-pagination>
    <el-table :data="newTableData"
       @row-click='showInfo'
    style="width: 100%"
     >
    <el-table-column label="名称" prop="name">
    </el-table-column>
    <el-table-column label="性味" prop="xingwei">
    </el-table-column>
    <el-table-column label="归经" prop="guijing">
    </el-table-column>
         <el-table-column label='分类' prop="fenlei">
    </el-table-column>
       <el-table-column label='描述' prop="description" show-overflow-tooltip>
    </el-table-column>
    <el-table-column align="right">
      <template slot="header" slot-scope="scope">
        <el-input v-model="search" size="mini" placeholder="输入关键字搜索" clearable='true' />
      </template>
      <template slot-scope="scope">
  <el-button
    size="mini"
    type="info"
    @click.stop="handleEdit(scope.$index, scope.row)"
    >Edit</el-button
  >
</template >
    </el-table-column >
    </el-table>
    </el-card>
  </el-main>

  </el-container>
    </transition>
</template>

<script>
import info from "./info/context.vue";
import edit from "./edit/edit.vue";
import axios from "axios";
import { mapMutations, mapState, mapGetters, mapActions } from "vuex";
export default {
  name: "herb",
  components: {
    info,
    edit,
  },
  data() {
    return {
      V: this.visible,
      tableData: [],
      isEdit: false,
      isAdd: false,
      search: "",
      currentPage: 1, // 当前页码
      pageSize: 6, // 每页的数据条数
    };
  },
  computed: {
    ...mapState("herbs", ["dialogFormVisible", "Herbs"]),
    newTableData() {
      //过滤后的数据
      return this.filterTable(this.tableData).slice(
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize
      );
    },
    total() {
      return this.filterTable(this.tableData).length;
    },
  },
  methods: {
    ...mapMutations("herbs", ["changeVisible", "sendId", "updateHerbs"]),
    handleEdit(index, row) {
      this.isEdit = !this.isEdit;
      this.isAdd = false;
      this.sendId(row.id);
      this.changeVisible();
    },
    handleAdd() {
      this.isAdd = true;
      this.changeVisible();
    },
    showInfo(row, column, event) {
      this.sendId(row.id);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    changeSearch(value) {
      this.search = value;
    },
    async getT() {
      let herbs = [];
      await axios({
        url: "http://localhost:3000/herb/getHerbs",
        method: "GET",
      })
        .then((r) => {
          herbs = r.data.data;
        })
        .catch((e) => {
          console.log(e);
        });
      herbs.forEach((element) => {
        element.xingwei =
          "性" +
          element.properties.join("、") +
          ",味" +
          element.flavours.join("、");
        element.xingwei1 =
          element.properties.join("") + element.flavours.join("");
        element.guijing = "归" + element.meridians.join("、") + "经";
        element.guijing1 = element.meridians.join("");
        element.fenlei = "属" + element.type[0] + "下" + element.type[1];
        element.fenlei1 = element.type[0] + element.type[1];
      });
      this.tableData = herbs;
    },
    filterTable(table) {
      return table.filter(
        (data) =>
          !this.search ||
          data.name.toLowerCase().includes(this.search.toLowerCase()) ||
          data.xingwei1.toLowerCase().includes(this.search.toLowerCase()) ||
          data.guijing1.toLowerCase().includes(this.search.toLowerCase()) ||
          data.fenlei1.toLowerCase().includes(this.search.toLowerCase())
      );
    },
  },
  watch: {
    dialogFormVisible(val) {
      if (!val) this.getT();
    },
    search() {
      this.currentPage = 1;
    },
  },
  mounted() {
    this.getT();
  },
};
</script>
<style lang="less" scoped>
.add {
  float: right;
}
</style>
