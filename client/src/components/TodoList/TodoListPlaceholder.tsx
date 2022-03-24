import { TodoItem } from 'components';
import styles from './TodoList.module.scss';

export const TodoListPlaceholder: React.FC = () => {
	return (
		<ul className={styles.root}>
			<TodoItem.Placeholder />
			<TodoItem.Placeholder />
			<TodoItem.Placeholder />
			<TodoItem.Placeholder />
		</ul>
	);
};
