'use strict';

const { MongoClient } = require('mongodb');

require('dotenv').config();
const { MONGO_URI } = process.env;

const options = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
};

const getOrCreateUserByEmail = async (req, res) => {
	const { email } = req.params;

	// findOneAndUpdate user info from MongoDB
	const client = new MongoClient(MONGO_URI, options);

	try {
		await client.connect();
		const db = client.db('ailleursConseil');
		console.log('connected!');

		const queryObj = { email };

		const findRes = await db.collection('users').findOne(queryObj);
		// if found, send response back to frontend
		if (findRes) {
			return res.status(200).json({ data: findRes });
		} else {
			// *******ajouter un condition pour valider le body contient toute l'information nécessaire**************************
			// if not found, create a new user using their information
			const createRes = await db
				.collection('users')
				.insertOne({ ...req.body, email });
			// 	// send response back to frontend as well
			return res.status(200).json({ data: createRes });
		}
	} catch (err) {
		console.error(err);
		return res.status(500).json({
			ok: false,
			status: 500,
			message: '[ ERROR ]: Internal server error',
		});
	} finally {
		await client.close();
		console.log('disconnected!');
	}
};

module.exports = { getOrCreateUserByEmail };
