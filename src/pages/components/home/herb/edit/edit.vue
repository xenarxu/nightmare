<template>

  <el-dialog
    :title="isAdd ? '添加' : '编辑'"
    :visible.sync="visible"
    @close="changeVisible"
  >
    <el-form ref="form" :model="sizeForm" label-width="80px" size="mini">
      <el-form-item label="名称">
        <el-input v-model="sizeForm.name" clearable='true'></el-input>
      </el-form-item>
      <el-form-item label="性">
        <el-checkbox-group v-model="sizeForm.properties" max='1'>
          <el-checkbox-button
            v-for="(item, index) in properties"
            :key="index"
            :label="item"
            name="type"
          ></el-checkbox-button>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="味">
        <el-checkbox-group v-model="sizeForm.flavours">
          <el-checkbox-button
            v-for="(item, index) in flavours"
            :key="index"
            :label="item"
            name="type"
          ></el-checkbox-button>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="归经">
        <el-checkbox-group v-model="sizeForm.meridians">
          <el-checkbox-button
            v-for="(item, index) in meridians"
            :key="index"
            :label="item"
            name="type"
          ></el-checkbox-button>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="分类">
        <el-cascader
          v-model="sizeForm.type"
          :options="options"
          :props="{ expandTrigger: 'hover' }"
        ></el-cascader>
      </el-form-item>
      <el-form-item label="详细描述">
        <el-input type="textarea" v-model="sizeForm.description" clearable='true'></el-input>
      </el-form-item>
      <el-form-item label="图片链接">
        <el-input v-model="sizeForm.picturelink" clearable='true'></el-input>
      </el-form-item>
    </el-form>
    <div
      slot="footer"
      class="dialog-footer"
      :style="{ 'justify-content': isAdd ? 'flex-end' : 'space-between' }"
    >
      <el-row v-show="!isAdd">
        <el-button type="danger" @click="open">Delete</el-button>
      </el-row>
      <el-row>
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" :disabled="disable" @click="subHerb"
          >确 定</el-button
        >
      </el-row>
    </div>
  </el-dialog>
</template>

