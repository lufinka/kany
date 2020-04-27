<template>
  <div style="width:900px;margin:0 auto">
    <el-input placeholder="请输入内容" v-model="newTodo" @keyup.enter.native="addOne" prefix-icon="el-icon-arrow-down" class="input-with-select"></el-input>
    <ul>
      <li v-for="(v,i) in getterTodo" :key="i">
        <item :data="v" :index="i"></item>
      </li>
    </ul>
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
  public day: Date = new Date().formatDate('yyyy-MM-dd');
  public userInfo: UserInfo = get("USER_INFO");
  @State('todo') public getterTodo!: [];
  @State("id") public id!: '';
  // @Mutation("queryTodo") setList!: (v: any) => void;
  @Mutation("addTodo") addTodo!: (v: any) => void;
  @Action("setTodo") setTodo!: (obj:any) => void;
  // say(p: string): void {
  //   console.log("say", p);
  // }
  // get count() {
  //   return this.todo.length;
  // }

  public addOne(): void {
    if (this.newTodo) {
      let todoItem = {
        user_id: this.id,
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
    // !this.getterTodo.length && this.setTodo({vm:this,id:this.id});
  }
}
</script>

<style lang="scss" scoped>
ul,li{
  list-style: none;
  margin: 0;
  padding: 0;
  text-align: left;
  cursor: pointer;
  h2{
  font-size: 16px;
  }
}
ul{
  margin:0 30px;
}
</style>
