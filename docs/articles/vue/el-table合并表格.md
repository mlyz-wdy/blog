# 使用el-table 合并表格，表格中插入小计

下面这个表格，表格中有小的汇总，表格后面有汇总计算，**表格的字段需动态生成**

**以下是用 `vue3` 写的项目**

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3b614d58e4b641c792cab04d6e09364b~tplv-k3u1fbpfcp-watermark.image?)

## 整理表格字段

`tableColumn` 动态表格字段

```html
  <el-table
    :data="tableData"
    border
    show-summary
    :summary-method="getSummaries"
    style="width: 100%"
    :span-method="arraySpanMethod"
    :cell-style="cellStyleMethod">
    <!-- <el-table-column prop="OrgName" label="收集对象" width="180" fixed /> -->
    <el-table-column type="index" width="82" label="序号" />
    <el-table-column prop="name" label="填报部门" />
    <el-table-column prop="date" label="统计周期" />
    <el-table-column v-for="val in tableColumn" :prop="val.prop" :label="val.label" />
  </el-table>
```

## 处理数据

后端获取的数据不符合中间插入汇总，所以需要我们重新构造一下数据，基本注释都在下面

```js
// 处理要合并的数据
let spanNameArr = []
function formatData() {
  // tableData 后端获取的数据
  let data = JSON.parse(JSON.stringify(tableData.value))
  let pos = 0
  let temp = {}

  // 循环后端返回的数据
  for (let i = 0; i < data.length; i++) {
    // 构造一个临时数据对象，用于存储每个循环的数据
    temp[data[i].name] ? temp[data[i].name] : (temp[data[i].name] = {})
    // 因为表格的字段是动态生成的，所以要循环每个字段来添加数据，如果是确定某个字段需要汇总，那简单很多
    for (const key in data[i]) {
      // 判断是数字，但不是手机号，可以累加起来
      if (isNumberOrDecimalButNotPhone(data[i][key])) {
        // 判断不是数字的，重置为0
        if (temp[data[i].name][key] === undefined || isNaN(temp[data[i].name][key])) {
          temp[data[i].name][key] = 0
        }
        temp[data[i].name][key] += parseFloat(data[i][key])
      } else if (isNumberOrDecimalButNotPhone(temp[data[i].name][key])) {
      } else {
        temp[data[i].name][key] = '--'
      }
    }
    // 利用 name 公司名字区分，如果新一行的数据跟上一行不同，是需要下一个合并了，此处插入一个汇总
    if (i > 0 && data[i].name !== data[i - 1].name) {
      tableData.value.splice(i + pos, 0, {
        ...temp[data[i - 1].name],
        date: '汇总',
        name: data[i - 1].name
      })
      pos++
    } else if (i === data.length - 1) {
      // 最后一行加个汇总
      tableData.value.push({
        ...temp[data[i - 1].name],
        date: '汇总',
        name: data[i - 1].name
      })
      pos++
    }
  }

  getSpanArr(tableData, spanNameArr, 'name')
}

// 只包含数字或小数点，但不是手机号
function isNumberOrDecimalButNotPhone(str) {
  return /^1[0-9]{10}$/.test(str) === false && /^[\d.]+$/.test(str)
}

```

## 处理行信息，判断是否合并
```js
// 处理标记
function getSpanArr(data, tempSpanNameArr, label) {
  let temPos = 0
  // data就是我们从后台拿到的数据
  for (let i = 0; i < data.value.length; i++) {
    if (i === 0) {
      tempSpanNameArr.push(1)
      temPos = 0
    } else {
      // 判断当前元素与上一个元素是否相同，放入上下行是否需要合并的标识
      if (data.value[i][label] === data.value[i - 1][label]) {
        tempSpanNameArr[temPos] += 1
        tempSpanNameArr.push(0)
      } else {
        tempSpanNameArr.push(1)
        temPos = i
      }
    }
  }
}
// el-table 的合并函数
function arraySpanMethod({ row, column, rowIndex, columnIndex }) {
  if (row.date === '汇总') {
    if (columnIndex === 1) {
      return [0, 0]
    } else if (columnIndex === 2) {
      return [1, 1]
    }
  } else {
    if (columnIndex == 1) {
      const _row = spanNameArr[rowIndex]
      const _col = _row > 0 ? 1 : 0
      return {
        // [0,0] 表示这一行不显示， [2,1]表示行的合并数
        rowspan: _row,
        colspan: _col
      }
    }
  }
}
```

## 表格末尾加入汇总计算
```js
const getSummaries = (param) => {
  const { columns, data } = param
  let temData = data.filter((item) => item.date === '汇总')
  const sums = []
  columns.forEach((column, index) => {
    if (index === 0) {
      sums[index] = '汇总计算'
      return
    }
    const values = temData.map((item) => Number(item[column.property]))
    if (!values.every((value) => isNaN(value))) {
      sums[index] = values.reduce((prev, curr) => {
        const value = Number(curr)
        if (!isNaN(value)) {
          return prev + curr
        } else {
          return prev
        }
      }, 0)
      sums[index]
    } else {
      sums[index] = ''
    }
  })
  mergeDate = sums
  return sums
}
```