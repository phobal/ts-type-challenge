/*
  298 - Length of String
  -------
  by Pig Fang (@g-plane) #medium #template-literal
  
  ### Question
  
  Compute the length of a string literal, which behaves like `String#length`.
  
  > View on GitHub: https://tsch.js.org/298
*/

/* _____________ Your Code Here _____________ */

/**
 * 将字符串转为元祖
 * 推断出元祖的长度就是字符串长度
 */
type StringToTuple<
  S extends string,
  T extends any[] = []
> = S extends `${infer L}${infer R}` ? StringToTuple<R, [...T, L]> : T;

type LengthOfString<S extends string> = StringToTuple<S>["length"];

/* _____________ Test Cases _____________ */
import { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<LengthOfString<"">, 0>>,
  Expect<Equal<LengthOfString<"kumiko">, 6>>,
  Expect<Equal<LengthOfString<"reina">, 5>>,
  Expect<Equal<LengthOfString<"Sound! Euphonium">, 16>>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/298/answer
  > View solutions: https://tsch.js.org/298/solutions
  > More Challenges: https://tsch.js.org
*/
