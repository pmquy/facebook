import Event from '../models/Event.js';
import Joi from 'joi';
import {Types} from 'mongoose';
import GroupService from '../services/group.js';

const creatingPattern = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  category: Joi.string().required(),
  time: Joi.string().required(),
  location: Joi.string().required(),
  cover: Joi.string().required(),
  group: Joi.string(),
}).required().unknown(false)

const updatingPattern = Joi.object({
  title: Joi.string(),
  description: Joi.string(),
  category: Joi.string(),
  time: Joi.string(),
  location: Joi.string(),
  cover: Joi.string(),
}).required().unknown(false)

class Controller {
  async create(req, res, next) {
    try {
      const data = await creatingPattern.validateAsync(req.body)
      data.user = req.user._id
      const event = await Event.create(data)
      res.status(201).json(event)
    } catch (err) {
      next(err)
    }
  }

  async get(req,res, next) {
    const page = req.query.page ? Number.parseInt(req.query.page) : 0
    const limit = req.query.limit ? Number.parseInt(req.query.limit) : 10
    const query = req.query.q ? JSON.parse(req.query.q) : {}
    try {
      const events = await Event.aggregate([
        {
          $match: query
        },
        {
          $skip: page * limit,
        },
        {
          $limit: limit
        },
        {
          $addFields: {
            isAttendee: { $in: [req.user._id.toString(), "$attendees"] }
          }
        }
      ])
      res.status(200).json({
        events,
        hasMore: await Event.countDocuments(query) > (page + 1) * limit
      })
    } catch (err) {
      next(err)
    }
  }

  async getById(req, res, next) {
    try {
      const event = (await Event.aggregate([
        { $match: { _id: Types.ObjectId.createFromHexString(req.params.id) } },
        {
          $addFields: {
            isAttendee: { $in: [req.user._id.toString(), "$attendees"] }
          }
        }
      ]))[0]
      if(!event) throw new Error('Event not found')
      event.group = await GroupService.getById(event.group)
      res.status(200).json(event)
    } catch (err) {
      next(err)
    }
  }

  async updateById(req, res, next) {
    try {
      const data = await updatingPattern.validateAsync(req.body)
      const event = await Event.findOneAndUpdate({ _id: req.params.id, user: req.user._id }, data, { new: true })
      if (!event) throw new Error('Event not found')
      res.status(200).json(event)
    } catch (err) {
      next(err)
    }
  }

  async deleteById(req, res, next) {
    try {
      const event = await Event.findOneAndDelete({ _id: req.params.id, user: req.user._id })
      if (!event) throw new Error('Event not found')
      await event.deleteOne()
      res.status(204).json("Event deleted")
    } catch (error) {
      next(error)
    }
  }

  async attend(req, res, next) {
    try {
      await Event.findByIdAndUpdate(req.params.id, {
        $addToSet: { attendees: req.user._id }
      })
      res.status(200).json({ message: 'You have successfully attended this event' })
    } catch (err) {
      next(err)
    }
  }

  async unattend(req, res, next) {
    try {
      await Event.findByIdAndUpdate(req.params.id, {
        $pull: { attendees: req.user._id }
      })
      res.status(200).json({ message: 'You have successfully unattended this event' })
    } catch (err) {
      next(err)
    }
  }

}

export default new Controller()