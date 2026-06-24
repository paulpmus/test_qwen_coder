// funcion solo debe funcionar en plataforma cloud (vercel)
// api/tasks.js
import mongoose from "mongoose";

// Definir esquema
const todoSchema = new mongoose.Schema({
  text: { type: String, required: true },
  completed: { type: Boolean, default: false }
});

// Evitar redefinir el modelo en cada invocación
const Todo = mongoose.models.Todo || mongoose.model("Todo", todoSchema, "tasks");

// Función para conectar una sola vez
async function connectDB() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Conectado a MongoDB");
  }
}

// Middleware para validar API key
function validateApiKey(req, res) {
  const apiKey = req.headers["x-api-key"];
  if (!apiKey || apiKey !== process.env.API_KEY) {
    res.status(401).json({ error: "Unauthorized: Invalid API key" });
    return false;
  }
  return true;
}

export default async function handler(req, res) {

    // Configuración básica de CORS (permite todo)
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "*");

    // Manejo de preflight request (OPTIONS)
    if (req.method === "OPTIONS") {
      res.status(200).end();
      return;
    }

    //if (!validateApiKey(req, res)) return;

    await connectDB();

    switch (req.method) {
        case "GET":{
            try {
                const todos = await Todo.find();
                res.status(200).json(todos);
            } catch (error) {
                res.status(500).json({ error: 'Failed to read todos' });
            }
            break;
        }
        case "POST":{
        // Insertar nueva tarea
        const { tarea } = req.body;
        res.status(201).json({ mensaje: 'en contruccion' });
        break;
        }
        case "PUT":{
        // Modificar tarea existente
        const { id, nuevaTarea } = req.body;
        res.status(200).json({ mensaje: 'en contruccion' });
        break;
        }
        case "DELETE":{
        // Eliminar tarea
        const { id } = req.body;
        res.status(200).json({ mensaje: 'en contruccion' });
        break;
        }
        default:
        res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
        res.status(405).end(`Método ${req.method} no permitido`);
    }
}