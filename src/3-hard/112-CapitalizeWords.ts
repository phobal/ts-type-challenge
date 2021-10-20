/*
  112 - Capitalize Words
  -------
  by Anthony Fu (@antfu) #hard #template-literal
  
  ### Question
  
  Implement `CapitalizeWords<T>` which converts the first letter of **each word of a string** to uppercase and leaves the rest as-is.
  
  For example
  
  ```ts
  type capitalized = CapitalizeWords<'hello world, my friends'> // expected to be 'Hello World, My Friends'
  ```
  
  > View on GitHub: https://tsch.js.org/112
*/

/* _____________ Your Code Here _____________ */
/**
 * 比较笨的方式，穷举了字符串被三种符号分割
 */
type CapitalizeWords<S extends string> = S extends `${infer L} ${infer R}`
  ? `${Capitalize<L>} ${CapitalizeWords<R>}`
  : S extends `${infer L}.${infer R}`
  ? `${Capitalize<L>}.${CapitalizeWords<R>}`
  : S extends `${infer L},${infer R}`
  ? `${Capitalize<L>},${CapitalizeWords<R>}`
  : Capitalize<S>;

type a = CapitalizeWords<"foo.bar.hello,world">;
/* _____________ Test Cases _____________ */
import { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<CapitalizeWords<"foobar">, "Foobar">>,
  Expect<Equal<CapitalizeWords<"FOOBAR">, "FOOBAR">>,
  Expect<Equal<CapitalizeWords<"foo bar">, "Foo Bar">>,
  Expect<Equal<CapitalizeWords<"foo bar hello world">, "Foo Bar Hello World">>,
  Expect<Equal<CapitalizeWords<"foo bar.hello,world">, "Foo Bar.Hello,World">>,
  Expect<Equal<CapitalizeWords<"">, "">>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/112/answer
  > View solutions: https://tsch.js.org/112/solutions
  > More Challenges: https://tsch.js.org
*/
