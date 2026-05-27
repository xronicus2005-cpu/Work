import express from "express"
//controller functions
import {createUser, loginUser, me, logout} from "../controller/authController.js"

//middlware functions
import {accessTokenChecker} from "../middleware/accressTokenChecker.js"

const router = express.Router()

router.post("/create-user", createUser)
router.post("/login", loginUser)
router.get("/me", accessTokenChecker, me)
router.post("/logout", logout)

export default router