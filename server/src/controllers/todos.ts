import { RequestHandler } from 'express';
import { Todo } from '../models/todo';

import { client } from '..';
import { ObjectId } from 'mongodb';

export const createTodo: RequestHandler = async (req, res, next) => {
	try {
		const todos = client.db().collection('todos');
		const text = (req.body as { text: string }).text;
		const newTodo = new Todo(text);

		await todos.insertOne(newTodo);

		res.status(201).json({ message: 'Created the todo.', createdTodo: newTodo });
	} catch (e) {
		console.error(e);
	}
};

export const getTodos: RequestHandler = async (_, res, _2) => {
	try {
		const todos = client.db().collection('todos');
		const allTodos = await todos.find().toArray();

		res.json({ todos: allTodos });
	} catch (e) {
		console.error(e);
	}
};

export const updateTodo: RequestHandler<{ id: string }> = async (req, res, next) => {
	try {
		const todos = client.db().collection('todos');
		const todoId = new ObjectId(req.params.id);
		const updatedText = (req.body as { text: string }).text;
		const todoToUpdate = await todos.findOne({ _id: todoId });

		if (!todoToUpdate) {
			res.status(404).json({ message: 'Could not find a todo!' });
		}

		await todos.findOneAndUpdate({ _id: todoId }, { $set: { text: updatedText } });

		res.json({ message: 'Updated', updatedTodo: todoToUpdate });
	} catch (e) {
		console.error(e);
	}
};

export const deleteTodo: RequestHandler = async (req, res, next) => {
	try {
		const todos = client.db().collection('todos');
		const todoId = new ObjectId(req.params.id);
		const todoToDelete = await todos.findOne({ _id: todoId });

		if (!todoToDelete) {
			res.status(404).json({ message: `Todo with id: ${todoId} - not found!` });
		}

		await todos.deleteOne({ _id: todoId });

		res.json({ message: `Todo with id: ${todoId} - removed!`, id: todoId });
	} catch (e) {
		console.error(e);
	}
};
