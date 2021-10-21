/*
  2757 - PartialByKeys
  -------
  by jiangshan (@jiangshanmeta) #medium #object
  
  ### Question
  
  Implement a generic `PartialByKeys<T, K>` which takes two type argument `T` and `K`.
  
  `K` specify the set of properties of `T` that should set to be optional. When `K` is not provided, it should make all properties optional just like the normal `Partial<T>`.
  
  For example
  
  ```typescript
  interface User {
    name: string
    age: number
    address: string
  }
  
  type UserPartialName = PartialByKeys<User, 'name'> // { name?:string; age:number; address:string }
  ```
  
  > View on GitHub: https://tsch.js.org/2757
*/

/* _____________ Your Code Here _____________ */

// type PartialByKey<T, K = any> = [K] extends [never]
//   ? Partial<T>
//   : {
//       [P in Exclude<keyof T, K>]: T[P];
//     } & {
//       [P in K as P extends keyof T ? P : never]?: T[P];
//     };

// type PartialByKeys<T, K = any> = Omit<
//   PartialByKey<T, K>,
//   never
// >;

type PartialByKeys<T, K extends keyof any = keyof T> = {
  [P in keyof T & K]?: T[P];
} & { [P in Exclude<keyof T, K>]: T[P] } extends infer R
  ? { [P in keyof R]: R[P] }
  : never;

/* _____________ Test Cases _____________ */
import { Equal, Expect, ExpectFalse, NotEqual } from "@type-challenges/utils";

interface User {
  name: string;
  age: number;
  address: string;
}

interface UserPartialName {
  name?: string;
  age: number;
  address: string;
}

interface UserPartialNameAndAge {
  name?: string;
  age?: number;
  address: string;
}

type cases = [
  Expect<Equal<PartialByKeys<User, "name">, UserPartialName>>,
  Expect<Equal<PartialByKeys<User, "name" | "unknown">, UserPartialName>>,
  Expect<Equal<PartialByKeys<User, "name" | "age">, UserPartialNameAndAge>>,
  Expect<Equal<PartialByKeys<User>, Partial<User>>>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/2757/answer
  > View solutions: https://tsch.js.org/2757/solutions
  > More Challenges: https://tsch.js.org
*/