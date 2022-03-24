import { FC, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { addTodo, readTodos, removeTodo, TodosState } from './store/slices/todoSlice';

import NewTodo from './components/NewTodo/NewTodo';
import TodoList from './components/TodoList/TodoList';

import 'bootstrap/dist/css/bootstrap.min.css';
import Spinner from 'react-bootstrap/Spinner';

const App: FC = () => {
	const todos = useSelector((state: { todos: TodosState }) => state.todos.todos);
	const status = useSelector((state: { todos: TodosState }) => state.todos.status);

	const dispatch = useDispatch();

	const todoAddHandler = (text: string) => {
		dispatch(addTodo(text));
	};

	const todoDeleteHandler = (id: string) => {
		dispatch(removeTodo(id));
	};

	useEffect(() => {
		dispatch(readTodos());
	}, [dispatch]);

	return (
		<div>
			<NewTodo onAddTodo={todoAddHandler} />
			{status === 'pending' ? (
				<div className='d-flex align-items-center justify-content-center'>
					<Spinner animation='border' />
				</div>
			) : status === 'failed' ? (
				<p className='text-center'>Unable to load todos =(</p>
			) : (
				<TodoList onremoveTodoService={todoDeleteHandler} items={todos} />
			)}
		</div>
	);
};

export default App;
