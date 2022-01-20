import env from 'dotenv';

import express, { Request, Response, NextFunction } from 'express';
import { json } from 'body-parser';
import cors from 'cors';

import { MongoClient } from 'mongodb';

import todoRoutes from './routes/todos';

env.config();

const PORT = process.env.PORT || 3000;

export const client = new MongoClient(
	`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ulgu6.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
);

const app = express();

const startServer = () => {
	app.use(cors());
	app.use(json());
	app.use('/todos', todoRoutes);
	app.use((err: Error, _: Request, res: Response, _2: NextFunction) => {
		res.status(500).json({ message: err.message });
	});

	app.listen(PORT, () => {
		console.log('Listening on port ' + PORT);
	});
};

const start = async () => {
	try {
		await client.connect();
		console.log('Connection established');

		const todosCollection = client.db().collection('todos');

		if (!todosCollection) {
			await client.db().createCollection('todos');
		}

		startServer();
	} catch (e) {
		console.error(e);
	}
};

start();
