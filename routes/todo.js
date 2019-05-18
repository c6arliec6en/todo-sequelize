const express = require('express')
const router = express.Router()
const authenticated = require('../config/auth')

const db = require('../models')
const Todo = db.Todo

router.get('/new', authenticated, (req, res) => {
  res.render('new')
})

router.post('/new', authenticated, (req, res) => {
  console.log(req.user)
  const newTodo = new Todo({
    name: req.body.name,
    done: false,
    userId: req.user.id,
  })

  newTodo.save().then(todo => {
    res.redirect('/')
  }).catch(err => {
    console.log(err)
  })
})


router.get('/detail/:id', authenticated, (req, res) => {
  Todo.findOne({ where: { id: req.params.id } }).then(todo => {
    return res.render('detail', { todo: todo })
  }).catch(err => {
    console.log(err)
  })
})

router.get('/edit/:id', authenticated, (req, res) => {
  Todo.findOne({ where: { id: req.params.id } }).then(todo => {
    return res.render('edit', { todo: todo })
  }).catch(err => {
    console.log(err)
  })
})

router.put('/edit/:id', authenticated, (req, res) => {
  Todo.findOne({ where: { id: req.params.id } }).then(todo => {
    todo.name = req.body.name
    if (req.body.done) {
      todo.done = true
    } else {
      todo.done = false
    }
    todo.save()
    return res.redirect('/')
  }).catch(err => {
    console.log(err)
  })
})

router.delete('/delete/:id', authenticated, (req, res) => {
  Todo.destroy({
    where: {
      userId: req.user.id,
      id: req.params.id
    }
  }).then(todo => {
    return res.redirect('/')
  }).catch(err => {
    console.log(err)
  })
})



module.exports = router