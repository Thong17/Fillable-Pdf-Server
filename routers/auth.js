const express = require('express')
const router = express.Router()
const Users = require('../models/Users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

router.post('/register', async (req, res) => {
    const { username, password } = req.body
    try {
        const hashed_password = await bcrypt.hash(password, 10)
        const User = new Users({ username: username, password: hashed_password })
        await User.save()
        res.send({ result: 'success' })
    } catch {
        res.send({ result: 'faild' })
    }
})

router.post('/login', async (req, res) => {
    const { username, password } = req.body
    try {
        const user = await Users.findOne({ username: username })
        user ? ((await bcrypt.compare(password, user.password)) ? res.json({result: 'success', user: user}) : res.json({ result: 'faild', message: 'password is incorrect' })) : res.json({ result: 'faild', message: 'username incorrect' })    
    } catch {
        res.send({ result: 'faild', message: 'cannot connect to server' })
    }
})

module.exports = router