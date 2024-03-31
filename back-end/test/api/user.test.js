import '../env.js'
import app from '../../src/app.js'
app.listen(process.env.PORT, () => {})

import {use} from 'chai'
import chaiHttp from 'chai-http'
const chai = use(chaiHttp)
import User from '../../src/v1/models/User.js'
import bcrypt from 'bcrypt'
import {join, dirname} from 'path'
import { fileURLToPath } from 'url'
const __dirname = dirname(fileURLToPath(import.meta.url))

let cookie;
let id;
const user = {
  phoneNumber : '0979926225',
  email : 'pmquy204@gmail.com',
  password : 'Paturnskop3012',
  lastName : 'Quy',
  firstName : 'Pham Minh',
}

describe('Test user api', () => {

  before(done => {
    User.deleteMany({}).then(() => done())
  })

  it('Should create new user', done => {
    chai.request(app).post('/users/create').field(user).attach('avatar', join(__dirname, 'bg.jpg')).end((err, res) => {
      id = res.body._id
      chai.expect(res.status).to.be.equal(200)
      chai.expect(res.body.phoneNumber).to.be.equal(user.phoneNumber)
      chai.expect(res.body.email).to.be.equal(user.email)
      chai.expect(res.body.firstName).to.be.equal(user.firstName)
      chai.expect(res.body.lastName).to.be.equal(user.lastName)
      chai.expect(res.body).to.include.all.keys('avatar', 'createdAt', 'updatedAt')
      chai.expect(bcrypt.compareSync(user.password, res.body.password)).to.be.equal(true)
      done()
    })
  })

  it('Should not create new user because of using used phone number', done => {
    const user = {
      phoneNumber : '0979926225',
      email : 'a@gmail.com',
      password : 'Paturnskop3012',
      lastName : 'Quy',
      firstName : 'Pham Minh'
    }
    chai.request(app).post('/users/create').send(user).end((err, res) => {
      chai.expect(res.status).to.be.not.equal(200)
      done()
    })
  })
  
  it('Should not create new user because of using used email', done => {
    const user = {
      phoneNumber : '0979926226',
      email : 'pmquy204@gmail.com',
      password : 'Paturnskop3012',
      lastName : 'Quy',
      firstName : 'Pham Minh'
    }
    chai.request(app).post('/users/create').send(user).end((err, res) => {
      chai.expect(res.status).to.be.not.equal(200)
      done()
    })
  })

  it('Should not create new user because of invalid password', done => {
    const user = {
      phoneNumber : '0979926226',
      email : 'pmquy205@gmail.com',
      password : 'paturnskop3012',
      lastName : 'Quy',
      firstName : 'Pham Minh'
    }
    chai.request(app).post('/users/create').send(user).end((err, res) => {
      chai.expect(res.status).to.be.not.equal(200)
      done()
    })
  })

  it('Should login and get access token', done => {
    const user = {
      phoneNumber : '0979926225',
      password : 'Paturnskop3012',
    }
    chai.request(app).post('/users/login').send(user).end((err, res) => {
      chai.expect(res.status).to.be.equal(200)
      chai.expect(res.header['set-cookie']).to.length(1)
      cookie = res.header['set-cookie']
      done()
    })
  })

  it('Should not login because of unregistered phone number', done => {
    const user = {
      phoneNumber : '0979926226',
      password : 'Paturnskop3012',
    }
    chai.request(app).post('/users/login').send(user).end((err, res) => {
      chai.expect(res.status).to.be.not.equal(200)
      done()
    })
  })

  it('Should not login because of wrong password', done => {
    const user = {
      phoneNumber : '0979926225',
      password : 'Paturnskop3013',
    }
    chai.request(app).post('/users/login').send(user).end((err, res) => {
      chai.expect(res.status).to.be.not.equal(200)
      done()
    })
  })

  it('Should get list of user', done => {
    chai.request(app).get('/users').end((err, res) => {
      chai.expect(res.status).to.be.equal(200)
      chai.expect(res.body).length(1)
      done()
    })
  })

  it('Should get user with id', done => {
    chai.request(app).get('/users/' + id).end((err, res) => {
      chai.expect(res.status).to.be.equal(200)
      chai.expect(res.body.firstName).to.be.equal(user.firstName)
      chai.expect(res.body.lastName).to.be.equal(user.lastName)
      chai.expect(res.body).to.include.all.keys('createdAt', 'updatedAt', 'avatar')
      done()
    })
  })
  
  it('Should update user with access token', done => {
    const data = {
      firstName : 'vip',
      lastName : 'quy'
    }
    chai.request(app).put('/users/' + id).set("Cookie",cookie).field(data).attach('avatar', join(__dirname, 'bg.jpg')).end((err, res) => {
      chai.expect(res.status).to.be.equal(200)
      chai.expect(res.body.firstName).to.be.equal(data.firstName)
      chai.expect(res.body.lastName).to.be.equal(data.lastName)
      done()
    })
  })


  it('Should not update current user because of not having access token', done => {
    const data = {
      firstName : 'vip',
      lastName : 'quy'
    }
    chai.request(app).put('/users/' + id).send(data).end((err, res) => {
      chai.expect(res.status).to.be.not.equal(200)
      done()
    })
  })

  it('Should change password', done => {
    const data = {
      oldPassword : 'Paturnskop3012',
      password : 'Paturnskop3013',
    }
    chai.request(app).post('/users/changePassword').set("Cookie",cookie).send(data).end((err,res) => {
      chai.expect(res.status).to.be.equal(200)
      chai.expect(bcrypt.compareSync(data.password,res.body.password)).to.be.equal(true)
      done()
    })
  })

  it('Should not change password because of not having access token', done => {
    const data = {
      oldPassword : 'Paturnskop3012',
      password : 'Paturnskop3013',
    }
    chai.request(app).post('/users/changePassword').send(data).end((err,res) => {
      chai.expect(res.status).to.be.not.equal(200)
      done()
    })
  })

  it('Should not change password because of wrong current password', done => {
    const data = {
      oldPassword : 'Paturnskop3012',
      password : 'Paturnskop3013',
    }
    chai.request(app).post('/users/changePassword').set("Cookie",cookie).send(data).end((err,res) => {
      chai.expect(res.status).to.be.not.equal(200)
      done()
    })
  })
})
