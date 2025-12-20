const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.static('dist'))

// Crear token personalizado para mostrar el body
morgan.token('body', (req, res) => {
  return JSON.stringify(req.body)
})

// Usar el token personalizado en el formato
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

// Data
let persons = [
  { 
    id: 1, 
    name: "Arto Hellas", 
    number: "040-123456"
  },
  { 
    id: 2, 
    name: "Ada Lovelace", 
    number: "39-44-5323523"
  },
  { 
    id: 3, 
    name: "Dan Abramov", 
    number: "12-43-234345"
  },
  { 
    id: 4, 
    name: "Mary Poppendieck", 
    number: "39-23-6423122"
  }
]

// Routes
app.get('/', (request, response) => {
  response.send('<h1>Phonebook Backend</h1>')
})

// Exercise 3.2: Info page
app.get('/info', (request, response) => {
  const currentTime = new Date()
  const personsCount = persons.length
  
  response.send(`
    <p>Phonebook has info for ${personsCount} people</p>
    <p>${currentTime}</p>
  `)
})

// Exercise 3.1: Get all persons
app.get('/api/persons', (request, response) => {
  response.json(persons)
})

// Exercise 3.3: Get single person
app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

// Exercise 3.4: Delete person
app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)
  response.status(204).end()
})

// Exercise 3.5-3.6: Add new person with validations
app.post('/api/persons', (request, response) => {
  const body = request.body

  // Exercise 3.6: Validate name and number exist
  if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'name or number missing' 
    })
  }

  // Exercise 3.6: Check if name already exists
  const nameExists = persons.find(person => person.name === body.name)
  if (nameExists) {
    return response.status(400).json({ 
      error: 'name must be unique' 
    })
  }

  const person = {
    id: Math.floor(Math.random() * 1000000),
    name: body.name,
    number: body.number
  }

  persons = persons.concat(person)
  response.json(person)
})

// Middleware para rutas desconocidas
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

// Puerto configurado para Fly.io/Render
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})