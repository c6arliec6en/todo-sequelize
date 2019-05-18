const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const passport = require('passport')
const bcrypt = require('bcryptjs')

const db = require('../models')
const User = db.User

module.exports = passport => {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      User.findOne({ where: { email: email } })
        .then(user => {
          if (!user) {
            return done(null, false, { message: 'The email is not registered' })
          }
          if (user.password !== password) {
            console.log('User password is incorrect')
            return done(null, false, { message: 'Email or password incorrect' })
          }
          return done(null, user)
        })
    })


  )
  passport.use(
    new FacebookStrategy({
      clientID: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
      callbackURL: process.env.FACEBOOK_CALLBACK,
      // clientID: '310556713178666',
      // clientSecret: '8ba1779462a2f365670103488dac61e8',
      // callbackURL: 'http://localhost:3000/auth/facebook/callback',
      profileFields: ['email', 'displayName']
    }, (accessToken, refreshToken, profile, done) => {
      // find and create user
      User.findOne({
        where: { email: profile._json.email }
      }).then(user => {
        if (!user) {
          let randomPassword = Math.random().toString(36).slice(-8)
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(randomPassword, salt, (err, hash) => {
              const newUser = new User({
                name: profile._json.name,
                email: profile._json.email,
                password: hash,
              })
              newUser.save().then(user => {
                return done(null, user)
              }).catch(err => {
                console.log(err)
              })
            })
          })
        } else {
          return done(null, user)
        }
      })
    }
    ))


  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    User.findByPk(id).then((user) => {
      done(null, user)
    })
  })
}