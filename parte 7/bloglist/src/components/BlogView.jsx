import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { updateBlog, deleteBlog } from '../actions/blogActions'
import blogService from '../services/blogService'
import commentService from '../services/commentService'

// Ejercicio 7.20-7.21: Blog View con Tailwind CSS + Comments

const BlogView = () => {
  const { id } = useParams()  // Obtener ID de la URL: /blogs/:id
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  // 7.18-7.19: Estado para comentarios y formulario
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')
  const [loading, setLoading] = useState(false)

  // Buscar blog en Redux
  const blog = blogs.find(b => b.id === id)

  // 7.18: Cargar comentarios cuando el blog cambia
  useEffect(() => {
    if (blog && blog.id) {
      const fetchComments = async () => {
        setLoading(true)
        const fetchedComments = await commentService.getComments(blog.id)
        setComments(fetchedComments)
        setLoading(false)
      }
      fetchComments()
    }
  }, [blog?.id])

  if (!blog) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded">
          <p className="text-red-700 font-semibold">Blog not found</p>
        </div>
      </div>
    )
  }

  // ¿Puede eliminar? (solo si es el autor)
  const canDelete = user && blog.user && blog.user.username === user.username

  const handleLike = async () => {
    try {
      const updatedBlog = await blogService.update(
        user.token,
        blog.id,
        { likes: blog.likes + 1 }
      )
      dispatch(updateBlog(updatedBlog))
    } catch (error) {
      console.error('Error liking blog:', error)
    }
  }

  const handleDelete = async () => {
    if (window.confirm(`Remove blog "${blog.title}"?`)) {
      try {
        await blogService.deleteBlog(user.token, blog.id)
        dispatch(deleteBlog(blog.id))
        // Redirigir a /
        window.location.href = '/'
      } catch (error) {
        console.error('Error deleting blog:', error)
      }
    }
  }

  // 7.19: Crear nuevo comentario
  const handleAddComment = async (e) => {
    e.preventDefault()
    if (!newComment.trim()) return

    try {
      const commentData = { text: newComment }
      const addedComment = await commentService.createComment(blog.id, commentData)
      setComments([...comments, addedComment])
      setNewComment('')
    } catch (error) {
      console.error('Error adding comment:', error)
    }
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      {/* Blog Details Card */}
      <div className="card p-8 mb-8">
        <div className="mb-6">
          <Link to="/" className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1 mb-4">
            ← Back to blogs
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{blog.title}</h1>
          <p className="text-lg text-gray-600">by <em>{blog.author}</em></p>
        </div>

        {/* Blog Info Section */}
        <div className="border-t border-gray-200 pt-6 space-y-4">
          {/* URL */}
          <div>
            <p className="text-sm text-gray-600 mb-2">📍 URL:</p>
            <a 
              href={blog.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-blue-600 hover:underline break-all"
            >
              {blog.url}
            </a>
          </div>

          {/* Likes */}
          <div className="flex items-center gap-4 bg-purple-50 p-4 rounded-lg">
            <span className="text-2xl font-bold text-purple-600">{blog.likes}</span>
            <span className="text-gray-700">likes</span>
            <button 
              onClick={handleLike}
              className="ml-auto px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded font-medium transition"
            >
              👍 Like
            </button>
          </div>

          {/* Added By */}
          <div className="text-sm text-gray-600">
            Added by <strong>{blog.user?.name || 'Unknown'}</strong>
          </div>

          {/* Delete Button */}
          {canDelete && (
            <button 
              onClick={handleDelete}
              className="w-full mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded font-medium transition"
            >
              🗑️ Delete Blog
            </button>
          )}
        </div>
      </div>

      {/* 7.18-7.19: Comments Section */}
      <div className="card p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          💬 Comments
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-lg">
            {comments.length}
          </span>
        </h2>

        {/* 7.19: Comment Form */}
        <form onSubmit={handleAddComment} className="mb-6 flex gap-2">
          <input
            type="text"
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="input-field flex-1"
          />
          <button 
            type="submit" 
            className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded font-medium transition whitespace-nowrap"
          >
            Comment
          </button>
        </form>

        {/* 7.18: Comments List */}
        <div className="space-y-3">
          {loading ? (
            <p className="text-gray-500 text-center py-4">Loading comments...</p>
          ) : comments.length === 0 ? (
            <div className="bg-blue-50 border-l-4 border-blue-300 p-4 rounded">
              <p className="text-blue-700">No comments yet. Be the first to comment! 🚀</p>
            </div>
          ) : (
            comments.map(comment => (
              <div key={comment.id} className="bg-gray-50 border-l-4 border-blue-600 p-4 rounded hover:shadow transition">
                <div className="flex justify-between items-start mb-2">
                  <strong className="text-gray-900">{comment.user?.name || 'Anonymous'}</strong>
                  <span className="text-xs text-gray-500">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-700">{comment.text}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default BlogView
