import axios from 'axios'
import { useState, useEffect } from 'react'

// Ejercicio 7.8: Custom hook useResource
// Hook genérico para manejar operaciones CRUD en un servidor backend
// Parámetro: baseUrl (ej: 'http://localhost:3001/notes')
const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Cargar todos los recursos al montar el componente
  useEffect(() => {
    setLoading(true)
    axios
      .get(baseUrl)
      .then(response => {
        setResources(response.data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [baseUrl])

  // Objeto con métodos para CRUD
  const create = (resource) => {
    axios
      .post(baseUrl, resource)
      .then(response => {
        // Agregar el nuevo recurso a la lista local
        setResources([...resources, response.data])
      })
      .catch(err => {
        setError(err.message)
      })
  }

  return { resources, loading, error, create }
}

// Componente para notas
const NoteForm = ({ onAddNote }) => {
  const [content, setContent] = useState('')

  const handleAddNote = () => {
    if (content.trim()) {
      onAddNote({ content })
      setContent('')
    }
  }

  return (
    <div>
      <input
        type="text"
        placeholder="New note..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button onClick={handleAddNote}>Add</button>
    </div>
  )
}

const Notes = () => {
  const notes = useResource('http://localhost:3001/notes')

  if (notes.loading) return <p>Loading notes...</p>
  if (notes.error) return <p style={{ color: 'red' }}>Error: {notes.error}</p>

  return (
    <div>
      <h2>Notes</h2>
      <NoteForm onAddNote={notes.create} />
      <div className="resource-list">
        {notes.resources.map(note => (
          <div key={note.id} className="resource-item">
            {note.content}
          </div>
        ))}
      </div>
    </div>
  )
}

// Componente para personas
const PersonForm = ({ onAddPerson }) => {
  const [name, setName] = useState('')

  const handleAddPerson = () => {
    if (name.trim()) {
      onAddPerson({ name })
      setName('')
    }
  }

  return (
    <div>
      <input
        type="text"
        placeholder="New person..."
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleAddPerson}>Add</button>
    </div>
  )
}

const Persons = () => {
  const persons = useResource('http://localhost:3001/persons')

  if (persons.loading) return <p>Loading persons...</p>
  if (persons.error) return <p style={{ color: 'red' }}>Error: {persons.error}</p>

  return (
    <div>
      <h2>Persons</h2>
      <PersonForm onAddPerson={persons.create} />
      <div className="resource-list">
        {persons.resources.map(person => (
          <div key={person.id} className="resource-item">
            {person.name}
          </div>
        ))}
      </div>
    </div>
  )
}

// Componente principal
const App = () => {
  return (
    <div>
      <h1>Ultimate Hooks</h1>
      <p>Uses a generic useResource hook with json-server</p>
      <hr />
      <Notes />
      <hr />
      <Persons />
    </div>
  )
}

export default App
