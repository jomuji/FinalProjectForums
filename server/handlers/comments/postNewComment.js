'use strict';

const { MongoClient } = require('mongodb');
const { v4: uuidv4 } = require('uuid');

require('dotenv').config();
const { MONGO_URI } = process.env;

const options = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
};

const postNewComment = async (req, res) => {
	// Request newTheme from body
	const { _id, email, lien, username, comment } = req.body;
	const generatedId = uuidv4();

	// CALL client  from MongoDB
	const client = new MongoClient(MONGO_URI, options);

	try {
		await client.connect();
		const db = client.db('ailleursConseil');
		console.log('connected!');

		// INSERT NEW THEME INTO THEMES COLLECTION
		const result = await db
			.collection('comments')
			.insertOne({ _id: generatedId, comment, username, lien });

		/* 	return res.status(200).json({ data: result }); */

		//uptage the user collection which is not what I want. I want to update an existing user
		const updateUserWithNewComment = await db.collection('users').updateOne(
			{ email },
			{
				$push: {
					comments: generatedId,
				},
			},
			{
				upsert: true,
			}
		);

		const updateThemeWithNewComment = await db.collection('themes').updateOne(
			{ _id },
			{
				$push: {
					comments: generatedId,
				},
			},
			{
				upsert: true,
			}
		);

		// send response back to frontend as well
		if (result) {
			return res.status(200).json({ data: result });
		}

		if (updateUserWithNewComment) {
			return res.status(200).json({ data: updateUserWithNewComment });
		}
		if (updateThemeWithNewComment) {
			return res.status(200).json({ data: updateThemeWithNewComment });
		} else {
			// if not found
			return res.status(400).json({
				status: 400,
				message: '[ ERROR ]: Result, User or Module not found',
			});
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

module.exports = { postNewComment };
