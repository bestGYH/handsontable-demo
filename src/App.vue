<template>
  <a-tabs v-model:activeKey="activeKey">
    <a-tab-pane key="1" tab="基础demo"> <BaseDemo/></a-tab-pane>
    <a-tab-pane key="2" tab="SummaryDemo" ><SummaryDemo/></a-tab-pane>
    <a-tab-pane key="3" tab="Custom Celltype" force-render>Content of Tab Pane 3</a-tab-pane>
  </a-tabs>
</template>
<!-- 
<script>
import BaseDemo from './components/BaseDemo.vue'
export default {
  name: 'App',
  components: {
    BaseDemo
  }
}
</script> -->
<script  setup>
import BaseDemo from './components/BaseDemo.vue'
import SummaryDemo from './components/SummaryDemo.vue'


import { ref } from 'vue';
const activeKey = ref('1');
</script>
<style>
#app{
  margin:16px;
}
</style>
