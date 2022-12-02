'use strict';

const { MongoClient } = require('mongodb');

require('dotenv').config();
const { MONGO_URI } = process.env;

const options = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
};

const getCommentsByThemeId = async (req, res) => {
	const { _id } = req.params;

	// findOneAndUpdate user info from MongoDB
	const client = new MongoClient(MONGO_URI, options);

	try {
		await client.connect();
		const db = client.db('ailleursConseil');
		console.log('connected!');

		let findRes = await db.collection('themes').findOne({ _id });

		// map through theme collection looking for matching _ids
		const result = await Promise.all(
			findRes.comments.map(async (item) => {
				return db.collection('comments').findOne({ _id: item });
			})
		);

		// if found, send response back to frontend

		if (result) {
			return res.status(200).json({ data: result });
		} else {
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

module.exports = { getCommentsByThemeId };
