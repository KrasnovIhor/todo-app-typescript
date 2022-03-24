import { Card, Placeholder } from 'react-bootstrap';
import styles from './TodoItem.module.scss';

export const TodoItemPlaceHolder: React.FC = () => {
	return (
		<li className={styles.root}>
			<Card>
				<Card.Body className={styles['card-body']}>
					<Placeholder as={Card.Text} xs={9} animation='glow'>
						<Placeholder xs={1} /> <Placeholder xs={2} /> <Placeholder xs={3} />
					</Placeholder>
					<Placeholder.Button
						className={styles.placeholder}
						animation='glow'
						xs={2}
						variant='danger'>
						<Placeholder />
					</Placeholder.Button>
				</Card.Body>
			</Card>
		</li>
	);
};
