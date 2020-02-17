<template>
  <div id="app">
      <section class="todoapp">
        <!-- todos头部 -->
        <todo-header></todo-header>
        <!-- This section should be hidden by default and shown when there are todos -->
        <!-- todos主体区域 -->
        <todo-main></todo-main>
        <!-- This footer should hidden by default and shown when there are todos -->
        <!-- todos底部区域 -->
        <todo-footer>
          清除未完成
          <template v-slot:leftCount="{leftCount}">
            剩余<strong> {{leftCount}} </strong>项任务
          </template>
        </todo-footer>
      </section>
  </div>
</template>

<script>
// 组件内局部导入
// import TodoHeader from './components/TodoHeader'
export default {
  // components: {
  //   TodoHeader
  // }
}
</script>
