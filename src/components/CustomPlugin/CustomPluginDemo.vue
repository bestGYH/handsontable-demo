<template>
  <div class="table">
    <div class="option-part">
      <a-input-search
      style="width:400px;margin-right:24px;"
      v-model:value="searchValue"
      placeholder="input search text"
      enter-button="Search"
      size="middle"
      @search="onSearch"
    />
    <a-button type="primary" @click="onUseApi">Use plugin API(selectCell)</a-button>

     <h3>搜索结果：{{ searchResult }}</h3> 
    </div>
    <div id="CustomPluginDemo" class="handsonTable"></div>
  </div>
</template>
  
<script setup>
import 'handsontable/dist/handsontable.full.min.css';
import Handsontable from 'handsontable';
import { ref,onMounted, onDeactivated, onBeforeUnmount, onUnmounted } from 'vue';
import
zhCN
  from 'handsontable/es/i18n/languages/zh-CN.js';
Handsontable.languages.registerLanguageDictionary(zhCN);
// import {registerPlugin}  from 'handsontable/es/plugins';
import { CustomPlugin } from './CustomPlugin'
// generate an array of arrays with dummy numeric data
const generateData = (rows = 3, columns = 7, additionalRows = true) => {
  let counter = 0;

  const array2d = [...new Array(rows)]
    .map(_ => [...new Array(columns)]
      .map(_ => counter++));

  // add an empty row at the bottom, to display column summaries
  if (additionalRows) {
    array2d.push(['测试','测试搜索']);

  }

  return array2d;
};
let hot = null
// Handsontable.plugins.registerPlugin('customPlugin', CustomPlugin)
let hotOption = {
  data: generateData(10, 10),
  width: '100%',
  height: '100%',
  colHeaders: true,
  rowHeaders: true,
  colWidths: 100,
  rowHeights: 50,
  manualColumnResize: true,
  contextMenu: true,
  persistentState: true,
  licenseKey: 'non-commercial-and-evaluation',
  language: 'zh-CN',
  currentRowClassName: 'currentRow',
  currentColClassName: 'currentCol',
  commentedCellClassName: 'has-comment',
  invalidCellClassName: 'highlight--error',
  [CustomPlugin.PLUGIN_KEY]: true,
  search:true,
 

}
function afterDrawSelection(currentRow, currentColumn, cornersOfSelection) {
  const selection = hot?.selection;
  if (!selection) return;
  const [topRow, topColumn, bottomRow, bottomColumn] = cornersOfSelection;
  if (
    currentRow >= topRow &&
    currentRow <= bottomRow &&
    currentColumn >= topColumn &&
    currentColumn <= bottomColumn
  ) {
    // selected cell
    const { rowClassName, columnClassName } = selection.highlight.options;
    let addClassName = null;
    if (rowClassName && currentColumn) {
      addClassName = rowClassName;
    } else if (columnClassName && currentRow) {
      addClassName = columnClassName;
    }
    return addClassName;
  }
}
let customPluginInstance = null
function initHandsontable() {
  const container = document.querySelector('#CustomPluginDemo');
  hot = new Handsontable(container, hotOption);
  hot.addHook("afterDrawSelection", afterDrawSelection);
  console.log(hot.getPlugin('customPlugin'));
  customPluginInstance = hot.getPlugin('customPlugin')
}
function onUseApi() {
  customPluginInstance.externalMethodExample();
}
const searchValue = ref('')
let searchResult = ref('')
function onSearch(searchValue){
  const searchInstance = hot.getPlugin('search')
  searchInstance.setSearchResultClass('search-cell')
  searchResult.value =  searchInstance.query(searchValue)
  console.log(' searchInstance.query(测试)', searchResult.value);
  hot.render();
}
onMounted(() => {
  console.log('onMounted');
  initHandsontable()

})

</script>
<style>
.currentCol {
  color: Red
}

.currentRow {
  color: blueviolet
}

.has-comment {
  color: green
}

.highlight--error {
  color: blue
}
.search-cell{
 background:rgb(207, 174, 240)!important;
 color: blue

}
</style>
  
  