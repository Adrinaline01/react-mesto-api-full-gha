const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const ErrorAuth = require('../errors/error-auth');
const ErrorBadReq = require('../errors/error-bad-req');
const ErrorConflict = require('../errors/error-conflict');
const ErrorNotFound = require('../errors/error-not-found');

const CREATED = 201;

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(String(password), 10)
    .then((hashedPassword) => {
      User.create({
        name, about, avatar, email, password: hashedPassword,
      })
        .then((user) => {
          res.status(CREATED).send({
            name: user.name,
            about: user.about,
            avatar: user.avatar,
            email: user.email,
            _id: user._id,
          });
        })
        .catch((error) => {
          if (error.name === 'ValidationError') {
            next(new ErrorBadReq('Неверные данные пользователя при регистрации'));
          } else if (error.code === 11000) {
            next(new ErrorConflict('Пользователь с таким email уже существует'));
          } else {
            next(error);
          }
        });
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ErrorAuth('Введены неверные данные для входа');
  }

  User.findOne({ email })
    .select('+password')
    .orFail(() => next(new ErrorAuth('Введены неверные данные для входа')))
    .then((user) => {
      bcrypt.compare(String(password), user.password)
        .then((isValidUser) => {
          if (isValidUser) {
            const token = jwt.sign({
              _id: user._id,
              expiresIn: '5d',
            }, 'super-strong-secret');
            res.cookie('token', token, {
              maxAge: 36000 * 24 * 5,
              httpOnly: true,
              sameSite: true,
            });
            res.send({ data: user.toJSON() });
          } else {
            next(new ErrorAuth('Введены неверные данные для входа'));
          }
        });
    })
    .catch(next);
};

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch(next);
};

const getUserById = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new ErrorNotFound('На сервере нет данного пользователя');
      }
      res.send(user);
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new ErrorBadReq('Неверные данные пользователя'));
      } else {
        next(error);
      }
    });
};

const updateProfileUser = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true })
    .then((user) => {
      if (!user) {
        throw new ErrorNotFound('На сервере нет данного пользователя');
      }
      res.send(user);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new ErrorBadReq('Неверные данные обновления профиля'));
      } else {
        next(error);
      }
    });
};

const updateAvatarUser = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .then((user) => {
      if (!user) {
        throw new ErrorNotFound('На сервере нет данного пользователя');
      }
      res.send(user);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new ErrorBadReq('Неверные данные обновления аватара'));
      } else {
        next(error);
      }
    });
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateProfileUser,
  updateAvatarUser,
  login,
};
