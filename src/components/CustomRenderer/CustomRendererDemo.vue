<!-- eslint-disable no-unused-vars -->
<template>
    <div class="option-part">
        <a-button type="primary" @click="onSetCellType">使用插件api</a-button>
    </div>
    <div class="table">
        <div id="CustomRendererDemo" class="handsonTable"></div>
    </div>
</template>
  
<script setup>

// 官方链接：https://handsontable.com/docs/javascript-data-grid/cell-renderer/
import 'handsontable/dist/handsontable.full.min.css';
import Handsontable from 'handsontable';
// eslint-disable-next-line no-unused-vars
import { onMounted, ref } from 'vue';
import
zhCN
    from 'handsontable/es/i18n/languages/zh-CN.js';
Handsontable.languages.registerLanguageDictionary(zhCN);
import 'handsontable/dist/handsontable.full.min.css';
import DiversityRenderer from './DiversityRenderer.js'

const emailValidator = (value, callback) => {
    setTimeout(() => {
        if (/.+@.+/.test(value)) {
            callback(true);

        } else {
            callback(false);
        }
    }, 1000);
};
let tableData = [
    {
        title: '<a href="https://www.amazon.com/Professional-JavaScript-Developers-Nicholas-Zakas/dp/1118026691">Professional JavaScript for Web Developers</a>',
        description: 'This <a href="https://bit.ly/sM1bDf">book</a> provides a developer-level introduction along with more advanced and useful features of <b>JavaScript</b>.',
        comments: 'I would rate it &#x2605;&#x2605;&#x2605;&#x2605;&#x2606;',
        cover: 'https://handsontable.com/docs/img/examples/professional-javascript-developers-nicholas-zakas.jpg',
        email: 'Aaron.Kinley'
    },
    {
        title: '<a href="https://shop.oreilly.com/product/9780596517748.do">JavaScript: The Good Parts</a>',
        description: 'This book provides a developer-level introduction along with <b>more advanced</b> and useful features of JavaScript.',
        comments: 'This is the book about JavaScript',
        cover: 'https://handsontable.com/docs/img/examples/javascript-the-good-parts.jpg'
    },
    {
        title: '<a href="https://shop.oreilly.com/product/9780596805531.do">JavaScript: The Definitive Guide</a>',
        description: '<em>JavaScript: The Definitive Guide</em> provides a thorough description of the core <b>JavaScript</b> language and both the legacy and standard DOMs implemented in web browsers.',
        comments: 'I\'ve never actually read it, but the <a href="https://shop.oreilly.com/product/9780596805531.do">comments</a> are highly <strong>positive</strong>.',
        cover: 'https://handsontable.com/docs/img/examples/javascript-the-definitive-guide.jpg'
    }
]
function safeHtmlRenderer(instance, td, row, col, prop, value, cellProperties) {
    // WARNING: Be sure you only allow certain HTML tags to avoid XSS threats.
    // Sanitize the "value" before passing it to the innerHTML property.
    td.innerHTML = value;
}

let isChecked = false;
function customRenderer(instance, td, row, col, prop, value, cellProperties) {
    if (row === 2 && col === 2) {
        //劫持diversityRenderer方法，继承其属性.
        DiversityRendererF.diversityRenderer.apply(this, arguments);
    }
    console.log('customRenderer', td, row, col, prop, value, cellProperties);
    if (isChecked) {
        td.style.backgroundColor = 'yellow';
    } else {
        td.style.backgroundColor = '#a4a4eb';
    }
}
let colHeaders = (col) => {
    switch (col) {
        case 0:
            return 'Title';
        case 1:
            return 'Description';
        case 2:
            return 'Comments';
        case 3:
            return 'Cover';
        case 4:
            return '<b>Bold</b> and <em>Beautiful</em>';

        case 5:
            return `Some <input type="checkbox" class="checker" ${isChecked ? `checked="checked"` : ''}> checkbox`;
        case 6:
            return 'E-mail'
    }
}

let columns = [
    { data: 'title', renderer: 'html' },
    { data: 'description', renderer: 'html' },
    { data: 'comments', renderer: safeHtmlRenderer },
    { data: 'cover', renderer: 'DiversityRenderer' },
    {},
    { renderer: customRenderer },
    { data: 'email', validator: emailValidator, allowInvalid: false }
]
let cell = [
    { row: 1, col: 2, renderer: customRenderer },
    { row: 1, col: 4, placeholder: 'empty cell', type: 'text', readOnly: true, readOnlyCellClassName: 'is-readOnly', },
    { row: 2, col: 4, renderer: 'DiversityRenderer' },

]
let hot = null
let hotOption = {
    data: tableData,
    width: '100%',
    height: 'auto',
    rowHeaders: true,
    colWidths: 200,
    rowHeights: 50,
    manualColumnResize: true,
    contextMenu: true,
    persistentState: true,
    licenseKey: 'non-commercial-and-evaluation',
    language: 'zh-CN',
    colHeaders,
    columnSorting: true,
    columns,
    cell,
}
let DiversityRendererF = new DiversityRenderer(Handsontable)

console.log('DiversityRendererF', DiversityRendererF);
Handsontable.renderers.registerRenderer('DiversityRenderer', DiversityRendererF.diversityRenderer)
function afterRender(isForced) {
    console.log('afterRender', isForced);
}
/**
 * @Descripttion: 
 * @msg: 
 * @param {*} TD    HTMLTableCellElement	Currently rendered cell's TD element.
 * @param {*} row   Number	Visual row index.
 * @param {*} column    Number	Visual column index.
 * @param {*} prop  String | Number	Column property name or a column index, if datasource is an array of arrays.
 * @param {*} value *	Value of the rendered cell.
 * @param {*} cellProperties    Object	Object containing the cell's properties.
 * @return {*}
 */
function afterRenderer(TD, row, column, prop, value, cellProperties) {
    console.log('afterRenderer', TD, row, column, prop, value, cellProperties);
}
function initHandsontable() {
    const container = document.querySelector('#CustomRendererDemo');
    hot = new Handsontable(container, hotOption);

    hot.addHook(
        "afterRender",
        afterRender,
    );
    hot.addHook(
        "afterRenderer",
        afterRenderer,
    );
    container.addEventListener('mousedown', event => {
        if (event.target.nodeName == 'INPUT' && event.target.className == 'checker') {
            event.stopPropagation();
        }
    });
    container.addEventListener('mouseup', event => {
        if (event.target.nodeName == 'INPUT' && event.target.className == 'checker') {
            isChecked = !event.target.checked;
            hot.setCellMeta(1, 4, 'renderer', customRenderer)
            hot.setCellMeta(2, 4, 'renderer', customRenderer)
            hot.render();
        }
    });
}
onMounted(() => {
    initHandsontable()
})
</script>
<style lang="less" >
.handsonTable .is-readOnly {
    background: #EBF4FF;
    color: #1A253B;
    font-size: 12px;
    font-family: inherit;
}
</style>
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  
  