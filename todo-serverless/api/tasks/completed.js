import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    text: { type: String, required: true },
    completed: { type: Boolean, default: false },
});

const Todo = mongoose.models.Todo || mongoose.model("Todo", todoSchema, "tasks");

async function connectDB() {
    if (mongoose.connection.readyState === 0) {
        await mongoose.connect(process.env.MONGO_URI);
    }
}

function validateApiKey(req, res) {
    const apiKey = req.headers["x-api-key"];
    if (!apiKey || apiKey !== process.env.API_KEY) {
        res.status(401).json({ error: "Unauthorized: Invalid API key" });
        return false;
    }
    return true;
}

export default async function handler(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "DELETE,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "*");

    if (req.method === "OPTIONS") {
        res.status(204).end();
        return;
    }

    if (!validateApiKey(req, res)) return;

    await connectDB();

    if (req.method === "DELETE") {
        try {
            await Todo.deleteMany({ completed: true });
            return res.status(200).json({ message: "Completed todos cleared" });
        } catch (error) {
            return res.status(500).json({ error: "Failed to clear completed todos" });
        }
    }

    res.setHeader("Allow", ["DELETE", "OPTIONS"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
}