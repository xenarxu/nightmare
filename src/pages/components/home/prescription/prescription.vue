<template lang="">
 <transition
    name="animate__animated animate__bounce"
    appear
    enter-active-class="animate__bounceInLeft"
    leave-active-class="animate__bounceOutRight"
  >
    <el-container>  
      <el-header  height='auto'>
      <info @changeSearch = 'changeSearch' :Prescriptions =  "tableData" />
      <edit :isAdd='isAdd' :Prescriptions =  "tableData" />
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
            style="width: 100%"
            @row-click='showInfo'
            >
            <el-table-column label="名称" prop="name">
            </el-table-column>
            <el-table-column label="配方" prop="newHerbShow" show-overflow-tooltip>
            </el-table-column>
            <el-table-column label="用法" prop="usage" show-overflow-tooltip>
            </el-table-column>
            <el-table-column label="功效" prop="effection" show-overflow-tooltip>
            </el-table-column>
            <el-table-column label="出处" prop="bookk">
            </el-table-column>
            <el-table-column align="right">
              <template slot="header" slot-scope="scope">
                <el-input v-model="search" size="mini" placeholder="输入关键字搜索" clearable/>
                </template>
            <template slot-scope="scope">
  <el-button
    size="mini"
    type="info"
    @click.stop="handleEdit(scope.$index, scope.row)"
  >
    Edit
  </el-button>
</template>
            </el-table-column>
          </el-table>
          </el-card >
        </el-main>
      </el-container >
        </transition>
</template>
<script>
import info from "./info.vue";
import edit from "./edit.vue";
import { mapMutations, mapState, mapGetters, mapActions } from "vuex";
import axios from "axios";
export default {
  name: "prescription",
  components: {
    info,
    edit,
  },
  data() {
    return {
      tableData: [],
      search: "",
      isAdd: false,
      currentPage: 1, // 当前页码
      pageSize: 8,
    };
  },
  methods: {
    ...mapMutations("prescriptions", [
      "changeVisible",
      "updatePrescriptions",
      "sendId",
    ]),
    async getP() {
      let prescriptions = [];
      await axios({
        method: "GET",
        url: "http://localhost:3000/prescription/getPrescriptions",
      })
        .then((res) => {
          const { data } = res.data;
          prescriptions = data;
        })
        .catch((e) => {
          console.log(e);
        });
      if (prescriptions.length > 0) {
        for (let index = 0; index < prescriptions.length; index++) {
          prescriptions[index].bookk = "《" + prescriptions[index].book + "》"; //处理添加书名号
          prescriptions[index].newHerb = [];
          for (
            let index1 = 0;
            index1 < prescriptions[index].herbs.length;
            index1++
          ) {
            prescriptions[index].newHerb.push(
              //讲对象转为字符串数组供tag展示
              prescriptions[index].herbs[index1].name +
                "(" +
                prescriptions[index].herbs[index1].weight +
                "克)"
            );
          }
          prescriptions[index].newHerbShow =
            prescriptions[index].newHerb.join(","); //表格展示
        }
        this.tableData = prescriptions;
      } else this.tableData = [];
    },
    handleAdd() {
      this.isAdd = true;
      this.changeVisible();
    },
    handleEdit(index, row) {
      this.isAdd = false;
      this.sendId(row.id);
      this.changeVisible();
    },
    showInfo(row, column, event) {
      this.sendId(row.id);
    },
    changeSearch(value) {
      this.search = value;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    filterTable(table) {
      return table.filter(
        (data) =>
          !this.search ||
          data.name.toLowerCase().includes(this.search.toLowerCase()) ||
          data.newHerbShow.toLowerCase().includes(this.search.toLowerCase()) ||
          data.effection.toLowerCase().includes(this.search.toLowerCase()) ||
          data.usage.toLowerCase().includes(this.search.toLowerCase()) ||
          data.book.toLowerCase().includes(this.search.toLowerCase())
      );
    },
  },
  computed: {
    ...mapState("prescriptions", ["dialogFormVisible", "Prescriptions"]),
    newTableData() {
      if (this.tableData.length > 0)
        return this.filterTable(this.tableData).slice(
          (this.currentPage - 1) * this.pageSize,
          this.currentPage * this.pageSize
        );
      else return [];
    },
    total() {
      return this.filterTable(this.tableData).length;
    },
  },
  mounted() {
    this.getP();
  },
  watch: {
    dialogFormVisible(val) {
      if (!val) this.getP();
    },
  },
};
</script>
<style lang="less" scoped>
.add {
  float: right;
}
</style>
