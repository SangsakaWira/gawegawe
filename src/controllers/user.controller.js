const userModel = require('../models/user.model')

const User = (() => {
    const register = async (req, res) => {
        // Create a new user
        try {
            const user = new userModel(req.body)
            await user.save()
            const token = await user.generateAuthToken()
            res.status(201).send({ user, token })
        } catch (error) {
            res.status(400).send(error)
        }
    }

    const login = async (req, res) => {
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
    }

    const getUser = async (req, res) => {
        // Get user profile
        res.send(req.user)
    }

    const logout = async (req, res) => {
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
    }

    const logoutAll = async (req, res) => {
        // Log user out of all devices
        try {
            req.user.tokens.splice(0, req.user.tokens.length)
            await req.user.save()
            res.send()
        } catch (error) {
            res.status(500).send(error)
        }
    }

    return {
        register,
        login,
        getUser,
        logout,
        logoutAll
    }
})()

module.exports = User