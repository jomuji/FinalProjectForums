'use strict';

const { MongoClient } = require('mongodb');

require('dotenv').config();
const { MONGO_URI } = process.env;

const options = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
};

const postEmailListLaunch = async (req, res) => {
	// Request newTheme from body
	const { emails, email } = req.body;

	// CALL client  from MongoDB
	const client = new MongoClient(MONGO_URI, options);

	try {
		await client.connect();
		const db = client.db('ailleursConseil');
		console.log('connected!');

		// INSERT NEW EMAIL into emailLists collection // emails array
		const result = await db.collection('emailLists').updateOne(
			{ titre: 'Lancement' },
			{
				$push: {
					emails: email,
				},
			},
			{
				upsert: true,
			}
		);

		if (result) {
			return res.status(200).json({ data: result });
		} else {
			// if not found
			return res.status(400).json({
				status: 400,
				message: '[ ERROR ]: email not found',
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

module.exports = { postEmailListLaunch };
