import Vue from 'vue';
import Vuex from 'vuex';
import { TD } from '../types/todo';
Vue.use(Vuex);

interface List {
  todo: TD[];
  is: boolean;
  id: string;
  total: number;
}

const day: Date = new Date().formatDate('yyyy-MM-dd');

export default new Vuex.Store<List>({
  state: {
    todo: [],
    is: true,
    id: '',
    total: 1,
  },
  mutations: {
    async queryTodo(state, vm: any) {
      const res = await vm.vm.$http.get('http://localhost:7001/queryTodo', {
        params: {
          user_id: vm.id,
          day,
          offset: vm.offset || 0,
        },
      });
      await (state.todo = []);
      await (state.total = res.data.total);
      await (state.todo.push(...res.data.data));
    },
    setUserId(state, str) {
      state.id = str;
    },
    addTodo(state, newTodo) {
      state.todo.push(newTodo);
    },
  },
  getters: {
    todo(state) {
      return state.todo;
    },
    id(state) {
      return state.id;
    },
    total(state) {
      return state.total;
    },
  },
  actions: {
    setId({ commit }, obj: any) {
      commit('setUserId', obj.id);
      commit('queryTodo', obj);
    },
    setTodo({ commit }, obj: any) {
      commit('queryTodo', obj);
    },
  },
  modules: {
  },
});
