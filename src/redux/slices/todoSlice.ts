import {
   createSlice,
   PayloadAction,
   createAsyncThunk,
   AnyAction,
} from '@reduxjs/toolkit';

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
   const limit = url.itemsPerPage;
   const page = url.pageNumber;

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
export const addNewTodo = createAsyncThunk<
   Todo,
   string,
   { rejectValue: string }
>('todos/addNewTodo', async (text, { rejectWithValue }) => {
   const todo = {
      title: text,
      userId: 1,
      completed: false,
   };

   const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify(todo),
   });

   if (!response.ok) {
      return rejectWithValue("Can't add task");
   }

   return { await: response.json() } as unknown as Todo;
});

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
         .addMatcher(isError, (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.loading = false;
         });
   },
});

// export const { addTodo, toggleCompleted, removeTodo } = todoSlice.actions;

export default todoSlice.reducer;

const isError = (action: AnyAction) => {
   return action.type.endsWith('rejected');
};
