<template>
  <div class="main">
    <div class="todo">
      <el-input placeholder="请输入内容" v-model.trim="newTodo" @keyup.enter.native="addOne" prefix-icon="el-icon-arrow-down" class="input-with-select"></el-input>
      <ul>
        <li v-for="(v,i) in getterTodo" :key="i">
          <item :data="v" :index="i"></item>
        </li>
      </ul>
      <div class="page">
        <el-pagination :hide-on-single-page="hidePage" @current-change="currentChange" :total="total" layout="prev, pager, next">
        </el-pagination>
        <div class="clear">
          <el-button type="text" @click="clear">Clear completed</el-button>
        </div>
      </div>
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
  public pageIndex: number = 1;
  public day: Date = new Date().formatDate("yyyy-MM-dd");
  public userInfo: UserInfo = get("USER_INFO");
  @Getter("todo") public getterTodo!: [];
  @Getter("id") public id!: "";
  @Getter("total") public total!: 1;
  // @Mutation("queryTodo") setList!: (v: any) => void;
  @Mutation("addTodo") addTodo!: (v: any) => void;
  @Action("setTodo") setTodo!: (obj: any) => void;
  // say(p: string): void {
  //   console.log("say", p);
  // }

  get hidePage() {
    return this.total <= 10;
  }

  public currentChange(pageIndex: number): void {
    this.pageIndex = pageIndex;
    this.setTodo({
      vm: this,
      id: this.id || this.userInfo.id,
      offset: (this.pageIndex - 1) * 10
    });
  }

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
            // this.addTodo(todoItem);
            this.setTodo({
              vm: this,
              id: this.id || this.userInfo.id,
              offset: (this.pageIndex - 1) * 10
            });
          }
        });
    } else {
      this.$message({
        message: "请输入代办事项",
        type: "warning"
      });
    }
  }

  public async clear() {
    let res = await this.$http.delete("http://localhost:7001/clearComputed", {
      day: this.day
    });
    if (res.data.code == 200) {
      this.setTodo({
        vm: this,
        id: this.id || this.userInfo.id,
        offset: (this.pageIndex - 1) * 10
      });
    } else {
      this.$message({
        message: res.data.msg,
        type: "warning"
      });
    }
  }

  mounted() {
    !this.getterTodo.length &&
      this.setTodo({ vm: this, id: this.id || this.userInfo.id, offset: 0 });
  }
}
</script>

<style lang="scss" scoped>
.main {
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
  padding-bottom: 20px;
  border: 1px solid #eee;
  border-top: none;
  ::v-deep .el-input__inner {
    border: none;
    border-bottom: 1px solid #dcdfe6;
    font-size: 16px;
    height: 50px;
    line-height: 50px;
  }
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
  .page {
    padding-left: 20px;
    padding-top: 20px;
    overflow: hidden;
    ::v-deep .el-pagination {
      float: left;
    }
    .clear {
      float: right;
      padding-right: 20px;
      ::v-deep .el-button {
        line-height: 28px;
        height: 28px;
        padding: 0;
      }
    }
  }
  .item {
    ::v-deep p {
      margin: 0;
      height: 48px;
      line-height: 48px;
      user-select: none;
      width: 538px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 16px;
    }
    ::v-deep .el-divider {
      margin: 0;
    }
    ::v-deep .el-input__inner {
      border: none;
      padding-left: 0;
      height: 48px;
      font-size: 16px;
      line-height: 48px;
    }
  }
}
</style>
