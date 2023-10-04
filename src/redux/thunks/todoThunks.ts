import { createAsyncThunk } from '@reduxjs/toolkit';

import { Todo, TodoState } from '../../types';

// fetchTodos
export const fetchTodos = createAsyncThunk<
  Todo[],
  any,
  { rejectValue: string }
>('todos/fetchTodos', async (url, { rejectWithValue }) => {
  let limit = '';
  let page = '';

  if (url.itemsPerPage) {
    limit = url.itemsPerPage;
    page = url.pageNumber;
  }

  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos?_page=${page}&_limit=${limit}`,
  );

  if (!response.ok) {
    return rejectWithValue('Server Error!');
  }

  const data = await response.json();

  return data;
});

// addNewTodo
export const addNewTodo = createAsyncThunk<Todo, any, { rejectValue: string }>(
  'todos/addNewTodo',
  async (obj, { rejectWithValue }) => {
    const { value, maxId } = obj;

    const todo = {
      title: value,
      userId: 1,
      completed: false,
      id: maxId,
    };

    const response = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${maxId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo),
      },
    );

    if (!response.ok) {
      return rejectWithValue("Can't add task");
    }

    return (await response.json()) as Todo;
  },
);

// deleteTodo;
export const deleteTodo = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>('todos/deleteTodo', async function (id, { rejectWithValue }) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${id}`,
    {
      method: 'DELETE',
    },
  );
  if (!response.ok) {
    return rejectWithValue("Can't delete todoshka ;)");
  }

  return id;
});

//toggleCompleted
export const toggleStatus = createAsyncThunk<
  Todo,
  any,
  { rejectValue: string; state: { todo: TodoState } }
>('todos/toggleStatus', async function (id, { rejectWithValue, getState }) {
  const todo = getState().todo.list.find((item) => item.id === id);

  if (todo) {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          completed: !todo.completed,
        }),
      },
    );
    if (!response.ok) {
      return rejectWithValue('Server error!');
    }
    return (await response.json()) as Todo;
  }
  return rejectWithValue('no such todo id');
});

//editTodo
export const editTodo = createAsyncThunk<
  Todo,
  any,
  { rejectValue: string; state: { todo: TodoState } }
>('todos/editTodo', async function (obj, { rejectWithValue, getState }) {
  const text = obj.value;
  const id = obj.id;

  const todo = getState().todo.list.find((item) => item.id === Number(id));

  if (todo) {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: text,
        }),
      },
    );

    if (!response.ok) {
      return rejectWithValue('Server error!');
    }
    return (await response.json()) as Todo;
  }
  return rejectWithValue('no such todo id');
});
