/*
  2857 - IsRequiredKey
  -------
  by jiangshan (@jiangshanmeta) #hard #utils
  
  ### Question
  
  Implement a generic ```IsRequiredKey<T, K>```  that return whether ```K``` are required keys of ```T``` .
  
  For example
  
  ```typescript
  type A = IsRequiredKey<{ a: number, b?: string },'a'> // true
  type B = IsRequiredKey<{ a: number, b?: string },'b'> // false
  type C = IsRequiredKey<{ a: number, b?: string },'b' | 'a'> // false
  ```
  
  > View on GitHub: https://tsch.js.org/2857
*/

/* _____________ Your Code Here _____________ */

/**
 * 🔥🔥🔥
 * answer: https://github.com/type-challenges/type-challenges/issues/3269
 */
type RequiredKeys<T> = keyof {
  [K in keyof T as Equal<{ [P in K]-?: T[K] }, { [P in K]: T[K] }> extends true
    ? K
    : never]: T[K];
};

type IsRequiredKey<T, K extends keyof T> = Exclude<
  K,
  RequiredKeys<T>
> extends true
  ? true
  : false;

/* _____________ Test Cases _____________ */
import { Equal, Expect, ExpectFalse, NotEqual } from "@type-challenges/utils";

type cases = [
  Expect<Equal<IsRequiredKey<{ a: number; b?: string }, "a">, true>>,
  Expect<Equal<IsRequiredKey<{ a: number; b?: string }, "b">, false>>,
  Expect<Equal<IsRequiredKey<{ a: number; b?: string }, "b" | "a">, false>>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/2857/answer
  > View solutions: https://tsch.js.org/2857/solutions
  > More Challenges: https://tsch.js.org
*/
