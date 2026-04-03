require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const Person = require('./models/person')

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.static('dist'))

// Crear token personalizado para mostrar el body
morgan.token('body', (req) => {
  return JSON.stringify(req.body)
})

// Usar el token personalizado en el formato
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

// Routes
app.get('/', (request, response) => {
  response.send('<h1>Phonebook Backend</h1>')
})

// Exercise 3.2: Info page
app.get('/info', (request, response) => {
  Person.countDocuments({}).then(count => {
    const currentTime = new Date()
    response.send(`
      <p>Phonebook has info for ${count} people</p>
      <p>${currentTime}</p>
    `)
  })
})

// Exercise 3.1: Get all persons
app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

// Exercise 3.3: Get single person
app.get('/api/persons/:id', (request, response, next) => {
  console.log('🔍 GET /api/persons/:id - Buscando persona con ID:', request.params.id)

  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        console.log('✅ Persona encontrada:', person)
        response.json(person)
      } else {
        console.log('❌ Persona no encontrada')
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

// Exercise 3.4: Delete person
app.delete('/api/persons/:id', (request, response, next) => {
  console.log('🗑️  DELETE /api/persons/:id - Eliminando persona con ID:', request.params.id)

  Person.findByIdAndDelete(request.params.id)
    .then(() => {
      console.log('✅ Persona eliminada')
      response.status(204).end()
    })
    .catch(error => next(error))
})

// Exercise 3.17: Update person
app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body
  console.log('🔄 PUT /api/persons/:id - Actualizando persona con ID:', request.params.id)

  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(
    request.params.id,
    person,
    { new: true, runValidators: true, context: 'query' }
  )
    .then(updatedPerson => {
      console.log('✅ Persona actualizada:', updatedPerson)
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

// Exercise 3.5-3.6: Add new person with validations
app.post('/api/persons', (request, response, next) => {
  const body = request.body
  console.log('📨 POST /api/persons - Intentando agregar nueva persona')
  console.log('Datos recibidos:', body)

  // Exercise 3.6: Validate name and number exist
  if (!body.name || !body.number) {
    console.log('❌ Error: Datos faltantes', { name: body.name, number: body.number })
    return response.status(400).json({
      error: 'name or number missing'
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save()
    .then(savedPerson => {
      console.log('✅ Persona agregada exitosamente:', savedPerson)
      response.json(savedPerson)
    })
    .catch(error => next(error))
})

// Middleware para rutas desconocidas
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

// Exercise 3.16: Middleware de manejo de errores
const errorHandler = (error, request, response, next) => {
  console.error('❌ Error capturado:', error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

// Este debe ser el último middleware cargado
app.use(errorHandler)

// Puerto configurado para Fly.io/Render
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})