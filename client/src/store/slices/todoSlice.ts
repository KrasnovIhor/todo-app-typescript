import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { removeTodoService, addTodoService, readTodosService } from '../../services/todos';

import { Todo } from './../../models/todo.model';

export const readTodos = createAsyncThunk('todos/readTodos', readTodosService);
export const addTodo = createAsyncThunk('todos/addTodo', addTodoService);
export const removeTodo = createAsyncThunk('todos/removeTodo', removeTodoService);

export interface TodosState {
	todos: Todo[];
	status: 'idle' | 'pending' | 'succeeded' | 'failed';
	error: string | null;
}

const initialState: TodosState = {
	todos: [],
	status: 'idle',
	error: null,
};

export const todoSlice = createSlice({
	name: 'todos',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(readTodos.pending, (state) => {
				state.status = 'pending';
			})
			.addCase(readTodos.fulfilled, (state, { payload }) => {
				state.todos = payload!;
				state.status = 'succeeded';
			})
			.addCase(readTodos.rejected, (state, action) => {
				state.status = 'failed';
			})
			.addCase(addTodo.fulfilled, (state, { payload }) => {
				state.todos.push(payload!);
			})
			.addCase(removeTodo.fulfilled, (state, { payload }) => {
				state.todos = state.todos.filter((todo) => todo._id !== payload);
			});
	},
});

export default todoSlice.reducer;
