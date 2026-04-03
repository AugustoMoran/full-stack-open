import { useState } from 'react'

// Ejercicio 7.20-7.21: Togglable con Tailwind CSS

const Togglable = ({ buttonLabel, children }) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div className="mb-6">
      {!visible && (
        <button 
          onClick={toggleVisibility} 
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold transition shadow"
        >
          {buttonLabel}
        </button>
      )}
      
      {visible && (
        <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-lg">
          {children}
          <button 
            onClick={toggleVisibility} 
            className="mt-4 px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded font-medium transition"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  )
}

export default Togglable
