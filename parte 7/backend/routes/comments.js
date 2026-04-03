import express from 'express'
import { Blog } from '../models/Blog.js'
import User from '../models/User.js'

const router = express.Router({ mergeParams: true })

// GET comentarios de un blog
router.get('/', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
      .populate('comments.user', { name: 1, username: 1 })

    if (!blog) {
      return res.status(404).json({ error: 'blog not found' })
    }

    res.json(blog.comments)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// CREAR comentario
router.post('/', async (req, res) => {
  try {
    const { text } = req.body

    if (!text) {
      return res.status(400).json({ error: 'text required' })
    }

    const blog = await Blog.findById(req.params.id)

    if (!blog) {
      return res.status(404).json({ error: 'blog not found' })
    }

    const comment = {
      text,
      user: null,
      _id: new (require('mongoose').Types.ObjectId)()
    }

    blog.comments = blog.comments.concat(comment)
    await blog.save()

    const populatedBlog = await blog.populate('comments.user', { name: 1, username: 1 })

    res.status(201).json(comment)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
