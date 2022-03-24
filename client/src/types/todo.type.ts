export interface Todo {
	_id: string;
	text: string;
}

export type ResponseStatus = 'idle' | 'pending' | 'succeeded' | 'failed';

export interface TodosState {
	todos: Todo[];
	status: ResponseStatus;
	error: string | null;
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
