/*
  2070 - Drop Char
  -------
  by CaptainOfPhB (@CaptainOfPhB) #medium #template-literal #infer
  
  ### Question
  
  Drop a specified char from a string.
  
  For example:
  
  ```ts
  type Butterfly = DropChar<' b u t t e r f l y ! ', ' '> // 'butterfly!'
  ```
  
  > View on GitHub: https://tsch.js.org/2070
*/

/* _____________ Your Code Here _____________ */

/**
 * Type instantiation is excessively deep and possibly infinite
 * https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
 * 在 4.5-beta 版本是 OK 的
 */
// type DropChar<
//   S extends string,
//   C extends string
// > = S extends `${infer L}${infer R}`
//   ? L extends C
//     ? DropChar<R, C>
//     : `${L}${DropChar<R, C>}`
//   : S;

/**
 * 使用中间变量 M 来缓存每步计算的计算
 */
type DropChar<
  S extends string,
  C extends string,
  M extends string = ""
> = S extends `${infer L}${infer R}`
  ? L extends C
    ? DropChar<R, C, M>
    : DropChar<R, C, `${M}${L}`>
  : M;

/* _____________ Test Cases _____________ */
import { Equal, Expect } from "@type-challenges/utils";

type cases = [
  // @ts-expect-error
  Expect<Equal<DropChar<"butter fly!", "">, "butterfly!">>,
  Expect<Equal<DropChar<"butter fly!", " ">, "butterfly!">>,
  Expect<Equal<DropChar<"butter fly!", "!">, "butter fly">>,
  Expect<Equal<DropChar<"    butter fly!        ", " ">, "butterfly!">>,
  Expect<Equal<DropChar<" b u t t e r f l y ! ", " ">, "butterfly!">>,
  Expect<Equal<DropChar<" b u t t e r f l y ! ", "b">, "  u t t e r f l y ! ">>,
  Expect<Equal<DropChar<" b u t t e r f l y ! ", "t">, " b u   e r f l y ! ">>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/2070/answer
  > View solutions: https://tsch.js.org/2070/solutions
  > More Challenges: https://tsch.js.org
*/
