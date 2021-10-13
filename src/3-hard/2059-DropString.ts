/*
  2059 - Drop String
  -------
  by CaptainOfPhB (@CaptainOfPhB) #hard #template-literal #infer
  
  ### Question
  
  Drop the specified chars from a string.
  
  For example:
  
  ```ts
  type Butterfly = DropString<'foobar!', 'fb'> // 'ooar!'
  ```
  
  > View on GitHub: https://tsch.js.org/2059
*/

/* _____________ Your Code Here _____________ */

// type DropChar<
//   S extends string,
//   C extends string,
//   M extends string = ""
// > = S extends `${infer L}${infer R}`
//   ? C extends L
//     ? DropChar<R, C, M>
//     : DropChar<R, C, `${M}${L}`>
//   : M;

// type DropString<
//   S extends string,
//   C extends string,
//   M extends string = S
// > = C extends `${infer L}${infer R}`
//   ? R extends `${infer L1}${infer R1}`
//     ? DropString<DropChar<M, L>, R, DropChar<M, L>>
//     : DropChar<M, L>
//   : M;

type DropChar<
  S extends string,
  R extends string
> = S extends `${infer L}${R}${infer P}` ? `${L}${DropChar<P, R>}` : S;

type DropString<
  S extends string,
  R extends string
> = R extends `${infer L}${infer P}` ? DropString<DropChar<S, L>, P> : S;

/* _____________ Test Cases _____________ */
import { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<DropString<"butter fly!", "">, "butter fly!">>,
  Expect<Equal<DropString<"butter fly!", " ">, "butterfly!">>,
  Expect<Equal<DropString<"butter fly!", "but">, "er fly!">>,
  Expect<
    Equal<DropString<" b u t t e r f l y ! ", "but">, "     e r f l y ! ">
  >,
  Expect<Equal<DropString<"    butter fly!        ", " ">, "butterfly!">>,
  Expect<Equal<DropString<" b u t t e r f l y ! ", " ">, "butterfly!">>,
  Expect<
    Equal<DropString<" b u t t e r f l y ! ", "but">, "     e r f l y ! ">
  >,
  Expect<
    Equal<DropString<" b u t t e r f l y ! ", "tub">, "     e r f l y ! ">
  >,
  Expect<
    Equal<DropString<" b u t t e r f l y ! ", "b">, "  u t t e r f l y ! ">
  >,
  Expect<Equal<DropString<" b u t t e r f l y ! ", "t">, " b u   e r f l y ! ">>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/2059/answer
  > View solutions: https://tsch.js.org/2059/solutions
  > More Challenges: https://tsch.js.org
*/
