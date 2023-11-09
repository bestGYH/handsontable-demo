<!-- eslint-disable no-unused-vars -->
<template>
    <div class="table">
        <div class="option-part">

        </div>
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
// eslint-disable-next-line no-unused-vars
function safeHtmlRenderer(instance, td, row, col, prop, value, cellProperties) {
    // WARNING: Be sure you only allow certain HTML tags to avoid XSS threats.
    // Sanitize the "value" before passing it to the innerHTML property.
    td.innerHTML = value;
}

// eslint-disable-next-line no-unused-vars
function coverRenderer(instance, td, row, col, prop, value, cellProperties) {
    const img = document.createElement('img');

    img.src = value;

    img.addEventListener('mousedown', event => {
        event.preventDefault();
    });

    td.innerText = '';
    td.appendChild(img);

    return td;
}
let isChecked = false;
// eslint-disable-next-line no-unused-vars
function customRenderer(instance, td, row, col, prop, value, cellProperties) {
    // console.log('customRenderer', td, row, col, prop, value, cellProperties);
    Handsontable.renderers.TextRenderer.apply(this, arguments);

    if (isChecked) {
        td.style.backgroundColor = 'yellow';
    } else {
        td.style.backgroundColor = 'white';
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
    { data: 'cover', renderer: coverRenderer },
    {},
    { renderer: customRenderer },
    { data: 'email', validator: emailValidator, allowInvalid: false }
]
let cell = [
    { row: 1, col: 2, renderer: customRenderer },
    { row: 1, col: 4, placeholder: 'empty cell', type: 'text', readOnly: true, readOnlyCellClassName: 'is-readOnly', },
    // { row: 1, col: 2, renderer: 'DiversityRenderer' },

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
// eslint-disable-next-line no-unused-vars
let DiversityRendererF =  new DiversityRenderer(Handsontable)
console.log('DiversityRendererF',DiversityRendererF);
Handsontable.renderers.registerRenderer('DiversityRenderer',DiversityRendererF.diversityRenderer)
function initHandsontable() {
    const container = document.querySelector('#CustomRendererDemo');
    hot = new Handsontable(container, hotOption);


    container.addEventListener('mousedown', event => {
        if (event.target.nodeName == 'INPUT' && event.target.className == 'checker') {
            event.stopPropagation();
        }
    });
    container.addEventListener('mouseup', event => {
        if (event.target.nodeName == 'INPUT' && event.target.className == 'checker') {
            isChecked = !event.target.checked;
            hot.setCellMeta(1, 4, 'renderer', customRenderer)
            hot.setCellMeta(2, 2, 'renderer', customRenderer)

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
  
  