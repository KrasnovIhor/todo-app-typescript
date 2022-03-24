import { Button, Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { ResponseStatus, TodosState } from 'types';
import { TodoItemPlaceHolder } from './TodoItemPlaceHolder';
import styles from './TodoItem.module.scss';

interface TodoItemProps {
	todoId: string;
	text: string;
	removeHandler: (id: string) => void;
}
interface TodoItemComponents {
	Placeholder: typeof TodoItemPlaceHolder;
}

export const TodoItem: React.FC<TodoItemProps> & TodoItemComponents = ({
	todoId,
	text,
	removeHandler,
}) => {
	const status = useSelector<{ todos: TodosState }, ResponseStatus>((state) => state.todos.status);

	const handleDelete = () => {
		removeHandler(todoId);
	};

	if (status === 'pending') {
		return <TodoItemPlaceHolder />;
	}

	return (
		<li className={styles.root}>
			<Card>
				<Card.Body className={styles['card-body']}>
					<Card.Text>{text}</Card.Text>
					<Button onClick={handleDelete} variant='danger'>
						DELETE
					</Button>
				</Card.Body>
			</Card>
		</li>
	);
};

TodoItem.Placeholder = TodoItemPlaceHolder;
