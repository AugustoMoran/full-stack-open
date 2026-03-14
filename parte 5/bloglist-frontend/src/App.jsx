import { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import loginService from './services/loginService'
import blogService from './services/blogService'
import './styles/Button.css'
import './App.css'

function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user')
    return savedUser ? JSON.parse(savedUser) : null
  })
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    const fetchBlogs = async () => {
      if (!user) {
        setBlogs([])
        return
      }

      try {
        const blogs = await blogService.getBlogs(user.token)
        setBlogs(blogs)
      } catch {
        setErrorMessage('Could not fetch blogs')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
    }

    fetchBlogs()
  }, [user])

  const handleLogin = async ({ username, password }) => {
    try {
      const loggedInUser = await loginService.login(username, password)
      setUser(loggedInUser)
      localStorage.setItem('user', JSON.stringify(loggedInUser))
      localStorage.setItem('token', loggedInUser.token)
      setErrorMessage(null)
    } catch {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }

  const addBlog = async (blogObject) => {
    try {
      const newBlog = await blogService.create(user.token, blogObject)
      setBlogs((prevBlogs) => prevBlogs.concat(newBlog))
      setErrorMessage(`A new blog "${newBlog.title}" by ${newBlog.author} added`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } catch {
      setErrorMessage('Error creating blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const likeBlog = async (blog) => {
    try {
      const updatedBlog = await blogService.update(user.token, blog.id, { likes: blog.likes + 1 })
      setBlogs((prevBlogs) => prevBlogs.map(b => b.id === blog.id ? updatedBlog : b))
    } catch {
      setErrorMessage('Error updating blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const deleteBlog = async (blog) => {
    try {
      await blogService.deleteBlog(user.token, blog.id)
      setBlogs((prevBlogs) => prevBlogs.filter(b => b.id !== blog.id))
      setErrorMessage(`Blog "${blog.title}" removed`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } catch {
      setErrorMessage('Error removing blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>📚 Blog List</h1>
      </header>
      
      <main className="app-main">
        <Notification message={errorMessage} />
        
        {user === null ? (
          <section className="auth-section">
            <h2>Login</h2>
            <LoginForm onLogin={handleLogin} />
          </section>
        ) : (
          <section className="blog-section">
            <div className="user-info">
              <p>Logged in as <strong>{user.name}</strong></p>
              <button onClick={handleLogout} className="btn-logout">logout</button>
            </div>
            
            <Togglable buttonLabel="new blog">
              <BlogForm createBlog={addBlog} />
            </Togglable>
            
            <BlogList blogs={blogs} user={user} likeBlog={likeBlog} deleteBlog={deleteBlog} />
          </section>
        )}
      </main>
    </div>
  )
}

export default App
