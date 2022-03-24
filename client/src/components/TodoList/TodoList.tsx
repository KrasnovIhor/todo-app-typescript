import React from 'react';

import { Todo } from '../../models/todo.model';

import './TodoList.css';

interface TodoListProps {
	items: Todo[];
	onremoveTodoService: (id: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ items, onremoveTodoService }) => {
	return (
		<ul>
			{items.map((todo) => (
				<li key={todo._id}>
					<span>{todo.text}</span>
					<button onClick={() => onremoveTodoService(todo._id)}>DELETE</button>
				</li>
			))}
		</ul>
	);
};

export default TodoList;
