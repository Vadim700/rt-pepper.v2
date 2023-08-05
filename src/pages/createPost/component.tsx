import React from 'react';
import { redirect } from 'react-router';
import { NewTodo } from '../../components/newTodo/component';

type CreateTodoProps = {};

export const CreateTodo: React.FC<CreateTodoProps> = (): JSX.Element => {
   return (
      <div>
         <h1>Create a todo</h1>
         <NewTodo />
      </div>
   );
};

export const createTodo = async ({ title, body, userId }: any) => {
   const res = await fetch('https://jsonplaceholder.typicode.com/todos', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, body, userId }),
   });
   const newTodo = await res.json();

   return newTodo;
};

export const createTodoAction = async ({ request }: any) => {
   const formData = await request.formData();
   const newTodo = {
      title: formData.get('title'),
      body: formData.get('body'),
      userId: formData.get('userId'),
   };
   const todo = await createTodo(newTodo);

   return redirect('/todos/' + todo.id);
};
