const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars')
const passport = require('passport')
const session = require('express-session')
const methodOverride = require('method-override')

const db = require('./models')




app.use(methodOverride('_method'))

app.set('view engine', 'handlebars')
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.use(bodyParser.urlencoded({ extended: true }))

app.use(session({
  secret: 'your secret key',
  resave: 'false',
  saveUninitialized: 'false',
}))

// 使用 Passport - 要在「使用路由器」前面
app.use(passport.initialize())
app.use(passport.session())
require('./config/passport')(passport)
app.use((req, res, next) => {
  res.locals.user = req.user
  next()
})

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.use('/users', require('./routes/user'))


app.listen(3000, () => {
  db.sequelize.sync()
  console.log('Express running')
})