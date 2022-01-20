import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { $host } from '../../http';
import { deleteTodo, postTodo } from '../../services/todos';

import { Todo, TodoGetResponse } from './../../models/todo.model';

export const getTodos = createAsyncThunk('todos/getTodos', async (_, { rejectWithValue }) => {
	try {
		const response = await $host.get<TodoGetResponse>('todos');

		return response.data.todos;
	} catch (err: any) {
		let error: AxiosError = err;
		if (!error.response) {
			throw err;
		}
		return rejectWithValue(error.response.data);
	}
});
export const addTodo = createAsyncThunk('todos/addTodo', postTodo);
export const removeTodo = createAsyncThunk('todos/removeTodo', deleteTodo);

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
			.addCase(getTodos.pending, (state) => {
				state.status = 'pending';
			})
			.addCase(getTodos.fulfilled, (state, { payload }) => {
				state.todos = payload!;
				state.status = 'succeeded';
			})
			.addCase(getTodos.rejected, (state, action) => {
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
