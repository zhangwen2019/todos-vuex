// vuex的数据
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// vuex的状态
const state = {
  // 任务列表
  list: [
    { id: 1, name: '学习vue', done: true },
    { id: 2, name: '学习react', done: false },
    { id: 3, name: '学习angular', done: false }
  ]
}
// vuex的mutations(同步代码,每个函数都会接受一个state,第一个参数)
const mutations = {
  change (state, id) {
    const todo = state.list.find(item => item.id === id)
    todo.done = !todo.done
  },
  add (state, name) {
    state.list.unshift({
      id: Date.now(),
      name,
      done: false
    })
  },
  del (state, id) {
    state.list = state.list.filter(item => item.id !== id)
  },
  edited (state, payLoad) {
    // payLoad 额外的参数
    // 找到编辑id对应的数据进行修改
    const todo = state.list.find(item => item.id === payLoad.id)
    todo.name = payLoad.name
  },
  invertChecked (state, value) {
    console.log(this)// 这里面的this是Store
    // 将所有的任务的状态改为!boole
    // state.list = state.list.map(item => item.done = !boole)
    state.list.forEach(item => {
      item.done = value
    })
  },
  clearCompleted (state) {
    state.list = state.list.filter(item => !item.done)
  }
}
// vuex自己的计算属性(getters, 会根据state的数据进行计算得到一个新的属性)
// 使用的场景(当多个组件需要使用到state数据计算得到的新属性的时候)
// 注意: getters中所有的函数参数都是state
const getters = {
  leftCount (state) {
    // 未完成任务的数目
    return state.list.filter(item => !item.done).length
  }
  // showList (state) {
  //   // 根据路由的变化通过state计算出不同的数据
  //   const { path } = this.$route
  //   let dataList
  //   switch (path) {
  //     case '/':
  //       dataList = state.list
  //       break
  //     case '/active':
  //       // 未完成的
  //       dataList = state.list.filter(item => !item.done)
  //       break
  //     case '/completed':
  //       dataList = state.list.filter(item => item.done)
  //       break
  //     default: dataList = state.list
  //       break
  //   }
  //   return dataList
  // }
}

// vuex的同步代码(mutations)

const store = new Vuex.Store({
  // 严格模式(开发环境使用,不允许组件修改store提供的数据,由于性能的问题在生产环境应该去掉严格模式)
  strict: true,
  state,
  mutations,
  getters
})

export default store
