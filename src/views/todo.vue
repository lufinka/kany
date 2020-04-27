<template>
  <div class="main">
    <div class="todo">
      <el-input placeholder="请输入内容" v-model="newTodo" @keyup.enter.native="addOne" prefix-icon="el-icon-arrow-down" class="input-with-select"></el-input>
      <ul>
        <li v-for="(v,i) in getterTodo" :key="i">
          <item :data="v" :index="i"></item>
        </li>
      </ul>
    </div>
    <div class="level"></div>
    <div class="level2"></div>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import item from "../components/item";
import { Component, Vue, Watch } from "vue-property-decorator";
import { TD, UserInfo } from "../types/todo";
import { State, Getter, Action, Mutation } from "vuex-class";
import { get } from "../tool";

@Component({
  name: "home",
  components: {
    item
  }
})
export default class Home extends Vue {
  public newTodo: string = "";
  public day: Date = new Date().formatDate("yyyy-MM-dd");
  public userInfo: UserInfo = get("USER_INFO");
  @State("todo") public getterTodo!: [];
  @State("id") public id!: "";
  // @Mutation("queryTodo") setList!: (v: any) => void;
  @Mutation("addTodo") addTodo!: (v: any) => void;
  @Action("setTodo") setTodo!: (obj: any) => void;
  // say(p: string): void {
  //   console.log("say", p);
  // }
  // get count() {
  //   return this.todo.length;
  // }

  public addOne(): void {
    if (this.newTodo) {
      let todoItem = {
        user_id: this.id || this.userInfo.id,
        day: this.day,
        desc: this.newTodo,
        computed: 0
      };
      this.$http
        .post("http://localhost:7001/addOneTodo", todoItem)
        .then((res: any) => {
          this.$message({
            message: res.data.msg,
            type: res.data.code == 200 ? "success" : "warning"
          });
          if (res.data.code == 200) {
            this.newTodo = "";
            this.addTodo(todoItem);
          }
        });
    } else {
      this.$message({
        message: "请输入代办事项",
        type: "warning"
      });
    }
  }
  mounted() {
    !this.getterTodo.length &&
      this.setTodo({ vm: this, id: this.id || this.userInfo.id });
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-input__inner {
  border: none;
  border-bottom: 1px solid #DCDFE6;
  font-size: 16px;
  height: 50px;
  line-height: 50px;
}
.main{
  padding-top: 6%;
}
.level {
  width: 590px;
  height: 6px;
  background-color: #fff;
  border: 1px solid #eee;
  border-top: none;
  margin: 0 auto;
}
.level2 {
  width: 580px;
  background-color: #fff;
  height: 6px;
  border: 1px solid #eee;
  border-top: none;
  margin: 0 auto;
}
.todo {
  width: 600px;
  box-shadow: 0 15px 25px rgba($color: #000000, $alpha: 0.2);
  margin: 0 auto 0;
  border: 1px solid #eee;
  border-top: none;
  ul,
  li {
    list-style: none;
    margin: 0;
    padding: 0;
    text-align: left;
    cursor: pointer;
    h2 {
      font-size: 16px;
    }
  }
  ul {
    margin: 0 30px;
  }
}
</style>
