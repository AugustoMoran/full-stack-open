import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

// Ejercicio 7.20-7.21: Navigation con Tailwind CSS

const Navigation = ({ onLogout }) => {
  const user = useSelector(state => state.user)

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo y Links */}
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-white font-bold text-xl hover:text-gray-100 transition">
              📚 BlogHub
            </Link>
            
            <div className="hidden sm:flex space-x-6">
              <Link 
                to="/" 
                className="text-gray-100 hover:text-white font-medium transition border-b-2 border-transparent hover:border-white pb-1"
              >
                Blogs
              </Link>
              <Link 
                to="/users" 
                className="text-gray-100 hover:text-white font-medium transition border-b-2 border-transparent hover:border-white pb-1"
              >
                Users
              </Link>
            </div>
          </div>

          {/* User Info y Logout */}
          {user && (
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-white font-medium">{user.name}</p>
                <p className="text-gray-200 text-xs">logged in</p>
              </div>
              <button 
                onClick={onLogout} 
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md font-medium transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navigation
