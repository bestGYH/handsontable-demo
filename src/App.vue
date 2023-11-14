<template>
  <a-tabs v-model:activeKey="activeKey" >
    <a-tab-pane key="1" tab="BaseDemo">
      <BaseDemo />
    </a-tab-pane>
    <a-tab-pane key="2" tab="SummaryDemo">
      <SummaryDemo />
    </a-tab-pane>
    <a-tab-pane key="3" tab="CustomCellTypeDemo">
      <CustomCellTypeDemo />
    </a-tab-pane>
    <a-tab-pane key="4" tab="CustomRendererDemo">
      <CustomRendererDemo />
    </a-tab-pane>
    <a-tab-pane key="5" tab="CustomPluginDemo">
      <CustomPluginDemo />
    </a-tab-pane>
    <a-tab-pane key="6" tab="FormatDemo">
      <FormatDemo />
    </a-tab-pane>

  </a-tabs>
</template>
<script  setup>
import BaseDemo from './components/BaseDemo.vue'
import SummaryDemo from './components/SummaryDemo.vue'
import CustomCellTypeDemo from './components/CustomCellType/CustomCellTypeDemo.vue'
import CustomRendererDemo from './components/CustomRenderer/CustomRendererDemo.vue'
import CustomPluginDemo from './components/CustomPlugin/CustomPluginDemo.vue'
import FormatDemo from './components/FormatDemo.vue'



import { ref } from 'vue';
const activeKey = ref('1');
</script>
<style>@import "@/assets/common.less";

#app {
  margin: 16px;
}</style>
