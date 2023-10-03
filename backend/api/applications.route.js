import express from "express"
import ApplicationCtrl from "./applications.controller.js"

const router = express.Router(); 

// router.route("/").get((req, res) => res.send("Hello World!"))
router
    .route("/")
    .get(ApplicationCtrl.apiGetApplications)
    .post(ApplicationCtrl.apiPostApplication)

export default router