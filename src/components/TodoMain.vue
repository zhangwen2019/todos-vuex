<template>
  <section class="main">
      <input id="toggle-all" class="toggle-all" type="checkbox" v-model="allChecked">
      <label v-show="showAllChecked" for="toggle-all">Mark all as complete</label>
      <ul class="todo-list">
        <!-- These are here just to show the structure of the list items -->
        <!-- List items should get the class `editing` when editing and `completed` when marked as completed -->
        <li :class="{completed: item.done, editing: item.id === currentId}" v-for="item in showList" :key="item.id">
          <div class="view">
            <input class="toggle" type="checkbox" :checked="item.done" @change="change(item.id)">
            <label @dblclick="handleEdit(item)">{{item.name}}</label>
            <button @click="del(item.id)" class="destroy"></button>
          </div>
          <input class="edit" v-focus="item.id === currentId" @blur="edited" @keyup.enter="edited" @keyup.esc="cancel" v-model="currentName">
        </li>
      </ul>
    </section>
</template>

<script>
// 列表渲染功能(直接渲染list数据)
// mapState可以帮助我们快速的生成计算属性  mapState会把vuex中的状态映射成为组件的计算属性
// 从而不用这样拿数据了($store.state.list)
import { mapState } from 'vuex'
export default {
  data () {
    return {
      currentId: '',
      currentName: ''
    }
  },
  computed: {
    // 将映射的所有组件展开到对象中(这样组件可以提供自己的计算属性)
    // 不用 list () { return this.$store.state.list }
    ...mapState(['list']),
    // ...mapGetters(['showList']),
    // 全选(双向绑定的计算属性)
    allChecked: {
      get () {
        return this.list.every(item => item.done)
      },
      set (value) {
        // 设置
        this.$store.commit('invertChecked', value)
      }
    },
    showAllChecked () {
      // 全选的显示与隐藏
      return this.list.length > 0
    },
    // 通过路由变化渲染不同的数据(截断vuex给的数据),也可以直接在vuex计算属性中得到,通过mapGetters映射(有问题)
    showList () {
      const { path } = this.$route
      let showData
      switch (path) {
        case '/':
          showData = this.list
          break
        case '/active':
          showData = this.list.filter(item => !item.done)
          break
        case '/completed':
          showData = this.list.filter(item => item.done)
          break
        default: showData = this.list
      }
      return showData
    }
  },
  methods: {
    change (id) {
      // 改变是否完成的状态(不可以自己修改vuex的store提供的数据,严格模式会报错)
      console.log(id)
      // const todo = this.find(item => item.id === id)
      // todo.done = !todo.done
      // 类似this.$emit(),让store自己修改(在mutations中,同步代码)
      this.$store.commit('change', id)
      // 只能传递两个参数(如需要传递多个参数,可以使用对象或者数组的形式)
    },
    del (id) {
      // 删除列表任务
      this.$store.commit('del', id)
    },
    handleEdit ({ id, name }) {
      // 显示编辑任务列表input框
      // 1.给li标签加上editing的类名(item.id === currentId)
      // 2.传递给vuex的mutations
      // 3.自动获取焦点
      this.currentId = id
      // 数据的回显(编辑的input框需要双向绑定currentName)
      this.currentName = name
      // 自动获取焦点(通过refs获取input框不行,这是遍历的)
      // console.log(this.$refs.editInput)
      // 通过自定义指令即可
    },
    edited () {
      // 在设置了@blur="edited"之后,回车,esc等按键也会触发失焦事件(加一个限制)
      if (!this.currentId) return
      console.log('触发了')
      // 回车编辑(传递给mutations)
      this.$store.commit('edited', {
        id: this.currentId,
        name: this.currentName
      })
      // 数据的清空(隐藏编辑框)
      this.currentId = ''
      this.currentName = ''
    },
    cancel () {
      // 取消修改
      this.currentId = ''
    }
    // 反选这样处理不好(使用双向绑定的计算属性)
    // invertChecked () {
    //   this.$store.commit('invertChecked', this.allChecked)
    // }
  },
  directives: {
    // 自定义指令(自动获取焦点)
    focus (el, binding) {
      binding.value && el.focus()
    }
  }
}
</script>

<style>

</style>
