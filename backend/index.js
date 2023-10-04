import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv"
import ApplicationsDAO from "./dao/applicationsDAO.js"
import UsersDAO from "./dao/usersDAO.js"
dotenv.config()
const MongoClient = mongodb.MongoClient

const port = process.env.PORT || 8000
console.log(port)

MongoClient.connect(
    process.env.STEMAPPS_DB_URI, 
    {
        maxPoolSize: 150, 
        wtimeoutMS: 2500, 
        useNewUrlParser: true
    }
)
.catch(err => {
    console.error(err.stack)
    process.exit(1)
})
.then(async client => {
    console.log("abc")
    await ApplicationsDAO.injectDB(client); 
    await UsersDAO.injectDB(client); 
    app.listen(port, () => {
        console.log(`listening on port ${port}`)
    })
})