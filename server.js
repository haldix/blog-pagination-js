const express = require('express');
const postRoutes = require('./routes');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/blog', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', () => console.log('Connected to MongoDB'));

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(`${__dirname}/public`));

app.use('/posts', postRoutes);

app.get('/', (req, res, next) => {
  res.send('index.html');
});

app.listen(3000, () => console.log('Server on Port 3000'));
