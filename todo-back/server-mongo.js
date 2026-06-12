const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config(); // carga variables de entorno

const app = express();
const PORT = process.env.PORT || 3000;

// Conexión a MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("✅ Conectado a MongoDB"))
.catch(err => console.error("❌ Error de conexión:", err));

app.use(cors());
app.use(express.json());

// Definir esquema y modelo
const todoSchema = new mongoose.Schema({
  text: { type: String, required: true },
  completed: { type: Boolean, default: false }
});

const Todo = mongoose.model('Todo', todoSchema, 'tasks');

// GET all todos
app.get('/api/todos', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: 'Failed to read todos' });
  }
});

// POST a new todo
app.post('/api/todos', async (req, res) => {
  try {
    const newTodo = new Todo({ text: req.body.text });
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add todo' });
  }
});

// PUT update a todo
app.put('/api/todos/:id', async (req, res) => {
  try {
    const updated = await Todo.findByIdAndUpdate(
      req.params.id,
      { completed: req.body.completed },
      { returnDocument: 'after' }
    );
    if (updated) {
      res.json(updated);
    } else {
      res.status(404).json({ error: 'Todo not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update todo' });
  }
});

// DELETE completed todos
app.delete('/api/todos/completed', async (req, res) => {
  try {
    await Todo.deleteMany({ completed: true });
    res.json({ message: 'Cleared completed' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to clear completed' });
  }
});

// DELETE a todo
app.delete('/api/todos/:id', async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete todo' });
  }
});

app.get('/', (req, res) => {
  res.send('<!DOCTYPE html><html><body><h3>¡Hola Mundo desde Express + MongoDB Atlas!</h3></body></html>');
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
