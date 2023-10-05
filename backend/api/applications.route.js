import express from "express"
import ApplicationCtrl from "./applications.controller.js"
import UserCtrl from "./users.controller.js";

const router = express.Router(); 

// router.route("/").get((req, res) => res.send("Hello World!"))
router
    .route("/")
    .get(ApplicationCtrl.apiGetApplications)
    .post(ApplicationCtrl.apiPostApplication)

router.route("/users").get(UserCtrl.apiGetUsers)
router.route("/id/:id").get(UserCtrl.apiGetUserById)
router.route("/email/:email").get(UserCtrl.apiGetUserByEmail)

router.route("/signup").post(UserCtrl.apiPostUser)
router.route("/login").post(UserCtrl.apiVerifyPassword)

export default router