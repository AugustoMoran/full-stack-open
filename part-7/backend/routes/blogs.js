import express from 'express'
import { Blog } from '../models/Blog.js'
import User from '../models/User.js'
import requireAuth from '../middleware/auth.js'

const router = express.Router()

// GET todos los blogs
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find({})
      .populate('user', { name: 1, username: 1 })
      .populate('comments.user', { name: 1, username: 1 })
    
    res.json(blogs)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// GET blog por ID
router.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
      .populate('user', { name: 1, username: 1 })
      .populate('comments.user', { name: 1, username: 1 })
    
    if (!blog) {
      return res.status(404).json({ error: 'blog not found' })
    }
    
    res.json(blog)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// CREAR blog (requiere autenticación)
router.post('/', requireAuth, async (req, res) => {
  try {
    const { title, author, url } = req.body

    if (!title || !author || !url) {
      return res.status(400).json({ error: 'title, author, and url required' })
    }

    const user = await User.findById(req.userId)
    
    const blog = new Blog({
      title,
      author,
      url,
      user: user._id,
      likes: 0,
      comments: []
    })

    const savedBlog = await blog.save()
    await savedBlog.populate('user', { name: 1, username: 1 })

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    res.status(201).json(savedBlog)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// ACTUALIZAR blog (likes)
router.put('/:id', requireAuth, async (req, res) => {
  try {
    const { likes, title, author, url } = req.body

    const updateData = {}
    if (likes !== undefined) updateData.likes = likes
    if (title !== undefined) updateData.title = title
    if (author !== undefined) updateData.author = author
    if (url !== undefined) updateData.url = url

    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    ).populate('user', { name: 1, username: 1 })
     .populate('comments.user', { name: 1, username: 1 })

    if (!updatedBlog) {
      return res.status(404).json({ error: 'blog not found' })
    }

    res.json(updatedBlog)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// ELIMINAR blog
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)

    if (!blog) {
      return res.status(404).json({ error: 'blog not found' })
    }

    if (blog.user.toString() !== req.userId) {
      return res.status(403).json({ error: 'only blog author can delete' })
    }

    await Blog.findByIdAndDelete(req.params.id)
    
    const user = await User.findById(req.userId)
    user.blogs = user.blogs.filter(id => id.toString() !== req.params.id)
    await user.save()

    res.json({ message: 'blog deleted' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
