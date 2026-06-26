const express = require('express')
const cors = require('cors')
const postgres = require('postgres')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 3000

// Conexión a PostgreSQL (usa tu conexión de Supabase)
const sql = postgres(process.env.DATABASE_URL, {
  ssl: 'require',
  connection: {
    family: 4 // fuerza IPv4
  }
})

app.use(cors())
app.use(express.json())

// Middleware para validar API Key
const apiKeyMiddleware = (req, res, next) => {
  const apiKey = req.headers['x-api-key']
  if (!apiKey || apiKey !== process.env.API_KEY) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  next()
}

app.use('/api', apiKeyMiddleware)

// GET all todos
app.get('/api/todos', async (req, res) => {
  try {
    const todos = await sql`select * from public.tasks order by id`
    res.json(todos)
  } catch (error) {
    console.error("❌ Error en consulta:", error)
    res.status(500).json({ error: 'Failed to read todos' })
  }
})

// POST a new todo
app.post('/api/todos', async (req, res) => {
  try {
    const { text } = req.body
    const [newTodo] = await sql`
      insert into public.tasks (text, completed)
      values (${text}, false)
      returning *
    `
    res.status(201).json(newTodo)
  } catch (error) {
    res.status(500).json({ error: 'Failed to add todo' })
  }
})

// PUT update a todo
app.put('/api/todos/:id', async (req, res) => {
  try {
    const { completed } = req.body
    const [updated] = await sql`
      update public.tasks
      set completed = ${completed}
      where id = ${req.params.id}
      returning *
    `
    if (updated) {
      res.json(updated)
    } else {
      res.status(404).json({ error: 'Todo not found' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update todo' })
  }
})

// DELETE completed todos
app.delete('/api/todos/completed', async (req, res) => {
  try {
    await sql`delete from public.tasks where completed = true`
    res.json({ message: 'Cleared completed' })
  } catch (error) {
    res.status(500).json({ error: 'Failed to clear completed' })
  }
})

// DELETE a todo
app.delete('/api/todos/:id', async (req, res) => {
  try {
    await sql`delete from public.tasks where id = ${req.params.id}`
    res.json({ message: 'Deleted' })
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete todo' })
  }
})

app.get('/', (req, res) => {
  res.send('<!DOCTYPE html><html><body><h3>¡Hola Mundo desde Express + Supabase (postgres)!</h3></body></html>')
})

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`)
})
