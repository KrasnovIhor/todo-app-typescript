import { Router } from 'express';

import {
	createTodo,
	removeTodoService,
	readTodosService,
	updateTodo,
} from './../controllers/todos';

const router = Router();

router.post('/', createTodo);

router.get('/', readTodosService);

router.patch('/:id', updateTodo);

router.delete('/:id', removeTodoService);

export default router;
