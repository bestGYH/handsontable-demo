<template>
  <div class="table">
    <div class="option-part">
      <a-checkbox v-model:checked="isHeaderShow" @change="onChangeAxios">是否展示坐标</a-checkbox>
      <a-checkbox v-model:checked="contextMenu" @change="onChangeMenu">是否启用菜单</a-checkbox>
    </div>
      <div id="BaseDemo" class="handsonTable"></div>
  </div>
</template>

<script setup>
import 'handsontable/dist/handsontable.full.min.css';
import Handsontable from 'handsontable';
import { onMounted } from 'vue';
import { ref } from 'vue';
// beforedMounted -> onBeforeMount
// mounted -> onMounted
import
zhCN
  from 'handsontable/es/i18n/languages/zh-CN.js';
Handsontable.languages.registerLanguageDictionary(zhCN);
// 配置坐标
let isHeaderShow = ref(true)
const onChangeAxios = (e) => {
  const newHeight = pluginManualColumnResize.setManualSize(2, 700)
  console.log('newHeight', newHeight);
  pluginManualColumnResize.saveManualRowHeights()
  console.log(pluginManualColumnResize.loadManualRowHeights());
  hot.render()
  const { checked } = e.target
  isHeaderShow.value = checked
  hot.updateSettings({
    rowHeaders: checked,
    colHeaders: checked
  })

}
// 配置菜单
let contextMenu = ref(true)
const onChangeMenu = (e) => {
  const { checked } = e.target
  contextMenu.value = checked
  hot.updateSettings({
    contextMenu: checked,
  })
}

function beforeOnCellMouseDown() {
  console.log('beforeOnCellMouseDown');
}
function afterSelectionEnd(row, column, row2, column2, preventScrolling, selectionLayerLevel) {
  console.log('afterSelectionEnd-row,column,row2,column2,preventScrolling,selectionLayerLevel');
  console.log('afterSelectionEnd-', row, column, row2, column2, preventScrolling, selectionLayerLevel);
  console.log('getSelected', hot.getSelected());
  console.log('getSelectedRange', hot.getSelectedRange());

}

// generate an array of arrays with dummy numeric data
const generateData = (rows = 3, columns = 7, additionalRows = true) => {
  let counter = 0;

  const array2d = [...new Array(rows)]
    // eslint-disable-next-line no-unused-vars
    .map(_ => [...new Array(columns)]
      // eslint-disable-next-line no-unused-vars
      .map(_ => counter++));

  // add an empty row at the bottom, to display column summaries
  if (additionalRows) {
    array2d.push([]);

  }

  return array2d;
};
let hot = null
let hotOption = {
  data: generateData(30, 10),
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
  fixedColumnsLeft: 3,
  fixedRowsTop: 5,
  // fixedRowsBottom: 3,
  manualColumnFreeze: true

}

let pluginManualColumnResize = null
function initHandsontable() {
  const container = document.querySelector('#BaseDemo');
  console.log('Handsontable', Handsontable);
  hot = new Handsontable(container, hotOption);
  hot.addHook(
    "beforeOnCellMouseDown",
    beforeOnCellMouseDown,
  );
  hot.addHook(
    "afterSelectionEnd",
    afterSelectionEnd,
  );
  hot.updateSettings({
    cells: function (row, col) {
      var cellProperties = {};

      if (row === 5 && col === 0) {
        cellProperties.readOnly = true;
      }
      if (row === 6 && col === 0) {
        cellProperties.editor = 'select'
        cellProperties.selectOptions = ['Kia', 'Nissan', 'Toyota', 'Honda']
      }
      return cellProperties;
    }

  });
  pluginManualColumnResize =
    hot.getPlugin("ManualRowResize");
  pluginManualColumnResize.enablePlugin();
}
onMounted(() => {
  initHandsontable()

})
</script>
<style>
.table {
  height: 500px;
  overflow: auto;

}
</style>

