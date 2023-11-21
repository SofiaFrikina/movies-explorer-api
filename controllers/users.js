require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const {
  ValidationError, AthorizedError, NotFoundError, ConflictError, ServerError,
} = require('../utils/errors/errors');
const { SUCCESSFUL_ANSWER } = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

const getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      } else {
        next(res.send(user));
      }
    })
    .catch((err) => {
      if (err.message === 'NotFoundError') {
        return next(new NotFoundError('Пользователь не найден'));
      }
      if (err.name === 'CastError') {
        return next(new ValidationError('Переданы некорректные данные'));
      }
      return next(new ServerError('Произошла ошибка на сервере'));
    });
};

const updateUser = (req, res, next) => {
  const { email, name } = req.body;
  User.findByIdAndUpdate(req.user._id, { email, name }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.message === 'NotFoundError') {
        return next(new NotFoundError('Пользователь не найден'));
      }
      if (err.name === 'CastError') {
        return next(new ValidationError('Переданы некорректные данные'));
      }
      return next(new ServerError('Произошла ошибка на сервере'));
    });
};

const createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then(() => {
      res.status(SUCCESSFUL_ANSWER).send({
        name, email,
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        return next(new ConflictError('Указанный email уже существует'));
      }
      if (err.name === 'ValidationError') {
        return next(new ValidationError('Переданы некорректные данные'));
      }
      return next(new ServerError('Произошла ошибка на сервере'));
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      if (!user) {
        throw (new AthorizedError('Введены неправильная почта или пароль'));
      }
      // создадим токен
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
      // вернём токен
      res.status(SUCCESSFUL_ANSWER).send({ token });
    })
    .catch(next);
};

module.exports = {
  getUser, updateUser, createUser, login,
};
