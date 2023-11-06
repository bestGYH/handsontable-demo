<template>
  <a-tabs v-model:activeKey="activeKey">
    <a-tab-pane key="1" tab="基础demo"> <BaseDemo/></a-tab-pane>
    <a-tab-pane key="2" tab="SummaryDemo" ><SummaryDemo/></a-tab-pane>
    <a-tab-pane key="3" tab="CustomCelltype" ><CustomCellTypeDemo/></a-tab-pane>
  </a-tabs>
</template>
<script  setup>
import BaseDemo from './components/BaseDemo.vue'
import SummaryDemo from './components/SummaryDemo.vue'
import CustomCellTypeDemo from './components/CustomCellType/CustomCellTypeDemo.vue'


import { ref } from 'vue';
const activeKey = ref('3');
</script>
<style>
@import "@/assets/common.less";

#app{
  margin:16px;
}
</style>
