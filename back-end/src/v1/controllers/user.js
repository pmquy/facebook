const User = require('../models/User')
const Joi = require('joi')
const bcrypt = require('bcrypt')
const CustomError = require('../utils/CustomError')
const jwt = require('jsonwebtoken')
const {redisClient} = require('../../app')
const UserService = require('../services/user')

const creatingPattern = Joi.object({
  phoneNumber: Joi.string().trim().required().pattern(/^\d*$/),
  email: Joi.string().email().trim().required(),
  password: Joi.string().required().pattern(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,16}$/).messages({
    'string.pattern.base': 'Mật khẩu có độ dài từ 8 đến 16 chứa ít nhất 1 chữ cái in hoa, 1 chữ cái thường, 1 chữ số'
  }).custom((value, helpers) => bcrypt.hashSync(value, Number.parseInt(process.env.SALT_ROUNDS))),
  firstName: Joi.string().trim().required(),
  lastName: Joi.string().trim().required(),
  avatar: Joi.string(),
}).unknown(false).required()

const updatingPattern = Joi.object({
  phoneNumber: Joi.string().trim().pattern(/^\d*$/),
  email: Joi.string().email().trim(),
  firstName: Joi.string().trim(),
  lastName: Joi.string().trim(),
  avatar: Joi.string(),
}).unknown(false).required()

const loginPattern = Joi.object({
  phoneNumber: Joi.string().trim().pattern(/^\d*$/).required(),
  password: Joi.string().required()
}).unknown(false).required()

const changePasswordPattern = Joi.object({
  oldPassword: Joi.string().required(),
  password: Joi.string().pattern(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,16}$/).messages({
    'string.pattern.base': 'Mật khẩu có độ dài từ 8 đến 16 chứa ít nhất 1 chữ cái in hoa, 1 chữ cái thường, 1 chữ số'
  }).custom((value, helpers) => bcrypt.hashSync(value, Number.parseInt(process.env.SALT_ROUNDS))),
}).unknown(false).required()

const opt1 = {
  maxAge: 1000 * 60 * 60 * 24 * 10,
  httpOnly: false
}

const opt2 = {
  maxAge: 1000 * 60 * 60 * 24 * 10,
  httpOnly: true,
  sameSite: 'None',
  secure: true,
}

class Controller {

  get = async (req, res, next) => {
    UserService.get(req.query)
      .then(val => res.status(200).send(val))
      .catch(err => next(err))
  }

  getMe = (req, res, next) => {
    if (req.user) {
      res.status(200).send(req.user)
    } else {
      next(new Error())
    }
  }

  getToken = _id => {
    return jwt.sign({ _id: _id }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRE_IN,
    })
  }

  getById = async (req, res, next) => {
    UserService.getById(req.params.id)
      .then(val => res.status(200).send(val))
      .catch(err => next(err))
  }

  create = async (req, res, next) => {
    creatingPattern.validateAsync(req.body)
      .then(val => UserService.create(val))
      .then(val => res.status(200).send(val))
      .catch(err => next(err))
  }

  updateById = async (req, res, next) => {
    updatingPattern.validateAsync(req.body)
      .then(val => UserService.updateById(req.user, req.params.id, val))
      .then(val => res.status(200).send(val))
      .catch(err => next(err))
  }

  changePasswordById = async (req, res, next) => {
    changePasswordPattern.validateAsync(req.body)
      .then(async val => UserService.changePasswordById(req.user, req.params.id, val))
      .then(val => res.status(200).send(val))
      .catch(err => next(err))
  }

  login = async (req, res, next) => {
    loginPattern.validateAsync(req.body)
      .then(val => UserService.login(val.phoneNumber, val.password))
      .then(val => {
        res.cookie('access_token', this.getToken(val.toObject()), process.env.ENV == "DEV" ? opt1 : opt2)
        res.status(200).send(val)
      })
      .catch(err => next(err))
  }

  deleteById = (req, res, next) => {
    UserService.deleteById(req.user, req.params.id)
      .then(val => res.status(200).send(val))
      .catch(err => next(err))
  }
}


module.exports = new Controller()