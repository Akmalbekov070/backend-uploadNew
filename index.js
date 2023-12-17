const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = 8000;
const { MONGO_URI } = require('./keys/index');

const cors = require('cors');
const corsOptions = {
	origin: '*',
	credentials: true,
	optionSuccesStatus: 200,
};
mongoose.connect(MONGO_URI);

app.use(cors(corsOptions));
require('./models/user');
require('./models/post');

app.use(express.json());
app.use(require('./routes/auth'));
app.use(require('./routes/post'));

mongoose.connection.on('connected', () => {
	console.log('MongoDB connected succesfully');
});

app.listen(PORT, () => {
	console.log(`port has been started ${PORT}`);
});

//akmalbekov2007
//5NNxR5ctXzYUYLJf
