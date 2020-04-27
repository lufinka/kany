<template>
  <div class="register">
    <div class="cont">
      <div class="title">账号注册</div>
      <el-divider></el-divider>
      <el-form ref="form" :rules="rules" :model="form" label-suffix="：">
        <el-form-item prop="name">
          <el-input v-model="form.name" placeholder="用户名" prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <el-form-item prop="nick">
          <el-input v-model="form.nick" placeholder="昵称" prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <el-form-item prop="phone">
          <el-input v-model="form.phone" placeholder="手机号" prefix-icon="el-icon-mobile-phone"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="form.password" placeholder="密码" prefix-icon="el-icon-lock"></el-input>
        </el-form-item>
        <el-form-item prop="surePassword">
          <el-input type="password" v-model="form.surePassword" placeholder="确认密码" prefix-icon="el-icon-lock"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="register">注册</el-button>
          <router-link to="/login">返回登录</router-link>
        </el-form-item>
      </el-form>
    </div>
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

<style lang="scss" scoped>
.register {
  .title {
    font-size: 18px;
    margin-bottom: -20px;
    line-height: 34px;
  }
  background-color: dodgerblue;
  overflow: hidden;
  height: 100%;
  .cont {
    padding: 40px;
    width: 460px;
    margin: 10% auto 0;
    border-radius: 4px;
    background-color: #fff;
    border: 2px solid #eee;
    a {
      text-decoration: none;
      margin-left: 20px;
    }
  }
}
</style>