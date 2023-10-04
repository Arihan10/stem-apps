import express from "express"
import cors from "cors"
import applications from "./api/applications.route.js"

const app = express(); 

app.use(cors())
app.use(express.json())

app.use("/api/v1/applications", applications)
app.use("*", (req, res) => res.status(404).json({ error: "route not found!"}))

export default app