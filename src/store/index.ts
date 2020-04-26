import Vue from 'vue';
import Vuex from 'vuex';
import { TD } from '../types/todo';
Vue.use(Vuex);

interface List {
  todo: TD[];
  is: boolean;
  id: string;
}
export default new Vuex.Store<List>({
  state: {
    todo: [],
    is: true,
    id: '',
  },
  mutations: {
    queryTodo(state, arr) {
      state.todo = arr;
    },
    setUserId(state, str) {
      state.id = str;
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
