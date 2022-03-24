import React, { useRef } from 'react';
import { Button, Form } from 'react-bootstrap';

import styles from './NewTodo.module.scss';

interface NewTodoProps {
	onAddTodo: (text: string) => void;
}

export const NewTodo: React.FC<NewTodoProps> = ({ onAddTodo }) => {
	const todoInputRef = useRef<HTMLInputElement>(null);

	const todoSubmitHandler = (e: React.FormEvent) => {
		e.preventDefault();

		const enteredText = todoInputRef.current!.value;
		onAddTodo(enteredText);
		todoInputRef.current!.value = '';
	};

	return (
		<Form className={styles.root} onSubmit={todoSubmitHandler}>
			<Form.Group className={styles['form-control']}>
				<Form.Label htmlFor='todo-text'>Todo Text</Form.Label>
				<Form.Control ref={todoInputRef} type='text' id='todo-text' />
			</Form.Group>
			<Button type='submit'>Add Todo</Button>
		</Form>
	);
};
