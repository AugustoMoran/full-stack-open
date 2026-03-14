import Blog from './Blog'

const BlogList = ({ blogs, user, likeBlog, deleteBlog }) => {
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  return (
    <div style={{ marginTop: '24px' }}>
      <h2 style={{ marginBottom: '16px', color: '#333' }}>
        📝 Blogs ({sortedBlogs.length})
      </h2>
      {sortedBlogs.length === 0 ? (
        <div style={{
          padding: '24px',
          textAlign: 'center',
          backgroundColor: '#f5f5f5',
          borderRadius: '4px',
          color: '#999',
          fontSize: '16px',
        }}>
          No blogs yet. Be the first to create one!
        </div>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {sortedBlogs.map((blog) => (
            <li key={blog.id}>
              <Blog
                blog={blog}
                user={user}
                onLike={likeBlog}
                onDelete={deleteBlog}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default BlogList
