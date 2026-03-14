import { useState } from 'react'
import LikeButton from './LikeButton'
import DeleteButton from './DeleteButton'
import '../styles/Button.css'

const Blog = ({ blog, user, onLike, onDelete }) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const canRemove = user && blog.user && blog.user.username === user.username

  return (
    <div
      style={{
        border: '1px solid #ddd',
        borderRadius: '4px',
        padding: '12px',
        marginBottom: '12px',
        backgroundColor: '#f9f9f9',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
        <div>
          <strong>{blog.title}</strong> by <em>{blog.author}</em>
        </div>
        <button onClick={toggleVisibility} className="btn-secondary">
          {visible ? 'hide' : 'view'}
        </button>
      </div>
      {visible && (
        <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid #eee' }}>
          <div style={{ marginBottom: '10px' }}>
            <a href={blog.url} target="_blank" rel="noopener noreferrer" style={{ color: '#646cff', wordBreak: 'break-all' }}>
              {blog.url}
            </a>
          </div>
          <LikeButton blog={blog} onLike={onLike} />
          <div style={{ marginBottom: '10px', fontSize: '14px', color: '#666' }}>
            Added by <strong>{blog.user?.name}</strong>
          </div>
          {canRemove && <DeleteButton blog={blog} onDelete={onDelete} />}
        </div>
      )}
    </div>
  )
}

export default Blog
