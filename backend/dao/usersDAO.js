import mongodb from "mongodb"
import bcrypt, { hash } from "bcrypt"

const ObjectId = mongodb.ObjectId
//const bcrypt = require("bcrypt")

let users

export default class UsersDAO {
    static async injectDB(conn) {
        if (users) return
        
        try {
            users = await conn.db(process.env.USERS_NS).collection("users")
        } catch (e) {
            console.error(`Unable to establish a collection handle in usersDAO: ${e}`)
        }
    }

    static async getUsers({
        filters = null, 
    } = {}) {
        let query
        if (filters) {
            if ("email" in filters) {
                query = { $text: { $search: filters["email"] } }; 
            }
        }

        let cursor

        try {
            cursor = await users.find(query)
        } catch (e) {
            console.error(`Unable to find issue command, ${e}`)
            return { usersList: [], totalNumUsers: 0 }
        }

        try {
            const usersList = await cursor.toArray()
            const totalNumUsers = await users.countDocuments(query)

            return { usersList, totalNumUsers}
        } catch (e) {
            console.error(`Unable to convert cursor to array or problem counting documents, ${e}`)

            return { usersList: [], totalNumUsers: 0 }
        }
    }

    static async getUserById(id) {
        try {
            const pipeline = [
                {
                    $match: {
                        _id: new ObjectId(id)
                    }, 
                }, 
                {
                    $lookup: {
                        from: "applications", 
                        let: {
                            id: "$_id", 
                        }, 
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $eq: ["$user_id", "$$id"], 
                                    }, 
                                }, 
                            }, 
                            {
                                $sort: {
                                    date: -1,
                                },
                            },
                        ],
                        as: "applications", 
                    }, 
                }, 
                {
                    $addFields: {
                        applications: "$applications", 
                    }, 
                }, 
            ]
            return await users.aggregate(pipeline).next()
        } catch (e) {
            console.error(`Something went wrong in getUserById: ${e}`)
            throw e
        }
    }

    static async getUserByEmail(email) {
        try {
            email = email.toLowerCase(); 
            console.log(email); 

            const pipeline = [
                {
                    $match: {
                        email: email
                    }
                }
            ]

            return await users.aggregate(pipeline).next(); 
        } catch (e) {
            console.error(`Something went wrong in getUserByName: ${e}`)
            throw e
        }
    }

    static async addUser(email, first, last, password) {
        try {
            const salt = await bcrypt.genSalt(10)
            const passHash = await bcrypt.hash(password, salt) 

            const userDoc = {
                email: email.toLowerCase(), 
                first: first, 
                last: last,
                passHash: passHash,
                status: "pending",
            }

            const preUsers = await this.getUserByEmail(email); 
            console.log(preUsers); 
            if (!preUsers) return await users.insertOne(userDoc)
            else return { "error": "didn't work" }
        } catch (e) {
            console.error(`Unable to create user: ${e}`)
            return { error: e }
        }
    }

    static async verifyUserPassword(email, password) {
        try {
            const data = await this.getUserByEmail(email); 

            if (!data) return null; 

            const passHash = data.passHash

            return await bcrypt.compare(password, passHash)
        } catch (e) {
            console.error(`Unable to verify user: ${e}`)
            return { error: e }
        }
    }
}