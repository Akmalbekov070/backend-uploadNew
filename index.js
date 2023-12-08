const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = 8000;
const { MONGO_URI } = require('./keys/index');
require('./models/user');
const cors = require('cors');
const corsOptions = {
	origin: '*',
	credentials: true,
	optionSuccesStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(require('./routes/auth'));

mongoose.connect(MONGO_URI);
mongoose.connection.on('connected', () => {
	console.log('MongoDB connected succesfully');
});

app.listen(PORT, () => {
	console.log(`port has been started ${PORT}`);
});

//akmalbekov2007
//5NNxR5ctXzYUYLJf
