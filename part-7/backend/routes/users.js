import express from 'express'
import User from '../models/User.js'

const router = express.Router()

// GET todos los usuarios
router.get('/', async (req, res) => {
  try {
    const users = await User.find({})
      .populate('blogs', { title: 1, author: 1, url: 1, likes: 1 })
    
    res.json(users)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// GET usuario por ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .populate('blogs', { title: 1, author: 1, url: 1, likes: 1 })
    
    if (!user) {
      return res.status(404).json({ error: 'user not found' })
    }
    
    res.json(user)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
