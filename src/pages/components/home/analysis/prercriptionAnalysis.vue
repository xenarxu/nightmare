<template>
  <el-row>
    <el-col :span="6">
      <el-card style="height: 40vh">
        <el-descriptions direction="vertical" border class="header">
          <el-descriptions-item :span="4" label="名称">
            {{ prescription.name }}</el-descriptions-item
          >
          <el-descriptions-item :span="4" label="配方">
            <el-tag
              v-for="item in prescription.newHerb"
              :key="item"
              size="small"
            >
              {{ item }}</el-tag
            >
          </el-descriptions-item>
        </el-descriptions></el-card
      >
      <el-card style="margin-top: 2vh; height: 40vh">
        <el-input placeholder="请输入内容" v-model="search" :clearable="true">
        </el-input>
        <el-table
          height="40vh"
          :data="
            tableData.filter(
              (data) =>
                !search ||
                data.name.toLowerCase().includes(search.toLowerCase())
            )
          "
          style="width: 100%"
          @row-click="showInfo"
        >
          <el-table-column label="名称" prop="name"> </el-table-column>
          <el-table-column
            label="成分"
            prop="newHerbShow"
            show-overflow-tooltip
          >
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="18">
      <el-row>
        <el-col :span="23" :offset="1">
          <el-card>
            <el-collapse v-model="activeName" accordion>
              <el-collapse-item title="方剂成分归经桑葚图 Meridian" name="1">
                <el-card class="box-card">
                  <div
                    ref="sanKeyChart"
                    :style="{ height: '50vh', width: '60vw' }"
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
import axios from "axios";
import * as echarts from "echarts";
export default {
  data() {
    return {
      prescription: { name: "", newHerb: [] },
      tableData: [],
      search: "",
      chooseId: 1,
      activeName: "1",
      sanKeyChart : null
    };
  },
  methods: {
    async showChart() {
      let sanKeyData = [];
      let sanKeyLinks = [];
      await axios({
        method: "POST",
        url: "http://localhost:3000/analysis/getSankeyData",
        data: {
          id: this.chooseId,
        },
      }).then((res) => {
        const { data } = res.data;
        sanKeyData = data.data;
        sanKeyLinks = data.links;
        console.log(data);
      });
      var option = {};
     
      if (this.sanKeyChart == null) {
       this.sanKeyChart = echarts.init(this.$refs.sanKeyChart);
      }
      option = {
        tooltip: {
          trigger: "item",
          triggerOn: "mousemove",
        },
        series: {
          type: "sankey",
          layout: "none",
          emphasis: {
            focus: "adjacency",
          },
          lineStyle: {
            color: "gradient",
            curveness: 0.5,
          },
          data: sanKeyData,
          links: sanKeyLinks,
        },
      };
      option && this.sanKeyChart.setOption(option);
    },
    showInfo(row, column) {
      this.chooseId = row.id;
    },
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
  },
  watch: {
    tableData(value) {
      this.prescription = value[0];
      this.chooseId = value[0].id;
    },
    chooseId(value) {
      this.prescription = this.tableData.find((p) => {
        return p.id === value;
      });
      this.showChart();
    },
  },
  mounted() {
    this.getP();
  },
};
</script>

<style>
</style>