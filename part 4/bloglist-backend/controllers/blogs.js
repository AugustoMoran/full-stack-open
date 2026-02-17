const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')

// Lists blogs.
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

// Creates a blog for the authenticated user.
blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const body = request.body
  const user = request.user

  if (!body.title || !body.url) {
    return response.status(400).json({ error: 'title and url are required' })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  })

  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

// Deletes a blog owned by the authenticated user.
blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  const blog = await Blog.findById(request.params.id)

  if (!blog) {
    return response.status(404).json({ error: 'blog not found' })
  }

  const user = request.user
  if (blog.user.toString() !== user._id.toString()) {
    return response.status(401).json({ error: 'only the creator can delete a blog' })
  }

  await Blog.findByIdAndDelete(request.params.id)

  response.status(204).end()
})

// Updates blog likes.
blogsRouter.put('/:id', async (request, response) => {
  const { likes } = request.body

  if (likes === undefined) {
    return response.status(400).json({ error: 'likes is required' })
  }

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id, 
    { likes }, 
    { new: true, runValidators: true }
  )

  if (!updatedBlog) {
    return response.status(404).json({ error: 'blog not found' })
  }

  response.json(updatedBlog)
})

module.exports = blogsRouter
