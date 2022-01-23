<template lang="">
  <el-row class="home" :gutter="20">
    <el-col :span="7" style="margin-top: 1vh">
      <el-card shadow="hover">
        <div class='user'>
          <img :src="userImg" />
          <div class="userInfo">
            <p class='name'>Admin</p>
            <p class='access'>超级管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登录时间为:<span>2021-11-20</span></p>
          <p>上次登录地点为:<span>南京</span></p>
        </div>
      </el-card>
      <el-card style="height:56vh; margin-top:1vh;">
        <el-table :data="tableData"    height="52vh">>>
          <el-table-column :show-overflow-tooltip ='true' v-for="(val,key) in tableLabel" :key="key" :prop="key" sortable :label="val">
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="17">
    <!--   <div class="num" style="margin-top: 1vh">
        <el-card style="margin-bottom: 1vh" shadow="hover" v-for='item in countData' :key="item.name"
          :body-style="{display:'flex',padding:0}">
          <i class="icon" :class=[item.icon] :style="{background:item.color}"> </i>
          <div class="detail">
            <p class="num">￥{{item.value}}</p>
            <p class="txt">{{item.name}}</p>
          </div>
        </el-card>
      </div> -->
      <el-card shadow="hover" style="height:35vh;margin-top:1vh">
        <div ref="lineChart" style="height:35vh;width:100%"> </div>
      </el-card>
      <div class="graph">
        <el-card shadow="hover">
          <div ref="pieChart" style="height:42vh;margin:0 auto"> </div>
        </el-card>
        <div style="width :2%"></div>
        <el-card shadow="hover" style="">
          <div ref="myBarChart" style="height:42vh;margin:0 auto"></div>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>
