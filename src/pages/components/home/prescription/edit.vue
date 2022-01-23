<template>
  <el-dialog
    :title="isAdd ? '添加' : '编辑'"
    :visible.sync="visible"
    @close="changeVisible"
  >
    <el-form ref="form" :model="sizeForm" label-width="80px" size="mini">
      <el-form-item label="名称">
        <el-input v-model="sizeForm.name" clearable></el-input>
      </el-form-item>
      <el-dialog title="添加药材" :visible.sync="inputVisible1" append-to-body>
        <el-form :model="form">
          <el-form-item label="药材名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="重量" :label-width="formLabelWidth">
            <el-input v-model="form.weight" autocomplete="off" clearable></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="inputVisible1 = false">取 消</el-button>
          <el-button :disabled="Hdisabled" @click="addHerb" type="primary">{{
            confirmText
          }}</el-button>
        </div>
      </el-dialog>
      <el-form-item label="配方">
        <el-tag
          :key="tag"
          v-for="tag in dynamicTags"
          closable
          :disable-transitions="false"
          @close="handleClose(tag)"
        >
          {{ tag }}
        </el-tag>

        <el-button
          v-if="!inputVisible1"
          class="button-new-tag"
          size="small"
          @click="showInput"
          >添 加</el-button
        >
      </el-form-item>
      <el-form-item label="用法">
        <el-input type="textarea" v-model="sizeForm.usage" clearable></el-input>
      </el-form-item>
      <el-form-item label="功效">
        <el-input v-model="sizeForm.effection" clearable></el-input>
      </el-form-item>
      <el-form-item label="出处">
        <el-input v-model="sizeForm.book" clearable></el-input>
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
        <el-button type="primary" :disabled="disable" @click="subP"
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
  props: ["isAdd",'Prescriptions'],
  data() {
    return {
      dynamicTags: [],
      inputVisible: false,
      inputValue: "",
      h: { name: "名称", weight: "重量" },
      sizeForm: {},
      form: {
        name: "",
        weight: 0,
      },
      sizeForm1: {
        name: "",
        herbs: [],
        usage: "",
        effection: "",
        book: "",
      },
      formLabelWidth: "120px",
      inputVisible1: false,
      visible: false,
      value: [],
    };
  },
  methods: {
    ...mapMutations("prescriptions", [
      "sendId",
      "changeVisible",
    ]),
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      this.sizeForm.herbs = this.sizeForm.herbs.filter((herb) => {
        return herb.name != tag.split("(")[0];
      });
    },
    showInput() {
      this.inputVisible1 = true;
    },
    addHerb() {
      this.form.weight = parseInt(this.form.weight);
      let a = {};
      a.name = JSON.parse(JSON.stringify(this.form.name));
      a.weight = JSON.parse(JSON.stringify(this.form.weight));
      this.dynamicTags.push(a.name + "(" + a.weight + "克)");
      this.sizeForm.herbs.push(a);
      this.inputVisible1 = false;
      (this.form.name = ""), (this.form.weight = 0);
    },
    open() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          console.log(this.sizeForm.id);
          return axios({
            method: "POST",
            url: "http://localhost:3000/prescription/deletePrescription",
            data: { id: this.sizeForm.id },
          })
            .then((res) => {
              console.log("删除了");
              this.sizeForm = this.sizeForm1;
              this.sendId(this.Prescriptions[0].id)
              this.$emit("changeSearch", "");
            })
            .catch((err) => {
              console.log(err);
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
        .catch((e) => {
          console.log(e);
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
    onSubmit() {
      console.log("submit!");
    },
    async subP() {
      this.sizeForm.name = this.sizeForm.name.trim();
      this.sizeForm.book = this.sizeForm.book.trim()||'';
      this.sizeForm.usage = this.sizeForm.usage.trim()||'';
      this.sizeForm.effection = this.sizeForm.effection.trim()||"";
      this.$emit("changeSearch", "");
      if (this.sizeForm.id && this.sizeForm.name) {
        await axios({
          method: "POST",
          url: "http://localhost:3000/prescription/updatePrescription",
          data: this.sizeForm,
        })
          .then((res) => {
            this.sizeForm = JSON.parse(JSON.stringify(this.sizeForm1));
          })
          .then((e) => {});
      } else {
        await axios({
          method: "POST",
          url: "http://localhost:3000/prescription/addPrescription",
          data: this.sizeForm,
        })
          .then((res) => {
            this.sizeForm = JSON.parse(JSON.stringify(this.sizeForm1));
          })
          .then((e) => {});
      }
      this.visible = false;
    },
  },
  computed: {
    ...mapState("prescriptions", [
      "dialogFormVisible",
      "chooseId",
    ]),
    showHerb() {
      let h = [];
      this.sizeForm.herbs.forEach((herb) => {
        h.push(herb.name + "(" + herb.weight + "克)");
      });
      return h;
    },
    isCompeat() {
      let i = false;
      this.sizeForm.herbs.forEach((element) => {
        if (element.name == this.form.name) i = true;
      });
      return i;
    },
    confirmText() {
      if (this.form.name && this.form.weight && !this.isCompeat) {
        return "确 定";
      } else return "请确认输入是否合法";
    },
    disable() {
      return !this.sizeForm.name;
    },
    Hdisabled() {
      if (this.form.name && this.form.weight && !this.isCompeat) {
        return false;
      } else return true;
    },
  },
  watch: {
    dialogFormVisible() {
      this.visible = this.dialogFormVisible;
      if (this.Prescriptions.length > 0) {
        if (this.chooseId && !this.isAdd) {
          let p = this.Prescriptions.filter((prescription) => {
            return prescription.id == this.chooseId;
          })[0];
          this.sizeForm = JSON.parse(JSON.stringify(p));
        } else this.sizeForm = JSON.parse(JSON.stringify(this.sizeForm1));
      } else this.sizeForm = JSON.parse(JSON.stringify(this.sizeForm1));
      this.dynamicTags = this.showHerb;
    },
  },
};
</script>

<style lang="less" scoped>
.dialog-footer {
  display: flex;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
</style>