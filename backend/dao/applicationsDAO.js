import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId

let applications

export default class ApplicationsDAO {
    static async injectDB(conn) {
        if (applications) return; 
        try {
            applications = await conn.db(process.env.STEMAPPS_NS).collection("applications")
        } catch (e) {
            console.error(`Unable to establish an error my nigga`)
        }
    }

    static async getApplications({
        filters = null, 
    } = {}) {
        let query;
        if (filters) {
            if ("email" in filters) {
                query = { $text: { $search: filters["email"] } }; 
            }
        }

        let cursor; 

        try {
            cursor = await applications.find(query); 
        } catch (e) {
            console.error(`Unable to issue find command, ${e}`); 
            return { applicationsList: [], totalNumApplications: 0 }; 
        }

        try {
            const applicationsList = await cursor.toArray()
            const totalNumApplications = await applications.countDocuments(query)

            return { applicationsList, totalNumApplications}
        } catch (e) {
            console.error(`Unable to convert cursor to array or problem counting documents, FUCKHEAD ${e}`)
            return { applicationsList: [], totalNumApplications: 0 }
        }
    }

    static async addApplication(email, questions, date) {
        try {
            const applicationDoc = {
                email: email,
                team: questions.team,
                q1: questions.q1, 
                q2: questions.q2,
                t0q1: questions.t0q1, 
                t0q2: questions.t0q2, 
                t1q1: questions.t1q1, 
                t1q2: questions.t1q2, 
                t2q1: questions.t2q1, 
                t2q1a: questions.t2q1a, 
                t2q2: questions.t2q2, 
                user_id: ObjectId(user_id),
                date: date,
            }

            return await applications.insertOne(applicationDoc); 
        } catch (e) {
            console.error(`Unable to post review: ${e}`)
        }
    }
}