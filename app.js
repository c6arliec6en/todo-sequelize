const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars')
const passport = require('passport')
const session = require('express-session')
const methodOverride = require('method-override')



app.set('view engine', 'handlebars')
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))


app.get('/', (req, res) => {
  res.render('index')
})

app.use('/users', require('./routes/user'))


app.listen(3000, () => {
  console.log('Express running')
})