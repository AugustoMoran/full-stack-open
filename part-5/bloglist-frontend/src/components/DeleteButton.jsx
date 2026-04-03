import '../styles/Button.css'

const DeleteButton = ({ blog, onDelete }) => {
  const handleDelete = () => {
    if (onDelete && window.confirm(`Remove blog "${blog.title}"?`)) {
      onDelete(blog)
    }
  }

  return (
    <button
      onClick={handleDelete}
      className="btn-delete"
      style={{ marginTop: '10px', marginBottom: '10px', width: '100%' }}
      data-testid="delete-button"
    >
      remove
    </button>
  )
}

export default DeleteButton
