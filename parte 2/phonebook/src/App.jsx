import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    {
      name: 'Arto Hellas',
      number: 1123456789
    }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newBusqueda, setNewBusqueda] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    const exist = persons.some(p => p.name === newName)
    exist ?
      window.alert(`${newName} is already added to phonebook`)
    :
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleBusquedaChange = (event) => setNewBusqueda(event.target.value)

  const filteredPersons = persons.filter(p =>
    p.name.toLowerCase().includes(newBusqueda.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter searchValue={newBusqueda} onSearchChange={handleBusquedaChange} />

      <h2>Numbers (filtered)</h2>
      <Persons persons={filteredPersons} />

      <h2>Add new</h2>
      <PersonForm
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />

      <h2>All contacts</h2>
      <Persons persons={persons} />
    </div>
  )
}

export default App