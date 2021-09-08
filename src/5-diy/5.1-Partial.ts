/*
  5.1 - Partial
  -------
  by Phobal (@phobal) #easy #union #built-in
  
  ### Question
  
  Implement the built-in `Partial<T>` generic without using it.
  
  Constructs a type by partial all props is partial(?)
  
  For example
  
  ```ts
  interface Todo {
    title: string
    name: string
  }
  
  type TodoPreview = MyPartial<Todo>
  
  const todo: TodoPreview = {
      title: 'my title'
  }
  ```
*/

/* _____________ Your Code Here _____________ */

type MyPartial<T> = {
  [P in keyof T]?: T[P];
};

/* _____________ Test Cases _____________ */
import { Equal, Expect } from "@type-challenges/utils";

type cases = [Expect<Equal<Expected1, MyPartial<Todo>>>];

interface Todo {
  title: string;
}

interface Expected1 {
  title?: string;
}
