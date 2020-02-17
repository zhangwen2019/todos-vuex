<template>
    <footer class="footer" v-show="footerShow">
      <!-- This should be `0 items left` by default -->
      <span class="todo-count">
        <slot name="leftCount" :leftCount="leftCount">
          <strong>{{leftCount}}</strong> item left
        </slot>
      </span>
      <!-- Remove this if you don't implement routing -->
      <ul class="filters">
        <li>
          <!-- a链接有样式 class="selected" 在改为router-link时要注意样式,该样式给a链接加上了border-color-->
          <!-- <a class="selected" href="#/">All</a> -->
          <!--
            router-link会给激活的链接加上两个类名(需要修改为selected)
            router-link-exact-active 和 router-link-active
          -->
          <router-link exact to="/">All</router-link>
        </li>
        <li>
          <!-- <a href="#/active">Active</a> -->
          <router-link to="/active">Active</router-link>
        </li>
        <li>
          <!-- <a href="#/completed">Completed</a> -->
          <router-link to="/completed">Completed</router-link>
        </li>
      </ul>
      <!-- Hidden if no completed items are left ↓ -->
      <button v-show="clearShow" @click="clearCompleted" class="clear-completed"><slot>Clear completed</slot></button>
    </footer>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
// 通过mapGetters接收vuex的计算属性
export default {
  computed: {
    ...mapState(['list']),
    // vuex的计算属性
    ...mapGetters(['leftCount']),
    // 提供自己组件的计算属性
    // footer的显示与隐藏
    footerShow () {
      return this.list.length > 0
    },
    // 清除完成的按钮的显示与隐藏(只要有完成的就显示)
    clearShow () {
      // some方法返回一个布尔值
      return this.list.some(item => item.done)
    }
  },
  methods: {
    clearCompleted () {
      // 清除已完成的
      this.$store.commit('clearCompleted')
    }
  }
}
</script>

<style>

</style>
