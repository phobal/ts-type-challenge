/*
  223 - IsAny
  -------
  by Pavel Glushkov (@pashutk) #hard #utils
  
  ### Question
  
  Sometimes it's useful to detect if you have a value with `any` type. This is especially helpful while working with third-party Typescript modules, which can export `any` values in the module API. It's also good to know about `any` when you're suppressing implicitAny checks.
  
  So, let's write a utility type `IsAny<T>`, which takes input type `T`. If `T` is `any`, return `true`, otherwise, return `false`.
  
  > View on GitHub: https://tsch.js.org/223
*/


/* _____________ Your Code Here _____________ */

/**
 * https://stackoverflow.com/questions/49927523/disallow-call-with-any/49928360#49928360
 * 1 & T的结果只能是：1、never或者any。当使用0 extends这三个结果的时候，只有any判断为真。
   // 结果：false
   type t1 = 0 extends 1 ? true : false
   // 结果：false
   type t2 = 0 extends never ? true : false
   // 结果：true
   type t3 = 0 extends any ? true : false
 */
type IsAny<T> = 0 extends (1 & T) ? true : false


/* _____________ Test Cases _____________ */
import { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<IsAny<any>, true>>,
  
  Expect<Equal<IsAny<undefined>, false>>,
  Expect<Equal<IsAny<unknown>, false>>,
  Expect<Equal<IsAny<never>, false>>,
  Expect<Equal<IsAny<string>, false>>,
]



/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/223/answer
  > View solutions: https://tsch.js.org/223/solutions
  > More Challenges: https://tsch.js.org
*/

