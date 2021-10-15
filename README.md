# ts-type-challenges

https://github.com/type-challenges/type-challenges

## 一些基础知识

### 加减号

```ts
type Requied<T> = {
  [P in keyof T]-?: T[P];
};

type Person = {
  name: string;
  age?: number;
};

// 结果：{ name: string; age: number; }
type result = Required<Person>;
```

`-?`是去掉类型中属性后面的`?`，整个`Required`的实际效果是去掉`T`类型中所有属性键后面的`?`，让所有属性变成必填的

### keyof 和 in

在 TS 中 keyof 通常会和 in 一起使用，表示一个迭代的过程

#### keyof

在 TS 中 keyof T 表示获取类型 T 中所有的属性值，这些属性值组合成一个联合类型，例如：

```ts
type Person = {
  name: string;
  age: number;
};
// 'name' | 'age'
type result = keyof Person;
```

`TS`中的`keyof T`，它有点类似`JavaScript`中的`Object.keys()`，它们的共同点都是获取属性键的集合，只不过`keyof T`得到的结果是一个联合类型，而`Object.keys()`得到的是一个数组。

#### in

`in`操作符的右侧通常跟一个联合类型，可以使用`in`来迭代这个联合类型，如下：

```ts
in 'name' | 'age' | 'sex'
'name' // 第一次迭代结果
'age'  // 第二次迭代结果
'sex'  // 第三次迭代结果
```

`TS`中的`in`操作符原理，跟`JavaScript`中的`for in`遍历有点类似。

根据`keyof`和`in`的特点，我们可以写一些辅助工具，比如： Readonly

```ts
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};
type Person = {
  name: string;
  age: number;
};
// 结果：{ readony name: string; readonly age: number; }
type result = Readonly<Person>;
```

`[P in keyof T]`：这段代码表示遍历`T`中的每一个属性键，每次遍历时属性键取名为`P`，这和`JavaScript`中的`for in`非常类似：

```ts
// TS 中的迭代
P in keyof T

// JS 中的迭代
for (let key in obj)
```

### typeof

`TS`中的`typeof`，可以用来获取一个`JavaScript`变量的类型，通常用于获取一个对象或者一个函数的类型，如下：

```ts
const add = (a: number, b: number): number => {
  return a + b;
};
const obj = {
  name: "AAA",
  age: 23,
};

// 结果：(a: number, b:number) => number
type t1 = typeof add;
// 结果：{ name: string; age: number; }
type t2 = typeof obj;
```

### never

`never`类型表示永远不会有值的一种类型。

如果一个函数抛出了一个错误，那么这个函数就可以用`never`来表示其返回值，如下：

```ts
function handlerError(message: string): never {
  throw new Error(message);
}
```

关于`never`的另外一个知识点是：如果一个联合类型中存在`never`，那么实际的联合类型并不会包含`never`，如下：

```ts
// 定义
type test = "name" | "age" | never;

// 实际
type test = "name" | "age";
```

### infer

`infer`关键词的作用是延时推导，它会在类型未推导时进行占位，等到真正推导成功后，它能准确的返回正确的类型。

为了更好的理解 infer 关键词的用法，我们使用 ReturnType 这个例子来说明，`ReturnType`是一个用来获取函数返回类型的工具

```ts
type ReturnType<T> = T extends (...args: any) => infer R ? R : never;

const add = (a: number, b: number): number => {
  return a + b;
};
// 结果: number
type result = ReturnType<typeof add>;
```

代码详解：

- `T extends (...args: any) => infer R`：如果不看`infer R`，这段代码实际表示：`T`是不是一个函数类型。
- `(...args: any) => infer R`：这段代码实际表示一个函数类型，其中把它的参数使用`args`来表示，把它的返回类型用`R`来进行占位。 如果`T`满足是一个函数类型，那么我们返回其函数的返回类型，也就是`R`；如果不是一个函数类型，就返回`never`。

