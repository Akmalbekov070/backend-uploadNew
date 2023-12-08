const express = require('express');
const { default: mongoose } = require('mongoose');
const routes = express.Router();
const User = mongoose.model('User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../keys');
const login = require('../middleware/index');

routes.get('/protected', login, (req, res) => {
	res.send('hello auth');
});

routes.post('/signup', (req, res) => {
	const { name, email, password } = req.body;
	if (!name || !email || !password) {
		res.status(422).json({ error: 'please all the field' });
	}
	User.findOne({ email }).then(savedUser => {
		if (savedUser) {
			return res.status(422).json({ erros: 'User already exist with email' });
		}
		bcrypt.hash(password, 10).then(hashedPassword => {
			const user = new User({ email, name, password: hashedPassword });

			user
				.save()
				.then(user => {
					res.json({ msg: 'added successfully' });
				})
				.catch(err => {
					console.log(err);
				});
		});
	});
});

routes.post('/signin', (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) {
		res.status(422).json({ error: 'please add email or password' });
	}
	User.findOne({ email }).then(savedUser => {
		if (!savedUser) {
			res.status(422).json({ error: 'invalid email or password' });
		}
		bcrypt
			.compare(password, savedUser.password)
			.then(doPassword => {
				if (doPassword) {
					// return res.json({ msg: 'successfully sign in' });
					const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET);
					const { _id, name, email } = savedUser;
					res.json({ token, user: { _id, name, email } });
				} else {
					return res.json({ error: 'Invalid password	' });
				}
			})
			.catch(err => {
				console.log(err);
			});
	});
});

module.exports = routes;
