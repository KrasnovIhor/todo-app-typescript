import { TodoPostResponse, TodoDeleteResponse } from './../models/todo.model';
import { $host } from '../http';

export const postTodo = async (text: string) => {
	try {
		const response = await $host.post<TodoPostResponse>('todos', { text });

		return response.data.createdTodo;
	} catch (e) {
		console.error(e);
	}
};

export const deleteTodo = async (id: string) => {
	try {
		const response = await $host.delete<TodoDeleteResponse>(`todos/${id}`);

		return response.data.id;
	} catch (e) {
		console.error(e);
	}
};
