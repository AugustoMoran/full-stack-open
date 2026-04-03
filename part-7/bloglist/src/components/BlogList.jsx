import Blog from './Blog'

// Ejercicio 7.20-7.21: BlogList con Tailwind CSS

const BlogList = ({ blogs, user, likeBlog, deleteBlog }) => {
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  return (
    <div className="py-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          📝 Blogs
          <span className="bg-blue-100 text-blue-800 text-lg px-3 py-1 rounded-full">
            {sortedBlogs.length}
          </span>
        </h2>

        {sortedBlogs.length === 0 ? (
          <div className="bg-blue-50 border-2 border-dashed border-blue-300 rounded-lg p-12 text-center">
            <p className="text-gray-600 text-lg">
              📖 No blogs yet. Be the first to create one!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {sortedBlogs.map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                user={user}
                onLike={likeBlog}
                onDelete={deleteBlog}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default BlogList
