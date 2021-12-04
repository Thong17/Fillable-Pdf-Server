const express = require('express')
const router = express.Router()
const Users = require('../models/Users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

router.post('/register', async (req, res) => {
    const { username, password } = req.body
    const hashed_password = await bcrypt.hash(password, 10)
    const User = new Users({ username: username, password: hashed_password })
    await User.save()
    res.send({ result: 'success' })
})

router.post('/login', async (req, res) => {
    const { username, password } = req.body
    const user = await Users.findOne({ username: username })
    user ? ((await bcrypt.compare(password, user.password)) ? res.json(user) : res.json({ result: 'password incorrect' })) : res.json({ result: 'username incorrect' })
})

module.exports = router