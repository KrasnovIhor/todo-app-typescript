import { useDispatch, useSelector } from 'react-redux';

import { TodoItem } from 'components';
import { removeTodo } from 'store/slices/todoSlice';

import { Todo, TodosState } from 'types';

import styles from './TodoList.module.scss';
import { TodoListPlaceholder } from './TodoListPlaceholder';

interface TodoListComponents {
	Placeholder: typeof TodoListPlaceholder;
}

export const TodoList: React.FC & TodoListComponents = () => {
	const dispatch = useDispatch();
	const todos = useSelector<{ todos: TodosState }, Todo[]>((state) => state.todos.todos);

	const todoDeleteHandler = (id: string) => {
		dispatch(removeTodo(id));
	};

	return (
		<ul className={styles.root}>
			{todos.map((todo) => (
				<TodoItem
					key={todo._id}
					todoId={todo._id}
					text={todo.text}
					removeHandler={todoDeleteHandler}
				/>
			))}
		</ul>
	);
};

TodoList.Placeholder = TodoListPlaceholder;
