export default function handler(req, res) {
  switch (req.method) {
    case "GET":{
      // Obtener todas las tareas
      res.status(200).json({ tareas: ["Comprar pan", "Estudiar Vue"] });
      break;
    }
    case "POST":{
      // Insertar nueva tarea
      const { tarea } = req.body;
      res.status(201).json({ mensaje: `Tarea '${tarea}' agregada` });
      break;
    }
    case "PUT":{
      // Modificar tarea existente
      const { id, nuevaTarea } = req.body;
      res.status(200).json({ mensaje: `Tarea ${id} actualizada a '${nuevaTarea}'` });
      break;
    }
    case "DELETE":{
      // Eliminar tarea
      const { id } = req.body;
      res.status(200).json({ mensaje: `Tarea ${id} eliminada` });
      break;
    }
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Método ${req.method} no permitido`);
  }
}