const express = require('express')
const router = express.Router()
const authenticated = require('../config/auth')

const db = require('../models')
const Todo = db.Todo

router.get('/new', authenticated, (req, res) => {
  res.render('new')
})

router.post('/new', authenticated, (req, res) => {
  const newTodo = new Todo({
    name: req.body.name,
    done: false,
    UserId: req.user._id,
  })

  newTodo.save().then(todo => {
    res.redirect('/')
  }).catch(err => {
    console.log(err)
  })
})

router.get('/edit/:id', authenticated, (req, res) => {
  res.render('edit')
})

router.post('/edit/:id', authenticated, (req, res) => {
  res.send('edit!')
})

router.get('/delete/:id', authenticated, (req, res) => {
  res.send('delete')
})



module.exports = router