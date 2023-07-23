import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

type Todo = {
   id: number;
   userId: number;
   title: string;
   complited: boolean;
};

type CounterState = {
   list: Todo[];
   loading: boolean;
   error: string | null;
};

export const fetchTodos = createAsyncThunk<
   Todo[],
   undefined,
   { rejectValue: string }
>('todos/fetchTodos', async function (_, { rejectWithValue }) {
   const response = await fetch(
      'https://jsonplaceholder.typicode.com/todos?_limit=10',
   );

   if (response.ok) {
      return rejectWithValue('Error');
   }

   const data = await response.json();

   return data;
});

const initialState: CounterState = {
   list: [],
   loading: false,
   error: null,
};

const todoSlice = createSlice({
   name: 'state',
   initialState,
   reducers: {
      // addTodo(state, action: PayloadAction<string>) {},
      // toggleComplited(state, action: PayloadAction<string>) {},
      // removeTodo(state, action: PayloadAction<string>) {},
   },
   extraReducers: (builder) => {
      builder
         .addCase(fetchTodos.pending, (state, action) => {
            state.loading = true;
            state.error = null;
         })
         .addCase(fetchTodos.fulfilled, (state, action) => {
            state.list = action.payload;
            state.loading = false;
         });
   },
});

// export const { addTodo, toggleComplited, removeTodo } = todoSlice.actions;

export default todoSlice.reducer;
