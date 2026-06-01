const express = require('express');
const cors = require('cors');
const fs = require('fs/promises');
const path = require('path');

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'data', 'todos.json');

app.use(cors());
app.use(express.json());

// Helper to read data
async function getTodos() {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      await fs.writeFile(DATA_FILE, '[]');
      return [];
    }
    throw error;
  }
}

// Helper to save data
async function saveTodos(todos) {
  await fs.writeFile(DATA_FILE, JSON.stringify(todos, null, 2));
}

// GET all todos
app.get('/api/todos', async (req, res) => {
  try {
    const todos = await getTodos();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: 'Failed to read todos' });
  }
});

// POST a new todo
app.post('/api/todos', async (req, res) => {
  try {
    const todos = await getTodos();
    const newTodo = {
      id: Date.now(),
      text: req.body.text,
      completed: false
    };
    todos.push(newTodo);
    await saveTodos(todos);
    res.status(201).json(newTodo);  //respuesta en RED
  } catch (error) {
    res.status(500).json({ error: 'Failed to add todo' });
  }
});

// PUT update a todo (toggle completion)
app.put('/api/todos/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const todos = await getTodos();
    const index = todos.findIndex(t => t.id === id);
    if (index !== -1) {
      todos[index].completed = req.body.completed;
      await saveTodos(todos);
      res.json(todos[index]);  //respuesta en RED
    } else {
      res.status(404).json({ error: 'Todo not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update todo' });
  }
});

// DELETE completed todos (los endpoints estaticos van primero)
app.delete('/api/todos/completed', async (req, res) => {
  try {
    let todos = await getTodos();
    todos = todos.filter(t => !t.completed);
    await saveTodos(todos);
    res.json({ message: 'Cleared completed' });  //respuesta en RED
  } catch (error) {
    res.status(500).json({ error: 'Failed to clear completed' });
  }
});

// DELETE a todo
app.delete('/api/todos/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    let todos = await getTodos();
    todos = todos.filter(t => t.id !== id);
    await saveTodos(todos);
    res.json({ message: 'Deleted' });  //respuesta en RED
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete todo' });
  }
});

app.get('/', (req, res) => {
    res.send('<!DOCTYPE html><html><body><h3>¡Hola Mundo desde Express!</h3></body></html>');
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
