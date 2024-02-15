const User = require('../models/User')
const Joi = require('joi')
const bcrypt = require('bcrypt')
const CustomError = require('../utils/CustomError')
const jwt = require('jsonwebtoken')

const creatingPattern = Joi.object({
  phoneNumber: Joi.string().trim().required().pattern(/^\d*$/),
  email: Joi.string().email().trim().required(),
  password: Joi.string().required().pattern(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,16}$/).messages({
    'string.pattern.base': 'Mật khẩu có độ dài từ 8 đến 16 chứa ít nhất 1 chữ cái in hoa, 1 chữ cái thường, 1 chữ số'
  }).custom((value, helpers) => bcrypt.hashSync(value, Number.parseInt(process.env.SALT_ROUNDS))),
  firstName: Joi.string().trim().required(),
  lastName: Joi.string().trim().required(),
}).unknown(false).required()

const updatingPattern = Joi.object({
  phoneNumber: Joi.string().trim().pattern(/^\d*$/),
  email: Joi.string().email().trim(),  
  firstName: Joi.string().trim(),
  lastName: Joi.string().trim(),
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

class Controller {

  get = async(req, res, next) => {
    User.find(req.query).select('-password -phoneNumber -email')
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
    User.findById(req.params.id).select('-password -phoneNumber -email')
      .then(val => res.status(200).send(val))
      .catch(err => next(err))
  }

  create = async (req, res, next) => {
    creatingPattern.validateAsync(req.body)
      .then(val => User.create(val))
      .then(val => {
        res.cookie('access_token', this.getToken(val._id), {
          maxAge: 1000 * 60 * 60 * 24 * 10,
        })
        res.status(200).send(val)
      })
      .catch(err => next(err))
  }

  updateById = async (req, res, next) => {
    updatingPattern.validateAsync(req.body)
      .then(val => User.findByIdAndUpdate(req.params.id, val, { new: true }))
      .then(val => res.status(200).send(val))
      .catch(err => next(err))
  }
  
  changePasswordById = async (req, res, next) => {    
    changePasswordPattern.validateAsync(req.body)
      .then(async val => {
        const user = await User.findById(req.params.id)
        if(bcrypt.compareSync(val.oldPassword, user.password))
          return user.updateOne({password : val.password}, {new : true})
        throw new Error()
      })      
      .then(val => res.status(200).send(val))
      .catch(err => next(err))
  }

  login = async (req, res, next) => {    
    loginPattern.validateAsync(req.body)
      .then(async val => {
        const user = await User.findOne({ phoneNumber: val.phoneNumber })
        if (bcrypt.compareSync(val.password, user.password)) return user        
        throw new Error()
      })
      .then(val => {
        res.cookie('access_token', this.getToken(val.toObject()), {
          maxAge: 1000 * 60 * 60 * 24 * 10,
        })
        res.status(200).send(val)
      })
      .catch(err => next(err))
  }

  deleteById = (req, res, next) => {
    User.findByIdAndDelete(req.params.id)
      .then(val => res.status(200).send(val))
      .catch(err => next(err))
  }
}


module.exports = new Controller()