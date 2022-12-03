'use strict';
const { MongoClient } = require('mongodb');

require('dotenv').config({ path: '../.env' });
const { MONGO_URI } = process.env;

const options = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
};

// RETURN AN ARRAY OF ALL MODULES BY MODULE WILL USE TO USEPARAMS

const deleteCommentById = async (req, res) => {
	// Request from body
	const { _id } = req.params;
	const { email, theme } = req.body;

	// CREATE A NEW CLIENT
	const client = new MongoClient(MONGO_URI, options);

	try {
		// connect to the client
		await client.connect();
		// connect to the database (db name is provided as an argument to the function)
		const db = client.db('ailleursConseil');
		console.log('connected!');

		//add some data to this empty collection
		let result = await db.collection('comments').deleteOne({ _id });

		const deleteCommentIdInUser = await db.collection('users').updateOne(
			{ email },
			{
				$pull: {
					comments: _id,
				},
			},
			{
				upsert: true,
			}
		);

		const deleteCommentIdInTheme = await db.collection('themes').updateOne(
			{ theme },
			{
				$pull: {
					comment: _id,
				},
			},
			{
				upsert: true,
			}
		);
		// send response back to frontend as well
		if (result) {
			return res.status(200).json({ data: result, _id });
		}

		if (deleteThemeIdInUser) {
			return res.status(200).json({ deleteCommentIdInUser });
		}
		if (deleteThemeIdInModule) {
			return res.status(200).json({ data: deleteCommentIdInTheme });
		} else {
			// if not found
			return res.status(400).json({
				status: 400,
				message: '[ ERROR ]: Result, User or Module not found',
			});
		}
	} catch (err) {
		console.log(err.stack);
		res.status(500).json({ status: 500, data: req.body, message: err.message });
	} finally {
		// close the connection to the database server
		client.close();
		console.log('disconnected!');
	}
};

module.exports = { deleteCommentById };
