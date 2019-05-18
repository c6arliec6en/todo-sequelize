const express = require('express')
const router = express.Router()
const authenticated = require('../config/auth')

const db = require('../models')
const Todo = db.Todo

router.get('/', authenticated, (req, res) => {
  // res.render('index')
  Todo.findAll().then(todos => {
    // if (err) console.log(err)
    res.render('index', { todos: todos })
  })
})


module.exports = router