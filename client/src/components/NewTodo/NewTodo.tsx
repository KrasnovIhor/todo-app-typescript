import React, { useRef } from 'react';

import './NewTodo.css';

interface NewTodoProps {
	onAddTodo: (text: string) => void;
}

const NewTodo: React.FC<NewTodoProps> = ({ onAddTodo }) => {
	const todoInputRef = useRef<HTMLInputElement>(null);

	const todoSubmitHandler = (e: React.FormEvent) => {
		e.preventDefault();

		const enteredText = todoInputRef.current!.value;
		onAddTodo(enteredText);
		todoInputRef.current!.value = '';
	};

	return (
		<form onSubmit={todoSubmitHandler}>
			<div className='form-control'>
				<label htmlFor='todo-text'>Todo Text</label>
				<input ref={todoInputRef} type='text' id='todo-text' />
			</div>
			<button type='submit'>Add Todo</button>
		</form>
	);
};

export default NewTodo;
