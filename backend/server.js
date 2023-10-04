import express from "express"
import cors from "cors"
import applications from "./api/applications.route.js"

const app = express(); 

console.log("fuck you node"); 

app.use(cors())
app.use(express.json())

app.use("/api/v1/applications", applications)
app.use("*", (req, res) => res.status(404).json({ error: "shit bro not found"}))

export default app