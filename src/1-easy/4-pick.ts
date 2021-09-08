/*
  4 - Pick
  -------
  by Anthony Fu (@antfu) #easy #union #built-in
  
  ### Question
  
  Implement the built-in `Pick<T, K>` generic without using it.
  
  Constructs a type by picking the set of properties `K` from `T`
  
  For example
  
  ```ts
  interface Todo {
    title: string
    description: string
    completed: boolean
  }
  
  type TodoPreview = MyPick<Todo, 'title' | 'completed'>
  
  const todo: TodoPreview = {
      title: 'Clean room',
      completed: false,
  }
  ```
  
  > View on GitHub: https://tsch.js.org/4
*/

/* _____________ Your Code Here _____________ */

/**
 * 1、约束 K 值必须是 T 类型 key 的集合， K extends keyof T
 * 2、新对象的属性，P in K
 * 3、新对象的值 T[P]
 */
type MyPick<T, K extends keyof T> = {
  [P in K]: T[P];
};

/* _____________ Test Cases _____________ */
import { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<Expected1, MyPick<Todo, "title">>>,
  Expect<Equal<Expected2, MyPick<Todo, "title" | "completed">>>,
  // @ts-expect-error
  MyPick<Todo, "title" | "completed" | "invalid">
];

interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

interface Expected1 {
  title: string;
}

interface Expected2 {
  title: string;
  completed: boolean;
}

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/4/answer
  > View solutions: https://tsch.js.org/4/solutions
  > More Challenges: https://tsch.js.org
*/
