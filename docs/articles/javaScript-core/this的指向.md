---
title: this的指向
date: 2023年02月24日
tags:
 - javaScript
categories:
 - JavaScript核心系列
---

# this 到底指向什么

## this 到底指向什么

 **定义一个函数，采用三种不同的方式对它进行调用，三种不同的结果**

```js
// 定义一个函数
function foo() {
  console.log(this)
}
// 1. 调用方式一：直接调用
foo() // this => window

// 2. 将 foo 放到一个对象中，再调用
let obj = {
  name: 'xiaoli',
  age: 18,
  foo: foo
}
obj.foo() // this => obj 对象

// 3. 通过 call / apply 调用
foo.call('abl') // this => String {"abc"} 对象
```

1.  函数调用时候，JavaScript 默认给 this 绑定个值
2.  this 的绑定和定义的位置没有关系
3.  this 的绑定和调用方式以及调用的位置有关系
4.  this 是被运行时绑定的

## this 的绑定规则

### 默认绑定

普通的函数被独立的调用

```js
// 1. 独立调用普通函数
function foo() {
  console.log(this)
}
foo() // this => window

// 2. 定义在对象中，但是独立调用
let obj = {
  foo: function() {
    console.log(this)
  }
}
obj.foo
foo() // this => window

// 3. 高阶函数
function test(fn) {
  fn() // this => window
}
test(obj.foo)
```

### 隐式绑定

```js
function foo() {
  console.log('foo 函数', this)
}
let obj = {
  bar: foo
}
obj.bar() // this => obj
```

### 显示绑定

-   隐式绑定有个前提条件

    必须**在调用函数内部有个对函数的引用，**比如一个属性，如果没有这样的引用，在调用的时候，会找不到该函数报错

    正是这样，简介的将 this 绑定到了这个对象上

如果我们不希望对象内部包含这个函数引用，同时希望找个对象上进行强调作用，该怎么做

JavaScript 所有函数都可以使用 call 和 apply 方法

1.  第一个参数都是要求传入个对象
    1.  这个对象是给 this 准备的
    1.  调用这个函数会将 this 绑定到这个传入的对象上
2.  后面的参数，apply 绑定数组，call 绑定参数列表

**bind 绑定函数**

-   会生成一个新的绑定函数
-   绑定的函数是一个 exotic function object（怪异函数对象， ECMAScript 2015 术语）

```js
let obj = {
  name: 'why',
}
function foo() {
  console.log('foo函数', this)
}
foo.call(obj, 'why')
foo.apply(obj, ['why'])

let bar = foo.bind(obj)
bar() // this => obj
```

### new 绑定

JavaScript 中的函数可以当做构造函数使用，使用 new 操作符

**new 所做的事情**

1.  **创建一个空对象**
1.  **将 this 指向这个空对象**
1.  **执行函数体中的代码**
1.  **没有显示返回非空对象，默认返回这个对象**

```js
function foo() {
  console.log('foo 函数', this)
  this.name = "why"
}
new foo() // this => foo
```

### 绑定规则优先级

1.  默认规则优先级最低
1.  显式高于隐式
1.  new 绑定高于隐式
1.  new 不能跟 apply 和 call 一起使用
1.  new 可以和 bind 使用，new 绑定优先级更高

### 内置函数绑定思考

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/eed727a795ce4ba8b42d608fb63e0d80~tplv-k3u1fbpfcp-watermark.image?)