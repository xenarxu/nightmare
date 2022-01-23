<template>
       <el-card class="box-card">
  <el-collapse v-model="activeName" accordion>
    <el-collapse-item title="药材归经桑葚图 Meridian" name="1">
      <el-card class="box-card">
        <div ref="myNodeChart" :style="{ height: '55vh', width: '90vw' }"></div>
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
        <div ref="myTypeChart" :style="{ height: '75vh', width: '90vw' }"></div>
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
</template>
<script>
import * as echarts from "echarts";
import axios from "axios";
export default {
  name: "analysis",
  data() {
    return { activeName: "1" };
  },
  methods: {
    async showChart() {
      let sanKeyData = [];
      let sanKeyLinks = [];
      await axios({
        method: "GET",
        url: "http://localhost:3000/analysis/getAllHerbsMeridians",
      }).then((res) => {
        const { data } = res.data;
        sanKeyData = data.data;
        sanKeyLinks = data.links;
      });
      var option = {};
      var myChart = echarts.init(this.$refs.myNodeChart);
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
      option && myChart.setOption(option);
    },
    async showSunChart() {
      let data = [];
      const colors = ["#FFAE57", "#FF7853", "#EA5151", "#CC3F57", "#9A2555"];
      const bgColor = "#fff";
      await axios({
        method: "GET",
        url: "http://localhost:3000/analysis/getAllHerbsProperties",
      }).then((res) => {
        data = res.data.data;
        console.log(data);
      });
      const option = {
        title: {
          text: "全局药性旭日图",
          subtext:
            "Source: https://worldcoffeeresearch.org/work/sensory-lexicon/",
          textStyle: {
            fontSize: 10,
            align: "center",
          },
          subtextStyle: {
            align: "center",
          },
          sublink: "https://worldcoffeeresearch.org/work/sensory-lexicon/",
        },
        backgroundColor: bgColor,
        color: colors,
        series: [
          {
            type: "sunburst",
            center: ["50%", "55%"],
            data: data,
            sort: function (a, b) {
              if (a.depth === 1) {
                return b.getValue() - a.getValue();
              } else {
                return a.dataIndex - b.dataIndex;
              }
            },
            label: {
              rotate: "radial",
              color: bgColor,
            },
            itemStyle: {
              borderColor: bgColor,
              borderWidth: 2,
            },
            levels: [
              { r0: 0, r: 50 },
              {
                r0: 50,
                r: 100,
                label: {
                  rotate: 0,
                },
                itemStyle: {
                  shadowBlur: 5,
                  shadowColor: "#777",
                },
              },
              {
                r0: 100,
                r: 180,
                itemStyle: {
                  shadowBlur: 8,
                  shadowColor: "#777",
                },
                label: {
                  rotate: "tangential",
                  fontSize: 20,
                  color: "#fff",
                },
              },
              {
                r0: 180,
                r: 200,
                itemStyle: {
                  shadowBlur: 2,
                  shadowColor: "#777",
                },
                label: {
                  fontSize: 15,
                  color: "#000",
                  position: "outside",
                  textShadowBlur: 0.5,
                  textShadowColor: "#000",
                },
                downplay: {
                  label: {
                    opacity: 0.5,
                  },
                },
              },
            ],
          },
        ],
      };
      const sunChart = echarts.init(this.$refs.myPropertySunChart);
      option && sunChart.setOption(option);
    },
    async showSun2Chart() {
      let data = [];
      const colors = ["#FFAE57", "#FF7853", "#EA5151", "#CC3F57", "#9A2555"];
      const bgColor = "#fff";
      await axios({
        method: "GET",
        url: "http://localhost:3000/analysis/getAllHerbsTypes",
      }).then((res) => {
        data = res.data.data;
        console.log(data);
      });
      const option = {
        title: {
          text: "全局药性旭日图",
          subtext:
            "Source: https://worldcoffeeresearch.org/work/sensory-lexicon/",
          textStyle: {
            fontSize: 10,
            align: "center",
          },
          subtextStyle: {
            align: "center",
          },
          sublink: "https://worldcoffeeresearch.org/work/sensory-lexicon/",
        },
        backgroundColor: bgColor,
        color: colors,
        series: [
          {
            type: "sunburst",
            center: ["50%", "55%"],
            data: data,
            sort: function (a, b) {
              if (a.depth === 1) {
                return b.getValue() - a.getValue();
              } else {
                return a.dataIndex - b.dataIndex;
              }
            },
            label: {
              rotate: "radial",
              color: bgColor,
            },
            itemStyle: {
              borderColor: bgColor,
              borderWidth: 2,
            },
            levels: [
              { r0: 0, r: 50 },
              {
                r0: 50,
                r: 140,
                label: {
                  fontSize: 17,
                  textBorderWidth: 2,
                  textBorderColor: "#555",
                },
                itemStyle: {
                  shadowBlur: 5,
                  shadowColor: "#777",
                },
              },
              {
                r0: 140,
                r: 240,
                itemStyle: {
                  shadowBlur: 8,
                  shadowColor: "#777",
                },
                label: {
                  fontSize: 15,
                  color: "#fff",
                  textBorderWidth: 2,
                  textBorderColor: "#555",
                },
              },
              {
                r0: 240,
                r: 245,
                itemStyle: {
                  shadowBlur: 2,
                  shadowColor: "#777",
                },
                label: {
                  fontSize: 15,
                  color: "#000",
                  position: "outside",
                  textShadowBlur: 0.5,
                  textShadowColor: "#000",
                },
                downplay: {
                  label: {
                    opacity: 0.5,
                  },
                },
              },
            ],
          },
        ],
      };
      const sunChart = echarts.init(this.$refs.myTypeChart);
      option && sunChart.setOption(option);
    },
    async showSanKeyChart() {
      let sanKeyData = [];
      let sanKeyLinks = [];
      await axios({
        method: "GET",
        url: "http://localhost:3000/analysis/getAllHerbsFlavours",
      }).then((res) => {
        const { data } = res.data;
        sanKeyData = data.data;
        sanKeyLinks = data.links;
      });
      var option = {};
      var myChart = echarts.init(this.$refs.myFlavourChart);
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
      option && myChart.setOption(option);
    },
  },
  mounted() {
    this.showChart();
    this.showSunChart();
    this.showSun2Chart();
    this.showSanKeyChart()
  },
};
</script>
<style>
.box-card {
  justify-content: center;
}
</style>