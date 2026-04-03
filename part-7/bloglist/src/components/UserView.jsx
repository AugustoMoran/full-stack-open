import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import userService from '../services/userService'

// Ejercicio 7.20-7.21: User View con Tailwind CSS

const UserView = () => {
  const { id } = useParams()  // Obtener ID de la URL: /users/:id
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true)
        const fetchedUser = await userService.getUserById(id)
        setUser(fetchedUser)
        setError(null)
      } catch (err) {
        setError('User not found')
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [id])

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="text-center">
          <div className="animate-spin inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
          <p className="mt-4 text-gray-600">Loading user...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded">
          <p className="text-red-700 font-semibold">{error}</p>
          <Link to="/users" className="mt-4 inline-block text-red-600 hover:text-red-800 font-medium">
            ← Back to Users
          </Link>
        </div>
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      {/* User Header */}
      <div className="card p-8 mb-8">
        <Link to="/users" className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1 mb-6">
          ← Back to Users
        </Link>
        
        <div className="flex items-center gap-4">
          <div className="text-5xl">👤</div>
          <div>
            <h1 className="text-4xl font-bold text-gray-900">{user.name}</h1>
            <p className="text-gray-600 mt-1">Member profile</p>
          </div>
        </div>
      </div>

      {/* User's Blogs */}
      <div className="card p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          📚 Added Blogs
          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-lg">
            {user.blogs?.length || 0}
          </span>
        </h3>

        {user.blogs && user.blogs.length > 0 ? (
          <div className="space-y-3">
            {user.blogs.map((blog) => (
              <Link
                key={blog.id}
                to={`/blogs/${blog.id}`}
                className="block p-4 bg-gray-50 hover:bg-blue-50 border-l-4 border-gray-300 hover:border-blue-600 rounded transition"
              >
                <h4 className="font-semibold text-gray-900">{blog.title}</h4>
                <p className="text-sm text-gray-600 mt-1">by {blog.author}</p>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-yellow-50 border-l-4 border-yellow-300 p-6 rounded">
            <p className="text-yellow-700">✍️ No blogs added yet</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default UserView
