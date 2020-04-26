<template>
  <div style="width:900px;margin:0 auto">
    <el-input placeholder="请输入内容" v-model="newTodo" @keyup.enter.native="addOne" prefix-icon="el-icon-arrow-down" class="input-with-select"></el-input>
    <ul>
      <li v-for="(v,i) in todo" :key="i">
        <item :data="v" :index="i" @say="say"></item>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import item from "@/components/item";
import { Component, Vue } from "vue-property-decorator";
import { TD, UserInfo } from "@/types/todo";
import { State, Getter, Action, Mutation } from "vuex-class";
import { get } from "@/tool";
@Component({
  name: "home",
  components: {
    item
  }
})
export default class Home extends Vue {
  userInfo: UserInfo = get("USER_INFO");
  newTodo: string = "";
  day: Date = new Date().formatDate("yyyy-MM-dd");
  @State("todo") public todo!: [];
  @State("is") public is!: true;
  @Mutation("queryTodo") setList!: (v: any) => void;
  @Mutation("addTodo") addTodo!: (v: any) => void;
  say(p: string): void {
    console.log("say", p);
  }
  get count() {
    return this.todo.length;
  }
  public queryList(): void {
    this.$http
      .get("http://localhost:7001/queryTodo", {
        params: {
          userId: this.userInfo.id,
          day: this.day
        }
      })
      .then((res: any) => {
        this.$message({
          message: res.data.msg,
          type: res.data.code == 200 ? "success" : "warning"
        });
        if (res.data.code == 200) {
          this.setList(res.data.data);
        }
      });
  }
  public addOne(): void {
    if (this.newTodo) {
      let todoItem = {
        user_id: this.userInfo.id,
        day: this.day,
        desc: this.newTodo,
        computed: false
      };
      this.$http
        .get("http://localhost:7001/addOneTodo", {
          params: todoItem
        })
        .then((res: any) => {
          this.$message({
            message: res.data.msg,
            type: res.data.code == 200 ? "success" : "warning"
          });
          if (res.data.code == 200) {
            this.newTodo = ""
            this.addTodo(todoItem);
          }
        });
    }else{
      this.$message({
            message: "请输入代办事项",
            type: "warning"
          });
    }
  }
  created() {
    !this.todo.length && this.queryList();
  }
}
</script>
