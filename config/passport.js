const LocalSrategy = require('passport-local').Strategy
const passport = require('passport')



module.exports = passport => {
  passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    User.findOne({
      email: email,
    }).then(user => {
      if (!user) {
        return done(null, false, { message: 'The E-mail is not registered' })
      }

      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) throw err
        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false, { message: 'The password is incorrect' });
        }
      })

    })
  }))
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user)
    })
  })
}