<script>
import axios from "axios";
import * as echarts from "echarts";
export default {
  name: "home",
  data() {
    return {
      userImg: require("@/assets/img/狼log.png"),
      tableData: [],
      echartsData: [],
      countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "el-icon-success",
          color: "#247ba0",
        },
        {
          name: "今日收藏订单",
          value: 1234,
          icon: "el-icon-star-on",
          color: "#70c1b3",
        },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "el-icon-s-goods",
          color: "#ff1654",
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "el-icon-success",
          color: "#247ba0",
        },
        {
          name: "本月收藏订单",
          value: 1234,
          icon: "el-icon-star-on",
          color: "#70c1b3",
        },
        {
          name: "本月未支付订单",
          value: 1234,
          icon: "el-icon-s-goods",
          color: "#ff1654",
        },
      ],
      tableLabel: {
        name: "名称",
        price: "单价",
        todaySales: "今售",
        totalSales: "总售",
      },
      lineechartsData: {
        order: {
          legend: {
            textStyle: {
              color: "#333",
            },
          },
          grid: {
            left: "10%",
            right: "4%",
          },
          tooltip: {
            trigger: "axis",
          },
          xAxis: {
            type: "category",
            data: [],
            axisLine: {
              lineStyle: {
                color: "#17b3a3",
              },
            },
            axisLabel: {
              interval: 0,
              color: "#333",
            },
          },
          yAxis: [
            {
              type: "value",
              axisLine: {
                lineStyle: {
                  color: "#17b3a3",
                },
              },
            },
          ],
          color: [
            "#2ec7c9",
            "#b6a2de",
            "#5ab1ef",
            "#ffb980",
            "#d87a80",
            "#8d98b3",
          ],
          series: [],
        },
      },
      piechartsData: {
        option: {
          legend: {
            top: "bottom",
          },
          toolbox: {
            show: true,
            feature: {
              mark: {
                show: true,
              },
              dataView: {
                show: true,
                readOnly: false,
              },
              restore: {
                show: true,
              },
              saveAsImage: {
                show: true,
              },
            },
          },
          series: [
            {
              name: "Nightingale Chart",
              type: "pie",
              radius: [16, 80],
              center: ["50%", "50%"],
              roseType: "area",
              itemStyle: {
                borderRadius: 8,
              },
            },
          ],
        },
      },
      barchartsData: {
        option: {
          xAxis: {
            data: [],
            type: "category",
            axisLabel: {
              rotate:90,
              color: "#666",
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            z: 10,
          },
          yAxis: {
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              color: "#999",
            },
          },
          dataZoom: [
            {
              type: "inside",
            },
          ],
          series: [
            {
              label: {
                normal: {
                  show: true,
                  // 标签的文字。
                  rotate:90
                },
              },
              data: [],
              type: "bar",
              showBackground: true,
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#83bff6" },
                  { offset: 0.5, color: "#188df0" },
                  { offset: 1, color: "#188df0" },
                ]),
              },
              emphasis: {
                itemStyle: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: "#2378f7" },
                    { offset: 0.7, color: "#2378f7" },
                    { offset: 1, color: "#83bff6" },
                  ]),
                },
              },
            },
          ],
        },
      },
    };
  },
  methods: {
    async getTableDta() {
      const tableData = [];
      const herbSales = [];
      const pieChartdate = [
        "Monday",
        "Tursday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ];
      await axios({
        method: "GET",
        url: "http://localhost:3000/herb/getSales",
      })
        .then((res) => {
          const { data } = res.data;
          this.lineechartsData.order.xAxis.data = pieChartdate;
          this.lineechartsData.order.series.length = 0;
          for (let i = 0; i < 5; i++) {
            this.lineechartsData.order.series.push({
              name: data[i].name,
              data: data[i].totalSales,
              type: "line",
            });
          }
        })
        .catch((e) => {
          console.log(e);
        });
      await axios({
        url: "http://localhost:3000/herb/getTable",
        method: "GET",
      }).then((res) => {
        const { data } = res.data;
        this.tableData = data;
      });
      await axios({
        url: "http://localhost:3000/herb/getMeridiansTable",
        method: "GET",
      }).then((res) => {
        const { data } = res.data;
        this.piechartsData.option.series[0].data = data;
      });
      await axios({
        url: "http://localhost:3000/herb/getTypeTable",
        method: "GET",
      }).then((res) => {
        const { data } = res.data;
        data.forEach((element) => {
          this.barchartsData.option.xAxis.data.push(element.name);
          this.barchartsData.option.series[0].data.push(element.value);
        });
      });
      const myPieChart = echarts.init(this.$refs.pieChart);
      myPieChart.setOption(this.piechartsData.option);
      myPieChart.resize();
      const myLineChart = echarts.init(this.$refs.lineChart);
      myLineChart.setOption(this.lineechartsData.order);
      myLineChart.resize();
      const myBarChart = echarts.init(this.$refs.myBarChart);
      myBarChart.setOption(this.barchartsData.option);
      myBarChart.resize();
    },
  },
  created() {},
  mounted() {
    this.getTableDta();
  },
};
</script>
<style lang="less" scoped>
.home {
  .user {
    display: flex;
    align-items: center;
    padding-bottom: 1vh;
    margin-bottom: 1vh;
    margin-bottom: 1vh;
    border-bottom: 1px solid #ccc;

    img {
      width: 10vh;
      height: 10vh;
      border-radius: 50%;
      margin-right: 2vw;
    }

    .userInfo {
      .name {
        font-size: 1.55vw;
        margin-bottom: 0.5vh;
      }

      .access {
        color: #999999;
      }
    }
  }
}

.login-info {
  p {
    line-height: 2vh;
    font-size: 0.7vh;
    color: #999999;

    span {
      color: #666666;
      margin-left: 3vh;
    }
  }
}

.num {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .el-card {
    width: 32%;
    margin-bottom: 1vh;
    height: 8vh;
  }

  .icon {
    font-size: 4vh;
    width: 8vh;
    height: 8vh;
    text-align: center;
    line-height: 8vh;
    color: #fff;
  }

  .detail {
    margin-left: 0.75vw;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .num {
      font-size: 1.5vh;
      margin-bottom: 1vh;
    }

    .txt {
      font-size: 0.7vh;
      text-align: center;
      color: #999999;
    }
  }
}

.graph {
  margin-top: 1vh;
  display: flex;
  justify-content: center;

  .el-card {
    width: 49%;
  }
}
</style>
