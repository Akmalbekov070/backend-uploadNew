const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { JWT_SECRET } = require('../keys');
const User = mongoose.model('User');

module.exports = (req, res, next) => {
	const { authorization } = req.headers;
	if (!authorization) {
		res.status(401).json({ error: 'you mast be logged in' });
	}

	const token = authorization.replace('uchqun', '');
	jwt.verify(token, JWT_SECRET, (err, payload) => {
		if (err) {
			return res.status(401).json({ err: 'You mast be logged in' });
		}

		const { _id } = payload;
		User.findById(_id).then(userData => {
			req.user = userData;
			next();
		});
	});
};
