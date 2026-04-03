// Ejercicio 7.20-7.21: LikeButton con Tailwind CSS

const LikeButton = ({ blog, onLike }) => {
  const handleLike = () => {
    if (onLike) {
      onLike(blog)
    }
  }

  return (
    <div className="flex items-center gap-3 py-2">
      <span className="text-sm font-medium text-gray-700">
        Likes: <strong className="text-lg text-purple-600">{blog.likes}</strong>
      </span>
      <button
        onClick={handleLike}
        className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded font-medium transition flex items-center gap-1"
        data-testid="like-button"
      >
        👍 Like
      </button>
    </div>
  )
}

export default LikeButton
