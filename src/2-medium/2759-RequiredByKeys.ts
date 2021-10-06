/*
  2759 - RequiredByKeys
  -------
  by jiangshan (@jiangshanmeta) #medium #object
  
  ### Question
  
  Implement a generic `RequiredByKeys<T,  K>` which takes two type argument `T` and `K`.
  
  `K` specify the set of properties of `T` that should set to be required. When `K` is not provided, it should make all properties required just like the normal `Required<T>`.
  
  For example
  
  ```typescript
  interface User {
    name?: string
    age?: number
    address?: string
  }
  
  type UserPartialName = RequiredByKeys<User, 'name'> // { name: string; age?: number; address?: string }
  
  ```
  
  > View on GitHub: https://tsch.js.org/2759
*/

/* _____________ Your Code Here _____________ */

/**
 * 先将 K 从 T 中取出来，变成 required
 * 再将 T 和 上一步的值进行求并集
 * 最后将 & 对象展开
 * & 的展开代码如下示例
 */

// type b = {
//   name: string
// }

// type c = {
//   age: number
// }

// type d = b & c  // b & c
// type e = Omit<b & c, never> // { name: string; age: number }

type RequiredByKeys<T, K = keyof T> = Omit<
  T & Required<Pick<T, K & keyof T>>,
  never
>;

// BUG: 这种方式第二个 case 过不了
// type RequiredByKeys<T, K extends keyof T> = Omit<{
//   [P in K]-?: T[P]
// } & Omit<T, K>, never>

/* _____________ Test Cases _____________ */
import { Equal, Expect, ExpectFalse, NotEqual } from "@type-challenges/utils";

interface User {
  name?: string;
  age?: number;
  address?: string;
}

interface UserRequiredName {
  name: string;
  age?: number;
  address?: string;
}

interface UserRequiredNameAndAge {
  name: string;
  age: number;
  address?: string;
}

type cases = [
  Expect<Equal<RequiredByKeys<User, "name">, UserRequiredName>>,
  Expect<Equal<RequiredByKeys<User, "name" | "unknown">, UserRequiredName>>,
  Expect<Equal<RequiredByKeys<User, "name" | "age">, UserRequiredNameAndAge>>,
  Expect<Equal<RequiredByKeys<User>, Required<User>>>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/2759/answer
  > View solutions: https://tsch.js.org/2759/solutions
  > More Challenges: https://tsch.js.org
*/
