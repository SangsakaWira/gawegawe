const express = require('express')
const userModel = require('../models/user.model')
const auth = require('../middleware/auth')

const router = express.Router()

router.post('/user', async (req, res) => {
    // Create a new user
    try {
        const user = new userModel(req.body)
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/user/login', async(req, res) => {
    // Login a registered user
    try {
        const { email, password } = req.body
        const user = await userModel.findByCredentials(email, password)
        if (!user) {
            return res.status(401).send({error: 'Login failed! Check your credentials'})
        }
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (error) {
        res.status(400).send(error)
    }

})

// pass middleware auth to check this is route is only for logged in user
router.get('/user', auth, async(req, res) => {
    // Get user profile
    res.send(req.user)
})

router.post('/user/logout', auth, async (req, res) => {
    // Log user out of the application
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token
        })
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
})

router.post('/users/logoutall', auth, async(req, res) => {
    // Log user out of all devices
    try {
        req.user.tokens.splice(0, req.user.tokens.length)
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router