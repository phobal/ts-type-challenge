/*
  18 - Length of Tuple
  -------
  by sinoon (@sinoon) #easy #tuple
  
  ### Question
  
  For given a tuple, you need create a generic `Length`, pick the length of the tuple
  
  For example
  
  ```ts
  type tesla = ['tesla', 'model 3', 'model X', 'model Y']
  type spaceX = ['FALCON 9', 'FALCON HEAVY', 'DRAGON', 'STARSHIP', 'HUMAN SPACEFLIGHT']
  
  type teslaLength = Length<tesla>  // expected 4
  type spaceXLength = Length<spaceX> // expected 5
  ```
  
  > View on GitHub: https://tsch.js.org/18
*/


/* _____________ Your Code Here _____________ */

/**
 * 元祖具有特有属性 length
 * 通过 T extends { length: xxx } 约束 T 为元祖
 * inter R 推导出 length, R 就是其长度
 */
type Length<T extends any> = T extends { length: infer R } ?  R: never

// 或者， 通过参数 T 限制为 readonly any[] 作为元祖，那么它的长度就很简单了，直接拿就好了
// type Length<T extends readonly any[]> = T['length']

/* _____________ Test Cases _____________ */
import { Equal, Expect } from '@type-challenges/utils'

const tesla = ['tesla', 'model 3', 'model X', 'model Y'] as const
const spaceX = ['FALCON 9', 'FALCON HEAVY', 'DRAGON', 'STARSHIP', 'HUMAN SPACEFLIGHT'] as const

type cases = [
  Expect<Equal<Length<typeof tesla>, 4>>,
  Expect<Equal<Length<typeof spaceX>, 5>>,
  // @ts-expect-error
  Length<5>,
  // @ts-expect-error
  Length<'hello world'>,
]



/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/18/answer
  > View solutions: https://tsch.js.org/18/solutions
  > More Challenges: https://tsch.js.org
*/

