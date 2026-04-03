// Ejercicio 7.20-7.21: DeleteButton con Tailwind CSS

const DeleteButton = ({ blog, onDelete }) => {
  const handleDelete = () => {
    if (onDelete && window.confirm(`Remove blog "${blog.title}"?`)) {
      onDelete(blog)
    }
  }

  return (
    <button
      onClick={handleDelete}
      className="w-full mt-3 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded font-medium transition flex items-center justify-center gap-2"
      data-testid="delete-button"
    >
      🗑️ Delete Blog
    </button>
  )
}

export default DeleteButton
