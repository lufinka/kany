<template>
  <div style="width:900px;margin:0 auto">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="用户名">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { set } from "../tool";
import {  Action } from "vuex-class";

export interface User {
  name: string;
  password: string;
}
@Component({})
export default class Home extends Vue {
  @Action('setId') setId!: (obj:any) => void;
  form: User = { name: "", password: "" };
  public login(): void {
    this.$http
      .get("http://localhost:7001/login", { params: this.form })
      .then((res: any) => {
        this.$message({
          message: res.data.msg,
          type: res.data.code == 200 ? "success" : "warning"
        });
        if (res.data.code == "200") {
          set("USER_INFO", res.data.data);
          this.setId({vm:this,id:res.data.data.id})
        }
      });
  }
}
</script>
