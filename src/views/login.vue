<template>
  <div class="login">
    <div class="cont">
      <div class="title">账号登录</div>
      <el-divider></el-divider>
      <el-form ref="form" :model="form" label-suffix="：">
        <el-form-item>
          <el-input v-model="form.name" placeholder="用户名" prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input type="password" placeholder="密码" v-model="form.password" prefix-icon="el-icon-lock"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login">登录</el-button>
          <router-link to="/register">立即注册</router-link>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { set } from "../tool";
import { Action } from "vuex-class";

export interface User {
  name: string;
  password: string;
}
@Component({})
export default class Home extends Vue {
  @Action("setId") setId!: (obj: any) => void;
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
          this.setId({ vm: this, id: res.data.data.id });
          this.$router.push({ name: "Todo" });
        }
      });
  }
}
</script>

<style lang="scss" scoped>
.login {
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
