<template>
  <div style="width:900px;margin:0 auto">
    <el-form ref="form" :rules="rules" :model="form" label-suffix="：" label-width="120px">
      <el-form-item label="用户名" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="昵称" prop="nick">
        <el-input v-model="form.nick"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="surePassword">
        <el-input type="password" v-model="form.surePassword"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="register">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
export interface User {
  name: string;
  password: string;
  surePassword: string;
  phone: string;
  nick: string;
}
@Component({})
export default class Home extends Vue {
  form: User = {
    name: "",
    password: "",
    surePassword: "",
    phone: "",
    nick: ""
  };
  public validatePass2 = (rule: any, value: any, callback: any) => {
    if (value === "") {
      callback(new Error("请再次请输入密码"));
    } else if (value !== this.form.password) {
      callback(new Error("两次请输入密码不一致!"));
    } else {
      callback();
    }
  };
  rules: {} = {
    name: [
      { required: true, message: "请输入用户名", trigger: ["blur", "change"] }
    ],
    nick: [
      { required: true, message: "请输入昵称", trigger: ["blur", "change"] }
    ],
    phone: [
      { required: true, message: "请输入手机号", trigger: ["blur", "change"] },
      {
        pattern: /^1[34578]\d{9}$/,
        message: "请输入正确的手机格式",
        trigger: ["blur", "change"]
      }
    ],
    password: [
      { required: true, message: "请输入新密码", trigger: "change" },
      { min: 8, max: 14, message: "请输入8~14位密码", trigger: "change" }
    ],
    surePassword: [
      { required: true, message: "请输入新密码", trigger: "change" },
      { min: 8, max: 14, message: "请输入8~14位密码", trigger: "change" },
      { validator: this.validatePass2, trigger: "change" }
    ]
  };
  public register(): void {
    this.$refs["form"].validate((valid: boolean) => {
      if (valid) {
        this.$http
          .post("http://localhost:7001/register", this.form)
          .then((res: any) => {
            this.$message({
              message: res.data.msg,
              type: "warning"
            });
          });
      } else {
        this.$message({
          message: "请填写完整再进行注册",
          type: "warning"
        });
      }
    });
  }
}
</script>
