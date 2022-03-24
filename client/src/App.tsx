import { FC, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { addTodo, readTodos, TodosState } from './store/slices';

import { NewTodo, TodoList } from 'components';

import { Container } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

const App: FC = () => {
	const status = useSelector((state: { todos: TodosState }) => state.todos.status);

	const dispatch = useDispatch();

	const todoAddHandler = (text: string) => {
		dispatch(addTodo(text));
	};

	useEffect(() => {
		dispatch(readTodos());
	}, [dispatch]);

	return (
		<Container>
			<NewTodo onAddTodo={todoAddHandler} />
			{status === 'pending' ? (
				<TodoList.Placeholder />
			) : status === 'failed' ? (
				<p className='text-center'>Unable to load todos =(</p>
			) : (
				<TodoList />
			)}
		</Container>
	);
};

export default App;
