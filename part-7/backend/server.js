import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

import authRoutes from './routes/auth.js'
import blogsRoutes from './routes/blogs.js'
import usersRoutes from './routes/users.js'
import commentsRoutes from './routes/comments.js'

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Conexión a MongoDB
const mongoUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017/bloglist'

mongoose.connect(mongoUrl)
  .then(() => {
    console.log('✅ Connected to MongoDB')
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err.message)
  })

// Rutas
app.use('/api/auth', authRoutes)
app.use('/api/blogs', blogsRoutes)
app.use('/api/users', usersRoutes)
app.use('/api/blogs/:id/comments', commentsRoutes)

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Backend is running' })
})

// Manejo de errores 404
app.use((req, res) => {
  res.status(404).json({ error: 'endpoint not found' })
})

// Iniciar servidor
const PORT = process.env.PORT || 3003

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
  console.log(`📊 MongoDB: ${mongoUrl}`)
})
