<!-- eslint-disable no-unused-vars -->
<template>
  <div class="table">
    <div class="option-part">
            <a-button type="primary" @click="onSetCellType">设置第E3单元格type为ReadOnlyType</a-button>
        </div>
    <div id="CustomCellTypeDemo" class="handsonTable"></div>
  </div>
</template>

<script setup>
import { onMounted, nextTick } from 'vue';
// 官方链接：https://handsontable.com/docs/javascript-data-grid/numeric-cell-type/
import 'handsontable/dist/handsontable.full.min.css';
import Handsontable from 'handsontable';
import
zhCN
  from 'handsontable/es/i18n/languages/zh-CN.js';
Handsontable.languages.registerLanguageDictionary(zhCN);
import ReadOnlyType from './cellTypesCustom/ReadOnlyType';

const tableData = [
  { id: 1, name: 'Ted', isActive: true, color: 'orange', date: '2015-01-01',},
  { id: 2, name: 'John', isActive: false, color: 'black', date: '2023-11-09',remark:'看一眼，满是繁华;忘一眼，人事全非，还记得我吻你的额头，那是十八岁的夜晚，你笑着说，我会是你这一生最爱的那个，可现在呢，空房间里飘荡着浓烈的酒精味，一个人的孤单，听着伤感的音乐，带上耳机，泪水无处可躲，我第一次尝到了泪水的味道，咸咸的，很苦涩，在你离开之后，我把你的东西全都扔掉了，唯一没有扔掉的是我们的回忆，虽然我的爱情满目疮痍，不忍直视，但是我不后悔曾经爱过你，我苦笑着释怀这一切，你已不会再回来。****看一眼，满是繁华;忘一眼，人事全非，还记得我吻你 的额头，那是十八岁的夜晚，你笑着说，我会是你这一生最爱的那个，可现在呢，空房间里飘荡着浓烈的酒精味，一个人的孤单，听着伤感的音乐，带上耳机，泪水无处可躲，我第一次尝到了泪水的味道，咸咸的，很苦涩，在你离开之后，我把你的东西全都扔掉了，唯一没有扔掉的是我们的回忆，虽然我的爱情满目疮痍，不忍直视，但是我不后悔曾经爱过你，我苦笑着释怀这一切，你已不会再回来。'  },
  { id: 3, name: 'Al', isActive: true, color: 'red', date: null, remark: '黛玉笑道：“你说你会‘过目成诵’，难道我就不能‘一目十行’了！”(曹雪芹《红楼梦》)“You needn’t imagine you’re the only one with a good memory，”said Daiyu laughingly，“I suppose I’m allowed to remember lines too if I like.”' },
  { id: 4, name: 'Ben', isActive: false, color: 'blue', date: null, remark: 'It‘s been a long day without you my friend' },
  { id: 5, name: 'Jane', isActive: false, color: 'blue', date: null, remark: 'Wherever you are, and whoever you may be, there is one thing in which you and I are just alike at this moment, all in all the moments of our existence. We are not at rest; we are on a journey. Our life is a movement, a tendency, a steady, ceaseless progress towards an unseen goal. We are gaining something, or losing something, every day.' }

]
// eslint-disable-next-line no-unused-vars
const yellowRenderer = function (instance, td, row, col, prop, value, cellProperties) {
  Handsontable.renderers.TextRenderer.apply(this, arguments);
  td.style.backgroundColor = 'yellow';

};

// eslint-disable-next-line no-unused-vars
const greenRenderer = function (instance, td, row, col, prop, value, cellProperties) {
  Handsontable.renderers.TextRenderer.apply(this, arguments);
  td.style.backgroundColor = 'green';

};
// eslint-disable-next-line no-unused-vars
let hot = null
let hotOption = {
  data: tableData,
  width: '100%',
  height: 'auto',
  colHeaders: true,
  rowHeaders: true,
  colWidths: 100,
  rowHeights: 50,
  manualColumnResize: true,
  contextMenu: true,
  persistentState: true,
  licenseKey: 'non-commercial-and-evaluation',
  language: 'zh-CN',
  columns: [
    { data: "id", type: 'text' },
    // 'text' is default, you don't actually need to declare it
    { data: "name", renderer: yellowRenderer },
    // use default 'text' cell type but overwrite its renderer with yellowRenderer
    { data: "isActive", type: 'checkbox' },
    { data: "date", type: 'date', dateFormat: 'YYYY-MM-DD' },
    {
      data: "color",
      type: 'autocomplete',
      source: ["yellow", "red", "orange", "green", "blue", "gray", "black", "white"]
    },
    {
      data: "remark",
      type: 'text',
      width: 300
    }
  ],
  cell: [
    { row: 1, col: 0, renderer: greenRenderer },
    { row: 2, col: 0, readOnly: true },
    { row: 1, col: 3, type: 'ReadOnlyType' },

  ],
  // eslint-disable-next-line no-unused-vars
  cells: function (row, col, prop) {
    if (row === 0 && col === 0) {
      this.renderer = greenRenderer;
    }
    if (row === 1 && (col === 1||col===5)) {
      this.readOnly = true
    }
    if (row === 4 && col === 1) {
      this.type = 'ReadOnlyType'
    }
  }

}
let preTimer = 0
function afterOnCellMouseUp(e, coords) {
  // 双击
  const timer = new Date();
  let doubleClick = false;
  if (preTimer && timer - preTimer < 400) {
    doubleClick = true;
  }
  preTimer = timer;
  if (!doubleClick) {
    return
  }
  if (coords.col === 5 && coords.row === 4) {
    const tdDom = hot.getCell(coords.row, coords.col);
    nextTick(() => {
      const activeEditor = hot.getActiveEditor();
      const TEXTAREA = activeEditor.TEXTAREA;
      const tdWidth = (tdDom.clientWidth || tdDom.innerWidth) - 8;
      // 处理最大宽度，智答icon遮挡
      const textAreaWidth = TEXTAREA.clientWidth || TEXTAREA.innerWidthh;
      if (textAreaWidth > tdWidth) {
        activeEditor.autoResize.init(TEXTAREA, {
          maxWidth: `${textAreaWidth - 100}px`,
        });
        TEXTAREA.style.width = `${textAreaWidth - 100}px`;
      }
    });
  }

}
function beforeOnCellDblClick(event, coords, elem) {
  console.log('beforeOnCellDblClick', event, coords, elem);
}
// 注册自定义cellType
Handsontable.cellTypes.registerCellType(
  "ReadOnlyType",
  ReadOnlyType,
);
function initHandsontable() {
  const container = document.querySelector('#CustomCellTypeDemo');
  hot = new Handsontable(container, hotOption);
  hot.addHook("afterOnCellMouseUp", afterOnCellMouseUp);
  hot.addHook("beforeOnCellDblClick", beforeOnCellDblClick);

}
function onSetCellType(){
  hot.updateSettings({
        cell:[...hotOption.cell,{row:2,col:4,type:'ReadOnlyType'}]
    })
}

onMounted(() => {
  initHandsontable()
})
</script>
<style lang="less" scoped>
:deep(.custom-cell){
  color:aquamarine
}

</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->

