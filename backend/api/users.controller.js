// Has functions called in routes; takes data from User DAO

import UsersDAO from "../dao/usersDAO.js"

export default class UserCtrl {
    static async apiGetUsers(req, res, next) {
        let filters = {}
        if (req.query.email) {
            filters.email = req.query.email
        }

        const { usersList, totalNumUsers } = await UsersDAO.getUsers({
            filters,
        })

        let response = {
            users: usersList, 
            filters: filters, 
            total_results: totalNumUsers, 
        }
        res.json(response)
    }

    static async apiGetUserById(req, res, next) {
        try {
            let id = req.params.id || {}
            let user = await UsersDAO.getUserById(id)

            if (!user) {
                res.status(404).json({ error: "Not found bro" })
                return
            }

            res.json(user)
        } catch(e) {
            console.log(`api, ${e}`)
            res.status(500).json({ error: e })
        }
    }

    static async apiGetUserByEmail(req, res, next) {
        try {
            let email = decodeURIComponent(req.params.email) || {}
            let user = await UsersDAO.getUserByEmail(email)

            if (!user) {
                res.status(404).json({ error: "Not found bro" })
                return
            }

            res.json(user)
        } catch(e) {
            console.log(`api, ${e}`)
            res.status(500).json({ error: e })
        }
    }

    static async apiPostUser(req, res, next) {
        try {
            const email = req.body.email
            const first = req.body.first
            const last = req.body.last
            const password = req.body.password

            const EventResponse = await UsersDAO.addUser(
                email, 
                first, 
                last,
                password,
            )
            //res.json({ status: "success" })
            res.json(EventResponse)
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }

    static async apiVerifyPassword(req, res, next) {
        try {
            const email = req.body.email
            const password = req.body.password

            const EventResponse = await UsersDAO.verifyUserPassword(
                email, 
                password, 
            )

            res.json(EventResponse)
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }
}