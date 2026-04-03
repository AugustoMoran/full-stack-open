import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom'

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    { id: 1, content: 'If it hurts, do it more often', author: 'Jez Humble', votes: 0 },
    { id: 2, content: 'Premature optimization is the root of all evil', author: 'Donald Knuth', votes: 0 },
    { id: 3, content: 'Debugging is like being the detective in a crime drama', author: 'Filipe Fortes', votes: 0 }
  ])
  const [notification, setNotification] = useState(null)

  const showNotification = (message) => {
    setNotification(message)
    setTimeout(() => setNotification(null), 5000)
  }

  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <div className="min-h-screen bg-stone-600">
        {/* Header */}
        <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg">
          <div className="max-w-6xl mx-auto px-6 py-6">
            <h1 className="text-4xl font-bold">Anecdotes App</h1>
            <p className="text-blue-100 mt-1">Built with Tailwind CSS</p>
          </div>
        </header>

        {/* Notification */}
        {notification && (
          <div className="max-w-6xl mx-auto px-6 mt-6">
            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded animate-pulse">
              <p className="font-bold">✓ Success</p>
              <p>{notification}</p>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="bg-white shadow-md sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-6 py-4">
            <div className="flex gap-8">
              <Link to="/" className="text-blue-600 hover:text-blue-800 font-semibold transition">
                Home
              </Link>
              <Link to="/create" className="text-blue-600 hover:text-blue-800 font-semibold transition">
                Create
              </Link>
            </div>
          </div>
        </nav>

        {/* Content */}
        <main className="max-w-6xl mx-auto px-6 py-10">
          <Routes>
            <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
            <Route path="/anecdotes/:id" element={<AnecdoteDetail anecdotes={anecdotes} setAnecdotes={setAnecdotes} />} />
            <Route path="/create" element={<CreateAnecdote anecdotes={anecdotes} setAnecdotes={setAnecdotes} showNotification={showNotification} />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-gray-800 text-white mt-16 py-8">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <p className="text-gray-400">© 2024 Anecdotes App • Built with React & Tailwind </p>
          </div>
        </footer>
      </div>
    </Router>
  )
}

const AnecdoteList = ({ anecdotes }) => {
  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Anecdotes ({anecdotes.length})</h2>
      <div className="grid gap-4">
        {anecdotes.map(anecdote => (
          <Link key={anecdote.id} to={`/anecdotes/${anecdote.id}`}>
            <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition p-6 border-l-4 border-blue-500 cursor-pointer transform hover:scale-105 transition-transform">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{anecdote.content}</h3>
              <div className="flex justify-between items-center">
                <p className="text-gray-600"><span className="font-semibold">By:</span> {anecdote.author}</p>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                  👍 {anecdote.votes}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

const AnecdoteDetail = ({ anecdotes, setAnecdotes }) => {
  const { id } = useParams()
  const anecdote = anecdotes.find(a => a.id === parseInt(id))
  const navigate = useNavigate()

  if (!anecdote) return <div className="text-red-600 text-xl">Anecdote not found</div>

  const handleVote = () => {
    const updated = anecdotes.map(a =>
      a.id === anecdote.id ? { ...a, votes: a.votes + 1 } : a
    )
    setAnecdotes(updated)
  }

  return (
    <div className="max-w-2xl">
      <button
        onClick={() => navigate('/')}
        className="mb-6 text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-2"
      >
        ← Back
      </button>
      <div className="bg-white rounded-lg shadow-lg p-8 border-t-4 border-blue-600">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">{anecdote.content}</h2>
        <p className="text-gray-600 text-lg mb-6"><span className="font-semibold">Author:</span> {anecdote.author}</p>
        
        <div className="flex gap-4">
          <button
            onClick={handleVote}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-semibold transition transform hover:scale-105"
          >
            👍 Vote ({anecdote.votes})
          </button>
          <button
            onClick={() => window.location.href = '/'}
            className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-semibold transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

const CreateAnecdote = ({ anecdotes, setAnecdotes, showNotification }) => {
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!content.trim() || !author.trim()) {
      showNotification('Please fill in all fields')
      return
    }

    const newAnecdote = {
      id: Math.max(...anecdotes.map(a => a.id), 0) + 1,
      content,
      author,
      votes: 0
    }

    setAnecdotes([...anecdotes, newAnecdote])
    showNotification(`New anecdote created: "${content}"`)
    
    setContent('')
    setAuthor('')
    
    setTimeout(() => navigate('/'), 2000)
  }

  return (
    <div className="max-w-2xl">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Create New Anecdote</h2>
      
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8">
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">Content</label>
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter the anecdote content..."
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition"
          />
        </div>

        <div className="mb-8">
          <label className="block text-gray-700 font-semibold mb-2">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Enter the author name..."
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition"
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition transform hover:scale-105"
          >
            Create Anecdote
          </button>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="bg-gray-400 hover:bg-gray-500 text-white px-8 py-3 rounded-lg font-semibold transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default App
