import ApplicationsDAO from "../dao/applicationsDAO.js";

export default class ApplicationCtrl {
    static async apiGetApplications(req, res, next) {
        let filters = {}
        if (req.query.username) filters.username = req.query.username

        const { applicationsList, totalNumApplications } = await ApplicationsDAO.getApplications({ filters })

        let response = {
            apps: applicationsList,
            filters: filters,
            total_apps: totalNumApplications,
        }
        res.json(response)
    }

    static async apiPostApplication(req, res, next) {
        console.log(req)
        try {
            const email = req.body.email; 
            const questions = {
                team: req.body.team,
                q1: req.body.q1, 
                q2: req.body.q2,
                t0q1: req.body.t0q1, 
                t0q2: req.body.t0q2, 
                t1q1: req.body.t1q1, 
                t1q2: req.body.t1q2, 
                t2q1: req.body.t2q1, 
                t2q1a: req.body.t2q1a, 
                t2q2: req.body.t2q2, 
            }
            const date = new Date(); 

            const ApplicationResponse = await ApplicationsDAO.addApplication(
                email, 
                questions,
                date,
            )
            res.json({ status: "success" })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }
}