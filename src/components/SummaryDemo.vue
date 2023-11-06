<template>
    <div class="table">
    <div id="example2" class="handsonTable" language="zh-CN"></div>
    </div>
   
  </template>
  
  <script setup>
  import 'handsontable/dist/handsontable.full.min.css';
  import Handsontable from 'handsontable';
  
  import { onMounted } from 'vue';
  // beforedMounted -> onBeforeMount
  // mounted -> onMounted
  const testData = [
    [1, 2, 3, 4, 5, 5.1,0.3, '3c', '3c'],
    [6, 7, 8, 9, 10,5.2, 0.2, '4b', '4b'],
    [11, 12, 13, 14, 15,16, 0.3, 5,'a2c'],
    [16, 17, 18,'2023-03-04', '2023-03-04', 1, 0.3,  'b4', ],
    [],
    [],
    [],
    [],
  ]
  let hotOption = {
    // data: generateData(30, 10),
      // set Polish language
language: 'zh-CN',
    data: testData,
    width: '100%',
    height: 'auto',
    colHeaders: true,
    rowHeaders: true,
    colWidths: 100,
    rowHeights:50,
    manualColumnResize: true,
    licenseKey: 'non-commercial-and-evaluation',
    contextMenu: true,
    columnSummary: [
      {
        sourceColumn: 0,
        type: 'sum',
        // set this column summary to display its result in cell (4, 0)
        destinationRow: 4,
        destinationColumn: 0
      },
      {
        sourceColumn: 1,
        type: 'max',
        ranges: [
          [1], [2]
        ],
        // set this column summary to display its result in cell (4, 1)
        destinationRow: 0,
        destinationColumn: 1,
      },
      {
        sourceColumn: 0,
        type: 'count',
        // set this column summary to only summarize rows with physical indexes 0-5
        ranges: [
          [1,8]
        ],
        destinationRow: 5,
        destinationColumn: 2,
      },
      {
        sourceColumn: 3,
        type: 'sum',
        // set this column summary to display its result in cell (4, 0)
        destinationRow: 4,
        destinationColumn: 3,
        // suppressDataTypeErrors:false
      },
      {
        type: 'custom',
        destinationRow: 0,
        destinationColumn: 4,
        reversedRowCoords: true,
        ranges: [
          [8,3]
        ],
        // add your custom summary function
        customFunction: function (endpoint) {
          console.log('endpoint', endpoint);
          // implement your function here
          return 10000
        }
      },
    
      {
        type: 'average',
        destinationRow: 0,
        destinationColumn: 5,
        reversedRowCoords: true,//要在generateData添加的空行中显示列摘要，请将reversedrowcoordds选项设置为true，并将destinationRow选项设置为0
        // round this column summary result to two digits after the decimal point
        roundFloat: 2
      },
      {
        type: 'average',
        destinationRow: 0,
        destinationColumn: 6,
        reversedRowCoords: true,//要在generateData添加的空行中显示列摘要，请将reversedrowcoordds选项设置为true，并将destinationRow选项设置为0
        // round this column summary result to two digits after the decimal point
      },
      {
        type: 'sum',
        // set this column summary to display its result in cell (4, 0)
        destinationRow: 0,
        destinationColumn: 7,
        reversedRowCoords: true,
        // force this column summary to treat non-numeric values as numeric values
        forceNumeric: true
      },
      {
        type: 'sum',
        // set this column summary to display its result in cell (4, 0)
        destinationRow: 0,
        destinationColumn: 8,
        reversedRowCoords: true,
        // force this column summary to treat non-numeric values as numeric values
        forceNumeric: true
      },
  
   
    ]
  }
  
  // let hot = null
  function initHandsontable() {
    const container = document.querySelector('#example2');
   new Handsontable(container, hotOption);
  }
  onMounted(() => {
    initHandsontable()
  
  })
  </script>
  <style lang="less" scoped>
  .option-part {
    position: fixed;
    top: 80px;
    z-index: 2;
    background: #fff;
    width: 100%;
    height: 100px;
    padding-top: 16px;
    border-bottom: 1px solid #999;
  }
  .table{
    height: calc(100vh - 150px);
  
  }
  .handsonTable {
    position: relative;
    z-index: 1;
  }
  </style>
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  
  