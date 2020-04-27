import Vue from 'vue';
import Vuex from 'vuex';
import { TD } from '../types/todo';
Vue.use(Vuex);

interface List {
  todo: TD[];
  is: boolean;
  id: string;
}

const day: Date = new Date().formatDate('yyyy-MM-dd');

export default new Vuex.Store<List>({
  state: {
    todo: [],
    is: true,
    id: '',
  },
  mutations: {
    queryTodo(state, vm: any) {
      vm.vm.$http
        .get('http://localhost:7001/queryTodo', {
          params: {
            user_id: vm.id,
            day,
          },
        })
        .then((res: any) => {
          if (res.data.code === 200) {
            state.todo = res.data.data;
          } else {
            vm.vm.$message({
              message: res.data.msg,
              type: 'warning',
            });
          }
        });
    },
    setUserId(state, str) {
      state.id = str;
    },
    addTodo(state, newTodo) {
      state.todo.push(newTodo);
    },
  },
  actions: {
    setId({ commit }, obj: any) {
      commit('setUserId', obj.id);
      commit('queryTodo', obj, obj.id);
    },
    setTodo({ commit }, obj: any) {
      commit('queryTodo', obj, obj.id);
    },
  },
  modules: {
  },
});
