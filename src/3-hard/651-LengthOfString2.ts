/*
  651 - Length of String 2
  -------
  by null (@uid11) #hard #template-literal
  
  ### Question
  
  Implement a type `LengthOfString<S>` that calculates the length of the template string (as in [298 - Length of String](https://tsch.js.org/298)):
  
  ```ts
  type T0 = LengthOfString<"foo"> // 3
  ```
  
  The type must support strings several hundred characters long (the usual recursive calculation of the string length is limited by the depth of recursive function calls in TS, that is, it supports strings up to about 45 characters long).
  
  > View on GitHub: https://tsch.js.org/651
*/

/* _____________ Your Code Here _____________ */

/**
 * 另外一个类似的 298.LengthOfString, 因为 string 比较短，用普通的递归就能解决
 * 但是 TS 中递归层级很深以后就行不通了，会被 break
 * 所以 String 转 Tuple 的时候应该将 String 给分割成一段一段的（我这里按照每一段 7 个字符）数组，
 * 最后将这些数组进行合并，最终通过 length 属性拿到数组的长度，也就是 String 的长度
 */
type StringToTuple<
  S extends string,
  T extends string[] = []
> = S extends `${infer L0}${infer L1}${infer L2}${infer L3}${infer L4}${infer L5}${infer L6}${infer R}`
  ? StringToTuple<R, [...T, L0, L1, L2, L3, L4, L5, L6]>
  : S extends `${infer L}${infer R}`
  ? StringToTuple<R, [...T, L]>
  : T;

type LengthOfString<S extends string> = StringToTuple<S>["length"];

/* _____________ Test Cases _____________ */
import { Equal, IsTrue } from "@type-challenges/utils";

type cases = [
  IsTrue<Equal<LengthOfString<"">, 0>>,
  IsTrue<Equal<LengthOfString<"1">, 1>>,
  IsTrue<Equal<LengthOfString<"12">, 2>>,
  IsTrue<Equal<LengthOfString<"123">, 3>>,
  IsTrue<Equal<LengthOfString<"1234">, 4>>,
  IsTrue<Equal<LengthOfString<"12345">, 5>>,
  IsTrue<Equal<LengthOfString<"123456">, 6>>,
  IsTrue<Equal<LengthOfString<"1234567">, 7>>,
  IsTrue<Equal<LengthOfString<"12345678">, 8>>,
  IsTrue<Equal<LengthOfString<"123456789">, 9>>,
  IsTrue<Equal<LengthOfString<"1234567890">, 10>>,
  IsTrue<Equal<LengthOfString<"12345678901">, 11>>,
  IsTrue<Equal<LengthOfString<"123456789012">, 12>>,
  IsTrue<Equal<LengthOfString<"1234567890123">, 13>>,
  IsTrue<Equal<LengthOfString<"12345678901234">, 14>>,
  IsTrue<Equal<LengthOfString<"123456789012345">, 15>>,
  IsTrue<Equal<LengthOfString<"1234567890123456">, 16>>,
  IsTrue<Equal<LengthOfString<"12345678901234567">, 17>>,
  IsTrue<Equal<LengthOfString<"123456789012345678">, 18>>,
  IsTrue<Equal<LengthOfString<"1234567890123456789">, 19>>,
  IsTrue<Equal<LengthOfString<"12345678901234567890">, 20>>,
  IsTrue<Equal<LengthOfString<"123456789012345678901">, 21>>,
  IsTrue<Equal<LengthOfString<"1234567890123456789012">, 22>>,
  IsTrue<Equal<LengthOfString<"12345678901234567890123">, 23>>,
  IsTrue<
    Equal<
      LengthOfString<"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaggggggggggggggggggggkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa">,
      308
    >
  >
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/651/answer
  > View solutions: https://tsch.js.org/651/solutions
  > More Challenges: https://tsch.js.org
*/
