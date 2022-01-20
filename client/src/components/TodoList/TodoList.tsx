import React from 'react';

import { Todo } from '../../models/todo.model';

import './TodoList.css';

interface TodoListProps {
	items: Todo[];
	onDeleteTodo: (id: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ items, onDeleteTodo }) => {
	return (
		<ul>
			{items.map((todo) => (
				<li key={todo._id}>
					<span>{todo.text}</span>
					<button onClick={() => onDeleteTodo(todo._id)}>DELETE</button>
				</li>
			))}
		</ul>
	);
};

export default TodoList;
