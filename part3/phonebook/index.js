require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const Phonebook = require('./models/person')

app.use(cors())
app.use(express.static('build'))
app.use(express.json())

morgan.token('reg', function mss (response) { return JSON.stringify({ name: response.body.name, number: response.body.number }) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :reg'))

const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

app.get('/api/people', (request, response) => {
  Phonebook.find({}).then(person => {
    response.json(person)
  })
})

app.get('/api/people/:id', (request, response, next) => {
  Phonebook.findById(request.params.id).
    then(x => {
      response.json(x)
    })
    .catch (error => next(error))

})

app.post('/api/people', (request, response, next) => {
  const body = request.body

  if (body.name === undefined || body.number === undefined) {
    return response.status(400).json({ error: 'content missing' })
  }

  const person =  new Phonebook ({
    name: body.name,
    number: body.number,
  })
  person.save().then(savedNote => {
    response.json(savedNote)
  })
    .catch(error => next(error))

})

app.put('/api/people/:id', (request, response, next) => {
  const body = request.body
  const person = {
    name: body.name,
    number: body.number,
  }
  Phonebook.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedP => {
      response.json(updatedP)
    })
    .catch(error => next(error))

})

app.delete('/api/people/:id', (request, response, next) => {
  Phonebook.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))

})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})