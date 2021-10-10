/*
  949 - AnyOf
  -------
  by null (@kynefuk) #medium #array
  
  ### Question
  
  Implement Python liked `any` function in the type system. A type takes the Array and returns `true` if any element of the Array is true. If the Array is empty, return `false`.
  
  For example:
  
  ```ts
  type Sample1 = AnyOf<[1, "", false, [], {}]>; // expected to be true.
  type Sample2 = AnyOf<[0, "", false, [], {}]>; // expected to be false.
  ```
  
  > View on GitHub: https://tsch.js.org/949
*/

/* _____________ Your Code Here _____________ */

/**
 * 第一种解法
 * 比较 hack, 通过穷举法
 * 如何遍历元祖？
 * T[number] 可以将 tuple 转为 union 类型
 */
// type AnyOf<T extends readonly any[]> = {
//   [P in keyof T]: 0 extends T[P]
//     ? never
//     : "" extends T[P]
//     ? never
//     : [] extends T[P]
//     ? never
//     : {} extends T[P]
//     ? never
//     : false extends T[P]
//     ? never
//     : true;
// }[number] extends never
//   ? false
//   : true;

/**
 * 第二种解法
 * 将 T[number] 和 给定的几个为空的类型组成的联合类型进行取差集
 * 如果不为 never 则为 false, 否则为 true
 * 注意：Exclude 排除空对象
 * type a = Exclude<{}, {}>;  // never
 * type b = Exclude<{ name: "test" }, {}>;  // never
 * type c = Exclude<{}, Record<string, never>>  // never
 * type d = Exclude<{ name: "test" }, Record<string, never>>  // { name: "test" }
 */

type AnyOf<T extends readonly unknown[]> = T[number] extends infer R
  ? Exclude<R, false | 0 | "" | [] | Record<string, never>> extends never
    ? false
    : true
  : false;
/* _____________ Test Cases _____________ */
import { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<
    Equal<AnyOf<[1, "test", true, [1], { name: "test" }, { 1: "test" }]>, true>
  >,
  Expect<Equal<AnyOf<[1, "", false, [], {}]>, true>>,
  Expect<Equal<AnyOf<[0, "test", false, [], {}]>, true>>,
  Expect<Equal<AnyOf<[0, "", true, [], {}]>, true>>,
  Expect<Equal<AnyOf<[0, "", false, [1], {}]>, true>>,
  Expect<Equal<AnyOf<[0, "", false, [], { name: "test" }]>, true>>,
  Expect<Equal<AnyOf<[0, "", false, [], { 1: "test" }]>, true>>,
  Expect<
    Equal<AnyOf<[0, "", false, [], { name: "test" }, { 1: "test" }]>, true>
  >,
  Expect<Equal<AnyOf<[0, "", false, [], {}]>, false>>,
  Expect<Equal<AnyOf<[]>, false>>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/949/answer
  > View solutions: https://tsch.js.org/949/solutions
  > More Challenges: https://tsch.js.org
*/
