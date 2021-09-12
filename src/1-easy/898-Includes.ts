/*
  898 - Includes
  -------
  by null (@kynefuk) #easy #array
  
  ### Question
  
  Implement the JavaScript `Array.includes` function in the type system. A type takes the two arguments. The output should be a boolean `true` or `false`.
  
  For example
  
  ```ts
  type isPillarMen = Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Dio'> // expected to be `false`
  ```
  
  > View on GitHub: https://tsch.js.org/898
*/


/* _____________ Your Code Here _____________ */

/**
 * 将元祖每一项拆解开 [K in keyof T]: T[K]
 * 拿元祖每一个值都与 U 进行比较，如果 T[K] 和 U 取交集和并集都相等的话返回 true, 否则返回 false
 * 利用元祖属性都为 false 时 [false, false, false][number] 才为 false 的特性来判断，很巧妙
 */
// TODO: 不是很明白 Tuple 的 number 用法？
type Includes<T extends readonly any[], U> = {
  [K in keyof T]: (T[K] | U) extends (T[K] & U) ? true : false
}[number] extends false ? false : true

// type Includes<T extends readonly any[], U> = T extends [infer L, ...infer R]
//   ? [U, L] extends [L, U]
//     ? true
//     : Includes<R, U>
//   : false
/* _____________ Test Cases _____________ */
import { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Kars'>, true>>,
  Expect<Equal<Includes<['Kars', 'Esidisi','Wamuu', 'Santana'], 'Dio'>, false>>,
  Expect<Equal<Includes<[1, 2, 3, 5, 6, 7], 7>, true>>,
  Expect<Equal<Includes<[1, 2, 3, 5, 6, 7], 4>, false>>,
  Expect<Equal<Includes<[1, 2, 3], 2>, true>>,
  Expect<Equal<Includes<[1, 2, 3], 1>, true>>,
  Expect<Equal<Includes<[{}], { a: 'A' }>, false>>,
  Expect<Equal<Includes<[boolean, 2, 3, 5, 6, 7], false>, false>>,
  Expect<Equal<Includes<[true, 2, 3, 5, 6, 7], boolean>, false>>,
  Expect<Equal<Includes<[false, 2, 3, 5, 6, 7], false>, true>>,
]



/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/898/answer
  > View solutions: https://tsch.js.org/898/solutions
  > More Challenges: https://tsch.js.org
*/

