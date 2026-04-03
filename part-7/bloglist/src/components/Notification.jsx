// Ejercicio 7.20-7.21: Notification con Tailwind CSS

const Notification = ({ message }) => {
  if (!message) return null

  const isError = message.includes('Error') || message.includes('Wrong') || message.includes('Could not')

  return (
    <div
      className={`
        fixed top-4 left-4 right-4 z-50 px-6 py-4 rounded-lg font-medium shadow-lg
        animate-fade-in
        ${isError 
          ? 'bg-red-100 border-l-4 border-red-600 text-red-800' 
          : 'bg-green-100 border-l-4 border-green-600 text-green-800'
        }
      `}
    >
      <div className="flex items-center gap-3">
        <span className="text-xl">
          {isError ? '❌' : '✅'}
        </span>
        <span>{message}</span>
      </div>
    </div>
  )
}

export default Notification
