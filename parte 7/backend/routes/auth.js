import express from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const router = express.Router()

// REGISTRO
router.post('/register', async (req, res) => {
  try {
    const { name, username, password } = req.body

    if (!name || !username || !password) {
      return res.status(400).json({ error: 'name, username, and password required' })
    }

    if (password.length < 3) {
      return res.status(400).json({ error: 'password must be at least 3 characters' })
    }

    const existingUser = await User.findOne({ username })
    if (existingUser) {
      return res.status(400).json({ error: 'username already taken' })
    }

    const user = new User({ name, username })
    await user.setPassword(password)
    await user.save()

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.SECRET,
      { expiresIn: '7d' }
    )

    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        username: user.username
      }
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// LOGIN
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body

    if (!username || !password) {
      return res.status(400).json({ error: 'username and password required' })
    }

    const user = await User.findOne({ username })

    const passwordCorrect = user === null 
      ? false 
      : await user.validatePassword(password)

    if (!user || !passwordCorrect) {
      return res.status(401).json({ error: 'invalid username or password' })
    }

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.SECRET,
      { expiresIn: '7d' }
    )

    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        username: user.username
      }
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