<script>
import { mapMutations, mapState, mapGetters, mapActions } from "vuex";
import axios from "axios";
export default {
  name: "edit",
  props: ["isAdd", "Herbs"],
  data() {
    return {
      sizeForm: {},
      visible: false,
      properties: ["寒", "微寒", "凉", "平", "微温", "温", "热"],
      flavours: ["甘", "苦", "咸", "辛", "酸", "淡"],
      meridians: [
        "心",
        "肝",
        "脾",
        "肺",
        "肾",
        "胆",
        "胃",
        "大肠",
        "小肠",
        "膀胱",
        "三焦",
        "心包",
      ],
      formLabelWidth: "120px",
      herb: {
        name: "",
        meridians: [],
        properties: [],
        type: [],
        flavours: [],
        description: "",
        picturelink: "",
      },
      value: [],
      options: [
        {
          value: "安神药",
          label: "安神药",
          children: [
            {
              value: "养心安神药",
              label: "养心安神药",
            },
            {
              value: "重镇安神药",
              label: "重镇安神药",
            },
          ],
        },
        {
          value: "清热药",
          label: "清热药",
          children: [
            {
              value: "清虚热药",
              label: "清虚热药",
            },
            {
              value: "清热解毒药",
              label: "清热解毒药",
            },
            {
              value: "清热泻火药",
              label: "清热泻火药",
            },
            {
              value: "清热凉血药",
              label: "清热凉血药",
            },
            {
              value: "清热燥湿药",
              label: "清热燥湿药",
            },
          ],
        },
        {
          value: "补虚药",
          label: "补虚药",
          children: [
            {
              value: "补气药",
              label: "补气药",
            },
            {
              value: "补阳药",
              label: "补阳药",
            },
            {
              value: "补阴药",
              label: "补阴药",
            },
            {
              value: "补血药",
              label: "补血药",
            },
          ],
        },
        {
          value: "解表药",
          label: "解表药",
          children: [
            {
              value: "辛温解表药",
              label: "辛温解表药",
            },
            {
              value: "辛凉解表药",
              label: "辛凉解表药",
            },
          ],
        },
        {
          value: "利水渗湿药",
          label: "利水渗湿药",
          children: [
            {
              value: "利水消肿药",
              label: "利水消肿药",
            },
            {
              value: "利水通淋药",
              label: "利水通淋药",
            },
            {
              value: "利水退黄药",
              label: "利水退黄药",
            },
          ],
        },
        {
          value: "收涩药",
          label: "收涩药",
          children: [
            {
              value: "敛肺涩肠药",
              label: "敛肺涩肠药",
            },
            {
              value: "固表止汗药",
              label: "固表止汗药",
            },
            {
              value: "固精缩尿止带药",
              label: "固精缩尿止带药",
            },
          ],
        },
        {
          value: "活血化瘀药",
          label: "活血化瘀药",
          children: [
            {
              value: "活血止痛药",
              label: "活血止痛药",
            },
            {
              value: "活血调经药",
              label: "活血调经药",
            },
            {
              value: "活血疗伤药",
              label: "活血疗伤药",
            },
            {
              value: "破血消癥药",
              label: "破血消癥药",
            },
          ],
        },

        {
          value: "平肝息风药",
          label: "平肝息风药",
          children: [
            {
              value: "平抑肝阳药",
              label: "平抑肝阳药",
            },
            {
              value: "息风止痉药",
              label: "息风止痉药",
            },
          ],
        },
        {
          value: "其他",
          label: "其他",
          children: [
            {
              value: "理气药",
              label: "理气药",
            },
            {
              value: "化湿药",
              label: "化湿药",
            },
            {
              value: "温里药",
              label: "温里药",
            },
            {
              value: "驱虫药",
              label: "驱虫药",
            },
            {
              value: "消食药",
              label: "消食药",
            },
            {
              value: "开窍药",
              label: "开窍药",
            },
            {
              value: "涌吐药",
              label: "涌吐药",
            },
            {
              value: "杀虫止痒药",
              label: "杀虫止痒药",
            },
            {
              value: "拔毒生肌药",
              label: "拔毒生肌药",
            },
          ],
        },
      ],
    };
  },
  methods: {
    ...mapMutations("herbs", ["resetId", "changeVisible", "sendId"]),
    open() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          return axios({
            method: "POST",
            url: "http://localhost:3000/herb/deleteHerb",
            data: { id: this.sizeForm.id },
          })
            .then((res) => {
              console.log("删除了");
              this.sendId(this.Herbs[0].id);
              this.sizeForm = this.herb;
              this.$emit("changeSearch", "");
            })
            .catch((err) => {
              throw err;
            });
        })
        .then(() => {
          this.visible = false;
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    backContext() {
      this.$emit("changeSearch", "");
      this.$router.push({ name: "herb_context" });
    },
    async subHerb() {
      this.sizeForm.name = this.sizeForm.name.trim();
      this.sizeForm.description = this.sizeForm.description.trim() || "";
      this.sizeForm.picturelink = this.sizeForm.picturelink.trim() || "";
      this.$emit("changeSearch", "");
      if (this.sizeForm.id && this.sizeForm.name) {
        await axios({
          url: "http://localhost:3000/herb/updateHerb",
          method: "POST",
          data: this.sizeForm,
        })
          .then((res) => {
            this.visible = false;
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
        await axios({
          url: "http://localhost:3000/herb/addHerb",
          method: "POST",
          data: this.sizeForm,
        })
          .then((res) => {
            this.visible = false;
          })
          .catch((e) => {});
      }
    },
  },
  computed: {
    ...mapState("herbs", ["dialogFormVisible", "chooseId"]),
    disable() {
      return !this.sizeForm.name || this.sizeForm.type.length === 0;
    },
  },
  watch: {
    dialogFormVisible() {
      this.visible = this.dialogFormVisible;
    },
    visible(val) {
      if (this.chooseId && !this.isAdd && val) {
        this.sizeForm = this.Herbs.filter((herb) => {
          return herb.id === this.chooseId;
        })[0];
      } else this.sizeForm = JSON.parse(JSON.stringify(this.herb));
    },
  },
};
</script>

<style lang="less" scoped>
.dialog-footer {
  display: flex;
}
</style>