/*
  3 - Omit
  -------
  by Anthony Fu (@antfu) #medium #union #built-in
  
  ### Question
  
  Implement the built-in `Omit<T, K>` generic without using it.
  
  Constructs a type by picking all properties from `T` and then removing `K`
  
  For example
  
  ```ts
  interface Todo {
    title: string
    description: string
    completed: boolean
  }
  
  type TodoPreview = MyOmit<Todo, 'description' | 'title'>
  
  const todo: TodoPreview = {
    completed: false,
  }
  ```
  
  > View on GitHub: https://tsch.js.org/3
*/

/* _____________ Your Code Here _____________ */
/**
 * 1、约束 K 值必须在 T 类型 keyof 中，K extends keyof T
 * 2、约束 T 中非 K 的属性不为 never, 如果为 never 直接返回 never,  Exclude<keyof T, K> extends never
 * 3、遍历出除了 K 以外 T 中的其他值 P in Exclude<keyof T, K>
 */
type MyOmit<T, K extends keyof T> = Exclude<keyof T, K> extends never
  ? never
  : {
      [P in Exclude<keyof T, K>]: T[P];
    };

/* _____________ Test Cases _____________ */
import { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<Expected1, MyOmit<Todo, "description">>>,
  Expect<Equal<Expected2, MyOmit<Todo, "description" | "completed">>>
];

interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

interface Expected1 {
  title: string;
  completed: boolean;
}

interface Expected2 {
  title: string;
}

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/3/answer
  > View solutions: https://tsch.js.org/3/solutions
  > More Challenges: https://tsch.js.org
*/
