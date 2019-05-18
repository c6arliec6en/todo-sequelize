const express = require('express')
const router = express.Router()
const authenticated = require('../config/auth')

const db = require('../models')
const Todo = db.Todo

router.get('/', authenticated, (req, res) => {
  Todo.findAll({ where: { userId: req.user.id } }).then(todos => {
    res.render('index', { todos: todos })
  })
})


module.exports = router