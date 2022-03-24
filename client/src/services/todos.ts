import { TodoPostResponse, TodoDeleteResponse, Todo, TodoGetResponse } from 'types';
import { AsyncThunkPayloadCreator } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { $host } from 'host';

export const readTodosService: AsyncThunkPayloadCreator<Todo[]> = async (
	_,
	{ rejectWithValue }
) => {
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
};

export const addTodoService: AsyncThunkPayloadCreator<Todo, string, {}> = async (
	text: string,
	{ rejectWithValue }
) => {
	try {
		const response = await $host.post<TodoPostResponse>('todos', { text });

		return response.data.createdTodo;
	} catch (err: any) {
		let error: AxiosError = err;
		if (!error.response) {
			throw err;
		}
		return rejectWithValue(error.response.data);
	}
};

export const removeTodoService: AsyncThunkPayloadCreator<string, string> = async (
	id: string,
	{ rejectWithValue }
) => {
	try {
		const response = await $host.delete<TodoDeleteResponse>(`todos/${id}`);

		return response.data.id;
	} catch (err: any) {
		let error: AxiosError = err;
		if (!error.response) {
			throw err;
		}
		return rejectWithValue(error.response.data);
	}
};
