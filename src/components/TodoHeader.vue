<template>
  <header class="header">
    <h1>todos</h1>
    <input v-model="name" @keyup.enter="add" class="new-todo" placeholder="What needs to be done?" autofocus>
   </header>
</template>

<script>
// 实现添加任务的功能(双向绑定本身的数据)
export default {
  data () {
    return {
      name: ''
    }
  },
  methods: {
    // 添加任务
    add () {
      this.$store.commit('add', this.name)
      // 提交给mutations之后,将name清空
      this.name = ''
    }
  }
}
</script>

<style>

</style>
