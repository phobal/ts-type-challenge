/*
  610 - CamelCase
  -------
  by Johnson Chu (@johnsoncodehk) #medium #template-literal
  
  ### Question
  
  `for-bar-baz` -> `forBarBaz`
  
  > View on GitHub: https://tsch.js.org/610
*/


/* _____________ Your Code Here _____________ */
/**
 * 递归思想
 * 将字符串以 - 拆分为 L（左）、M（中）、R（右）
 * 例如： foo-bar 被拆分为 foo、b、ar
 * 然后比较 M 和 Uppercase<M> 是否相等，
 * 如果相等，则直接返回 M， 不是的话就转为大写的 M，继续将 Uppercase<M>${R} 继续递归
 * 如果不相等，则直接返回原值
 */
type CamelCase<S extends string> = S extends `${infer L}-${infer M}${infer R}`
  ? M extends Uppercase<M>
    ? `${L}-${CamelCase<`${M}${R}`>}`
    : `${L}${CamelCase<`${Uppercase<M>}${R}`>}`
  : S;

/* _____________ Test Cases _____________ */
import { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<CamelCase<'foo-bar-baz'>, 'fooBarBaz'>>,
  Expect<Equal<CamelCase<'foo-Bar-Baz'>, 'foo-Bar-Baz'>>,
  Expect<Equal<CamelCase<'foo-bar'>, 'fooBar'>>,
  Expect<Equal<CamelCase<'foo_bar'>, 'foo_bar'>>,
  Expect<Equal<CamelCase<'foo--bar----baz'>, 'foo-Bar---Baz'>>,
  Expect<Equal<CamelCase<'a-b-c'>, 'aBC'>>,
  Expect<Equal<CamelCase<'a-b-c-'>, 'aBC-'>>,
  Expect<Equal<CamelCase<'ABC'>, 'ABC'>>,
  Expect<Equal<CamelCase<'-'>, '-'>>,
  Expect<Equal<CamelCase<''>, ''>>,
  Expect<Equal<CamelCase<'😎'>, '😎'>>,
]



/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/610/answer
  > View solutions: https://tsch.js.org/610/solutions
  > More Challenges: https://tsch.js.org
*/