### &

在`TS`中有两种类型值得我们关注：**联合类型**和**交叉类型**。

联合类型一般适用于基本类型的"合并"，它使用`|`符号进行连接，如下：

```ts
type result = "name" | 1 | true | null;
```

而交叉类型则适用于对象的"合并"，它使用`&`符号进行连接，如下：

```ts
type result = T & U;
```

`T & U`表示一个新的类型，其中这个类型包含`T`和`U`中所有的键，这和`JavaScript`中的`Object.assign()`函数的作用非常类似。

根据交叉类型的概念，我们可以手动封装一个对象的`merge`函数，如下：

```ts
const obj1 = { name: "AAA" };
const obj2 = { age: 23 };
function merge<T, U>(to: T, from: U): T & U {
  for (let key in from) {
    (to as T & U)[key] = from[key] as any;
  }
  return to as T & U;
}

// 结果：{ name：'AAA'; age: 23; }
const resutl = merge(obj1, obj2);
```

TS 类型 Merge:

```ts
/**
 * 限制 F， S 都为 object
 * 遍历 F & S 的 key
 * 先判断 K 是否是 S 的 key
 * 再判断 K 是否是 F 的 key
 */
type Merge<F extends object, S extends object> = {
  [K in keyof (F & S)]: K extends keyof S
    ? S[K]
    : K extends keyof F
    ? F[K]
    : never;
};

// 测试
type Foo = {
  a: number;
  b: string;
};
type Bar = {
  b: number;
  c: boolean;
};

// 结果：{ a: number; b: number; c: boolean}
type mergeFB = Merge<Foo, Bar>;
```

### extends

extends 关键字一般有两种用法，类型约束和条件约束

#### 类型约束

类型约束经常和泛型一起使用

```ts
// 类型约束
U extends keyof T
```

`keyof T`是一个整体，它表示一个联合类型。`U extends Union`这一整段表示`U`的类型被收缩在一个联合类型的范围内。

这样做的实际表现为：第二个参数传递的字符串只能是`T`键名中的一个，传递不存在的键名会报错。

#### 条件约束

当 extends 用于表示条件判断时，可以总结出以下规律

1. 同一类型的子类型在使用 extends 时，extends 语义可解释为等于。

```ts
type result1 = "a" extends "abc" ? true : false; // false
type result2 = 123 extends 1 ? true : false; // false
```

2. `狭窄类型 extends 宽泛类型`且`宽泛类型中包含狭窄类型`时结果为 true，反之为 false。

```ts
type result3 = string extends string | number ? true : false; // true
```

3. 当 extends 作用于对象时，若在对象中指定的 key 越多，则其类型定义的范围越狭窄，可以参考如下例子。

```ts
type result4 = { a: true; b: false } extends { a: true } ? true : false; // true
```

#### 泛型类型中的 extends

考虑如下 Demo 类型定义:

```ts
type Demo<T, U> = T extends U ? never : T;
```

因为 `'a' | 'b' | 'c' extends 'a'` 是 false, 所以 `Demo<'a' | 'b' | 'c', 'a'>` 结果是 `'a' | 'b' | 'c'` 么?

查阅[官网](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)，其中有提到:

> When conditional types act on a generic type, they become distributive when given a union type.

即当条件类型作用于泛型类型时，它们在给定联合类型时成为分配类型。用 JavaScript 来表达 `'a' | 'b' | 'c' extends 'a'` 的结果类似于:

```js
function Demo(T, U) {
  return T.map((val) => {
    if (val !== U) return val;
    return "never";
  });
}

Demo(["a", "b", "c"], "a"); // ['never', 'b', 'c']
```

