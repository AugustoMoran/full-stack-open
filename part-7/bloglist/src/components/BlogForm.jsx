import { useState } from 'react'

// Ejercicio 7.20-7.21: BlogForm con Tailwind CSS

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    createBlog({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-600 p-6 rounded-lg mb-6 shadow">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        ✍️ Create New Blog
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            placeholder="Blog title..."
            required
            className="input-field"
          />
        </div>

        {/* Author Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Author
          </label>
          <input
            type="text"
            value={author}
            onChange={handleAuthorChange}
            placeholder="Author name..."
            required
            className="input-field"
          />
        </div>

        {/* URL Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            URL
          </label>
          <input
            type="url"
            value={url}
            onChange={handleUrlChange}
            placeholder="https://example.com..."
            required
            className="input-field"
          />
        </div>

        {/* Submit Button */}
        <button 
          type="submit" 
          className="w-full mt-4 px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold transition flex items-center justify-center gap-2"
        >
          ✏️ Create Blog
        </button>
      </form>
    </div>
  )
}

export default BlogForm
