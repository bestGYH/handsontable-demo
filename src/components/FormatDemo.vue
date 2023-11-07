<!-- eslint-disable no-unused-vars -->
<template>
    <div class="table">
        <div class="option-part">
            <span class="option-label">cellTypeList:</span> <a-select ref="select" v-model:value="value1" style="width: 120px"
                :options="options1" @change="handleChange"></a-select><br/>
                <span class="option-label">sourceData:</span> {{allData[value1]  }}
        </div>
        <div id="FormatDemo" class="handsonTable"></div>

    </div>
</template>
  
<script setup>

// 官方链接： https://handsontable.com/docs/javascript-data-grid/numeric-cell-type/?_ga=2.139984691.1892691033.1699261278-640919250.1672052450
import 'handsontable/dist/handsontable.full.min.css';
import Handsontable from 'handsontable';
import {  onMounted, ref } from 'vue';
import
zhCN
    from 'handsontable/es/i18n/languages/zh-CN.js';
Handsontable.languages.registerLanguageDictionary(zhCN);
import numbro from 'numbro';
import jaJP from 'numbro/languages/ja-JP';
import trTR from 'numbro/languages/tr-TR';
import deDE from 'numbro/languages/de-DE';
import 'handsontable/dist/handsontable.full.min.css';
// register the languages you need
numbro.registerLanguage(jaJP);
numbro.registerLanguage(trTR);//土耳其
numbro.registerLanguage(deDE);
const value1 = ref('time');
const options1 = ref([
    {
        value: 'date',
        label: 'date',
    },
    {
        value: 'time',
        label: 'time',
    },
    {
        value: 'numeric',
        label: 'numeric',
    },

]);
const handleChange = (value) => {
    console.log(`selected ${value}`);
    columns = allColumns[value]
    tableData = allData[value]
    colHeaders = allColHeaders[value]
    hot.updateSettings({
    data: tableData,
    columns,
    colHeaders
  })
};
// define formats
const formatJP = {
    pattern: '0,0.00 $',
    culture: 'ja-JP',
};

const formatTR = {
    pattern: '0,0.00 $',
    culture: 'tr-TR',
};
const formatDE = {
    pattern: '0,0.00 $',
    culture: 'de-DE',
};
const formatUS = {
    pattern: '$0,0.00',
        culture: 'en-US', // this is the default culture, set up for USD
};
const allColumns = {
    numeric: [
        {
            data: 'productName',
            type: 'text',
            width: '120',
        },
        {
            data: 'JP_price',
            type: 'numeric',
            width: '120',
            numericFormat: formatJP,
        },
        {
            data: 'TR_price',
            type: 'numeric',
            width: '120',
            numericFormat: formatTR,
        },
        {
            data: 'DE_price',
            type: 'numeric',
            width: '120',
            numericFormat: formatDE,
        },
        {
            data: 'US_price',
            type: 'numeric',
            width: '120',
            numericFormat: formatUS,
        },
    ],
    date: [
        {
            type: 'text',
        },
        {
            // 2nd cell is simple text, no special options here
        },
        {
            type: 'date',
            dateFormat: 'MM/DD/YYYY',
            correctFormat: true,
            defaultDate: '01/01/1900',
            // datePicker additional options
            // (see https://github.com/dbushell/Pikaday#configuration)
            datePickerConfig: {
                // First day of the week (0: Sunday, 1: Monday, etc)
                firstDay: 0,
                showWeekNumber: true,
                disableDayFn(date) {
                    // Disable Sunday and Saturday
                    return date.getDay() === 0 || date.getDay() === 6;
                }
            }
        },
        {
            type: 'numeric',
            numericFormat: {
                pattern: '$ 0,0.00'
            }
        }
    ],
    time: [
        {
            type: 'text',
        },
        {
            // 2nd cell is simple text, no special options here
        },
        {
            type: 'time',
            timeFormat: 'h:mm:ss a',
            correctFormat: true
        },
        {
            type: 'numeric',
            numericFormat: {
                pattern: '$ 0,0.00'
            }
        }
    ]
}
const allData = {
    numeric: [
    {
      productName: 'Product A',
      JP_price: 1450.32,
      TR_price: 202.14,
      DE_price: 302.14,
      US_price: 2,

    },
    {
      productName: 'Product B',
      JP_price: 2430.22,
      TR_price: 338.86,
    },
    {
      productName: 'Product C',
      JP_price: 3120.10,
      TR_price: 435.20,
    },
  ],
    date: [
        ['Mercedes', 'A 160', '01/14/2021', 6999.95],
        ['Citroen', 'C4 Coupe', '12/01/2022', 8330],
        ['Audi', 'A4 Avant', '11/19/2023', 33900],
        ['Opel', 'Astra', '02/02/2021', 7000],
        ['BMW', '320i Coupe', '07/24/2022', 30500]
    ],
    time: [
        ['Mercedes', 'A 160', 1332284400000, 6999.95],
        ['Citroen', 'C4 Coupe', '10 30', 8330],
        ['Audi', 'A4 Avant', '8:00 PM', 33900],
        ['Opel', 'Astra', 1332284400000, 7000],
        ['BMW', '320i Coupe', 1332284400000, 30500]
    ]

}
const allColHeaders = {
    numeric: ['Product name', 'Price in Japan', 'Price in Turkey', 'Price in German'],
    date:['Car', 'Model', 'Registration date', 'Price'],
    time:['Car', 'Model', 'Registration time', 'Price'],

}

let columns = allColumns[value1.value]
let tableData =[... allData[value1.value]]
let colHeaders = allColHeaders[value1.value]


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

}
function initHandsontable() {
    const container = document.querySelector('#FormatDemo');
    hot = new Handsontable(container, hotOption);
    hot.validateCells();

  /* 
  By default, the values entered into the time-type column are not validated,
   so if you want them to display in the proper format, 
remember to call hot.validateCells() after the table initialization.
*/
    
}
onMounted(() => {
    initHandsontable()
})
</script>
<style lang="less" scoped></style>
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  
  