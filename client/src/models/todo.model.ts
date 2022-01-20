export interface Todo {
	_id: string;
	text: string;
}

export interface TodoGetResponse {
	todos: Todo[];
}

export interface TodoPostResponse {
	message: string;
	createdTodo: Todo;
}

export interface TodoDeleteResponse {
	message: string;
	id: string;
}
