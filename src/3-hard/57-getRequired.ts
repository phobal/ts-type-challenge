/*
  57 - Get Required
  -------
  by Zheeeng (@zheeeng) #hard #utils #infer
  
  ### Question
  
  Implement the advanced util type `GetRequired<T>`, which remains all the required fields
  
  For example
  
  ```ts
  type I = GetRequired<{ foo: number, bar?: string }> // expected to be { foo: number }
  ```
  
  > View on GitHub: https://tsch.js.org/57
*/

/* _____________ Your Code Here _____________ */

// type GetRequired<T> = {
//   [K in keyof T as { [P in K]-?: T[P] } extends T ? K : never]: T[K]
// }

import { Equal, Expect } from "@type-challenges/utils";

/**
 * 通过判断 去掉? 的类型 和 原类型 是否相等，如果相等，则保留，否则返回 never 给过滤掉
 */
type GetRequired<T> = {
  [K in keyof T as Equal<{ [P in K]-?: T[K] }, { [P in K]: T[K] }> extends true
    ? K
    : never]: T[K];
};

/* _____________ Test Cases _____________ */

type cases = [
  Expect<Equal<GetRequired<{ foo: number; bar?: string }>, { foo: number }>>,
  Expect<
    Equal<GetRequired<{ foo: undefined; bar?: undefined }>, { foo: undefined }>
  >
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/57/answer
  > View solutions: https://tsch.js.org/57/solutions
  > More Challenges: https://tsch.js.org
*/
