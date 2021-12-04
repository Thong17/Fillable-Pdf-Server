const express = require('express')
const router = express.Router()
const Users = require('../models/Users')
const bcrypt = require('bcrypt')

router.post('/register', async (req, res) => {
    const { username, password } = req.body
    const hashed_password = await bcrypt.hash(password, 10)
    const User = new Users({ username: username, password: hashed_password })
    await User.save()
    res.send({ result: 'success' })
})

module.exports = router