此外根据 [never 类型](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#the-never-type)的定义 —— never 类型可分配给每种类型，但是没有类型可以分配给 never（除了 never 本身）。即 `never | 'b' | 'c'` 等价于 `'b' | 'c'`。

因此 `Demo<'a' | 'b' | 'c', 'a'>` 结果并不是 `'a' | 'b' | 'c'` 而是 `'b' | 'c'`。而 Demo 类型的声明其实就是 TS 官方提供的 `Exclude<Type, ExcludedUnion>`。

**逃离舱**

如果想让 `Demo<'a' | 'b' | 'c', 'a'>` 的结果为 `'a' | 'b' | 'c'` 是否可以实现呢? 根据[官网](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types)描述:

> Typically, distributivity is the desired behavior. To avoid that behavior, you can surround each side of the extends keyword with square brackets.

如果不想遍历泛型中的每一个类型，可以用方括号将 extends 关键字的每一侧括起来。

```ts
type Demo<T, U> = [T] extends [U] ? never : T;

// result 此时类型为 'a' | 'b' | 'c'
type result = Demo<"a" | "b" | "c", "a">;
```

另外一个例子 isNever 判断类型是否是 never, 也用到了逃离舱

```ts
type IsNever<T> = [T] extends [never] ? true : false;
```

## 在 React 中的应用

### 如何给现有非 TS 写的组件添加定义

假设有如下组件，之前使用 js 写的，因为没有 TS 定义，那么在使用的时候就会出现报错

```tree
|____EmptyPlaceHolder
| |____tests
| | |____index.test.js
| |____index.js
| |____styles
| | |____index.js

```

那就需要对该组件添加 TS 定义文件, 在组件下面添加文件 `index.d.ts` ,代码如下：

```ts
import React from "react";

type EmptyPlaceHolderType = {
  size?: string;
  title?: string;
  desc?: string;
  iconSrc?: string;
  className?: string;
  style?: React.CSSProperties;
};

declare const EmptyPlaceHolder: React.FC<EmptyPlaceHolderType>;

export default EmptyPlaceHolder;
```

最核心的代码就是 `declare const EmptyPlaceHolder `

### 如何扩展第三方组件的 TS 定义

以 antd 的 Button 组件为例 ，现在需求对它进行扩展，需要添加一个 `addon-type` 属性

```ts
import { BaseButtonProps as BBP } from "antd/lib/button/button";

declare module "antd/lib/button/button" {
  export interface BaseButtonProps extends BBP {
    /** antd button 附加自定义样式 type */
    ["data-addon-type"]?:
      | "primary"
      | "info"
      | "active"
      | "active-disabled"
      | "link"
      | "link-primary"
      | "link-error"
      | "link-success"
      | "disabled";
  }
}
```

#### declare 申明

使用 declare 声明，可以将类型可以收拢在一处定义。使用 declare 可以定义以下类型：

- 使用 declare 申明变量

```ts
declare const foo: number;
```

- 使用 declare 申明函数

```ts
declare function func(id: string): void;
```

需要注意使用 declare 申明的变量和函数，想要拿到他们的类型，需要使用 typeof 去拿，否则拿不到

```ts
declare const foo: number;
type Foo = foo; // any
type Foo = typeof foo; // number

declare function func(id: string): void;
type funcType = func; // any
type funcType = typeof func; // (id: string) => void
```

- 使用 declare 申明命名空间

```ts
declare namespace GreetingLib {
  interface A {}
  interface B {}
}
```

申明在 namespace 下面的定义在使用的时候可以不用引用，直接使用

- 使用 declare 申明模块

declare module 通常用来对一些第三方模块进行扩展，例如上面对 antd Button 的类型进行扩展

更多用法参考[这里](https://www.typescriptlang.org/docs/handbook/declaration-files/by-example.html)

### 如何在 styled-components 中使用 TS

示例

```ts
export const Content = styled.p<{
  /** 是否禁用 */
  disable: boolean;
}>`
  padding-top: 12px;
  font-size: 14px;
  color: ${({ disable }) => (disable ? "#cccccc" : "#21233b")};
`;
```
