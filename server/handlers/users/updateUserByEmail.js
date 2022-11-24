'use strict';

const { MongoClient } = require('mongodb');

require('dotenv').config();
const { MONGO_URI } = process.env;

const options = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
};

const updateUserByEmail = async (req, res) => {
	const { email } = req.params;

	// findOneAndUpdate user info from MongoDB
	const client = new MongoClient(MONGO_URI, options);

	try {
		await client.connect();
		const db = client.db('ailleursConseil');

		const queryObj = { email };
		const updateObj = { $set: req.body };
		const updateOptions = { new: true };

		const findRes = await db.collection('users').findOne(queryObj);

		console.log(findRes);
		// if found, send response back to frontend
		if (findRes) {
			const updateRes = await db
				.collection('users')
				.updateOne(queryObj, updateObj, updateOptions);
			return res.status(200).json({ data: updateRes });
		} else {
			// if not found, create a new user using their information
			const createRes = await db.collection('users').insertOne(req.body);
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
	}
};

module.exports = { updateUserByEmail };
