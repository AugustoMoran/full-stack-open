import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  blog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog'
  }
}, { timestamps: true })

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required']
  },
  author: {
    type: String,
    required: [true, 'Author is required']
  },
  url: {
    type: String,
    required: [true, 'URL is required']
  },
  likes: {
    type: Number,
    default: 0
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  comments: [commentSchema]
}, { timestamps: true })

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject.__v
  }
})

const Blog = mongoose.model('Blog', blogSchema)
const Comment = mongoose.model('Comment', commentSchema)

export { Blog, Comment }
