import { createSlice, PayloadAction, AnyAction } from '@reduxjs/toolkit';

import { TodoState } from '../../types';
import {
  fetchTodos,
  addNewTodo,
  deleteTodo,
  toggleStatus,
  editTodo,
} from '../thunks/todoThunks';

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
      .addCase(editTodo.fulfilled, (state, action) => {
        const editedTodo = state.list.find(
          (item) => item.id === action.payload.id,
        );
        if (editedTodo) {
          editedTodo.title = action.payload.title;
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
