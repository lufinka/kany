<template>
  <div class="home">
    <ul>
      <li v-for="(v,i) in todo" :key="i">
        <item :data="v" :index="i" @say="say"></item>
      </li>
    </ul>
    <button @click="changeIs">点击{{is}}</button>
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import item from "@/components/item";
import { Component, Vue } from "vue-property-decorator";
import { TD } from "@/types/todo";
// 枚举
// enum Color  {'green','red','blue'}
// let c:Color = Color.red
// console.log('ccc',c)
import { State, Getter, Action, Mutation, namespace } from "vuex-class";
@Component({
  name: "home",
  components: {
    HelloWorld,
    item
  }
})
export default class Home extends Vue {
  @State("todo") public todo!: [];
  @State("is") public is!: true;
  @Mutation("mutationIs") ky !:(v:boolean)=>void;
  say(p: string): void {
    console.log("say", p);
  }
  get count() {
    return this.todo.length;
  }
  changeIs() {
    this.ky(false);
  }
  mounted(){
  }
}
</script>
