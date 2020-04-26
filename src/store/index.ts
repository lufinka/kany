import Vue from 'vue';
import Vuex from 'vuex';
import { TD } from '@/types/todo';
Vue.use(Vuex);

interface List {
  todo: TD[];
  is: boolean;
}
export default new Vuex.Store<List>({
  state: {
    todo: [],
    is: true,
  },
  mutations: {
    queryTodo(state, arr) {
      state.todo = arr;
    },
    addTodo(state, newTodo) {
      state.todo.push(newTodo);
    },
  },
  actions: {
  },
  modules: {
  },
});
