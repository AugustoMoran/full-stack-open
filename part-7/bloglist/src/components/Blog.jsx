import { useState } from 'react'
import { Link } from 'react-router-dom'
import LikeButton from './LikeButton'
import DeleteButton from './DeleteButton'

// Ejercicio 7.20-7.21: Blog con Tailwind CSS

const Blog = ({ blog, user, onLike, onDelete }) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const canRemove = user && blog.user && blog.user.username === user.username

  return (
    <div className="card p-4 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
        <Link to={`/blogs/${blog.id}`} className="flex-1">
          <div className="text-lg font-semibold text-blue-600 hover:text-blue-800 transition">
            {blog.title}
            <span className="text-gray-600 font-normal ml-2">by <em>{blog.author}</em></span>
          </div>
        </Link>
        
        <button 
          onClick={toggleVisibility} 
          className={`px-3 py-1 rounded font-medium transition ${
            visible 
              ? 'btn-danger bg-red-500 hover:bg-red-600' 
              : 'btn-secondary bg-green-500 hover:bg-green-600'
          }`}
        >
          {visible ? 'Hide' : 'View'}
        </button>
      </div>

      {visible && (
        <div className="pt-4 border-t border-gray-200 space-y-3">
          {/* URL */}
          <div>
            <a 
              href={blog.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-blue-600 hover:underline break-all text-sm"
            >
              🔗 {blog.url}
            </a>
          </div>

          {/* Like Section */}
          <LikeButton blog={blog} onLike={onLike} />

          {/* Author */}
          <div className="text-sm text-gray-600">
            Added by <strong>{blog.user?.name}</strong>
          </div>

          {/* Delete Button (only if user is author) */}
          {canRemove && <DeleteButton blog={blog} onDelete={onDelete} />}
        </div>
      )}
    </div>
  )
}

export default Blog
