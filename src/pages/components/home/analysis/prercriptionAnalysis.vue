<template>
  <el-row>
    <el-col :span="6">
      <el-card>
        <el-descriptions direction="vertical" border class="header">
          <el-descriptions-item :span="4" label="名称"> </el-descriptions-item>
          <el-descriptions-item :span="4" label="配方">
            <el-tag size="small"> </el-tag>
          </el-descriptions-item> </el-descriptions
      ></el-card>
      <el-card style="margin-top: 2vh; height: 58vh">
        <el-input placeholder="请输入内容" v-model="search" clearable= 'true'>
        </el-input>
        <el-table
          :data="
            tableData.filter(
              (data) =>
                !search ||
                data.name.toLowerCase().includes(search.toLowerCase())
            )
          "
          style="width: 100%"
        >
          <el-table-column label="Date" prop="date"> </el-table-column>
          <el-table-column label="Name" prop="name"> </el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="18">
      <el-row>
        <el-col :span="23" :offset="1">
          <el-card>
            <el-collapse v-model="activeName" accordion>
              <el-collapse-item title="药材归经桑葚图 Meridian" name="1">
                <el-card class="box-card">
                  <div
                    ref="myNodeChart"
                    :style="{ height: '50vh', width: '90vw' }"
                  ></div>
                </el-card>
              </el-collapse-item>
              <el-collapse-item title="药材药性旭日图 Property" name="2">
                <el-card class="box-card">
                  <div
                    ref="myPropertySunChart"
                    :style="{ height: '55vh', width: '90vw' }"
                  ></div>
                </el-card>
              </el-collapse-item>
              <el-collapse-item title="药材功效旭日图 Effection" name="3">
                <el-card class="box-card">
                  <div
                    ref="myTypeChart"
                    :style="{ height: '70vh', width: '90vw' }"
                  ></div>
                </el-card>
              </el-collapse-item>
              <el-collapse-item title="药材药味桑葚图 Flavour" name="4">
                <el-card class="box-card">
                  <div
                    ref="myFlavourChart"
                    :style="{ height: '70vh', width: '90vw' }"
                  ></div>
                </el-card>
              </el-collapse-item>
            </el-collapse>
          </el-card>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
      search: "",

      activeName: "1",
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
  },
};
</script>

<style>
</style>