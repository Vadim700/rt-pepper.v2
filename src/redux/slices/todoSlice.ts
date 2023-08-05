import {
   createSlice,
   PayloadAction,
   createAsyncThunk,
   AnyAction,
} from '@reduxjs/toolkit';
import { useAppSelector } from '../../hooks';

type Todo = {
   id: number;
   userId: number;
   title: string;
   completed: boolean;
};

type TodoState = {
   list: Todo[];
   loading: boolean;
   error: string | null;
};

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
   // localStorage.todo = JSON.stringify(data);

   return data;
});

// addNewTodo
export const addNewTodo = createAsyncThunk<Todo, any, { rejectValue: string }>(
   'todos/addNewTodo',
   async (obj, { rejectWithValue }) => {
      const text = obj.value;
      const id = obj.maxId;

      const todo = {
         title: text,
         userId: 1,
         completed: false,
         id: id,
      };

      const response = await fetch(
         `https://jsonplaceholder.typicode.com/todos/${id}`,
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

const initialState: TodoState = {
   list: [],
   loading: false,
   error: null,
};

const todoSlice = createSlice({
   name: 'todo',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(fetchTodos.pending, (state) => {
            state.loading = true;
            state.error = null;
         })
         .addCase(fetchTodos.fulfilled, (state, action) => {
            state.list = action.payload;
            state.loading = false;
         })
         .addCase(addNewTodo.pending, (state) => {
            state.error = null;
         })
         .addCase(addNewTodo.fulfilled, (state, action) => {
            state.list.push(action.payload);
         })
         .addCase(deleteTodo.fulfilled, (state, action) => {
            state.list = state.list.filter(
               (todo) => String(todo.id) !== action.payload,
            );
         })
         .addCase(toggleStatus.fulfilled, (state, action) => {
            const toggledTodo = state.list.find(
               (item) => item.id === action.payload.id,
            );
            if (toggledTodo) {
               toggledTodo.completed = !toggledTodo.completed;
            }
         })
         .addMatcher(isError, (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.loading = false;
         });
   },
});

export default todoSlice.reducer;

const isError = (action: AnyAction) => {
   return action.type.endsWith('rejected');
};
