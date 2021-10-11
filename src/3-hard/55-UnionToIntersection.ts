/*
  55 - Union to Intersection
  -------
  by Zheeeng (@zheeeng) #hard #utils #infer
  
  ### Question
  
  Implement the advanced util type `UnionToIntersection<U>`
  
  For example
  
  ```ts
  type I = Union2Intersection<'foo' | 42 | true> // expected to be 'foo' & 42 & true
  ```
  
  > View on GitHub: https://tsch.js.org/55
*/

/* _____________ Your Code Here _____________ */

// 结果：never
type result1 = 1 & "foo" & true;
// 结果：{ a: number; b: number; c: boolean; }
type result2 = { a: number; b: number } & { b: string | number; c: boolean };
// 结果：(a: boolean | number) => string
type result3 = ((a: boolean) => string | number) & ((a: number) => string);

/**
 * 利用函数取交叉类型的特性，函数取交叉类型，主要从参数和返回值来说
 * 对于函数参数而言，取其联合类型；
 * 对于函数返回值而言，取其交叉类型。
 * U extends any ? X : Y： 这里把 U 类型处理成 (x: U) => any 的函数类型。
 * T extends (x: infer V) => any ? V : never：这里的 T 就是上一步的函数类型，
 * 如果 extends 成立，则返回 V，此时的 V 必然满足 U & V。
 * https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#type-inference-in-conditional-types
 */
type UnionToIntersection<U> = (U extends any ? (x: U) => any : never) extends (
  x: infer V
) => any
  ? V
  : never;

/* _____________ Test Cases _____________ */
import { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<UnionToIntersection<"foo" | 42 | true>, "foo" & 42 & true>>,
  Expect<
    Equal<
      UnionToIntersection<(() => "foo") | ((i: 42) => true)>,
      (() => "foo") & ((i: 42) => true)
    >
  >
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/55/answer
  > View solutions: https://tsch.js.org/55/solutions
  > More Challenges: https://tsch.js.org
*/
