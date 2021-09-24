/*
  17 - Currying 1
  -------
  by Anthony Fu (@antfu) #hard #array
  
  ### Question
  
  > TypeScript 4.0 is recommended in this challenge
  
  [Currying](https://en.wikipedia.org/wiki/Currying) is the technique of converting a function that takes multiple arguments into a sequence of functions that each take a single argument. 
  
  For example:
  
  ```ts
  const add = (a: number, b: number) => a + b
  const three = add(1, 2)
  
  const curriedAdd = Currying(add)
  const five = curriedAdd(2)(3)
  ```
  
  The function passed to `Currying` may have multiple arguments, you need to correctly type it.
  
  In this challenge, the curried function only accept one argument at a time. Once all the argument is assigned, it should return its result.
  
  > View on GitHub: https://tsch.js.org/17
*/

/* _____________ Your Code Here _____________ */
/**
 * P 为方法的剩余参数，R 为 fn 返回值类型
 * 参数 P 为数组，如果数组的长度大于 0， 就拿 P 的第一个参数 FIRST 作为函数的参数递归执行 (a: L) => Curry<REST, R>
 * 直到参数个数为 0 的时候直接返回函数 fn 的返回值 R
 */
type Curry<P, R> = P extends [infer FIRST, ...infer REST]
  ? (a: FIRST) => Curry<REST, R>
  : R;

/**
 * A 为函数 fn 的实际参数
 * R 为函数的返回值
 */
declare function Currying<F>(
  fn: F
): F extends (...args: infer A) => infer R ? Curry<A, R> : never;

/* _____________ Test Cases _____________ */
import { Equal, Expect } from "@type-challenges/utils";

const curried1 = Currying((a: string, b: number, c: boolean) => true);
const curried2 = Currying(
  (
    a: string,
    b: number,
    c: boolean,
    d: boolean,
    e: boolean,
    f: string,
    g: boolean
  ) => true
);

type cases = [
  Expect<
    Equal<typeof curried1, (a: string) => (b: number) => (c: boolean) => true>
  >,
  Expect<
    Equal<
      typeof curried2,
      (
        a: string
      ) => (
        b: number
      ) => (
        c: boolean
      ) => (d: boolean) => (e: boolean) => (f: string) => (g: boolean) => true
    >
  >
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/17/answer
  > View solutions: https://tsch.js.org/17/solutions
  > More Challenges: https://tsch.js.org
*/
