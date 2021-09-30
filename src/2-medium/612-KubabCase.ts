/*
  612 - KebabCase
  -------
  by Johnson Chu (@johnsoncodehk) #medium #template-literal
  
  ### Question
  
  `FooBarBaz` -> `for-bar-baz`
  
  > View on GitHub: https://tsch.js.org/612
*/


/* _____________ Your Code Here _____________ */

/**
 * 思路同 CamelCase
 * 特殊点在判断第一个字母是大写的时候前面不需要添加 - 
 * 可以给 KebabCase 设置第二个参数 U，默认值为 true
 * 只有第一次递归的时候 U 才为 true,这时 L 就是第一个字母
 * 其余的时候 U 都为 false
 */
type KebabCase<S extends string, U = true> =
   S extends `${infer L}${infer R}`
    ? L extends Lowercase<L>
      ? `${L}${KebabCase<R, false>}`
      : U extends true
        ? `${Lowercase<L>}${KebabCase<R, false>}`
        : `-${Lowercase<L>}${KebabCase<R, false>}`
    : S

/* _____________ Test Cases _____________ */
import { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<KebabCase<'FooBarBaz'>, 'foo-bar-baz'>>,
  Expect<Equal<KebabCase<'fooBarBaz'>, 'foo-bar-baz'>>,
  Expect<Equal<KebabCase<'foo-bar'>, 'foo-bar'>>,
  Expect<Equal<KebabCase<'foo_bar'>, 'foo_bar'>>,
  Expect<Equal<KebabCase<'Foo-Bar'>, 'foo--bar'>>,
  Expect<Equal<KebabCase<'ABC'>, 'a-b-c'>>,
  Expect<Equal<KebabCase<'-'>, '-'>>,
  Expect<Equal<KebabCase<''>, ''>>,
  Expect<Equal<KebabCase<'😎'>, '😎'>>,
]



/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/612/answer
  > View solutions: https://tsch.js.org/612/solutions
  > More Challenges: https://tsch.js.org
*/

