const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { celebrate, Joi, errors } = require('celebrate');
const cors = require('cors');
const auth = require('./middlewares/auth');

const app = express();

const usersRouter = require('./routes/users');
const { login, createUser, logout } = require('./controllers/users');
const cardsRouter = require('./routes/cards');
const ErrorNotFound = require('./errors/error-not-found');
const errorCentral = require('./middlewares/error-central');
const regexUrl = require('./utils/constants');
const { requestLogger, errorLogger } = require('./middlewares/logger');

app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001', 'http://adrinalinemesto.nomoredomainsicu.ru', 'https://adrinalinemesto.nomoredomainsicu.ru'],
  methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE'],
  credentials: true,
  optionsSuccessStatus: 200,
  maxAge: 30,
}));

mongoose.connect('mongodb://0.0.0.0:27017/mestodb');

app.use(bodyParser.json());
app.use(helmet());
app.use(cookieParser());

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(regexUrl),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), createUser);

app.post('/signout', logout);

app.use(auth);

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.use('*', (req, res, next) => {
  next(new ErrorNotFound('Упс! Такой страницы нет :('));
});

app.use(errorLogger);
app.use(errors());

app.use(errorCentral);

app.listen(3000, () => {

});
