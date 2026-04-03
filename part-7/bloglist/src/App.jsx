import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import Navigation from './components/Navigation'
import UserList from './components/UserList'
import UserView from './components/UserView'
import BlogView from './components/BlogView'
import loginService from './services/loginService'
import blogService from './services/blogService'
import { setBlogs, addBlog, updateBlog, deleteBlog } from './actions/blogActions'
import { showNotification, hideNotification } from './actions/notificationActions'
import { setUser, logoutUser } from './actions/userActions'

function App() {
  // Redux: Obtener estado del store
  const user = useSelector(state => state.user)
  const blogs = useSelector(state => state.blogs)
  const notification = useSelector(state => state.notification)
  const dispatch = useDispatch()

  // Helper para mostrar notificación temporalmente
  const showNotificationMessage = (message) => {
    dispatch(showNotification(message))
    setTimeout(() => {
      dispatch(hideNotification())
    }, 5000)
  }

  // Cargar blogs cuando el usuario inicia sesión
  useEffect(() => {
    const fetchBlogs = async () => {
      if (!user) {
        dispatch(setBlogs([]))
        return
      }

      try {
        const fetchedBlogs = await blogService.getBlogs(user.token)
        dispatch(setBlogs(fetchedBlogs))
      } catch {
        showNotificationMessage('Could not fetch blogs')
      }
    }

    fetchBlogs()
  }, [user, dispatch])

  // Recuperar usuario de localStorage al montar
  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    if (savedUser && !user) {
      dispatch(setUser(JSON.parse(savedUser)))
    }
  }, [dispatch, user])

  const handleLogin = async ({ username, password }) => {
    try {
      const loggedInUser = await loginService.login(username, password)
      dispatch(setUser(loggedInUser))
      localStorage.setItem('user', JSON.stringify(loggedInUser))
      localStorage.setItem('token', loggedInUser.token)
    } catch {
      showNotificationMessage('Wrong credentials')
    }
  }

  const handleLogout = () => {
    dispatch(logoutUser())
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }

  const handleAddBlog = async (blogObject) => {
    try {
      const newBlog = await blogService.create(user.token, blogObject)
      dispatch(addBlog(newBlog))
      showNotificationMessage(`A new blog "${newBlog.title}" by ${newBlog.author} added`)
    } catch {
      showNotificationMessage('Error creating blog')
    }
  }

  const handleLikeBlog = async (blog) => {
    try {
      const updatedBlog = await blogService.update(user.token, blog.id, { likes: blog.likes + 1 })
      dispatch(updateBlog(updatedBlog))
    } catch {
      showNotificationMessage('Error updating blog')
    }
  }

  const handleDeleteBlog = async (blog) => {
    try {
      await blogService.deleteBlog(user.token, blog.id)
      dispatch(deleteBlog(blog.id))
      showNotificationMessage(`Blog "${blog.title}" removed`)
    } catch {
      showNotificationMessage('Error removing blog')
    }
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Notification message={notification} />

        {user === null ? (
          <LoginForm onLogin={handleLogin} />
        ) : (
          <>
            <Navigation onLogout={handleLogout} />
            
            <main className="min-h-[calc(100vh-64px)]">
              <Routes>
                {/* Ruta principal: lista de blogs */}
                <Route
                  path="/"
                  element={
                    <div className="max-w-6xl mx-auto py-8 px-4">
                      <Togglable buttonLabel="+ New Blog">
                        <BlogForm createBlog={handleAddBlog} />
                      </Togglable>
                      <BlogList blogs={blogs} user={user} likeBlog={handleLikeBlog} deleteBlog={handleDeleteBlog} />
                    </div>
                  }
                />

                {/* Ruta: vista individual de un blog */}
                <Route path="/blogs/:id" element={<BlogView />} />

                {/* Ruta: lista de usuarios */}
                <Route path="/users" element={<UserList />} />

                {/* Ruta: vista individual de un usuario */}
                <Route path="/users/:id" element={<UserView />} />

                {/* Ruta wildcard: redirigir a home */}
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </main>
          </>
        )}
      </div>
    </Router>
  )
}

export default App
