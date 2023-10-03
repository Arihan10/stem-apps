import express from "express"
import cors from "cors"
import responses from "./api/response.route.js"

const app = express(); 

app.use(cors())
app.use(express.json())

app.use("/api/v1/responses", responses)
app.use("*", (req, res) => res.status(404).json({ error: "shit bro not found"}))

export default app